/**
 * Auto-generated Playwright test for analysis/spec-003
 * Source: e2e/specs/analysis/spec-003.md
 * Generated: 2026-03-14T20:39:40.041Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts analysis spec-003
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';










import { assertAnalysisCheckpoint } from '../../module-assertions/analysis';









test.describe('analysis / spec-003', () => {
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

  test('cp-000: Unauthenticated 401 API route returns 401 with error Not authenticated routets44', async ({ page }) => {
    // Checkpoint 0: Unauthenticated (401) — API route returns 401 with `{ error: "Not authenticated" }` (route.ts:44-49); page reads `data.error` on `!res.ok` (page.tsx:170-175) and displays inline under textarea (page.tsx:359-361)
    // Section: Error Handling & Edge Cases > API Errors

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Unauthenticated (401) — API route returns 401 with `{ error: \"Not authenticated\" }` (route.ts:44-49); page reads `data.error` on `!res.ok` (page.tsx:170-175) and displays inline under textarea (page.tsx:359-361)",
      section: "Error Handling & Edge Cases",
      subsection: "API Errors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-000 Unauthenticated (401) — API route returns 401 with `{ error: "Not authenticated" }` (route.ts:44-49); page reads `data.error` on `!res.ok` (page.tsx:170-175) and displays inline under textarea (page.tsx:359-361)');
    }


    // This test validates: Unauthenticated (401) — API route returns 401 with `{ error: "Not authenticated" }` (route.ts:44-49); page reads `data.error` on `!res.ok` (page.tsx:170-175) and displays inline under textarea (page.tsx:359-361)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Rate limited 429 checkRateLimit returns 429 with error Rate limit exceeded Pleas', async ({ page }) => {
    // Checkpoint 1: Rate limited (429) — `checkRateLimit` returns 429 with `{ error: "Rate limit exceeded. Please try again later." }` (rate-limit.ts:77-83); page error handler surfaces this message via the same `!res.ok` path
    // Section: Error Handling & Edge Cases > API Errors

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Rate limited (429) — `checkRateLimit` returns 429 with `{ error: \"Rate limit exceeded. Please try again later.\" }` (rate-limit.ts:77-83); page error handler surfaces this message via the same `!res.ok` path",
      section: "Error Handling & Edge Cases",
      subsection: "API Errors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-001 Rate limited (429) — `checkRateLimit` returns 429 with `{ error: "Rate limit exceeded. Please try again later." }` (rate-limit.ts:77-83); page error handler surfaces this message via the same `!res.ok` path');
    }


    // This test validates: Rate limited (429) — `checkRateLimit` returns 429 with `{ error: "Rate limit exceeded. Please try again later." }` (rate-limit.ts:77-83); page error handler surfaces this message via the same `!res.ok` path
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Server error 500 outer catch in API route returns 500 with error Failed to analy', async ({ page }) => {
    // Checkpoint 2: Server error (500) — outer catch in API route returns 500 with `{ error: "Failed to analyze text" }` (route.ts:156-161); page displays the generic error message inline
    // Section: Error Handling & Edge Cases > API Errors

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Server error (500) — outer catch in API route returns 500 with `{ error: \"Failed to analyze text\" }` (route.ts:156-161); page displays the generic error message inline",
      section: "Error Handling & Edge Cases",
      subsection: "API Errors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-002 Server error (500) — outer catch in API route returns 500 with `{ error: "Failed to analyze text" }` (route.ts:156-161); page displays the generic error message inline');
    }


    // This test validates: Server error (500) — outer catch in API route returns 500 with `{ error: "Failed to analyze text" }` (route.ts:156-161); page displays the generic error message inline
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Network failure page catch block pagetsx204-205 sets error to Failed to connect ', async ({ page }) => {
    // Checkpoint 3: Network failure — page catch block (page.tsx:204-205) sets error to "Failed to connect. Check your API key." which is displayed as inline red text; user can retry by clicking "Analyze Writing" again
    // Section: Error Handling & Edge Cases > API Errors

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Network failure — page catch block (page.tsx:204-205) sets error to \"Failed to connect. Check your API key.\" which is displayed as inline red text; user can retry by clicking \"Analyze Writing\" again",
      section: "Error Handling & Edge Cases",
      subsection: "API Errors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-003 Network failure — page catch block (page.tsx:204-205) sets error to "Failed to connect. Check your API key." which is displayed as inline red text; user can retry by clicking "Analyze Writing" again');
    }


    // This test validates: Network failure — page catch block (page.tsx:204-205) sets error to "Failed to connect. Check your API key." which is displayed as inline red text; user can retry by clicking "Analyze Writing" again
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Free tier API integrityindexts38-39 gates plagiarism and citation engines behind', async ({ page }) => {
    // Checkpoint 4: Free tier API — integrity/index.ts:38-39 gates plagiarism and citation engines behind `isPaid` flag; free-tier users get AI detection only (`runPlagiarism = isPaid && …`, `runCitations = isPaid && …`)
    // Section: Error Handling & Edge Cases > Plan Restrictions

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Free tier API — integrity/index.ts:38-39 gates plagiarism and citation engines behind `isPaid` flag; free-tier users get AI detection only (`runPlagiarism = isPaid && …`, `runCitations = isPaid && …`)",
      section: "Error Handling & Edge Cases",
      subsection: "Plan Restrictions",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-004 Free tier API — integrity/index.ts:38-39 gates plagiarism and citation engines behind `isPaid` flag; free-tier users get AI detection only (`runPlagiarism = isPaid && …`, `runCitations = isPaid && …`)');
    }


    // This test validates: Free tier API — integrity/index.ts:38-39 gates plagiarism and citation engines behind `isPaid` flag; free-tier users get AI detection only (`runPlagiarism = isPaid && …`, `runCitations = isPaid && …`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Current analysis UI no upgrade prompt locked-state card or tier-related UI exist', async ({ page }) => {
    // Checkpoint 5: Current `/analysis` UI — no upgrade prompt, locked-state card, or tier-related UI exists in page.tsx; all users see the same interface regardless of plan
    // Section: Error Handling & Edge Cases > Plan Restrictions

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Current `/analysis` UI — no upgrade prompt, locked-state card, or tier-related UI exists in page.tsx; all users see the same interface regardless of plan",
      section: "Error Handling & Edge Cases",
      subsection: "Plan Restrictions",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-005 Current `/analysis` UI — no upgrade prompt, locked-state card, or tier-related UI exists in page.tsx; all users see the same interface regardless of plan');
    }


    // This test validates: Current `/analysis` UI — no upgrade prompt, locked-state card, or tier-related UI exists in page.tsx; all users see the same interface regardless of plan
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: No projects project selector only renders when projectslength 0 pagetsx292 when ', async ({ page }) => {
    // Checkpoint 6: No projects — project selector only renders when `projects.length > 0` (page.tsx:292); when empty, `getActiveDocumentForAnalysis(null)` returns null, showing FileText illustration with "No document found. Write something in the Studio first, or switch to paste mode." guidance
    // Section: Error Handling & Edge Cases > Document Mode Edge Cases

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "No projects — project selector only renders when `projects.length > 0` (page.tsx:292); when empty, `getActiveDocumentForAnalysis(null)` returns null, showing FileText illustration with \"No document found. Write something in the Studio first, or switch to paste mode.\" guidance",
      section: "Error Handling & Edge Cases",
      subsection: "Document Mode Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-006 No projects — project selector only renders when `projects.length > 0` (page.tsx:292); when empty, `getActiveDocumentForAnalysis(null)` returns null, showing FileText illustration with "No document found. Write something in the Studio first, or switch to paste mode." guidance');
    }


    // This test validates: No projects — project selector only renders when `projects.length > 0` (page.tsx:292); when empty, `getActiveDocumentForAnalysis(null)` returns null, showing FileText illustration with "No document found. Write something in the Studio first, or switch to paste mode." guidance
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Empty document when document has no text content getActiveDocumentForAnalysis re', async ({ page }) => {
    // Checkpoint 7: Empty document — when document has no text content, `getActiveDocumentForAnalysis` returns null (analysis.ts:89 `!plainText.trim()`); UI shows FileText empty state illustration rather than a blank textarea, which effectively prevents analysis of empty documents; analyze button is not rendered in this state
    // Section: Error Handling & Edge Cases > Document Mode Edge Cases

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Empty document — when document has no text content, `getActiveDocumentForAnalysis` returns null (analysis.ts:89 `!plainText.trim()`); UI shows FileText empty state illustration rather than a blank textarea, which effectively prevents analysis of empty documents; analyze button is not rendered in this state",
      section: "Error Handling & Edge Cases",
      subsection: "Document Mode Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-007 Empty document — when document has no text content, `getActiveDocumentForAnalysis` returns null (analysis.ts:89 `!plainText.trim()`); UI shows FileText empty state illustration rather than a blank textarea, which effectively prevents analysis of empty documents; analyze button is not rendered in this state');
    }


    // This test validates: Empty document — when document has no text content, `getActiveDocumentForAnalysis` returns null (analysis.ts:89 `!plainText.trim()`); UI shows FileText empty state illustration rather than a blank textarea, which effectively prevents analysis of empty documents; analyze button is not rendered in this state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Project fetch failure fixed catch now sets error Could not load projects Switchi', async ({ page }) => {
    // Checkpoint 8: Project fetch failure — fixed: `.catch()` now sets error "Could not load projects. Switching to paste mode." and auto-switches to paste mode (page.tsx:92-96); previously error was silently swallowed
    // Section: Error Handling & Edge Cases > Document Mode Edge Cases

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Project fetch failure — fixed: `.catch()` now sets error \"Could not load projects. Switching to paste mode.\" and auto-switches to paste mode (page.tsx:92-96); previously error was silently swallowed",
      section: "Error Handling & Edge Cases",
      subsection: "Document Mode Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-008 Project fetch failure — fixed: `.catch()` now sets error "Could not load projects. Switching to paste mode." and auto-switches to paste mode (page.tsx:92-96); previously error was silently swallowed');
    }


    // This test validates: Project fetch failure — fixed: `.catch()` now sets error "Could not load projects. Switching to paste mode." and auto-switches to paste mode (page.tsx:92-96); previously error was silently swallowed
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: First available project is auto-selected on initial page load in document mode p', async ({ page }) => {
    // Checkpoint 9: First available project is auto-selected on initial page load in document mode — page.tsx:88-89: `if (p.length > 0 && !selectedProjectId) setSelectedProjectId(p[0].id)` assigns the first project ID on mount
    // Section: Quick Test Workflows > Document Workflow

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "First available project is auto-selected on initial page load in document mode — page.tsx:88-89: `if (p.length > 0 && !selectedProjectId) setSelectedProjectId(p[0].id)` assigns the first project ID on mount",
      section: "Quick Test Workflows",
      subsection: "Document Workflow",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-009 First available project is auto-selected on initial page load in document mode — page.tsx:88-89: `if (p.length > 0 && !selectedProjectId) setSelectedProjectId(p[0].id)` assigns the first project ID on mount');
    }


    // This test validates: First available project is auto-selected on initial page load in document mode — page.tsx:88-89: `if (p.length > 0 && !selectedProjectId) setSelectedProjectId(p[0].id)` assigns the first project ID on mount
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Active document title is shown inline beside the project selector after a docume', async ({ page }) => {
    // Checkpoint 10: Active document title is shown inline beside the project selector after a document loads — page.tsx:325-329: `{activeDoc && (<span>Document: <span className="text-ink font-medium">{activeDoc.documentTitle}</span></span>)}`
    // Section: Quick Test Workflows > Document Workflow

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Active document title is shown inline beside the project selector after a document loads — page.tsx:325-329: `{activeDoc && (<span>Document: <span className=\"text-ink font-medium\">{activeDoc.documentTitle}</span></span>)}`",
      section: "Quick Test Workflows",
      subsection: "Document Workflow",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-010 Active document title is shown inline beside the project selector after a document loads — page.tsx:325-329: `{activeDoc && (<span>Document: <span className="text-ink font-medium">{activeDoc.documentTitle}</span></span>)}`');
    }


    // This test validates: Active document title is shown inline beside the project selector after a document loads — page.tsx:325-329: `{activeDoc && (<span>Document: <span className="text-ink font-medium">{activeDoc.documentTitle}</span></span>)}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Document-mode textarea is read-only while showing the loaded project document te', async ({ page }) => {
    // Checkpoint 11: Document-mode textarea is read-only while showing the loaded project document text — page.tsx:357: `readOnly={sourceMode === "document"}`
    // Section: Quick Test Workflows > Document Workflow

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Document-mode textarea is read-only while showing the loaded project document text — page.tsx:357: `readOnly={sourceMode === \"document\"}`",
      section: "Quick Test Workflows",
      subsection: "Document Workflow",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-011 Document-mode textarea is read-only while showing the loaded project document text — page.tsx:357: `readOnly={sourceMode === "document"}`');
    }


    // This test validates: Document-mode textarea is read-only while showing the loaded project document text — page.tsx:357: `readOnly={sourceMode === "document"}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Clicking outside the project dropdown closes the project menu pagetsx73-81 useEf', async ({ page }) => {
    // Checkpoint 12: Clicking outside the project dropdown closes the project menu — page.tsx:73-81: useEffect registers mousedown handler on `document`, checks click target against `projectDropdownRef`, calls `setProjectDropdownOpen(false)`
    // Section: Quick Test Workflows > Document Workflow

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Clicking outside the project dropdown closes the project menu — page.tsx:73-81: useEffect registers mousedown handler on `document`, checks click target against `projectDropdownRef`, calls `setProjectDropdownOpen(false)`",
      section: "Quick Test Workflows",
      subsection: "Document Workflow",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-012 Clicking outside the project dropdown closes the project menu — page.tsx:73-81: useEffect registers mousedown handler on `document`, checks click target against `projectDropdownRef`, calls `setProjectDropdownOpen(false)`');
    }


    // This test validates: Clicking outside the project dropdown closes the project menu — page.tsx:73-81: useEffect registers mousedown handler on `document`, checks click target against `projectDropdownRef`, calls `setProjectDropdownOpen(false)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Empty document state shows a FileText illustration with guidance to write in Stu', async ({ page }) => {
    // Checkpoint 13: Empty document state shows a FileText illustration with guidance to write in Studio first or switch to paste mode — page.tsx:340-345: `<FileText size={32}>` + "No document found. Write something in the Studio first, or switch to paste mode."
    // Section: Quick Test Workflows > Document Workflow

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Empty document state shows a FileText illustration with guidance to write in Studio first or switch to paste mode — page.tsx:340-345: `<FileText size={32}>` + \"No document found. Write something in the Studio first, or switch to paste mode.\"",
      section: "Quick Test Workflows",
      subsection: "Document Workflow",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-013 Empty document state shows a FileText illustration with guidance to write in Studio first or switch to paste mode — page.tsx:340-345: `<FileText size={32}>` + "No document found. Write something in the Studio first, or switch to paste mode."');
    }


    // This test validates: Empty document state shows a FileText illustration with guidance to write in Studio first or switch to paste mode — page.tsx:340-345: `<FileText size={32}>` + "No document found. Write something in the Studio first, or switch to paste mode."
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Manual submission with fewer than 50 characters shows the inline message Please ', async ({ page }) => {
    // Checkpoint 14: Manual submission with fewer than 50 characters shows the inline message "Please enter at least 50 characters of text to analyze." — page.tsx:153-155: guard checks `inputText.trim().length < 50` and calls `setError("Please enter at least 50 characters of text to analyze.")`
    // Section: Quick Test Workflows > Validation and Inline Errors

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Manual submission with fewer than 50 characters shows the inline message \"Please enter at least 50 characters of text to analyze.\" — page.tsx:153-155: guard checks `inputText.trim().length < 50` and calls `setError(\"Please enter at least 50 characters of text to analyze.\")`",
      section: "Quick Test Workflows",
      subsection: "Validation and Inline Errors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-014 Manual submission with fewer than 50 characters shows the inline message "Please enter at least 50 characters of text to analyze." — page.tsx:153-155: guard checks `inputText.trim().length < 50` and calls `setError("Please enter at least 50 characters of text to analyze.")`');
    }


    // This test validates: Manual submission with fewer than 50 characters shows the inline message "Please enter at least 50 characters of text to analyze." — page.tsx:153-155: guard checks `inputText.trim().length < 50` and calls `setError("Please enter at least 50 characters of text to analyze.")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: API validation failures surface the returned inline error text under the textare', async ({ page }) => {
    // Checkpoint 15: API validation failures surface the returned inline error text under the textarea (for example, "Invalid request") — API route returns `{ error: "Invalid request" }` on zod validation failure (route.ts:72-78); page reads `data.error` (page.tsx:175)
    // Section: Quick Test Workflows > Validation and Inline Errors

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "API validation failures surface the returned inline error text under the textarea (for example, \"Invalid request\") — API route returns `{ error: \"Invalid request\" }` on zod validation failure (route.ts:72-78); page reads `data.error` (page.tsx:175)",
      section: "Quick Test Workflows",
      subsection: "Validation and Inline Errors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-015 API validation failures surface the returned inline error text under the textarea (for example, "Invalid request") — API route returns `{ error: "Invalid request" }` on zod validation failure (route.ts:72-78); page reads `data.error` (page.tsx:175)');
    }


    // This test validates: API validation failures surface the returned inline error text under the textarea (for example, "Invalid request") — API route returns `{ error: "Invalid request" }` on zod validation failure (route.ts:72-78); page reads `data.error` (page.tsx:175)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Network failures surface the inline message Failed to connect Check your API key', async ({ page }) => {
    // Checkpoint 16: Network failures surface the inline message "Failed to connect. Check your API key." — page.tsx:204-205: catch block sets `setError("Failed to connect. Check your API key.")`
    // Section: Quick Test Workflows > Validation and Inline Errors

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Network failures surface the inline message \"Failed to connect. Check your API key.\" — page.tsx:204-205: catch block sets `setError(\"Failed to connect. Check your API key.\")`",
      section: "Quick Test Workflows",
      subsection: "Validation and Inline Errors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-016 Network failures surface the inline message "Failed to connect. Check your API key." — page.tsx:204-205: catch block sets `setError("Failed to connect. Check your API key.")`');
    }


    // This test validates: Network failures surface the inline message "Failed to connect. Check your API key." — page.tsx:204-205: catch block sets `setError("Failed to connect. Check your API key.")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Instant writing analysis appears after a 500ms debounce once text is present pag', async ({ page }) => {
    // Checkpoint 17: Instant writing analysis appears after a 500ms debounce once text is present — page.tsx:130: `setTimeout(() => { … }, 500)` triggers `analyzeWriting(inputText)` after debounce
    // Section: Quick Test Workflows > Instant Metrics Panel

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Instant writing analysis appears after a 500ms debounce once text is present — page.tsx:130: `setTimeout(() => { … }, 500)` triggers `analyzeWriting(inputText)` after debounce",
      section: "Quick Test Workflows",
      subsection: "Instant Metrics Panel",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-017 Instant writing analysis appears after a 500ms debounce once text is present — page.tsx:130: `setTimeout(() => { … }, 500)` triggers `analyzeWriting(inputText)` after debounce');
    }


    // This test validates: Instant writing analysis appears after a 500ms debounce once text is present — page.tsx:130: `setTimeout(() => { … }, 500)` triggers `analyzeWriting(inputText)` after debounce
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Instant readability badge uses the local analysis labels from the live UI Easy S', async ({ page }) => {
    // Checkpoint 18: Instant readability badge uses the local analysis labels from the live UI (`Easy`, `Standard`, `Difficult`, `Very Difficult`) — writing-analysis.ts:133-138: `getReadabilityLabel` returns exactly these four labels; page.tsx:388 renders `clientMetrics.readabilityLabel` in CircularGauge
    // Section: Quick Test Workflows > Instant Metrics Panel

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Instant readability badge uses the local analysis labels from the live UI (`Easy`, `Standard`, `Difficult`, `Very Difficult`) — writing-analysis.ts:133-138: `getReadabilityLabel` returns exactly these four labels; page.tsx:388 renders `clientMetrics.readabilityLabel` in CircularGauge",
      section: "Quick Test Workflows",
      subsection: "Instant Metrics Panel",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-018 Instant readability badge uses the local analysis labels from the live UI (`Easy`, `Standard`, `Difficult`, `Very Difficult`) — writing-analysis.ts:133-138: `getReadabilityLabel` returns exactly these four labels; page.tsx:388 renders `clientMetrics.readabilityLabel` in CircularGauge');
    }


    // This test validates: Instant readability badge uses the local analysis labels from the live UI (`Easy`, `Standard`, `Difficult`, `Very Difficult`) — writing-analysis.ts:133-138: `getReadabilityLabel` returns exactly these four labels; page.tsx:388 renders `clientMetrics.readabilityLabel` in CircularGauge
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Client issue summaries show a N more issues footer when more than 10 issues are ', async ({ page }) => {
    // Checkpoint 19: Client issue summaries show a `+N more issues` footer when more than 10 issues are detected — page.tsx:455-466: renders first 10 issues via `clientIssues.slice(0, 10)`, then `{clientIssues.length > 10 && (<p>+{clientIssues.length - 10} more issues</p>)}`
    // Section: Quick Test Workflows > Instant Metrics Panel

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Client issue summaries show a `+N more issues` footer when more than 10 issues are detected — page.tsx:455-466: renders first 10 issues via `clientIssues.slice(0, 10)`, then `{clientIssues.length > 10 && (<p>+{clientIssues.length - 10} more issues</p>)}`",
      section: "Quick Test Workflows",
      subsection: "Instant Metrics Panel",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-019 Client issue summaries show a `+N more issues` footer when more than 10 issues are detected — page.tsx:455-466: renders first 10 issues via `clientIssues.slice(0, 10)`, then `{clientIssues.length > 10 && (<p>+{clientIssues.length - 10} more issues</p>)}`');
    }


    // This test validates: Client issue summaries show a `+N more issues` footer when more than 10 issues are detected — page.tsx:455-466: renders first 10 issues via `clientIssues.slice(0, 10)`, then `{clientIssues.length > 10 && (<p>+{clientIssues.length - 10} more issues</p>)}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Results mode keeps the word sentence and paragraph summary cards above the right', async ({ page }) => {
    // Checkpoint 20: Results mode keeps the word, sentence, and paragraph summary cards above the right-side tabs — page.tsx:532-547: word/sentence/paragraph grid renders before `<Tabs>` at line 549
    // Section: Quick Test Workflows > Results Mode

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results mode keeps the word, sentence, and paragraph summary cards above the right-side tabs — page.tsx:532-547: word/sentence/paragraph grid renders before `<Tabs>` at line 549",
      section: "Quick Test Workflows",
      subsection: "Results Mode",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-020 Results mode keeps the word, sentence, and paragraph summary cards above the right-side tabs — page.tsx:532-547: word/sentence/paragraph grid renders before `<Tabs>` at line 549');
    }


    // This test validates: Results mode keeps the word, sentence, and paragraph summary cards above the right-side tabs — page.tsx:532-547: word/sentence/paragraph grid renders before `<Tabs>` at line 549
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Analyze New Text resets the result view clears stored paragraphs and returns the', async ({ page }) => {
    // Checkpoint 21: "Analyze New Text" resets the result view, clears stored paragraphs, and returns the right-side panel to the Issues tab — page.tsx:482-486: `onClick={() => { setResult(null); setParagraphs([]); setActiveTab("issues"); }}`
    // Section: Quick Test Workflows > Results Mode

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "\"Analyze New Text\" resets the result view, clears stored paragraphs, and returns the right-side panel to the Issues tab — page.tsx:482-486: `onClick={() => { setResult(null); setParagraphs([]); setActiveTab(\"issues\"); }}`",
      section: "Quick Test Workflows",
      subsection: "Results Mode",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-021 "Analyze New Text" resets the result view, clears stored paragraphs, and returns the right-side panel to the Issues tab — page.tsx:482-486: `onClick={() => { setResult(null); setParagraphs([]); setActiveTab("issues"); }}`');
    }


    // This test validates: "Analyze New Text" resets the result view, clears stored paragraphs, and returns the right-side panel to the Issues tab — page.tsx:482-486: `onClick={() => { setResult(null); setParagraphs([]); setActiveTab("issues"); }}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Issues tab shows a positive empty state message when no AI suggestions are retur', async ({ page }) => {
    // Checkpoint 22: Issues tab shows a positive empty state message when no AI suggestions are returned: "No issues detected. Your writing looks great!" — page.tsx:554-557: conditional renders this exact string when `suggestions.length === 0`
    // Section: Quick Test Workflows > Results Mode

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Issues tab shows a positive empty state message when no AI suggestions are returned: \"No issues detected. Your writing looks great!\" — page.tsx:554-557: conditional renders this exact string when `suggestions.length === 0`",
      section: "Quick Test Workflows",
      subsection: "Results Mode",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-022 Issues tab shows a positive empty state message when no AI suggestions are returned: "No issues detected. Your writing looks great!" — page.tsx:554-557: conditional renders this exact string when `suggestions.length === 0`');
    }


    // This test validates: Issues tab shows a positive empty state message when no AI suggestions are returned: "No issues detected. Your writing looks great!" — page.tsx:554-557: conditional renders this exact string when `suggestions.length === 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Local issue cards in results mode are grouped under a dedicated Writing Issues w', async ({ page }) => {
    // Checkpoint 23: Local issue cards in results mode are grouped under a dedicated "Writing Issues (write-good)" section beneath AI suggestions — page.tsx:573-579: `{clientIssues.length > 0 && (<><p>Writing Issues (write-good)</p>…</>)}` renders after AI suggestion cards
    // Section: Quick Test Workflows > Results Mode

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Local issue cards in results mode are grouped under a dedicated \"Writing Issues (write-good)\" section beneath AI suggestions — page.tsx:573-579: `{clientIssues.length > 0 && (<><p>Writing Issues (write-good)</p>…</>)}` renders after AI suggestion cards",
      section: "Quick Test Workflows",
      subsection: "Results Mode",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-023 Local issue cards in results mode are grouped under a dedicated "Writing Issues (write-good)" section beneath AI suggestions — page.tsx:573-579: `{clientIssues.length > 0 && (<><p>Writing Issues (write-good)</p>…</>)}` renders after AI suggestion cards');
    }


    // This test validates: Local issue cards in results mode are grouped under a dedicated "Writing Issues (write-good)" section beneath AI suggestions — page.tsx:573-579: `{clientIssues.length > 0 && (<><p>Writing Issues (write-good)</p>…</>)}` renders after AI suggestion cards
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Results-mode write-good issues show a N more issues footer when more than 15 iss', async ({ page }) => {
    // Checkpoint 24: Results-mode write-good issues show a `+N more issues` footer when more than 15 issues are available — page.tsx:611-614: `{clientIssues.length > 15 && (<p>+{clientIssues.length - 15} more issues</p>)}`
    // Section: Quick Test Workflows > Results Mode

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results-mode write-good issues show a `+N more issues` footer when more than 15 issues are available — page.tsx:611-614: `{clientIssues.length > 15 && (<p>+{clientIssues.length - 15} more issues</p>)}`",
      section: "Quick Test Workflows",
      subsection: "Results Mode",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-024 Results-mode write-good issues show a `+N more issues` footer when more than 15 issues are available — page.tsx:611-614: `{clientIssues.length > 15 && (<p>+{clientIssues.length - 15} more issues</p>)}`');
    }


    // This test validates: Results-mode write-good issues show a `+N more issues` footer when more than 15 issues are available — page.tsx:611-614: `{clientIssues.length > 15 && (<p>+{clientIssues.length - 15} more issues</p>)}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Paragraph Breakdown in Detailed Metrics renders only when paragraph-level AI ana', async ({ page }) => {
    // Checkpoint 25: Paragraph Breakdown in Detailed Metrics renders only when paragraph-level AI analysis entries are returned — page.tsx:757: `{result.paragraphAnalysis.length > 0 && (<div>…<h4>Paragraph Breakdown</h4>…</div>)}`
    // Section: Quick Test Workflows > Results Mode

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Paragraph Breakdown in Detailed Metrics renders only when paragraph-level AI analysis entries are returned — page.tsx:757: `{result.paragraphAnalysis.length > 0 && (<div>…<h4>Paragraph Breakdown</h4>…</div>)}`",
      section: "Quick Test Workflows",
      subsection: "Results Mode",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-025 Paragraph Breakdown in Detailed Metrics renders only when paragraph-level AI analysis entries are returned — page.tsx:757: `{result.paragraphAnalysis.length > 0 && (<div>…<h4>Paragraph Breakdown</h4>…</div>)}`');
    }


    // This test validates: Paragraph Breakdown in Detailed Metrics renders only when paragraph-level AI analysis entries are returned — page.tsx:757: `{result.paragraphAnalysis.length > 0 && (<div>…<h4>Paragraph Breakdown</h4>…</div>)}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: The page-local AnalysisResult type expects top-level humanScore aiScore paragrap', async ({ page }) => {
    // Checkpoint 26: The page-local `AnalysisResult` type expects top-level `humanScore`, `aiScore`, `paragraphAnalysis`, and `plagiarismIndicators` — page.tsx:29-41: interface defines these as top-level fields
    // Section: Quick Test Workflows > Integration Risks

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "The page-local `AnalysisResult` type expects top-level `humanScore`, `aiScore`, `paragraphAnalysis`, and `plagiarismIndicators` — page.tsx:29-41: interface defines these as top-level fields",
      section: "Quick Test Workflows",
      subsection: "Integration Risks",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-026 The page-local `AnalysisResult` type expects top-level `humanScore`, `aiScore`, `paragraphAnalysis`, and `plagiarismIndicators` — page.tsx:29-41: interface defines these as top-level fields');
    }


    // This test validates: The page-local `AnalysisResult` type expects top-level `humanScore`, `aiScore`, `paragraphAnalysis`, and `plagiarismIndicators` — page.tsx:29-41: interface defines these as top-level fields
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: POST apiintegrity-check returns those values under nested aiDetection and plagia', async ({ page }) => {
    // Checkpoint 27: `POST /api/integrity-check` returns those values under nested `aiDetection` and `plagiarism` objects instead — API returns `IntegrityCheckResult` (types.ts:145-165) with nested `aiDetection.humanScore`, `aiDetection.paragraphs`, `plagiarism.matches`
    // Section: Quick Test Workflows > Integration Risks

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`POST /api/integrity-check` returns those values under nested `aiDetection` and `plagiarism` objects instead — API returns `IntegrityCheckResult` (types.ts:145-165) with nested `aiDetection.humanScore`, `aiDetection.paragraphs`, `plagiarism.matches`",
      section: "Quick Test Workflows",
      subsection: "Integration Risks",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-027 `POST /api/integrity-check` returns those values under nested `aiDetection` and `plagiarism` objects instead — API returns `IntegrityCheckResult` (types.ts:145-165) with nested `aiDetection.humanScore`, `aiDetection.paragraphs`, `plagiarism.matches`');
    }


    // This test validates: `POST /api/integrity-check` returns those values under nested `aiDetection` and `plagiarism` objects instead — API returns `IntegrityCheckResult` (types.ts:145-165) with nested `aiDetection.humanScore`, `aiDetection.paragraphs`, `plagiarism.matches`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Result-mode AI detection paragraph breakdown and plagiarism indicator views are ', async ({ page }) => {
    // Checkpoint 28: Result-mode AI detection, paragraph breakdown, and plagiarism indicator views are therefore out of contract until the page normalizes the API payload — page.tsx:183-205 NOW normalizes the payload: maps `data.aiDetection.humanScore` → `humanScore`, `data.aiDetection.paragraphs` → `paragraphAnalysis`, `data.plagiarism.matches` → `plagiarismIndicators`; contract mismatch is resolved
    // Section: Quick Test Workflows > Integration Risks

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Result-mode AI detection, paragraph breakdown, and plagiarism indicator views are therefore out of contract until the page normalizes the API payload — page.tsx:183-205 NOW normalizes the payload: maps `data.aiDetection.humanScore` → `humanScore`, `data.aiDetection.paragraphs` → `paragraphAnalysis`, `data.plagiarism.matches` → `plagiarismIndicators`; contract mismatch is resolved",
      section: "Quick Test Workflows",
      subsection: "Integration Risks",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-028 Result-mode AI detection, paragraph breakdown, and plagiarism indicator views are therefore out of contract until the page normalizes the API payload — page.tsx:183-205 NOW normalizes the payload: maps `data.aiDetection.humanScore` → `humanScore`, `data.aiDetection.paragraphs` → `paragraphAnalysis`, `data.plagiarism.matches` → `plagiarismIndicators`; contract mismatch is resolved');
    }


    // This test validates: Result-mode AI detection, paragraph breakdown, and plagiarism indicator views are therefore out of contract until the page normalizes the API payload — page.tsx:183-205 NOW normalizes the payload: maps `data.aiDetection.humanScore` → `humanScore`, `data.aiDetection.paragraphs` → `paragraphAnalysis`, `data.plagiarism.matches` → `plagiarismIndicators`; contract mismatch is resolved
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: sourceMode defaults to document on first render pagetsx47 useStateSourceModedocu', async ({ page }) => {
    // Checkpoint 29: `sourceMode` defaults to `document` on first render — page.tsx:47: `useState<SourceMode>("document")`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`sourceMode` defaults to `document` on first render — page.tsx:47: `useState<SourceMode>(\"document\")`",
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
      throw new Error('Unhandled analysis checkpoint: cp-029 `sourceMode` defaults to `document` on first render — page.tsx:47: `useState<SourceMode>("document")`');
    }


    // This test validates: `sourceMode` defaults to `document` on first render — page.tsx:47: `useState<SourceMode>("document")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: docLoading defaults to true before the first document fetch resolves pagetsx50 u', async ({ page }) => {
    // Checkpoint 30: `docLoading` defaults to `true` before the first document fetch resolves — page.tsx:50: `useState(true)`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`docLoading` defaults to `true` before the first document fetch resolves — page.tsx:50: `useState(true)`",
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
      throw new Error('Unhandled analysis checkpoint: cp-030 `docLoading` defaults to `true` before the first document fetch resolves — page.tsx:50: `useState(true)`');
    }


    // This test validates: `docLoading` defaults to `true` before the first document fetch resolves — page.tsx:50: `useState(true)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: result defaults to null so input mode is the first visible state pagetsx61 useSt', async ({ page }) => {
    // Checkpoint 31: `result` defaults to `null`, so input mode is the first visible state — page.tsx:61: `useState<AnalysisResult | null>(null)`; page.tsx:286: `{!result ? (/* Input Mode * /) : (/* Results Mode * /)}`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`result` defaults to `null`, so input mode is the first visible state — page.tsx:61: `useState<AnalysisResult | null>(null)`; page.tsx:286: `{!result ? (/* Input Mode */) : (/* Results Mode */)}`",
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
      throw new Error('Unhandled analysis checkpoint: cp-031 `result` defaults to `null`, so input mode is the first visible state — page.tsx:61: `useState<AnalysisResult | null>(null)`; page.tsx:286: `{!result ? (/* Input Mode */) : (/* Results Mode */)}`');
    }


    // This test validates: `result` defaults to `null`, so input mode is the first visible state — page.tsx:61: `useState<AnalysisResult | null>(null)`; page.tsx:286: `{!result ? (/* Input Mode * /) : (/* Results Mode * /)}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: activeTab defaults to issues before any result is shown pagetsx65 useStateissues', async ({ page }) => {
    // Checkpoint 32: `activeTab` defaults to `issues` before any result is shown — page.tsx:65: `useState("issues")`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`activeTab` defaults to `issues` before any result is shown — page.tsx:65: `useState(\"issues\")`",
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
      throw new Error('Unhandled analysis checkpoint: cp-032 `activeTab` defaults to `issues` before any result is shown — page.tsx:65: `useState("issues")`');
    }


    // This test validates: `activeTab` defaults to `issues` before any result is shown — page.tsx:65: `useState("issues")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: listProjectsForAnalysis runs on mount to populate the document dropdown pagetsx8', async ({ page }) => {
    // Checkpoint 33: `listProjectsForAnalysis()` runs on mount to populate the document dropdown — page.tsx:84-93: useEffect calls `listProjectsForAnalysis()` with `[selectedProjectId]` dependency, runs on mount when selectedProjectId is null
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`listProjectsForAnalysis()` runs on mount to populate the document dropdown — page.tsx:84-93: useEffect calls `listProjectsForAnalysis()` with `[selectedProjectId]` dependency, runs on mount when selectedProjectId is null",
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
      throw new Error('Unhandled analysis checkpoint: cp-033 `listProjectsForAnalysis()` runs on mount to populate the document dropdown — page.tsx:84-93: useEffect calls `listProjectsForAnalysis()` with `[selectedProjectId]` dependency, runs on mount when selectedProjectId is null');
    }


    // This test validates: `listProjectsForAnalysis()` runs on mount to populate the document dropdown — page.tsx:84-93: useEffect calls `listProjectsForAnalysis()` with `[selectedProjectId]` dependency, runs on mount when selectedProjectId is null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: The first returned project ID is auto-assigned to selectedProjectId when no proj', async ({ page }) => {
    // Checkpoint 34: The first returned project ID is auto-assigned to `selectedProjectId` when no project is already selected — page.tsx:88-89: `if (p.length > 0 && !selectedProjectId) { setSelectedProjectId(p[0].id); }`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "The first returned project ID is auto-assigned to `selectedProjectId` when no project is already selected — page.tsx:88-89: `if (p.length > 0 && !selectedProjectId) { setSelectedProjectId(p[0].id); }`",
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
      throw new Error('Unhandled analysis checkpoint: cp-034 The first returned project ID is auto-assigned to `selectedProjectId` when no project is already selected — page.tsx:88-89: `if (p.length > 0 && !selectedProjectId) { setSelectedProjectId(p[0].id); }`');
    }


    // This test validates: The first returned project ID is auto-assigned to `selectedProjectId` when no project is already selected — page.tsx:88-89: `if (p.length > 0 && !selectedProjectId) { setSelectedProjectId(p[0].id); }`
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
