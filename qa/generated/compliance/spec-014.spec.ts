/**
 * Auto-generated Playwright test for compliance/spec-014
 * Source: e2e/specs/compliance/spec-014.md
 * Generated: 2026-03-15T18:38:41.877Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts compliance spec-014
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';









import { assertComplianceCheckpoint } from '../../module-assertions/compliance';










test.describe('compliance / spec-014', () => {
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

  test('cp-000: Copyleaks results action without scanId returns 400 with scanId is required for ', async ({ page }) => {
    // Checkpoint 0: Copyleaks `results` action without `scanId` returns 400 with `"scanId is required for results action"`
    // Section: Quick Test Workflows > API Route — `/api/copyleaks` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Copyleaks `results` action without `scanId` returns 400 with `\"scanId is required for results action\"`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/copyleaks` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-000 ' + "Copyleaks `results` action without `scanId` returns 400 with `\"scanId is required for results action\"`");
    }


    // This test validates: Copyleaks `results` action without `scanId` returns 400 with `"scanId is required for results action"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Copyleaks text field validated as zstringmin50max50000optional required only for', async ({ page }) => {
    // Checkpoint 1: Copyleaks `text` field validated as `z.string().min(50).max(50000).optional()` — required only for `scan` action at the application level
    // Section: Quick Test Workflows > API Route — `/api/copyleaks` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Copyleaks `text` field validated as `z.string().min(50).max(50000).optional()` — required only for `scan` action at the application level",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/copyleaks` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-001 ' + "Copyleaks `text` field validated as `z.string().min(50).max(50000).optional()` — required only for `scan` action at the application level");
    }


    // This test validates: Copyleaks `text` field validated as `z.string().min(50).max(50000).optional()` — required only for `scan` action at the application level
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Copyleaks 500 error body error Copyleaks request failed', async ({ page }) => {
    // Checkpoint 2: Copyleaks 500 error body: `{ error: "Copyleaks request failed" }`
    // Section: Quick Test Workflows > API Route — `/api/copyleaks` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Copyleaks 500 error body: `{ error: \"Copyleaks request failed\" }`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/copyleaks` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-002 ' + "Copyleaks 500 error body: `{ error: \"Copyleaks request failed\" }`");
    }


    // This test validates: Copyleaks 500 error body: `{ error: "Copyleaks request failed" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: PAID_PLANS defined as new Setbasic pro institutional free plan is the only non-p', async ({ page }) => {
    // Checkpoint 3: `PAID_PLANS` defined as `new Set(["basic", "pro", "institutional"])` — `"free"` plan is the only non-paid plan
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`PAID_PLANS` defined as `new Set([\"basic\", \"pro\", \"institutional\"])` — `\"free\"` plan is the only non-paid plan",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-003 ' + "`PAID_PLANS` defined as `new Set([\"basic\", \"pro\", \"institutional\"])` — `\"free\"` plan is the only non-paid plan");
    }


    // This test validates: `PAID_PLANS` defined as `new Set(["basic", "pro", "institutional"])` — `"free"` plan is the only non-paid plan
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Self-plagiarism runs for any authenticated user regardless of plan gated only by', async ({ page }) => {
    // Checkpoint 4: Self-plagiarism runs for any authenticated user regardless of plan, gated only by `!!input.userId` (not plan-based)
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Self-plagiarism runs for any authenticated user regardless of plan, gated only by `!!input.userId` (not plan-based)",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-004 ' + "Self-plagiarism runs for any authenticated user regardless of plan, gated only by `!!input.userId` (not plan-based)");
    }


    // This test validates: Self-plagiarism runs for any authenticated user regardless of plan, gated only by `!!input.userId` (not plan-based)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Mode routing ai_detection AI detection only plagiarism plagiarism paid self-plag', async ({ page }) => {
    // Checkpoint 5: Mode routing: `"ai_detection"` → AI detection only; `"plagiarism"` → plagiarism (paid) + self-plag (any user); `"citation_audit"` → citation audit (paid only); `"full"` → all applicable engines
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Mode routing: `\"ai_detection\"` → AI detection only; `\"plagiarism\"` → plagiarism (paid) + self-plag (any user); `\"citation_audit\"` → citation audit (paid only); `\"full\"` → all applicable engines",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-005 ' + "Mode routing: `\"ai_detection\"` → AI detection only; `\"plagiarism\"` → plagiarism (paid) + self-plag (any user); `\"citation_audit\"` → citation audit (paid only); `\"full\"` → all applicable engines");
    }


    // This test validates: Mode routing: `"ai_detection"` → AI detection only; `"plagiarism"` → plagiarism (paid) + self-plag (any user); `"citation_audit"` → citation audit (paid only); `"full"` → all applicable engines
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: writingQualitypassiveVoiceCount is computed from stats as MathroundpassiveVoiceP', async ({ page }) => {
    // Checkpoint 6: `writingQuality.passiveVoiceCount` is computed from stats as `Math.round((passiveVoicePercent / 100) * (text.split(/[.!?]+/).length - 1))`
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`writingQuality.passiveVoiceCount` is computed from stats as `Math.round((passiveVoicePercent / 100) * (text.split(/[.!?]+/).length - 1))`",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-006 ' + "`writingQuality.passiveVoiceCount` is computed from stats as `Math.round((passiveVoicePercent / 100) * (text.split(/[.!?]+/).length - 1))`");
    }


    // This test validates: `writingQuality.passiveVoiceCount` is computed from stats as `Math.round((passiveVoicePercent / 100) * (text.split(/[.!?]+/).length - 1))`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: writingQualityaverageSentenceLength is directly aistatsavgSentenceLength not rec', async ({ page }) => {
    // Checkpoint 7: `writingQuality.averageSentenceLength` is directly `ai.stats.avgSentenceLength` (not recomputed)
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`writingQuality.averageSentenceLength` is directly `ai.stats.avgSentenceLength` (not recomputed)",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-007 ' + "`writingQuality.averageSentenceLength` is directly `ai.stats.avgSentenceLength` (not recomputed)");
    }


    // This test validates: `writingQuality.averageSentenceLength` is directly `ai.stats.avgSentenceLength` (not recomputed)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: writingQualityreadabilityGrade is directly aistatsreadabilityGrade not recompute', async ({ page }) => {
    // Checkpoint 8: `writingQuality.readabilityGrade` is directly `ai.stats.readabilityGrade` (not recomputed)
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`writingQuality.readabilityGrade` is directly `ai.stats.readabilityGrade` (not recomputed)",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-008 ' + "`writingQuality.readabilityGrade` is directly `ai.stats.readabilityGrade` (not recomputed)");
    }


    // This test validates: `writingQuality.readabilityGrade` is directly `ai.stats.readabilityGrade` (not recomputed)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: checkedAt is generated server-side as new DatetoISOString not passed from the cl', async ({ page }) => {
    // Checkpoint 9: `checkedAt` is generated server-side as `new Date().toISOString()`, not passed from the client
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`checkedAt` is generated server-side as `new Date().toISOString()`, not passed from the client",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-009 ' + "`checkedAt` is generated server-side as `new Date().toISOString()`, not passed from the client");
    }


    // This test validates: `checkedAt` is generated server-side as `new Date().toISOString()`, not passed from the client
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Default AI result when AI detection is skipped has all 10 stats fields zeroed an', async ({ page }) => {
    // Checkpoint 10: Default AI result (when AI detection is skipped) has all 10 stats fields zeroed and engine set to `"llm-heuristic"`
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Default AI result (when AI detection is skipped) has all 10 stats fields zeroed and engine set to `\"llm-heuristic\"`",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-010 ' + "Default AI result (when AI detection is skipped) has all 10 stats fields zeroed and engine set to `\"llm-heuristic\"`");
    }


    // This test validates: Default AI result (when AI detection is skipped) has all 10 stats fields zeroed and engine set to `"llm-heuristic"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Exact writing suggestion for avgSentenceLength 28 Your average sentence length i', async ({ page }) => {
    // Checkpoint 11: Exact writing suggestion for `avgSentenceLength > 28`: `"Your average sentence length is high. Consider breaking long sentences for readability."`
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Exact writing suggestion for `avgSentenceLength > 28`: `\"Your average sentence length is high. Consider breaking long sentences for readability.\"`",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-011 ' + "Exact writing suggestion for `avgSentenceLength > 28`: `\"Your average sentence length is high. Consider breaking long sentences for readability.\"`");
    }


    // This test validates: Exact writing suggestion for `avgSentenceLength > 28`: `"Your average sentence length is high. Consider breaking long sentences for readability."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Exact suggestion for sentenceLengthStdDev 3 Your sentence lengths are very unifo', async ({ page }) => {
    // Checkpoint 12: Exact suggestion for `sentenceLengthStdDev < 3`: `"Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure."`
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Exact suggestion for `sentenceLengthStdDev < 3`: `\"Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure.\"`",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-012 ' + "Exact suggestion for `sentenceLengthStdDev < 3`: `\"Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure.\"`");
    }


    // This test validates: Exact suggestion for `sentenceLengthStdDev < 3`: `"Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Exact suggestion for passiveVoicePercent 30 N of sentences use passive voice Con', async ({ page }) => {
    // Checkpoint 13: Exact suggestion for `passiveVoicePercent > 30`: `"{N}% of sentences use passive voice. Consider using more active voice."` where `{N}` is `Math.round(passiveVoicePercent)`
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Exact suggestion for `passiveVoicePercent > 30`: `\"{N}% of sentences use passive voice. Consider using more active voice.\"` where `{N}` is `Math.round(passiveVoicePercent)`",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-013 ' + "Exact suggestion for `passiveVoicePercent > 30`: `\"{N}% of sentences use passive voice. Consider using more active voice.\"` where `{N}` is `Math.round(passiveVoicePercent)`");
    }


    // This test validates: Exact suggestion for `passiveVoicePercent > 30`: `"{N}% of sentences use passive voice. Consider using more active voice."` where `{N}` is `Math.round(passiveVoicePercent)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Exact suggestion for typeTokenRatio 035 typeTokenRatio 0 Vocabulary diversity is', async ({ page }) => {
    // Checkpoint 14: Exact suggestion for `typeTokenRatio < 0.35 && typeTokenRatio > 0`: `"Vocabulary diversity is low. Use more varied word choices to strengthen your writing."` — note: `typeTokenRatio === 0` does NOT trigger the suggestion
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Exact suggestion for `typeTokenRatio < 0.35 && typeTokenRatio > 0`: `\"Vocabulary diversity is low. Use more varied word choices to strengthen your writing.\"` — note: `typeTokenRatio === 0` does NOT trigger the suggestion",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-014 ' + "Exact suggestion for `typeTokenRatio < 0.35 && typeTokenRatio > 0`: `\"Vocabulary diversity is low. Use more varied word choices to strengthen your writing.\"` — note: `typeTokenRatio === 0` does NOT trigger the suggestion");
    }


    // This test validates: Exact suggestion for `typeTokenRatio < 0.35 && typeTokenRatio > 0`: `"Vocabulary diversity is low. Use more varied word choices to strengthen your writing."` — note: `typeTokenRatio === 0` does NOT trigger the suggestion
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Exact suggestion for hedgingPhraseCount 5 Found N hedging phrases eg It is impor', async ({ page }) => {
    // Checkpoint 15: Exact suggestion for `hedgingPhraseCount > 5`: `"Found {N} hedging phrases (e.g. "It is important to note"). These are common in AI-generated text — consider being more direct."`
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Exact suggestion for `hedgingPhraseCount > 5`: `\"Found {N} hedging phrases (e.g. \"It is important to note\"). These are common in AI-generated text — consider being more direct.\"`",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-015 ' + "Exact suggestion for `hedgingPhraseCount > 5`: `\"Found {N} hedging phrases (e.g. \"It is important to note\"). These are common in AI-generated text — consider being more direct.\"`");
    }


    // This test validates: Exact suggestion for `hedgingPhraseCount > 5`: `"Found {N} hedging phrases (e.g. "It is important to note"). These are common in AI-generated text — consider being more direct."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Exact suggestion for readabilityGrade 16 Readability grade is above 16 postgradu', async ({ page }) => {
    // Checkpoint 16: Exact suggestion for `readabilityGrade > 16`: `"Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility."`
    // Section: Quick Test Workflows > Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Exact suggestion for `readabilityGrade > 16`: `\"Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility.\"`",
      section: "Quick Test Workflows",
      subsection: "Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-016 ' + "Exact suggestion for `readabilityGrade > 16`: `\"Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility.\"`");
    }


    // This test validates: Exact suggestion for `readabilityGrade > 16`: `"Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: renderSentenceLevel sorts sentences by startOffset ascending before iterating', async ({ page }) => {
    // Checkpoint 17: `renderSentenceLevel` sorts sentences by `startOffset` (ascending) before iterating
    // Section: Quick Test Workflows > DiffView Component — Additional Details (`src/components/integrity/DiffView.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`renderSentenceLevel` sorts sentences by `startOffset` (ascending) before iterating",
      section: "Quick Test Workflows",
      subsection: "DiffView Component — Additional Details (`src/components/integrity/DiffView.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-017 ' + "`renderSentenceLevel` sorts sentences by `startOffset` (ascending) before iterating");
    }


    // This test validates: `renderSentenceLevel` sorts sentences by `startOffset` (ascending) before iterating
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Gaps before the first sentence are rendered as plain span keygap-cursor elements', async ({ page }) => {
    // Checkpoint 18: Gaps before the first sentence are rendered as plain `<span key={`gap-${cursor}`}>` elements
    // Section: Quick Test Workflows > DiffView Component — Additional Details (`src/components/integrity/DiffView.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Gaps before the first sentence are rendered as plain `<span key={`gap-${cursor}`}>` elements",
      section: "Quick Test Workflows",
      subsection: "DiffView Component — Additional Details (`src/components/integrity/DiffView.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-018 ' + "Gaps before the first sentence are rendered as plain `<span key={`gap-${cursor}`}>` elements");
    }


    // This test validates: Gaps before the first sentence are rendered as plain `<span key={`gap-${cursor}`}>` elements
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Trailing text after the last sentence is rendered as span keytail-cursor', async ({ page }) => {
    // Checkpoint 19: Trailing text after the last sentence is rendered as `<span key={`tail-${cursor}`}>`
    // Section: Quick Test Workflows > DiffView Component — Additional Details (`src/components/integrity/DiffView.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Trailing text after the last sentence is rendered as `<span key={`tail-${cursor}`}>`",
      section: "Quick Test Workflows",
      subsection: "DiffView Component — Additional Details (`src/components/integrity/DiffView.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-019 ' + "Trailing text after the last sentence is rendered as `<span key={`tail-${cursor}`}>`");
    }


    // This test validates: Trailing text after the last sentence is rendered as `<span key={`tail-${cursor}`}>`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Citation issue Warning icons have titleissuemessage attribute as tooltip text', async ({ page }) => {
    // Checkpoint 20: Citation issue Warning icons have `title={issue.message}` attribute as tooltip text
    // Section: Quick Test Workflows > DiffView Component — Additional Details (`src/components/integrity/DiffView.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Citation issue Warning icons have `title={issue.message}` attribute as tooltip text",
      section: "Quick Test Workflows",
      subsection: "DiffView Component — Additional Details (`src/components/integrity/DiffView.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-020 ' + "Citation issue Warning icons have `title={issue.message}` attribute as tooltip text");
    }


    // This test validates: Citation issue Warning icons have `title={issue.message}` attribute as tooltip text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: applyPlagiarismHighlights sorts ranges by start ascending before rendering overl', async ({ page }) => {
    // Checkpoint 21: `applyPlagiarismHighlights` sorts ranges by `.start` ascending before rendering; overlapping ranges are not merged
    // Section: Quick Test Workflows > DiffView Component — Additional Details (`src/components/integrity/DiffView.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`applyPlagiarismHighlights` sorts ranges by `.start` ascending before rendering; overlapping ranges are not merged",
      section: "Quick Test Workflows",
      subsection: "DiffView Component — Additional Details (`src/components/integrity/DiffView.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-021 ' + "`applyPlagiarismHighlights` sorts ranges by `.start` ascending before rendering; overlapping ranges are not merged");
    }


    // This test validates: `applyPlagiarismHighlights` sorts ranges by `.start` ascending before rendering; overlapping ranges are not merged
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: IntegrityPanel truncates editor text to 50000 chars before sending textslice0 50', async ({ page }) => {
    // Checkpoint 22: IntegrityPanel truncates editor text to 50000 chars before sending: `text.slice(0, 50000)`
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel truncates editor text to 50000 chars before sending: `text.slice(0, 50000)`",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-022 ' + "IntegrityPanel truncates editor text to 50000 chars before sending: `text.slice(0, 50000)`");
    }


    // This test validates: IntegrityPanel truncates editor text to 50000 chars before sending: `text.slice(0, 50000)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: IntegrityPanel error for short text exact message Document must have at least 50', async ({ page }) => {
    // Checkpoint 23: IntegrityPanel error for short text: exact message `"Document must have at least 50 characters to check."`
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel error for short text: exact message `\"Document must have at least 50 characters to check.\"`",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-023 ' + "IntegrityPanel error for short text: exact message `\"Document must have at least 50 characters to check.\"`");
    }


    // This test validates: IntegrityPanel error for short text: exact message `"Document must have at least 50 characters to check."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: IntegrityPanel idle description exact text Detect AI content check plagiarism ag', async ({ page }) => {
    // Checkpoint 24: IntegrityPanel idle description: exact text `"Detect AI content, check plagiarism against scholarly literature, and verify citations."`
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel idle description: exact text `\"Detect AI content, check plagiarism against scholarly literature, and verify citations.\"`",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-024 ' + "IntegrityPanel idle description: exact text `\"Detect AI content, check plagiarism against scholarly literature, and verify citations.\"`");
    }


    // This test validates: IntegrityPanel idle description: exact text `"Detect AI content, check plagiarism against scholarly literature, and verify citations."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: IntegrityPanel does NOT pass mode field in its API request body server defaults ', async ({ page }) => {
    // Checkpoint 25: IntegrityPanel does NOT pass `mode` field in its API request body — server defaults to `"full"`
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel does NOT pass `mode` field in its API request body — server defaults to `\"full\"`",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-025 ' + "IntegrityPanel does NOT pass `mode` field in its API request body — server defaults to `\"full\"`");
    }


    // This test validates: IntegrityPanel does NOT pass `mode` field in its API request body — server defaults to `"full"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: IntegrityPanel AI Detection section shows 4 StatCard components Avg Sentence avg', async ({ page }) => {
    // Checkpoint 26: IntegrityPanel AI Detection section shows 4 `StatCard` components: "Avg. Sentence" (`avgSentenceLength.toFixed(1) + " words"`), "Burstiness" (`sentenceLengthStdDev.toFixed(1)`), "Vocabulary" (`(typeTokenRatio * 100).toFixed(0) + "%"`), "Hedging Phrases" (count as string)
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel AI Detection section shows 4 `StatCard` components: \"Avg. Sentence\" (`avgSentenceLength.toFixed(1) + \" words\"`), \"Burstiness\" (`sentenceLengthStdDev.toFixed(1)`), \"Vocabulary\" (`(typeTokenRatio * 100).toFixed(0) + \"%\"`), \"Hedging Phrases\" (count as string)",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-026 ' + "IntegrityPanel AI Detection section shows 4 `StatCard` components: \"Avg. Sentence\" (`avgSentenceLength.toFixed(1) + \" words\"`), \"Burstiness\" (`sentenceLengthStdDev.toFixed(1)`), \"Vocabulary\" (`(typeTokenRatio * 100).toFixed(0) + \"%\"`), \"Hedging Phrases\" (count as string)");
    }


    // This test validates: IntegrityPanel AI Detection section shows 4 `StatCard` components: "Avg. Sentence" (`avgSentenceLength.toFixed(1) + " words"`), "Burstiness" (`sentenceLengthStdDev.toFixed(1)`), "Vocabulary" (`(typeTokenRatio * 100).toFixed(0) + "%"`), "Hedging Phrases" (count as string)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: IntegrityPanel Flagged Paragraphs section header is uppercase shows only paragra', async ({ page }) => {
    // Checkpoint 27: IntegrityPanel "Flagged Paragraphs" section header is uppercase, shows only paragraphs where `flags.length > 0`, truncated to first 5
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel \"Flagged Paragraphs\" section header is uppercase, shows only paragraphs where `flags.length > 0`, truncated to first 5",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-027 ' + "IntegrityPanel \"Flagged Paragraphs\" section header is uppercase, shows only paragraphs where `flags.length > 0`, truncated to first 5");
    }


    // This test validates: IntegrityPanel "Flagged Paragraphs" section header is uppercase, shows only paragraphs where `flags.length > 0`, truncated to first 5
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: IntegrityPanel flagged paragraph format paragraphIndex1 excerpt with humanProbab', async ({ page }) => {
    // Checkpoint 28: IntegrityPanel flagged paragraph format: `¶{paragraphIndex+1}: "{excerpt}"` with `humanProbability` color (>=70 emerald-500, >=40 amber-500, <40 red-400), each flag as bullet `• {flag}`, suggestion prefixed `→ {suggestion}`
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel flagged paragraph format: `¶{paragraphIndex+1}: \"{excerpt}\"` with `humanProbability` color (>=70 emerald-500, >=40 amber-500, <40 red-400), each flag as bullet `• {flag}`, suggestion prefixed `→ {suggestion}`",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-028 ' + "IntegrityPanel flagged paragraph format: `¶{paragraphIndex+1}: \"{excerpt}\"` with `humanProbability` color (>=70 emerald-500, >=40 amber-500, <40 red-400), each flag as bullet `• {flag}`, suggestion prefixed `→ {suggestion}`");
    }


    // This test validates: IntegrityPanel flagged paragraph format: `¶{paragraphIndex+1}: "{excerpt}"` with `humanProbability` color (>=70 emerald-500, >=40 amber-500, <40 red-400), each flag as bullet `• {flag}`, suggestion prefixed `→ {suggestion}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: IntegrityPanel plagiarism no-match message CheckCircle icon No significant match', async ({ page }) => {
    // Checkpoint 29: IntegrityPanel plagiarism no-match message: CheckCircle icon + `"No significant matches found"` (differs from main page's `"No plagiarism concerns detected across {N} sources."`)
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel plagiarism no-match message: CheckCircle icon + `\"No significant matches found\"` (differs from main page's `\"No plagiarism concerns detected across {N} sources.\"`)",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-029 ' + "IntegrityPanel plagiarism no-match message: CheckCircle icon + `\"No significant matches found\"` (differs from main page's `\"No plagiarism concerns detected across {N} sources.\"`)");
    }


    // This test validates: IntegrityPanel plagiarism no-match message: CheckCircle icon + `"No significant matches found"` (differs from main page's `"No plagiarism concerns detected across {N} sources."`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: IntegrityPanel plagiarism matches truncated to first 5 via slice0 5 main page sh', async ({ page }) => {
    // Checkpoint 30: IntegrityPanel plagiarism matches truncated to first 5 via `.slice(0, 5)` (main page shows all matches)
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel plagiarism matches truncated to first 5 via `.slice(0, 5)` (main page shows all matches)",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-030 ' + "IntegrityPanel plagiarism matches truncated to first 5 via `.slice(0, 5)` (main page shows all matches)");
    }


    // This test validates: IntegrityPanel plagiarism matches truncated to first 5 via `.slice(0, 5)` (main page shows all matches)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: IntegrityPanel plagiarism match shows LinkSimple icon 10px inline before source ', async ({ page }) => {
    // Checkpoint 31: IntegrityPanel plagiarism match shows `LinkSimple` icon (10px) inline before source title (main page does not)
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel plagiarism match shows `LinkSimple` icon (10px) inline before source title (main page does not)",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-031 ' + "IntegrityPanel plagiarism match shows `LinkSimple` icon (10px) inline before source title (main page does not)");
    }


    // This test validates: IntegrityPanel plagiarism match shows `LinkSimple` icon (10px) inline before source title (main page does not)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: IntegrityPanel Citation section uses severity-specific icons XCircle 12px red-40', async ({ page }) => {
    // Checkpoint 32: IntegrityPanel Citation section uses severity-specific icons: `XCircle` (12px, red-400) for errors, `Warning` (12px, amber-500) for warnings, `CheckCircle` (12px, blue-400) for info — differs from main page's colored dots
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel Citation section uses severity-specific icons: `XCircle` (12px, red-400) for errors, `Warning` (12px, amber-500) for warnings, `CheckCircle` (12px, blue-400) for info — differs from main page's colored dots",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-032 ' + "IntegrityPanel Citation section uses severity-specific icons: `XCircle` (12px, red-400) for errors, `Warning` (12px, amber-500) for warnings, `CheckCircle` (12px, blue-400) for info — differs from main page's colored dots");
    }


    // This test validates: IntegrityPanel Citation section uses severity-specific icons: `XCircle` (12px, red-400) for errors, `Warning` (12px, amber-500) for warnings, `CheckCircle` (12px, blue-400) for info — differs from main page's colored dots
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: IntegrityPanel shows Verified References subsection when verifiedReferenceslengt', async ({ page }) => {
    // Checkpoint 33: IntegrityPanel shows "Verified References" subsection when `verifiedReferences.length > 0`: up to 10 refs, each with `CheckCircle` (verified/emerald) or `XCircle` (not/red-400) + `[{index}] {title}` — this subsection does not exist on the main compliance page
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel shows \"Verified References\" subsection when `verifiedReferences.length > 0`: up to 10 refs, each with `CheckCircle` (verified/emerald) or `XCircle` (not/red-400) + `[{index}] {title}` — this subsection does not exist on the main compliance page",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-033 ' + "IntegrityPanel shows \"Verified References\" subsection when `verifiedReferences.length > 0`: up to 10 refs, each with `CheckCircle` (verified/emerald) or `XCircle` (not/red-400) + `[{index}] {title}` — this subsection does not exist on the main compliance page");
    }


    // This test validates: IntegrityPanel shows "Verified References" subsection when `verifiedReferences.length > 0`: up to 10 refs, each with `CheckCircle` (verified/emerald) or `XCircle` (not/red-400) + `[{index}] {title}` — this subsection does not exist on the main compliance page
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: IntegrityPanel Writing Quality labels differ from main page Readability not Read', async ({ page }) => {
    // Checkpoint 34: IntegrityPanel Writing Quality labels differ from main page: "Readability" (not "Readability Level"), "Avg Sentence" (not "Avg Words/Sentence"), "Passive Voice" shows `"{N} instances"` (main page shows just the count)
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel Writing Quality labels differ from main page: \"Readability\" (not \"Readability Level\"), \"Avg Sentence\" (not \"Avg Words/Sentence\"), \"Passive Voice\" shows `\"{N} instances\"` (main page shows just the count)",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-034 ' + "IntegrityPanel Writing Quality labels differ from main page: \"Readability\" (not \"Readability Level\"), \"Avg Sentence\" (not \"Avg Words/Sentence\"), \"Passive Voice\" shows `\"{N} instances\"` (main page shows just the count)");
    }


    // This test validates: IntegrityPanel Writing Quality labels differ from main page: "Readability" (not "Readability Level"), "Avg Sentence" (not "Avg Words/Sentence"), "Passive Voice" shows `"{N} instances"` (main page shows just the count)
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
