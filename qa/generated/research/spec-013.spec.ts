/**
 * Auto-generated Playwright test for research/spec-013
 * Source: e2e/specs/research/spec-013.md
 * Generated: 2026-03-14T08:51:39.951Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-013
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-013', () => {
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

  test('cp-000: srccomponentsresearchPaperDetailPaneltsx exists in the codebase but is not impor', async ({ page }) => {
    // Checkpoint 0: `src/components/research/PaperDetailPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/PaperDetailPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-000 `src/components/research/PaperDetailPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/PaperDetailPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: srccomponentsresearchEvidenceTabletsx exists in the codebase but is not imported', async ({ page }) => {
    // Checkpoint 1: `src/components/research/EvidenceTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/EvidenceTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-001 `src/components/research/EvidenceTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/EvidenceTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: srccomponentsresearchSynthesisDialogtsx exists in the codebase but is not import', async ({ page }) => {
    // Checkpoint 2: `src/components/research/SynthesisDialog.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/SynthesisDialog.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-002 `src/components/research/SynthesisDialog.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/SynthesisDialog.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: srccomponentsresearchResearchSidebartsx exists in the codebase but is not import', async ({ page }) => {
    // Checkpoint 3: `src/components/research/ResearchSidebar.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/ResearchSidebar.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-003 `src/components/research/ResearchSidebar.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/ResearchSidebar.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: srccomponentsresearchChatTabtsx exists in the codebase but is not imported by sr', async ({ page }) => {
    // Checkpoint 4: `src/components/research/ChatTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/ChatTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-004 `src/components/research/ChatTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/ChatTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: srccomponentsresearchLibraryTabtsx exists in the codebase but is not imported by', async ({ page }) => {
    // Checkpoint 5: `src/components/research/LibraryTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/LibraryTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-005 `src/components/research/LibraryTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/LibraryTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: srccomponentsresearchSearchTabtsx exists in the codebase but is not imported by ', async ({ page }) => {
    // Checkpoint 6: `src/components/research/SearchTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/SearchTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-006 `src/components/research/SearchTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/SearchTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: srccomponentsresearchResearchPlantsx exists in the codebase but is not imported ', async ({ page }) => {
    // Checkpoint 7: `src/components/research/ResearchPlan.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/ResearchPlan.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-007 `src/components/research/ResearchPlan.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/ResearchPlan.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: srccomponentsresearchFilterPaneltsx exists in the codebase but is not imported b', async ({ page }) => {
    // Checkpoint 8: `src/components/research/FilterPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/FilterPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
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
      throw new Error('Unhandled research checkpoint: cp-008 `src/components/research/FilterPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/FilterPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: srccomponentsresearchAISummaryCardtsx exists in the codebase but is not imported', async ({ page }) => {
    // Checkpoint 9: `src/components/research/AISummaryCard.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/AISummaryCard.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
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
      throw new Error('Unhandled research checkpoint: cp-009 `src/components/research/AISummaryCard.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/AISummaryCard.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: srccomponentsresearchVerificationBadgetsx exists in the codebase but is not impo', async ({ page }) => {
    // Checkpoint 10: `src/components/research/VerificationBadge.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/VerificationBadge.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
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
      throw new Error('Unhandled research checkpoint: cp-010 `src/components/research/VerificationBadge.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/VerificationBadge.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: srccomponentsresearchScopeSelectortsx exists in the codebase but is not imported', async ({ page }) => {
    // Checkpoint 11: `src/components/research/ScopeSelector.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/ScopeSelector.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-011 `src/components/research/ScopeSelector.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/ScopeSelector.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: srccomponentsresearchcitation-networktsx exists in the codebase but is not impor', async ({ page }) => {
    // Checkpoint 12: `src/components/research/citation-network.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/citation-network.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-012 `src/components/research/citation-network.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/citation-network.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: readSession returns null when stored JSON is corrupt or cannot be parsed the cat', async ({ page }) => {
    // Checkpoint 13: `readSession()` returns `null` when stored JSON is corrupt or cannot be parsed — the `catch` block silently swallows `JSON.parse` errors
    // Section: Quick Test Workflows > Session & State Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`readSession()` returns `null` when stored JSON is corrupt or cannot be parsed — the `catch` block silently swallows `JSON.parse` errors",
      section: "Quick Test Workflows",
      subsection: "Session & State Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-013 `readSession()` returns `null` when stored JSON is corrupt or cannot be parsed — the `catch` block silently swallows `JSON.parse` errors');
    }


    // This test validates: `readSession()` returns `null` when stored JSON is corrupt or cannot be parsed — the `catch` block silently swallows `JSON.parse` errors
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: writeSession catch block comment documents the failure reason as quota exceeded ', async ({ page }) => {
    // Checkpoint 14: `writeSession()` catch block comment documents the failure reason as `quota exceeded — ignore`
    // Section: Quick Test Workflows > Session & State Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`writeSession()` catch block comment documents the failure reason as `quota exceeded — ignore`",
      section: "Quick Test Workflows",
      subsection: "Session & State Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-014 `writeSession()` catch block comment documents the failure reason as `quota exceeded — ignore`');
    }


    // This test validates: `writeSession()` catch block comment documents the failure reason as `quota exceeded — ignore`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Session persistence does NOT include similarResults similarErrors similarEmpty l', async ({ page }) => {
    // Checkpoint 15: Session persistence does NOT include `similarResults`, `similarErrors`, `similarEmpty`, `loadingSimilar`, `showCopilot`, `showSortDropdown`, `showAugmented`, `chatInput`, or `chatMessages` — these all reset on page refresh
    // Section: Quick Test Workflows > Session & State Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Session persistence does NOT include `similarResults`, `similarErrors`, `similarEmpty`, `loadingSimilar`, `showCopilot`, `showSortDropdown`, `showAugmented`, `chatInput`, or `chatMessages` — these all reset on page refresh",
      section: "Quick Test Workflows",
      subsection: "Session & State Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-015 Session persistence does NOT include `similarResults`, `similarErrors`, `similarEmpty`, `loadingSimilar`, `showCopilot`, `showSortDropdown`, `showAugmented`, `chatInput`, or `chatMessages` — these all reset on page refresh');
    }


    // This test validates: Session persistence does NOT include `similarResults`, `similarErrors`, `similarEmpty`, `loadingSimilar`, `showCopilot`, `showSortDropdown`, `showAugmented`, `chatInput`, or `chatMessages` — these all reset on page refresh
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: The saved Set tracking which papers the user has saved this session is not persi', async ({ page }) => {
    // Checkpoint 16: The `saved` Set (tracking which papers the user has saved this session) is not persisted in sessionStorage and resets on refresh
    // Section: Quick Test Workflows > Session & State Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The `saved` Set (tracking which papers the user has saved this session) is not persisted in sessionStorage and resets on refresh",
      section: "Quick Test Workflows",
      subsection: "Session & State Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-016 The `saved` Set (tracking which papers the user has saved this session) is not persisted in sessionStorage and resets on refresh');
    }


    // This test validates: The `saved` Set (tracking which papers the user has saved this session) is not persisted in sessionStorage and resets on refresh
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: showAugmented augmented-queries disclosure state is not persisted in session the', async ({ page }) => {
    // Checkpoint 17: `showAugmented` (augmented-queries disclosure state) is not persisted in session; the disclosure collapses on refresh even if previously expanded
    // Section: Quick Test Workflows > Session & State Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`showAugmented` (augmented-queries disclosure state) is not persisted in session; the disclosure collapses on refresh even if previously expanded",
      section: "Quick Test Workflows",
      subsection: "Session & State Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-017 `showAugmented` (augmented-queries disclosure state) is not persisted in session; the disclosure collapses on refresh even if previously expanded');
    }


    // This test validates: `showAugmented` (augmented-queries disclosure state) is not persisted in session; the disclosure collapses on refresh even if previously expanded
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: userPlan initializes as null before getUserUsageStats resolves meaning isFree in', async ({ page }) => {
    // Checkpoint 18: `userPlan` initializes as `null` before `getUserUsageStats()` resolves, meaning `isFree` in AISynthesisPanel evaluates to `false` during the initial render window
    // Section: Quick Test Workflows > Session & State Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`userPlan` initializes as `null` before `getUserUsageStats()` resolves, meaning `isFree` in AISynthesisPanel evaluates to `false` during the initial render window",
      section: "Quick Test Workflows",
      subsection: "Session & State Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-018 `userPlan` initializes as `null` before `getUserUsageStats()` resolves, meaning `isFree` in AISynthesisPanel evaluates to `false` during the initial render window');
    }


    // This test validates: `userPlan` initializes as `null` before `getUserUsageStats()` resolves, meaning `isFree` in AISynthesisPanel evaluates to `false` during the initial render window
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: similarResults is stored as a Recordstring UnifiedSearchResult keyed by rs2Id rd', async ({ page }) => {
    // Checkpoint 19: `similarResults` is stored as a `Record<string, UnifiedSearchResult[]>` keyed by `r.s2Id || r.doi || r.title`, not by a numeric index
    // Section: Quick Test Workflows > Session & State Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`similarResults` is stored as a `Record<string, UnifiedSearchResult[]>` keyed by `r.s2Id || r.doi || r.title`, not by a numeric index",
      section: "Quick Test Workflows",
      subsection: "Session & State Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-019 `similarResults` is stored as a `Record<string, UnifiedSearchResult[]>` keyed by `r.s2Id || r.doi || r.title`, not by a numeric index');
    }


    // This test validates: `similarResults` is stored as a `Record<string, UnifiedSearchResult[]>` keyed by `r.s2Id || r.doi || r.title`, not by a numeric index
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Empty-state data load useEffect has a cancelled boolean race-condition guard the', async ({ page }) => {
    // Checkpoint 20: Empty-state data load useEffect has a `cancelled` boolean race-condition guard; the cleanup function sets `cancelled = true` to prevent state updates after unmount
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Empty-state data load useEffect has a `cancelled` boolean race-condition guard; the cleanup function sets `cancelled = true` to prevent state updates after unmount",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-020 Empty-state data load useEffect has a `cancelled` boolean race-condition guard; the cleanup function sets `cancelled = true` to prevent state updates after unmount');
    }


    // This test validates: Empty-state data load useEffect has a `cancelled` boolean race-condition guard; the cleanup function sets `cancelled = true` to prevent state updates after unmount
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Empty-state getRecentSearches failure silently returns empty array via catch', async ({ page }) => {
    // Checkpoint 21: Empty-state `getRecentSearches()` failure silently returns empty array `[]` via `.catch(() => [])`
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Empty-state `getRecentSearches()` failure silently returns empty array `[]` via `.catch(() => [])`",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-021 Empty-state `getRecentSearches()` failure silently returns empty array `[]` via `.catch(() => [])`');
    }


    // This test validates: Empty-state `getRecentSearches()` failure silently returns empty array `[]` via `.catch(() => [])`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Empty-state getUserPapers failure silently returns empty array via catch', async ({ page }) => {
    // Checkpoint 22: Empty-state `getUserPapers()` failure silently returns empty array `[]` via `.catch(() => [])`
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Empty-state `getUserPapers()` failure silently returns empty array `[]` via `.catch(() => [])`",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-022 Empty-state `getUserPapers()` failure silently returns empty array `[]` via `.catch(() => [])`');
    }


    // This test validates: Empty-state `getUserPapers()` failure silently returns empty array `[]` via `.catch(() => [])`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: When the authors field on a recently saved paper is not an array the author mapp', async ({ page }) => {
    // Checkpoint 23: When the `authors` field on a recently saved paper is not an array, the author mapping falls back to empty string `""`
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "When the `authors` field on a recently saved paper is not an array, the author mapping falls back to empty string `\"\"`",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-023 When the `authors` field on a recently saved paper is not an array, the author mapping falls back to empty string `""`');
    }


    // This test validates: When the `authors` field on a recently saved paper is not an array, the author mapping falls back to empty string `""`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: emptyStateLoaded is set to true inside a finally block ensuring it updates even ', async ({ page }) => {
    // Checkpoint 24: `emptyStateLoaded` is set to `true` inside a `finally` block, ensuring it updates even when the data-load promise rejects
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`emptyStateLoaded` is set to `true` inside a `finally` block, ensuring it updates even when the data-load promise rejects",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-024 `emptyStateLoaded` is set to `true` inside a `finally` block, ensuring it updates even when the data-load promise rejects');
    }


    // This test validates: `emptyStateLoaded` is set to `true` inside a `finally` block, ensuring it updates even when the data-load promise rejects
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Empty-state Recent Searches heading text reads exactly Recent Searches with text', async ({ page }) => {
    // Checkpoint 25: Empty-state "Recent Searches" heading text reads exactly `Recent Searches` with `text-xs font-semibold text-ink-muted uppercase tracking-wider` styling
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Empty-state \"Recent Searches\" heading text reads exactly `Recent Searches` with `text-xs font-semibold text-ink-muted uppercase tracking-wider` styling",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-025 Empty-state "Recent Searches" heading text reads exactly `Recent Searches` with `text-xs font-semibold text-ink-muted uppercase tracking-wider` styling');
    }


    // This test validates: Empty-state "Recent Searches" heading text reads exactly `Recent Searches` with `text-xs font-semibold text-ink-muted uppercase tracking-wider` styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Empty-state Recently Saved heading text reads exactly Recently Saved', async ({ page }) => {
    // Checkpoint 26: Empty-state "Recently Saved" heading text reads exactly `Recently Saved`
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Empty-state \"Recently Saved\" heading text reads exactly `Recently Saved`",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-026 Empty-state "Recently Saved" heading text reads exactly `Recently Saved`');
    }


    // This test validates: Empty-state "Recently Saved" heading text reads exactly `Recently Saved`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Empty-state Try searching for heading text reads exactly Try searching for', async ({ page }) => {
    // Checkpoint 27: Empty-state "Try searching for" heading text reads exactly `Try searching for`
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Empty-state \"Try searching for\" heading text reads exactly `Try searching for`",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-027 Empty-state "Try searching for" heading text reads exactly `Try searching for`');
    }


    // This test validates: Empty-state "Try searching for" heading text reads exactly `Try searching for`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Empty-state Recent Searches heading is prefixed with a ClockCounterClockwise ico', async ({ page }) => {
    // Checkpoint 28: Empty-state "Recent Searches" heading is prefixed with a `ClockCounterClockwise` icon (size 14)
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Empty-state \"Recent Searches\" heading is prefixed with a `ClockCounterClockwise` icon (size 14)",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-028 Empty-state "Recent Searches" heading is prefixed with a `ClockCounterClockwise` icon (size 14)');
    }


    // This test validates: Empty-state "Recent Searches" heading is prefixed with a `ClockCounterClockwise` icon (size 14)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Empty-state Recently Saved heading is prefixed with a BookmarkSimple icon size 1', async ({ page }) => {
    // Checkpoint 29: Empty-state "Recently Saved" heading is prefixed with a `BookmarkSimple` icon (size 14)
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Empty-state \"Recently Saved\" heading is prefixed with a `BookmarkSimple` icon (size 14)",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-029 Empty-state "Recently Saved" heading is prefixed with a `BookmarkSimple` icon (size 14)');
    }


    // This test validates: Empty-state "Recently Saved" heading is prefixed with a `BookmarkSimple` icon (size 14)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Empty-state Try searching for heading is prefixed with a Lightbulb icon size 14', async ({ page }) => {
    // Checkpoint 30: Empty-state "Try searching for" heading is prefixed with a `Lightbulb` icon (size 14)
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Empty-state \"Try searching for\" heading is prefixed with a `Lightbulb` icon (size 14)",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-030 Empty-state "Try searching for" heading is prefixed with a `Lightbulb` icon (size 14)');
    }


    // This test validates: Empty-state "Try searching for" heading is prefixed with a `Lightbulb` icon (size 14)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Recently saved papers are rendered in a 2-column grid layout grid grid-cols-2 ga', async ({ page }) => {
    // Checkpoint 31: Recently saved papers are rendered in a 2-column grid layout (`grid grid-cols-2 gap-3`)
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Recently saved papers are rendered in a 2-column grid layout (`grid grid-cols-2 gap-3`)",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-031 Recently saved papers are rendered in a 2-column grid layout (`grid grid-cols-2 gap-3`)');
    }


    // This test validates: Recently saved papers are rendered in a 2-column grid layout (`grid grid-cols-2 gap-3`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Recently saved paper titles are clamped to 2 lines via line-clamp-2', async ({ page }) => {
    // Checkpoint 32: Recently saved paper titles are clamped to 2 lines via `line-clamp-2`
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Recently saved paper titles are clamped to 2 lines via `line-clamp-2`",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-032 Recently saved paper titles are clamped to 2 lines via `line-clamp-2`');
    }


    // This test validates: Recently saved paper titles are clamped to 2 lines via `line-clamp-2`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Recently saved journal and year are joined with separator with falsy values filt', async ({ page }) => {
    // Checkpoint 33: Recently saved journal and year are joined with `" · "` separator, with falsy values filtered out via `filter(Boolean)` before joining
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Recently saved journal and year are joined with `\" · \"` separator, with falsy values filtered out via `filter(Boolean)` before joining",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-033 Recently saved journal and year are joined with `" · "` separator, with falsy values filtered out via `filter(Boolean)` before joining');
    }


    // This test validates: Recently saved journal and year are joined with `" · "` separator, with falsy values filtered out via `filter(Boolean)` before joining
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Recent search rows show a MagnifyingGlass icon size 14 on the left of each query', async ({ page }) => {
    // Checkpoint 34: Recent search rows show a `MagnifyingGlass` icon (size 14) on the left of each query text
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Recent search rows show a `MagnifyingGlass` icon (size 14) on the left of each query text",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-034 Recent search rows show a `MagnifyingGlass` icon (size 14) on the left of each query text');
    }


    // This test validates: Recent search rows show a `MagnifyingGlass` icon (size 14) on the left of each query text
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
