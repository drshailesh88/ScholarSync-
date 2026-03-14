/**
 * Auto-generated Playwright test for notebook/spec-025
 * Source: e2e/specs/notebook/spec-025.md
 * Generated: 2026-03-14T10:51:00.828Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts notebook spec-025
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';








import { assertNotebookCheckpoint } from '../../module-assertions/notebook';











test.describe('notebook / spec-025', () => {
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

  test('cp-000: addMessage updates the parent conversations updated_at timestamp after inserting', async ({ page }) => {
    // Checkpoint 0: `addMessage` updates the parent conversation's `updated_at` timestamp after inserting the message
    // Section: Quick Test Workflows > Conversation Actions — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`addMessage` updates the parent conversation's `updated_at` timestamp after inserting the message",
      section: "Quick Test Workflows",
      subsection: "Conversation Actions — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-000 ' + "`addMessage` updates the parent conversation's `updated_at` timestamp after inserting the message");
    }


    // This test validates: `addMessage` updates the parent conversation's `updated_at` timestamp after inserting the message
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: submitMessageFeedback accepts an optional comment parameter in addition to the n', async ({ page }) => {
    // Checkpoint 1: `submitMessageFeedback` accepts an optional `comment` parameter in addition to the numeric rating
    // Section: Quick Test Workflows > Conversation Actions — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`submitMessageFeedback` accepts an optional `comment` parameter in addition to the numeric rating",
      section: "Quick Test Workflows",
      subsection: "Conversation Actions — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-001 ' + "`submitMessageFeedback` accepts an optional `comment` parameter in addition to the numeric rating");
    }


    // This test validates: `submitMessageFeedback` accepts an optional `comment` parameter in addition to the numeric rating
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: getConversations orders results by updated_at descending most recent first', async ({ page }) => {
    // Checkpoint 2: `getConversations` orders results by `updated_at` descending (most recent first)
    // Section: Quick Test Workflows > Conversation Actions — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`getConversations` orders results by `updated_at` descending (most recent first)",
      section: "Quick Test Workflows",
      subsection: "Conversation Actions — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-002 ' + "`getConversations` orders results by `updated_at` descending (most recent first)");
    }


    // This test validates: `getConversations` orders results by `updated_at` descending (most recent first)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Loading skeleton sidebar width is w-72 narrower than the actual notebook page si', async ({ page }) => {
    // Checkpoint 3: Loading skeleton sidebar width is `w-72` — narrower than the actual notebook page sidebar which is `w-80`
    // Section: Quick Test Workflows > Loading Skeleton — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Loading skeleton sidebar width is `w-72` — narrower than the actual notebook page sidebar which is `w-80`",
      section: "Quick Test Workflows",
      subsection: "Loading Skeleton — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-003 ' + "Loading skeleton sidebar width is `w-72` — narrower than the actual notebook page sidebar which is `w-80`");
    }


    // This test validates: Loading skeleton sidebar width is `w-72` — narrower than the actual notebook page sidebar which is `w-80`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Loading skeleton renders exactly 3 file placeholder rows each with p-3 rounded-l', async ({ page }) => {
    // Checkpoint 4: Loading skeleton renders exactly 3 file placeholder rows, each with `p-3 rounded-lg bg-surface-raised/50`
    // Section: Quick Test Workflows > Loading Skeleton — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Loading skeleton renders exactly 3 file placeholder rows, each with `p-3 rounded-lg bg-surface-raised/50`",
      section: "Quick Test Workflows",
      subsection: "Loading Skeleton — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-004 ' + "Loading skeleton renders exactly 3 file placeholder rows, each with `p-3 rounded-lg bg-surface-raised/50`");
    }


    // This test validates: Loading skeleton renders exactly 3 file placeholder rows, each with `p-3 rounded-lg bg-surface-raised/50`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Loading skeleton chat area uses SkeletonText component with lines6', async ({ page }) => {
    // Checkpoint 5: Loading skeleton chat area uses `SkeletonText` component with `lines={6}`
    // Section: Quick Test Workflows > Loading Skeleton — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Loading skeleton chat area uses `SkeletonText` component with `lines={6}`",
      section: "Quick Test Workflows",
      subsection: "Loading Skeleton — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-005 ' + "Loading skeleton chat area uses `SkeletonText` component with `lines={6}`");
    }


    // This test validates: Loading skeleton chat area uses `SkeletonText` component with `lines={6}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Section 21 states password gate has a typepassword input confirmed correct Howev', async ({ page }) => {
    // Checkpoint 6: Section 21 states password gate has a `type="password"` input — confirmed correct. However, the Share Dialog (section 19) password field is `type="text"` (plaintext visible), which is not noted in any existing check
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Section 21 states password gate has a `type=\"password\"` input — confirmed correct. However, the Share Dialog (section 19) password field is `type=\"text\"` (plaintext visible), which is not noted in any existing check",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-006 ' + "Section 21 states password gate has a `type=\"password\"` input — confirmed correct. However, the Share Dialog (section 19) password field is `type=\"text\"` (plaintext visible), which is not noted in any existing check");
    }


    // This test validates: Section 21 states password gate has a `type="password"` input — confirmed correct. However, the Share Dialog (section 19) password field is `type="text"` (plaintext visible), which is not noted in any existing check
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Existing check says the audio close button has titleClose audio overview but no ', async ({ page }) => {
    // Checkpoint 7: Existing check says the audio close button has `title="Close audio overview"` but no `aria-label` — confirmed still accurate as of this pass
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Existing check says the audio close button has `title=\"Close audio overview\"` but no `aria-label` — confirmed still accurate as of this pass",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-007 ' + "Existing check says the audio close button has `title=\"Close audio overview\"` but no `aria-label` — confirmed still accurate as of this pass");
    }


    // This test validates: Existing check says the audio close button has `title="Close audio overview"` but no `aria-label` — confirmed still accurate as of this pass
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Section 12 describes coverage badge unused-paper truncation generically the actu', async ({ page }) => {
    // Checkpoint 8: Section 12 describes coverage badge unused-paper truncation generically — the actual truncation differs from citation truncation: no 40-char colon cap, no ellipsis on 30-char fallback, and "not referenced" suffix text
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Section 12 describes coverage badge unused-paper truncation generically — the actual truncation differs from citation truncation: no 40-char colon cap, no ellipsis on 30-char fallback, and \"not referenced\" suffix text",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-008 ' + "Section 12 describes coverage badge unused-paper truncation generically — the actual truncation differs from citation truncation: no 40-char colon cap, no ellipsis on 30-char fallback, and \"not referenced\" suffix text");
    }


    // This test validates: Section 12 describes coverage badge unused-paper truncation generically — the actual truncation differs from citation truncation: no 40-char colon cap, no ellipsis on 30-char fallback, and "not referenced" suffix text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Section 9 states 3 dots 2x2 rounded-full brand40 color for loading this is corre', async ({ page }) => {
    // Checkpoint 9: Section 9 states "3 dots (2x2 rounded-full, brand/40 color)" for loading — this is correct for the main loading indicator; the suggestion-loading dots are different (1.5x1.5, brand/30, different delays) and should not be confused
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Section 9 states \"3 dots (2x2 rounded-full, brand/40 color)\" for loading — this is correct for the main loading indicator; the suggestion-loading dots are different (1.5x1.5, brand/30, different delays) and should not be confused",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-009 ' + "Section 9 states \"3 dots (2x2 rounded-full, brand/40 color)\" for loading — this is correct for the main loading indicator; the suggestion-loading dots are different (1.5x1.5, brand/30, different delays) and should not be confused");
    }


    // This test validates: Section 9 states "3 dots (2x2 rounded-full, brand/40 color)" for loading — this is correct for the main loading indicator; the suggestion-loading dots are different (1.5x1.5, brand/30, different delays) and should not be confused
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: No change all srccomponentsnotebook files remain in active import chains', async ({ page }) => {
    // Checkpoint 10: No change — all `src/components/notebook` files remain in active import chains
    // Section: Quick Test Workflows > Components Referenced But Not Rendered (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "No change — all `src/components/notebook` files remain in active import chains",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-010 ' + "No change — all `src/components/notebook` files remain in active import chains");
    }


    // This test validates: No change — all `src/components/notebook` files remain in active import chains
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: notebook route error boundary renders ErrorDisplay with title Notebook unavailab', async ({ page }) => {
    // Checkpoint 11: `/notebook` route error boundary renders `ErrorDisplay` with title `Notebook unavailable`, message `We couldn't load your notebook. Please try again.`, and passes `reset` through `onRetry`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`/notebook` route error boundary renders `ErrorDisplay` with title `Notebook unavailable`, message `We couldn't load your notebook. Please try again.`, and passes `reset` through `onRetry`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-011 ' + "`/notebook` route error boundary renders `ErrorDisplay` with title `Notebook unavailable`, message `We couldn't load your notebook. Please try again.`, and passes `reset` through `onRetry`");
    }


    // This test validates: `/notebook` route error boundary renders `ErrorDisplay` with title `Notebook unavailable`, message `We couldn't load your notebook. Please try again.`, and passes `reset` through `onRetry`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: sharenotebooktokennot-foundtsx renders a dedicated 404 view with heading 404 sub', async ({ page }) => {
    // Checkpoint 12: `/share/notebook/[token]/not-found.tsx` renders a dedicated 404 view with heading `404`, subtitle `Notebook not found`, body text `This shared notebook link may have expired, been disabled by the owner, or the notebook may no longer exist.`, and a `Go to ScholarSync` link to `/`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`/share/notebook/[token]/not-found.tsx` renders a dedicated 404 view with heading `404`, subtitle `Notebook not found`, body text `This shared notebook link may have expired, been disabled by the owner, or the notebook may no longer exist.`, and a `Go to ScholarSync` link to `/`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-012 ' + "`/share/notebook/[token]/not-found.tsx` renders a dedicated 404 view with heading `404`, subtitle `Notebook not found`, body text `This shared notebook link may have expired, been disabled by the owner, or the notebook may no longer exist.`, and a `Go to ScholarSync` link to `/`");
    }


    // This test validates: `/share/notebook/[token]/not-found.tsx` renders a dedicated 404 view with heading `404`, subtitle `Notebook not found`, body text `This shared notebook link may have expired, been disabled by the owner, or the notebook may no longer exist.`, and a `Go to ScholarSync` link to `/`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: NotebookShareDialog is closed by Escape and backdrop click but the rendered over', async ({ page }) => {
    // Checkpoint 13: `NotebookShareDialog` is closed by Escape and backdrop click, but the rendered overlay has no `role="dialog"` or `aria-modal="true"` attributes
    // Section: Quick Test Workflows > Components Referenced But Not Rendered (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`NotebookShareDialog` is closed by Escape and backdrop click, but the rendered overlay has no `role=\"dialog\"` or `aria-modal=\"true\"` attributes",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-013 ' + "`NotebookShareDialog` is closed by Escape and backdrop click, but the rendered overlay has no `role=\"dialog\"` or `aria-modal=\"true\"` attributes");
    }


    // This test validates: `NotebookShareDialog` is closed by Escape and backdrop click, but the rendered overlay has no `role="dialog"` or `aria-modal="true"` attributes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: loadConversation only reapplies file selected state when convopaper_ids exists a', async ({ page }) => {
    // Checkpoint 14: `loadConversation()` only reapplies file `selected` state when `convo.paper_ids` exists and has length > 0; conversations with `null` or empty `paper_ids` leave the current file-selection state untouched
    // Section: Quick Test Workflows > Components Referenced But Not Rendered (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`loadConversation()` only reapplies file `selected` state when `convo.paper_ids` exists and has length > 0; conversations with `null` or empty `paper_ids` leave the current file-selection state untouched",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-014 ' + "`loadConversation()` only reapplies file `selected` state when `convo.paper_ids` exists and has length > 0; conversations with `null` or empty `paper_ids` leave the current file-selection state untouched");
    }


    // This test validates: `loadConversation()` only reapplies file `selected` state when `convo.paper_ids` exists and has length > 0; conversations with `null` or empty `paper_ids` leave the current file-selection state untouched
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: AudioOverviewPanel posts to apiaudio-overview without an AbortController closing', async ({ page }) => {
    // Checkpoint 15: `AudioOverviewPanel` posts to `/api/audio-overview` without an `AbortController`; closing the panel or changing inputs does not cancel an in-flight generation request
    // Section: Quick Test Workflows > Components Referenced But Not Rendered (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`AudioOverviewPanel` posts to `/api/audio-overview` without an `AbortController`; closing the panel or changing inputs does not cancel an in-flight generation request",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-015 ' + "`AudioOverviewPanel` posts to `/api/audio-overview` without an `AbortController`; closing the panel or changing inputs does not cancel an in-flight generation request");
    }


    // This test validates: `AudioOverviewPanel` posts to `/api/audio-overview` without an `AbortController`; closing the panel or changing inputs does not cancel an in-flight generation request
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: AudioOverviewPanel reset effect clears audioscripterror state on conversationId ', async ({ page }) => {
    // Checkpoint 16: `AudioOverviewPanel` reset effect clears audio/script/error state on `conversationId`, `paperIdsKey`, `mode`, `customPrompt`, or `audioLength` changes, but it does not reset `showOptions`, so the options panel can stay open across those resets
    // Section: Quick Test Workflows > Components Referenced But Not Rendered (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`AudioOverviewPanel` reset effect clears audio/script/error state on `conversationId`, `paperIdsKey`, `mode`, `customPrompt`, or `audioLength` changes, but it does not reset `showOptions`, so the options panel can stay open across those resets",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-016 ' + "`AudioOverviewPanel` reset effect clears audio/script/error state on `conversationId`, `paperIdsKey`, `mode`, `customPrompt`, or `audioLength` changes, but it does not reset `showOptions`, so the options panel can stay open across those resets");
    }


    // This test validates: `AudioOverviewPanel` reset effect clears audio/script/error state on `conversationId`, `paperIdsKey`, `mode`, `customPrompt`, or `audioLength` changes, but it does not reset `showOptions`, so the options panel can stay open across those resets
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Initial notebook mount suppresses library and history load failures with empty c', async ({ page }) => {
    // Checkpoint 17: Initial notebook mount suppresses library and history load failures with empty `.catch(() => {})` handlers on `getUserPapers()` and `getConversations("notebook")`, so those failures produce no inline error or retry UI
    // Section: Quick Test Workflows > Components Referenced But Not Rendered (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Initial notebook mount suppresses library and history load failures with empty `.catch(() => {})` handlers on `getUserPapers()` and `getConversations(\"notebook\")`, so those failures produce no inline error or retry UI",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-017 ' + "Initial notebook mount suppresses library and history load failures with empty `.catch(() => {})` handlers on `getUserPapers()` and `getConversations(\"notebook\")`, so those failures produce no inline error or retry UI");
    }


    // This test validates: Initial notebook mount suppresses library and history load failures with empty `.catch(() => {})` handlers on `getUserPapers()` and `getConversations("notebook")`, so those failures produce no inline error or retry UI
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: No WebSocket SSE subscription Yjs provider or other realtime collaboration clien', async ({ page }) => {
    // Checkpoint 18: No WebSocket, SSE subscription, Yjs provider, or other realtime collaboration client is imported anywhere in the `/notebook` or `/share/notebook/[token]` render tree; notebook sync is request/response and server-action based only
    // Section: Quick Test Workflows > Components Referenced But Not Rendered (Pass 3)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "No WebSocket, SSE subscription, Yjs provider, or other realtime collaboration client is imported anywhere in the `/notebook` or `/share/notebook/[token]` render tree; notebook sync is request/response and server-action based only",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-018 ' + "No WebSocket, SSE subscription, Yjs provider, or other realtime collaboration client is imported anywhere in the `/notebook` or `/share/notebook/[token]` render tree; notebook sync is request/response and server-action based only");
    }


    // This test validates: No WebSocket, SSE subscription, Yjs provider, or other realtime collaboration client is imported anywhere in the `/notebook` or `/share/notebook/[token]` render tree; notebook sync is request/response and server-action based only
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
