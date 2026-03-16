/**
 * Auto-generated Playwright test for research/spec-018
 * Source: e2e/specs/research/spec-018.md
 * Generated: 2026-03-15T17:37:29.734Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-018
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-018', () => {
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

  test('cp-000: Copilot opening does not move focus into the chat input and closing it does not ', async ({ page }) => {
    // Checkpoint 0: Copilot opening does not move focus into the chat input, and closing it does not restore focus to the floating toggle button
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot opening does not move focus into the chat input, and closing it does not restore focus to the floating toggle button",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-000 ' + "Copilot opening does not move focus into the chat input, and closing it does not restore focus to the floating toggle button");
    }


    // This test validates: Copilot opening does not move focus into the chat input, and closing it does not restore focus to the floating toggle button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: AISynthesisPaneltriggerSynthesis has no stale-request guard so an earlier reques', async ({ page }) => {
    // Checkpoint 1: `AISynthesisPanel.triggerSynthesis()` has no stale-request guard, so an earlier request's `finally { setIsStreaming(false) }` can clear the streaming state of a newer synthesis run
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`AISynthesisPanel.triggerSynthesis()` has no stale-request guard, so an earlier request's `finally { setIsStreaming(false) }` can clear the streaming state of a newer synthesis run",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-001 ' + "`AISynthesisPanel.triggerSynthesis()` has no stale-request guard, so an earlier request's `finally { setIsStreaming(false) }` can clear the streaming state of a newer synthesis run");
    }


    // This test validates: `AISynthesisPanel.triggerSynthesis()` has no stale-request guard, so an earlier request's `finally { setIsStreaming(false) }` can clear the streaming state of a newer synthesis run
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Pagination UI is hidden entirely when totalResults 0 even though the inner page-', async ({ page }) => {
    // Checkpoint 2: Pagination UI is hidden entirely when `totalResults === 0`, even though the inner page-count text uses `Math.max(totalPages, 1)`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Pagination UI is hidden entirely when `totalResults === 0`, even though the inner page-count text uses `Math.max(totalPages, 1)`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-002 ' + "Pagination UI is hidden entirely when `totalResults === 0`, even though the inner page-count text uses `Math.max(totalPages, 1)`");
    }


    // This test validates: Pagination UI is hidden entirely when `totalResults === 0`, even though the inner page-count text uses `Math.max(totalPages, 1)`
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
