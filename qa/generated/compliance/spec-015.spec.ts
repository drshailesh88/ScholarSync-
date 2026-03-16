/**
 * Auto-generated Playwright test for compliance/spec-015
 * Source: e2e/specs/compliance/spec-015.md
 * Generated: 2026-03-16T02:43:35.577Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts compliance spec-015
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';









import { assertComplianceCheckpoint } from '../../module-assertions/compliance';










test.describe('compliance / spec-015', () => {
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

  test('cp-000: IntegrityPanel writing suggestions use Quotes icon 10px brand as bullet prefix i', async ({ page }) => {
    // Checkpoint 0: IntegrityPanel writing suggestions use `Quotes` icon (10px, brand) as bullet prefix instead of `border-l` styling
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel writing suggestions use `Quotes` icon (10px, brand) as bullet prefix instead of `border-l` styling",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-000 ' + "IntegrityPanel writing suggestions use `Quotes` icon (10px, brand) as bullet prefix instead of `border-l` styling");
    }


    // This test validates: IntegrityPanel writing suggestions use `Quotes` icon (10px, brand) as bullet prefix instead of `border-l` styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: CollapsibleSection locked upgrade text reads Upgrade to unlock with arrow symbol', async ({ page }) => {
    // Checkpoint 1: CollapsibleSection locked upgrade text reads `"Upgrade to unlock →"` with arrow symbol
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "CollapsibleSection locked upgrade text reads `\"Upgrade to unlock →\"` with arrow symbol",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-001 ' + "CollapsibleSection locked upgrade text reads `\"Upgrade to unlock →\"` with arrow symbol");
    }


    // This test validates: CollapsibleSection locked upgrade text reads `"Upgrade to unlock →"` with arrow symbol
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: IntegrityPanel CircularGauge label is Human Score main page derives label from o', async ({ page }) => {
    // Checkpoint 2: IntegrityPanel CircularGauge label is `"Human Score"` (main page derives label from `overallRisk` as Low/Moderate/High Risk)
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel CircularGauge label is `\"Human Score\"` (main page derives label from `overallRisk` as Low/Moderate/High Risk)",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-002 ' + "IntegrityPanel CircularGauge label is `\"Human Score\"` (main page derives label from `overallRisk` as Low/Moderate/High Risk)");
    }


    // This test validates: IntegrityPanel CircularGauge label is `"Human Score"` (main page derives label from `overallRisk` as Low/Moderate/High Risk)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: IntegrityPanel Plagiarism section icon color similarityScore 15 emerald 30 amber', async ({ page }) => {
    // Checkpoint 3: IntegrityPanel Plagiarism section icon color: `similarityScore < 15` → emerald, `< 30` → amber, `>= 30` → red-400
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel Plagiarism section icon color: `similarityScore < 15` → emerald, `< 30` → amber, `>= 30` → red-400",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-003 ' + "IntegrityPanel Plagiarism section icon color: `similarityScore < 15` → emerald, `< 30` → amber, `>= 30` → red-400");
    }


    // This test validates: IntegrityPanel Plagiarism section icon color: `similarityScore < 15` → emerald, `< 30` → amber, `>= 30` → red-400
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: IntegrityPanel Citations section icon color issueslength 0 emerald otherwise amb', async ({ page }) => {
    // Checkpoint 4: IntegrityPanel Citations section icon color: `issues.length === 0` → emerald, otherwise → amber
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel Citations section icon color: `issues.length === 0` → emerald, otherwise → amber",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-004 ' + "IntegrityPanel Citations section icon color: `issues.length === 0` → emerald, otherwise → amber");
    }


    // This test validates: IntegrityPanel Citations section icon color: `issues.length === 0` → emerald, otherwise → amber
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: IntegrityPanel Plagiarism summary format similarityScore similar matcheslength s', async ({ page }) => {
    // Checkpoint 5: IntegrityPanel Plagiarism summary format: `"{similarityScore}% similar · {matches.length} sources"` when available, `"Paid feature"` when null
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel Plagiarism summary format: `\"{similarityScore}% similar · {matches.length} sources\"` when available, `\"Paid feature\"` when null",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-005 ' + "IntegrityPanel Plagiarism summary format: `\"{similarityScore}% similar · {matches.length} sources\"` when available, `\"Paid feature\"` when null");
    }


    // This test validates: IntegrityPanel Plagiarism summary format: `"{similarityScore}% similar · {matches.length} sources"` when available, `"Paid feature"` when null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: IntegrityPanel Citations summary format verifiedtotal verified issueslength issu', async ({ page }) => {
    // Checkpoint 6: IntegrityPanel Citations summary format: `"{verified}/{total} verified · {issues.length} issues"` when available, `"Paid feature"` when null
    // Section: Quick Test Workflows > IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "IntegrityPanel Citations summary format: `\"{verified}/{total} verified · {issues.length} issues\"` when available, `\"Paid feature\"` when null",
      section: "Quick Test Workflows",
      subsection: "IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-006 ' + "IntegrityPanel Citations summary format: `\"{verified}/{total} verified · {issues.length} issues\"` when available, `\"Paid feature\"` when null");
    }


    // This test validates: IntegrityPanel Citations summary format: `"{verified}/{total} verified · {issues.length} issues"` when available, `"Paid feature"` when null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Uses Skeleton component imported from componentsuiskeleton', async ({ page }) => {
    // Checkpoint 7: Uses `Skeleton` component imported from `@/components/ui/skeleton`
    // Section: Quick Test Workflows > loading.tsx (`src/app/(app)/compliance/loading.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Uses `Skeleton` component imported from `@/components/ui/skeleton`",
      section: "Quick Test Workflows",
      subsection: "loading.tsx (`src/app/(app)/compliance/loading.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-007 ' + "Uses `Skeleton` component imported from `@/components/ui/skeleton`");
    }


    // This test validates: Uses `Skeleton` component imported from `@/components/ui/skeleton`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Layout matches main page height h-calc100vh-7rem', async ({ page }) => {
    // Checkpoint 8: Layout matches main page height: `h-[calc(100vh-7rem)]`
    // Section: Quick Test Workflows > loading.tsx (`src/app/(app)/compliance/loading.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Layout matches main page height: `h-[calc(100vh-7rem)]`",
      section: "Quick Test Workflows",
      subsection: "loading.tsx (`src/app/(app)/compliance/loading.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-008 ' + "Layout matches main page height: `h-[calc(100vh-7rem)]`");
    }


    // This test validates: Layout matches main page height: `h-[calc(100vh-7rem)]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Header row back-button skeleton h-8 w-8 rounded-lg title skeleton h-6 w-36', async ({ page }) => {
    // Checkpoint 9: Header row: back-button skeleton `h-8 w-8 rounded-lg`, title skeleton `h-6 w-36`
    // Section: Quick Test Workflows > loading.tsx (`src/app/(app)/compliance/loading.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Header row: back-button skeleton `h-8 w-8 rounded-lg`, title skeleton `h-6 w-36`",
      section: "Quick Test Workflows",
      subsection: "loading.tsx (`src/app/(app)/compliance/loading.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-009 ' + "Header row: back-button skeleton `h-8 w-8 rounded-lg`, title skeleton `h-6 w-36`");
    }


    // This test validates: Header row: back-button skeleton `h-8 w-8 rounded-lg`, title skeleton `h-6 w-36`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Content area single skeleton flex-1 rounded-2xl filling remaining height', async ({ page }) => {
    // Checkpoint 10: Content area: single skeleton `flex-1 rounded-2xl` filling remaining height
    // Section: Quick Test Workflows > loading.tsx (`src/app/(app)/compliance/loading.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Content area: single skeleton `flex-1 rounded-2xl` filling remaining height",
      section: "Quick Test Workflows",
      subsection: "loading.tsx (`src/app/(app)/compliance/loading.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-010 ' + "Content area: single skeleton `flex-1 rounded-2xl` filling remaining height");
    }


    // This test validates: Content area: single skeleton `flex-1 rounded-2xl` filling remaining height
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Footer row word-count skeleton h-4 w-20 left button skeleton h-12 w-44 rounded-x', async ({ page }) => {
    // Checkpoint 11: Footer row: word-count skeleton `h-4 w-20` (left), button skeleton `h-12 w-44 rounded-xl` (right)
    // Section: Quick Test Workflows > loading.tsx (`src/app/(app)/compliance/loading.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Footer row: word-count skeleton `h-4 w-20` (left), button skeleton `h-12 w-44 rounded-xl` (right)",
      section: "Quick Test Workflows",
      subsection: "loading.tsx (`src/app/(app)/compliance/loading.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-011 ' + "Footer row: word-count skeleton `h-4 w-20` (left), button skeleton `h-12 w-44 rounded-xl` (right)");
    }


    // This test validates: Footer row: word-count skeleton `h-4 w-20` (left), button skeleton `h-12 w-44 rounded-xl` (right)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Uses ErrorDisplay component from componentsuierror-display', async ({ page }) => {
    // Checkpoint 12: Uses `ErrorDisplay` component from `@/components/ui/error-display`
    // Section: Quick Test Workflows > error.tsx (`src/app/(app)/compliance/error.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Uses `ErrorDisplay` component from `@/components/ui/error-display`",
      section: "Quick Test Workflows",
      subsection: "error.tsx (`src/app/(app)/compliance/error.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-012 ' + "Uses `ErrorDisplay` component from `@/components/ui/error-display`");
    }


    // This test validates: Uses `ErrorDisplay` component from `@/components/ui/error-display`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Passes error object and reset function as onRetry to ErrorDisplay', async ({ page }) => {
    // Checkpoint 13: Passes `error` object and `reset` function (as `onRetry`) to `ErrorDisplay`
    // Section: Quick Test Workflows > error.tsx (`src/app/(app)/compliance/error.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Passes `error` object and `reset` function (as `onRetry`) to `ErrorDisplay`",
      section: "Quick Test Workflows",
      subsection: "error.tsx (`src/app/(app)/compliance/error.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-013 ' + "Passes `error` object and `reset` function (as `onRetry`) to `ErrorDisplay`");
    }


    // This test validates: Passes `error` object and `reset` function (as `onRetry`) to `ErrorDisplay`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Title Integrity check unavailable Message We couldnt load the compliance tools P', async ({ page }) => {
    // Checkpoint 14: Title: `"Integrity check unavailable"` — Message: `"We couldn't load the compliance tools. Please try again."`
    // Section: Quick Test Workflows > error.tsx (`src/app/(app)/compliance/error.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Title: `\"Integrity check unavailable\"` — Message: `\"We couldn't load the compliance tools. Please try again.\"`",
      section: "Quick Test Workflows",
      subsection: "error.tsx (`src/app/(app)/compliance/error.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-014 ' + "Title: `\"Integrity check unavailable\"` — Message: `\"We couldn't load the compliance tools. Please try again.\"`");
    }


    // This test validates: Title: `"Integrity check unavailable"` — Message: `"We couldn't load the compliance tools. Please try again."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Batch name defaults to Batch new DatetoLocaleDateString when name field is absen', async ({ page }) => {
    // Checkpoint 15: Batch name defaults to `Batch ${new Date().toLocaleDateString()}` when `name` field is absent from form data
    // Section: Quick Test Workflows > Batch API Route — Additional Details (`/api/integrity-check/batch`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Batch name defaults to `Batch ${new Date().toLocaleDateString()}` when `name` field is absent from form data",
      section: "Quick Test Workflows",
      subsection: "Batch API Route — Additional Details (`/api/integrity-check/batch`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-015 ' + "Batch name defaults to `Batch ${new Date().toLocaleDateString()}` when `name` field is absent from form data");
    }


    // This test validates: Batch name defaults to `Batch ${new Date().toLocaleDateString()}` when `name` field is absent from form data
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Batch processing uses hardcoded plan pro for all files regardless of users actua', async ({ page }) => {
    // Checkpoint 16: Batch processing uses hardcoded `plan: "pro"` for all files regardless of user's actual plan
    // Section: Quick Test Workflows > Batch API Route — Additional Details (`/api/integrity-check/batch`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Batch processing uses hardcoded `plan: \"pro\"` for all files regardless of user's actual plan",
      section: "Quick Test Workflows",
      subsection: "Batch API Route — Additional Details (`/api/integrity-check/batch`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-016 ' + "Batch processing uses hardcoded `plan: \"pro\"` for all files regardless of user's actual plan");
    }


    // This test validates: Batch processing uses hardcoded `plan: "pro"` for all files regardless of user's actual plan
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Extracted text under 50 characters treated as failure with same scanned-PDF erro', async ({ page }) => {
    // Checkpoint 17: Extracted text under 50 characters treated as failure with same scanned-PDF error message
    // Section: Quick Test Workflows > Batch API Route — Additional Details (`/api/integrity-check/batch`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Extracted text under 50 characters treated as failure with same scanned-PDF error message",
      section: "Quick Test Workflows",
      subsection: "Batch API Route — Additional Details (`/api/integrity-check/batch`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-017 ' + "Extracted text under 50 characters treated as failure with same scanned-PDF error message");
    }


    // This test validates: Extracted text under 50 characters treated as failure with same scanned-PDF error message
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Batch GET returns 400 with Batch ID required when id param is missing', async ({ page }) => {
    // Checkpoint 18: Batch GET returns 400 with `"Batch ID required"` when `?id=` param is missing
    // Section: Quick Test Workflows > Batch API Route — Additional Details (`/api/integrity-check/batch`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Batch GET returns 400 with `\"Batch ID required\"` when `?id=` param is missing",
      section: "Quick Test Workflows",
      subsection: "Batch API Route — Additional Details (`/api/integrity-check/batch`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-018 ' + "Batch GET returns 400 with `\"Batch ID required\"` when `?id=` param is missing");
    }


    // This test validates: Batch GET returns 400 with `"Batch ID required"` when `?id=` param is missing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Batch GET returns 400 with Invalid batch ID when id is not a valid integer', async ({ page }) => {
    // Checkpoint 19: Batch GET returns 400 with `"Invalid batch ID"` when `?id=` is not a valid integer
    // Section: Quick Test Workflows > Batch API Route — Additional Details (`/api/integrity-check/batch`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Batch GET returns 400 with `\"Invalid batch ID\"` when `?id=` is not a valid integer",
      section: "Quick Test Workflows",
      subsection: "Batch API Route — Additional Details (`/api/integrity-check/batch`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-019 ' + "Batch GET returns 400 with `\"Invalid batch ID\"` when `?id=` is not a valid integer");
    }


    // This test validates: Batch GET returns 400 with `"Invalid batch ID"` when `?id=` is not a valid integer
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Batch GET returns 404 with Batch not found for non-existent or unauthorized batc', async ({ page }) => {
    // Checkpoint 20: Batch GET returns 404 with `"Batch not found"` for non-existent or unauthorized batches (checks `batch.userId !== userId`)
    // Section: Quick Test Workflows > Batch API Route — Additional Details (`/api/integrity-check/batch`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Batch GET returns 404 with `\"Batch not found\"` for non-existent or unauthorized batches (checks `batch.userId !== userId`)",
      section: "Quick Test Workflows",
      subsection: "Batch API Route — Additional Details (`/api/integrity-check/batch`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-020 ' + "Batch GET returns 404 with `\"Batch not found\"` for non-existent or unauthorized batches (checks `batch.userId !== userId`)");
    }


    // This test validates: Batch GET returns 404 with `"Batch not found"` for non-existent or unauthorized batches (checks `batch.userId !== userId`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Batch GET response shape batch id name fileCount completedCount status createdAt', async ({ page }) => {
    // Checkpoint 21: Batch GET response shape: `{ batch: { id, name, fileCount, completedCount, status, createdAt }, checks: [{ id, fileName, wordCount, aiScore, plagiarismScore, status, errorMessage, fullResult, createdAt }] }`
    // Section: Quick Test Workflows > Batch API Route — Additional Details (`/api/integrity-check/batch`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Batch GET response shape: `{ batch: { id, name, fileCount, completedCount, status, createdAt }, checks: [{ id, fileName, wordCount, aiScore, plagiarismScore, status, errorMessage, fullResult, createdAt }] }`",
      section: "Quick Test Workflows",
      subsection: "Batch API Route — Additional Details (`/api/integrity-check/batch`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-021 ' + "Batch GET response shape: `{ batch: { id, name, fileCount, completedCount, status, createdAt }, checks: [{ id, fileName, wordCount, aiScore, plagiarismScore, status, errorMessage, fullResult, createdAt }] }`");
    }


    // This test validates: Batch GET response shape: `{ batch: { id, name, fileCount, completedCount, status, createdAt }, checks: [{ id, fileName, wordCount, aiScore, plagiarismScore, status, errorMessage, fullResult, createdAt }] }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Batch flaggedPassages filter uses humanProbability 40 threshold differs from mai', async ({ page }) => {
    // Checkpoint 22: Batch flaggedPassages filter uses `humanProbability < 40` threshold (differs from main check route's `< 50`)
    // Section: Quick Test Workflows > Batch API Route — Additional Details (`/api/integrity-check/batch`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Batch flaggedPassages filter uses `humanProbability < 40` threshold (differs from main check route's `< 50`)",
      section: "Quick Test Workflows",
      subsection: "Batch API Route — Additional Details (`/api/integrity-check/batch`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-022 ' + "Batch flaggedPassages filter uses `humanProbability < 40` threshold (differs from main check route's `< 50`)");
    }


    // This test validates: Batch flaggedPassages filter uses `humanProbability < 40` threshold (differs from main check route's `< 50`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Batch completedCount is updated in DB after each file processes success or failu', async ({ page }) => {
    // Checkpoint 23: Batch `completedCount` is updated in DB after each file processes (success or failure)
    // Section: Quick Test Workflows > Batch API Route — Additional Details (`/api/integrity-check/batch`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Batch `completedCount` is updated in DB after each file processes (success or failure)",
      section: "Quick Test Workflows",
      subsection: "Batch API Route — Additional Details (`/api/integrity-check/batch`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-023 ' + "Batch `completedCount` is updated in DB after each file processes (success or failure)");
    }


    // This test validates: Batch `completedCount` is updated in DB after each file processes (success or failure)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Batch overall status set to completed only after all files have been processed', async ({ page }) => {
    // Checkpoint 24: Batch overall status set to `"completed"` only after all files have been processed
    // Section: Quick Test Workflows > Batch API Route — Additional Details (`/api/integrity-check/batch`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Batch overall status set to `\"completed\"` only after all files have been processed",
      section: "Quick Test Workflows",
      subsection: "Batch API Route — Additional Details (`/api/integrity-check/batch`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-024 ' + "Batch overall status set to `\"completed\"` only after all files have been processed");
    }


    // This test validates: Batch overall status set to `"completed"` only after all files have been processed
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Download report filename uses client-side new DatetoISOStringslice0 10 this is t', async ({ page }) => {
    // Checkpoint 25: Download report filename uses client-side `new Date().toISOString().slice(0, 10)` — this is the browser's current date, not `result.checkedAt`
    // Section: Quick Test Workflows > Client-Side Details (additional page.tsx observations)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Download report filename uses client-side `new Date().toISOString().slice(0, 10)` — this is the browser's current date, not `result.checkedAt`",
      section: "Quick Test Workflows",
      subsection: "Client-Side Details (additional page.tsx observations)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-025 ' + "Download report filename uses client-side `new Date().toISOString().slice(0, 10)` — this is the browser's current date, not `result.checkedAt`");
    }


    // This test validates: Download report filename uses client-side `new Date().toISOString().slice(0, 10)` — this is the browser's current date, not `result.checkedAt`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Copyleaks poll useEffect calls poll immediately once before setting setIntervalp', async ({ page }) => {
    // Checkpoint 26: Copyleaks poll useEffect calls `poll()` immediately once before setting `setInterval(poll, 5000)` — there is no initial 5-second delay
    // Section: Quick Test Workflows > Client-Side Details (additional page.tsx observations)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Copyleaks poll useEffect calls `poll()` immediately once before setting `setInterval(poll, 5000)` — there is no initial 5-second delay",
      section: "Quick Test Workflows",
      subsection: "Client-Side Details (additional page.tsx observations)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-026 ' + "Copyleaks poll useEffect calls `poll()` immediately once before setting `setInterval(poll, 5000)` — there is no initial 5-second delay");
    }


    // This test validates: Copyleaks poll useEffect calls `poll()` immediately once before setting `setInterval(poll, 5000)` — there is no initial 5-second delay
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Sparkline SVG viewBox width is computed as Mathmaxhistorylength 40 200 with cons', async ({ page }) => {
    // Checkpoint 27: Sparkline SVG viewBox width is computed as `Math.max(history.length * 40, 200)` with constant height `60`
    // Section: Quick Test Workflows > Client-Side Details (additional page.tsx observations)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Sparkline SVG viewBox width is computed as `Math.max(history.length * 40, 200)` with constant height `60`",
      section: "Quick Test Workflows",
      subsection: "Client-Side Details (additional page.tsx observations)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-027 ' + "Sparkline SVG viewBox width is computed as `Math.max(history.length * 40, 200)` with constant height `60`");
    }


    // This test validates: Sparkline SVG viewBox width is computed as `Math.max(history.length * 40, 200)` with constant height `60`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Sparkline data point x-position formula i 40 20 y-position formula 60 - haiScore', async ({ page }) => {
    // Checkpoint 28: Sparkline data point x-position formula: `i * 40 + 20`; y-position formula: `60 - (h.aiScore ?? 50) * 0.55`
    // Section: Quick Test Workflows > Client-Side Details (additional page.tsx observations)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Sparkline data point x-position formula: `i * 40 + 20`; y-position formula: `60 - (h.aiScore ?? 50) * 0.55`",
      section: "Quick Test Workflows",
      subsection: "Client-Side Details (additional page.tsx observations)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-028 ' + "Sparkline data point x-position formula: `i * 40 + 20`; y-position formula: `60 - (h.aiScore ?? 50) * 0.55`");
    }


    // This test validates: Sparkline data point x-position formula: `i * 40 + 20`; y-position formula: `60 - (h.aiScore ?? 50) * 0.55`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Tab buttons CheckHistory have no roletab and no aria-selected attribute', async ({ page }) => {
    // Checkpoint 29: Tab buttons (Check/History) have no `role="tab"` and no `aria-selected` attribute
    // Section: Quick Test Workflows > Accessibility Gaps

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Tab buttons (Check/History) have no `role=\"tab\"` and no `aria-selected` attribute",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-029 ' + "Tab buttons (Check/History) have no `role=\"tab\"` and no `aria-selected` attribute");
    }


    // This test validates: Tab buttons (Check/History) have no `role="tab"` and no `aria-selected` attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Tab content areas have no roletabpanel attribute', async ({ page }) => {
    // Checkpoint 30: Tab content areas have no `role="tabpanel"` attribute
    // Section: Quick Test Workflows > Accessibility Gaps

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Tab content areas have no `role=\"tabpanel\"` attribute",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-030 ' + "Tab content areas have no `role=\"tabpanel\"` attribute");
    }


    // This test validates: Tab content areas have no `role="tabpanel"` attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Source mode buttons From Document Paste Text have no role or aria attributes', async ({ page }) => {
    // Checkpoint 31: Source mode buttons (From Document / Paste Text) have no `role` or `aria` attributes
    // Section: Quick Test Workflows > Accessibility Gaps

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Source mode buttons (From Document / Paste Text) have no `role` or `aria` attributes",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-031 ' + "Source mode buttons (From Document / Paste Text) have no `role` or `aria` attributes");
    }


    // This test validates: Source mode buttons (From Document / Paste Text) have no `role` or `aria` attributes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: View mode buttons Inline Split have no role or aria attributes', async ({ page }) => {
    // Checkpoint 32: View mode buttons (Inline / Split) have no `role` or `aria` attributes
    // Section: Quick Test Workflows > Accessibility Gaps

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "View mode buttons (Inline / Split) have no `role` or `aria` attributes",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-032 ' + "View mode buttons (Inline / Split) have no `role` or `aria` attributes");
    }


    // This test validates: View mode buttons (Inline / Split) have no `role` or `aria` attributes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: No aria-live region for dynamic content changes results loading error messages s', async ({ page }) => {
    // Checkpoint 33: No `aria-live` region for dynamic content changes (results loading, error messages, score updates)
    // Section: Quick Test Workflows > Accessibility Gaps

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "No `aria-live` region for dynamic content changes (results loading, error messages, score updates)",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-033 ' + "No `aria-live` region for dynamic content changes (results loading, error messages, score updates)");
    }


    // This test validates: No `aria-live` region for dynamic content changes (results loading, error messages, score updates)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: No screen reader announcement when check completes or fails', async ({ page }) => {
    // Checkpoint 34: No screen reader announcement when check completes or fails
    // Section: Quick Test Workflows > Accessibility Gaps

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "No screen reader announcement when check completes or fails",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-034 ' + "No screen reader announcement when check completes or fails");
    }


    // This test validates: No screen reader announcement when check completes or fails
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
