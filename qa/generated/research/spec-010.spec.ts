/**
 * Auto-generated Playwright test for research/spec-010
 * Source: e2e/specs/research/spec-010.md
 * Generated: 2026-03-14T08:47:14.001Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-010
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-010', () => {
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

  test('cp-000: ClinicalTrials results always set journal to the sponsor organization name or Cl', async ({ page }) => {
    // Checkpoint 0: ClinicalTrials results always set `journal` to the sponsor organization name or `"ClinicalTrials.gov"` when no organization is present
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "ClinicalTrials results always set `journal` to the sponsor organization name or `\"ClinicalTrials.gov\"` when no organization is present",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-000 ClinicalTrials results always set `journal` to the sponsor organization name or `"ClinicalTrials.gov"` when no organization is present');
    }


    // This test validates: ClinicalTrials results always set `journal` to the sponsor organization name or `"ClinicalTrials.gov"` when no organization is present
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: ClinicalTrials results always set publicationTypes to clinical_trial_registratio', async ({ page }) => {
    // Checkpoint 1: ClinicalTrials results always set `publicationTypes` to `["clinical_trial_registration"]`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "ClinicalTrials results always set `publicationTypes` to `[\"clinical_trial_registration\"]`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-001 ClinicalTrials results always set `publicationTypes` to `["clinical_trial_registration"]`');
    }


    // This test validates: ClinicalTrials results always set `publicationTypes` to `["clinical_trial_registration"]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: ClinicalTrials results always set isOpenAccess to true', async ({ page }) => {
    // Checkpoint 2: ClinicalTrials results always set `isOpenAccess` to `true`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "ClinicalTrials results always set `isOpenAccess` to `true`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-002 ClinicalTrials results always set `isOpenAccess` to `true`');
    }


    // This test validates: ClinicalTrials results always set `isOpenAccess` to `true`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: ClinicalTrials result abstracts concatenate brief summary Phase and Status with ', async ({ page }) => {
    // Checkpoint 3: ClinicalTrials result abstracts concatenate brief summary, `Phase: ...`, and `Status: ...` with ` | ` separators when those pieces exist
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "ClinicalTrials result abstracts concatenate brief summary, `Phase: ...`, and `Status: ...` with ` | ` separators when those pieces exist",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-003 ClinicalTrials result abstracts concatenate brief summary, `Phase: ...`, and `Status: ...` with ` | ` separators when those pieces exist');
    }


    // This test validates: ClinicalTrials result abstracts concatenate brief summary, `Phase: ...`, and `Status: ...` with ` | ` separators when those pieces exist
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Similar-paper recommendation fallback runs a Semantic Scholar title search only ', async ({ page }) => {
    // Checkpoint 4: Similar-paper recommendation fallback runs a Semantic Scholar title search only when the direct recommendation API returns zero papers and the caller provided `paperTitle`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Similar-paper recommendation fallback runs a Semantic Scholar title search only when the direct recommendation API returns zero papers and the caller provided `paperTitle`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-004 Similar-paper recommendation fallback runs a Semantic Scholar title search only when the direct recommendation API returns zero papers and the caller provided `paperTitle`');
    }


    // This test validates: Similar-paper recommendation fallback runs a Semantic Scholar title search only when the direct recommendation API returns zero papers and the caller provided `paperTitle`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Similar-paper title-search fallback excludes the original paper ID before slicin', async ({ page }) => {
    // Checkpoint 5: Similar-paper title-search fallback excludes the original paper ID before slicing the result list back to the requested limit
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Similar-paper title-search fallback excludes the original paper ID before slicing the result list back to the requested limit",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-005 Similar-paper title-search fallback excludes the original paper ID before slicing the result list back to the requested limit');
    }


    // This test validates: Similar-paper title-search fallback excludes the original paper ID before slicing the result list back to the requested limit
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Copilot submit uses a normal form submit path so pressing Enter in the copilot t', async ({ page }) => {
    // Checkpoint 6: Copilot submit uses a normal `<form>` submit path, so pressing `Enter` in the copilot text input triggers `handleChatSubmit(...)`
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot submit uses a normal `<form>` submit path, so pressing `Enter` in the copilot text input triggers `handleChatSubmit(...)`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-006 Copilot submit uses a normal `<form>` submit path, so pressing `Enter` in the copilot text input triggers `handleChatSubmit(...)`');
    }


    // This test validates: Copilot submit uses a normal `<form>` submit path, so pressing `Enter` in the copilot text input triggers `handleChatSubmit(...)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Copilot submit does not support multi-line drafting because the input is a singl', async ({ page }) => {
    // Checkpoint 7: Copilot submit does not support multi-line drafting because the input is a single-line `<input type="text">`
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot submit does not support multi-line drafting because the input is a single-line `<input type=\"text\">`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-007 Copilot submit does not support multi-line drafting because the input is a single-line `<input type="text">`');
    }


    // This test validates: Copilot submit does not support multi-line drafting because the input is a single-line `<input type="text">`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Copilot submit trims whitespace with chatInputtrim before deciding whether the r', async ({ page }) => {
    // Checkpoint 8: Copilot submit trims whitespace with `chatInput.trim()` before deciding whether the request is allowed
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot submit trims whitespace with `chatInput.trim()` before deciding whether the request is allowed",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-008 Copilot submit trims whitespace with `chatInput.trim()` before deciding whether the request is allowed');
    }


    // This test validates: Copilot submit trims whitespace with `chatInput.trim()` before deciding whether the request is allowed
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Copilot submit returns early without calling sendMessage when chatLoading is alr', async ({ page }) => {
    // Checkpoint 9: Copilot submit returns early without calling `sendMessage(...)` when `chatLoading` is already true
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot submit returns early without calling `sendMessage(...)` when `chatLoading` is already true",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-009 Copilot submit returns early without calling `sendMessage(...)` when `chatLoading` is already true');
    }


    // This test validates: Copilot submit returns early without calling `sendMessage(...)` when `chatLoading` is already true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: chatLoading is true for both chatStatus submitted and chatStatus streaming', async ({ page }) => {
    // Checkpoint 10: `chatLoading` is true for both `chatStatus === "submitted"` and `chatStatus === "streaming"`
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`chatLoading` is true for both `chatStatus === \"submitted\"` and `chatStatus === \"streaming\"`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-010 `chatLoading` is true for both `chatStatus === "submitted"` and `chatStatus === "streaming"`');
    }


    // This test validates: `chatLoading` is true for both `chatStatus === "submitted"` and `chatStatus === "streaming"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: The research page clears the copilot input immediately after calling sendMessage', async ({ page }) => {
    // Checkpoint 11: The `/research` page clears the copilot input immediately after calling `sendMessage({ text: chatInput })`
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The `/research` page clears the copilot input immediately after calling `sendMessage({ text: chatInput })`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-011 The `/research` page clears the copilot input immediately after calling `sendMessage({ text: chatInput })`');
    }


    // This test validates: The `/research` page clears the copilot input immediately after calling `sendMessage({ text: chatInput })`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: The research page does not persist copilot messages in sessionStorage', async ({ page }) => {
    // Checkpoint 12: The `/research` page does not persist copilot messages in `sessionStorage`
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The `/research` page does not persist copilot messages in `sessionStorage`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-012 The `/research` page does not persist copilot messages in `sessionStorage`');
    }


    // This test validates: The `/research` page does not persist copilot messages in `sessionStorage`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: The research page does not persist showCopilot openclosed state across refresh', async ({ page }) => {
    // Checkpoint 13: The `/research` page does not persist `showCopilot` open/closed state across refresh
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The `/research` page does not persist `showCopilot` open/closed state across refresh",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-013 The `/research` page does not persist `showCopilot` open/closed state across refresh');
    }


    // This test validates: The `/research` page does not persist `showCopilot` open/closed state across refresh
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: The research page does not pass the current search results filters or saved-pape', async ({ page }) => {
    // Checkpoint 14: The `/research` page does not pass the current search results, filters, or saved-paper IDs into `useChat(...)` as extra agent context
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The `/research` page does not pass the current search results, filters, or saved-paper IDs into `useChat(...)` as extra agent context",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-014 The `/research` page does not pass the current search results, filters, or saved-paper IDs into `useChat(...)` as extra agent context');
    }


    // This test validates: The `/research` page does not pass the current search results, filters, or saved-paper IDs into `useChat(...)` as extra agent context
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Copilot message rendering ignores any non-text msgparts emitted by the AI SDK an', async ({ page }) => {
    // Checkpoint 15: Copilot message rendering ignores any non-text `msg.parts` emitted by the AI SDK and drops messages whose concatenated text content is empty
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot message rendering ignores any non-text `msg.parts` emitted by the AI SDK and drops messages whose concatenated text content is empty",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-015 Copilot message rendering ignores any non-text `msg.parts` emitted by the AI SDK and drops messages whose concatenated text content is empty');
    }


    // This test validates: Copilot message rendering ignores any non-text `msg.parts` emitted by the AI SDK and drops messages whose concatenated text content is empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: The current copilot panel has no useEffect auto-scroll-to-bottom behavior for ne', async ({ page }) => {
    // Checkpoint 16: The current copilot panel has no `useEffect` auto-scroll-to-bottom behavior for new messages
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The current copilot panel has no `useEffect` auto-scroll-to-bottom behavior for new messages",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-016 The current copilot panel has no `useEffect` auto-scroll-to-bottom behavior for new messages');
    }


    // This test validates: The current copilot panel has no `useEffect` auto-scroll-to-bottom behavior for new messages
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Research-agent requests are validated against a schema that allows between 1 and', async ({ page }) => {
    // Checkpoint 17: Research-agent requests are validated against a schema that allows between `1` and `50` messages
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Research-agent requests are validated against a schema that allows between `1` and `50` messages",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-017 Research-agent requests are validated against a schema that allows between `1` and `50` messages');
    }


    // This test validates: Research-agent requests are validated against a schema that allows between `1` and `50` messages
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Research-agent request schema caps each message content string at 50000 characte', async ({ page }) => {
    // Checkpoint 18: Research-agent request schema caps each message `content` string at `50000` characters
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Research-agent request schema caps each message `content` string at `50000` characters",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-018 Research-agent request schema caps each message `content` string at `50000` characters');
    }


    // This test validates: Research-agent request schema caps each message `content` string at `50000` characters
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Research-agent schema optionally accepts contextsavedPaperIds but the current re', async ({ page }) => {
    // Checkpoint 19: Research-agent schema optionally accepts `context.savedPaperIds`, but the current `/research` page never sends that context field
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Research-agent schema optionally accepts `context.savedPaperIds`, but the current `/research` page never sends that context field",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-019 Research-agent schema optionally accepts `context.savedPaperIds`, but the current `/research` page never sends that context field');
    }


    // This test validates: Research-agent schema optionally accepts `context.savedPaperIds`, but the current `/research` page never sends that context field
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: When contextsavedPaperIdslength 0 the research-agent system prompt appends The u', async ({ page }) => {
    // Checkpoint 20: When `context.savedPaperIds.length > 0`, the research-agent system prompt appends `The user has {N} papers saved in their library.`
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "When `context.savedPaperIds.length > 0`, the research-agent system prompt appends `The user has {N} papers saved in their library.`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-020 When `context.savedPaperIds.length > 0`, the research-agent system prompt appends `The user has {N} papers saved in their library.`');
    }


    // This test validates: When `context.savedPaperIds.length > 0`, the research-agent system prompt appends `The user has {N} papers saved in their library.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Research-agent streaming stops automatically when stepCountIs12 is reached', async ({ page }) => {
    // Checkpoint 21: Research-agent streaming stops automatically when `stepCountIs(12)` is reached
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Research-agent streaming stops automatically when `stepCountIs(12)` is reached",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-021 Research-agent streaming stops automatically when `stepCountIs(12)` is reached');
    }


    // This test validates: Research-agent streaming stops automatically when `stepCountIs(12)` is reached
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Invalid research-agent request bodies return HTTP 400 with Invalid request Messa', async ({ page }) => {
    // Checkpoint 22: Invalid research-agent request bodies return HTTP 400 with `Invalid request. Messages are required.`
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Invalid research-agent request bodies return HTTP 400 with `Invalid request. Messages are required.`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-022 Invalid research-agent request bodies return HTTP 400 with `Invalid request. Messages are required.`');
    }


    // This test validates: Invalid research-agent request bodies return HTTP 400 with `Invalid request. Messages are required.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Unhandled research-agent failures return HTTP 500 with Research agent failed', async ({ page }) => {
    // Checkpoint 23: Unhandled research-agent failures return HTTP 500 with `Research agent failed`
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unhandled research-agent failures return HTTP 500 with `Research agent failed`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-023 Unhandled research-agent failures return HTTP 500 with `Research agent failed`');
    }


    // This test validates: Unhandled research-agent failures return HTTP 500 with `Research agent failed`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: searchPubMed tool responses are truncated to the first maxResults items even if ', async ({ page }) => {
    // Checkpoint 24: `searchPubMed` tool responses are truncated to the first `maxResults` items even if the underlying adapter returned more
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`searchPubMed` tool responses are truncated to the first `maxResults` items even if the underlying adapter returned more",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-024 `searchPubMed` tool responses are truncated to the first `maxResults` items even if the underlying adapter returned more');
    }


    // This test validates: `searchPubMed` tool responses are truncated to the first `maxResults` items even if the underlying adapter returned more
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: searchPubMed tool trims each returned author list to the first 3 authors', async ({ page }) => {
    // Checkpoint 25: `searchPubMed` tool trims each returned author list to the first 3 authors
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`searchPubMed` tool trims each returned author list to the first 3 authors",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-025 `searchPubMed` tool trims each returned author list to the first 3 authors');
    }


    // This test validates: `searchPubMed` tool trims each returned author list to the first 3 authors
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: searchPubMed tool trims each returned abstract to the first 300 characters', async ({ page }) => {
    // Checkpoint 26: `searchPubMed` tool trims each returned abstract to the first 300 characters
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`searchPubMed` tool trims each returned abstract to the first 300 characters",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-026 `searchPubMed` tool trims each returned abstract to the first 300 characters');
    }


    // This test validates: `searchPubMed` tool trims each returned abstract to the first 300 characters
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: searchSemanticScholar tool includes citationCount tldr studyType and evidenceLev', async ({ page }) => {
    // Checkpoint 27: `searchSemanticScholar` tool includes `citationCount`, `tldr`, `studyType`, and `evidenceLevel` in each tool result
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`searchSemanticScholar` tool includes `citationCount`, `tldr`, `studyType`, and `evidenceLevel` in each tool result",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-027 `searchSemanticScholar` tool includes `citationCount`, `tldr`, `studyType`, and `evidenceLevel` in each tool result');
    }


    // This test validates: `searchSemanticScholar` tool includes `citationCount`, `tldr`, `studyType`, and `evidenceLevel` in each tool result
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: searchOpenAlex tool includes isOpenAccess and at most 5 concept strings in each ', async ({ page }) => {
    // Checkpoint 28: `searchOpenAlex` tool includes `isOpenAccess` and at most 5 concept strings in each tool result
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`searchOpenAlex` tool includes `isOpenAccess` and at most 5 concept strings in each tool result",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-028 `searchOpenAlex` tool includes `isOpenAccess` and at most 5 concept strings in each tool result');
    }


    // This test validates: `searchOpenAlex` tool includes `isOpenAccess` and at most 5 concept strings in each tool result
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: getPaperDetails checks Semantic Scholar by raw s2Id first by DOIdoi second and b', async ({ page }) => {
    // Checkpoint 29: `getPaperDetails` checks Semantic Scholar by raw `s2Id` first, by `DOI:{doi}` second, and by `PMID:{pmid}` third
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getPaperDetails` checks Semantic Scholar by raw `s2Id` first, by `DOI:{doi}` second, and by `PMID:{pmid}` third",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-029 `getPaperDetails` checks Semantic Scholar by raw `s2Id` first, by `DOI:{doi}` second, and by `PMID:{pmid}` third');
    }


    // This test validates: `getPaperDetails` checks Semantic Scholar by raw `s2Id` first, by `DOI:{doi}` second, and by `PMID:{pmid}` third
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: getPaperDetails falls back to searchPubMedpmid maxResults 1 only when Semantic S', async ({ page }) => {
    // Checkpoint 30: `getPaperDetails` falls back to `searchPubMed(pmid, { maxResults: 1 })` only when Semantic Scholar lookup by PMID returns no paper
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getPaperDetails` falls back to `searchPubMed(pmid, { maxResults: 1 })` only when Semantic Scholar lookup by PMID returns no paper",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-030 `getPaperDetails` falls back to `searchPubMed(pmid, { maxResults: 1 })` only when Semantic Scholar lookup by PMID returns no paper');
    }


    // This test validates: `getPaperDetails` falls back to `searchPubMed(pmid, { maxResults: 1 })` only when Semantic Scholar lookup by PMID returns no paper
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: getPaperDetails returns error Provide at least one identifier when called with n', async ({ page }) => {
    // Checkpoint 31: `getPaperDetails` returns `{ error: "Provide at least one identifier" }` when called with no DOI, PMID, or S2 ID
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getPaperDetails` returns `{ error: \"Provide at least one identifier\" }` when called with no DOI, PMID, or S2 ID",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-031 `getPaperDetails` returns `{ error: "Provide at least one identifier" }` when called with no DOI, PMID, or S2 ID');
    }


    // This test validates: `getPaperDetails` returns `{ error: "Provide at least one identifier" }` when called with no DOI, PMID, or S2 ID
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: findSimilarPapers tool only returns title first 3 authors year journal doi s2Id ', async ({ page }) => {
    // Checkpoint 32: `findSimilarPapers` tool only returns title, first 3 authors, year, journal, doi, s2Id, citationCount, and tldr for each recommended paper
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`findSimilarPapers` tool only returns title, first 3 authors, year, journal, doi, s2Id, citationCount, and tldr for each recommended paper",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-032 `findSimilarPapers` tool only returns title, first 3 authors, year, journal, doi, s2Id, citationCount, and tldr for each recommended paper');
    }


    // This test validates: `findSimilarPapers` tool only returns title, first 3 authors, year, journal, doi, s2Id, citationCount, and tldr for each recommended paper
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: savePaperToLibrary tool requires a source string and returns only success true p', async ({ page }) => {
    // Checkpoint 33: `savePaperToLibrary` tool requires a `source` string and returns only `{ success: true, paperId }` on success
    // Section: Quick Test Workflows > Copilot Panel And Research-Agent Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`savePaperToLibrary` tool requires a `source` string and returns only `{ success: true, paperId }` on success",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel And Research-Agent Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-033 `savePaperToLibrary` tool requires a `source` string and returns only `{ success: true, paperId }` on success');
    }


    // This test validates: `savePaperToLibrary` tool requires a `source` string and returns only `{ success: true, paperId }` on success
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: AI synthesis fingerprint uses the exact format querytop5 titles joined by', async ({ page }) => {
    // Checkpoint 34: AI synthesis fingerprint uses the exact format `{query}::{top5 titles joined by |}`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis fingerprint uses the exact format `{query}::{top5 titles joined by |}`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-034 AI synthesis fingerprint uses the exact format `{query}::{top5 titles joined by |}`');
    }


    // This test validates: AI synthesis fingerprint uses the exact format `{query}::{top5 titles joined by |}`
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
