/**
 * Auto-generated Playwright test for settings/spec-009
 * Source: e2e/specs/settings/spec-009.md
 * Generated: 2026-03-15T15:36:36.354Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts settings spec-009
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';


















import { assertSettingsCheckpoint } from '../../module-assertions/settings';

test.describe('settings / spec-009', () => {
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

  test('cp-000: Skeleton base CSS class is animate-pulse Tailwind standard not animation-pulse', async ({ page }) => {
    // Checkpoint 0: Skeleton base CSS class is `animate-pulse` (Tailwind standard), not `animation-pulse`
    // Section: Quick Test Workflow > Skeleton Component (skeleton.tsx:6)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Skeleton base CSS class is `animate-pulse` (Tailwind standard), not `animation-pulse`",
      section: "Quick Test Workflow",
      subsection: "Skeleton Component (skeleton.tsx:6)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-000 ' + "Skeleton base CSS class is `animate-pulse` (Tailwind standard), not `animation-pulse`");
    }


    // This test validates: Skeleton base CSS class is `animate-pulse` (Tailwind standard), not `animation-pulse`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Sidebar title skeleton has dimensions h-5 w-16 with mb-4 mx-3 spacing', async ({ page }) => {
    // Checkpoint 1: Sidebar title skeleton has dimensions `h-5 w-16` with `mb-4 mx-3` spacing
    // Section: Quick Test Workflow > Loading Skeleton Dimensions (loading.tsx:7–21)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Sidebar title skeleton has dimensions `h-5 w-16` with `mb-4 mx-3` spacing",
      section: "Quick Test Workflow",
      subsection: "Loading Skeleton Dimensions (loading.tsx:7–21)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-001 ' + "Sidebar title skeleton has dimensions `h-5 w-16` with `mb-4 mx-3` spacing");
    }


    // This test validates: Sidebar title skeleton has dimensions `h-5 w-16` with `mb-4 mx-3` spacing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Sidebar renders exactly 4 tab skeleton placeholders each h-10 w-full rounded-lg', async ({ page }) => {
    // Checkpoint 2: Sidebar renders exactly 4 tab skeleton placeholders, each `h-10 w-full rounded-lg`
    // Section: Quick Test Workflow > Loading Skeleton Dimensions (loading.tsx:7–21)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Sidebar renders exactly 4 tab skeleton placeholders, each `h-10 w-full rounded-lg`",
      section: "Quick Test Workflow",
      subsection: "Loading Skeleton Dimensions (loading.tsx:7–21)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-002 ' + "Sidebar renders exactly 4 tab skeleton placeholders, each `h-10 w-full rounded-lg`");
    }


    // This test validates: Sidebar renders exactly 4 tab skeleton placeholders, each `h-10 w-full rounded-lg`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Content avatar skeleton is h-16 w-16 rounded-full', async ({ page }) => {
    // Checkpoint 3: Content avatar skeleton is `h-16 w-16 rounded-full`
    // Section: Quick Test Workflow > Loading Skeleton Dimensions (loading.tsx:7–21)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Content avatar skeleton is `h-16 w-16 rounded-full`",
      section: "Quick Test Workflow",
      subsection: "Loading Skeleton Dimensions (loading.tsx:7–21)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-003 ' + "Content avatar skeleton is `h-16 w-16 rounded-full`");
    }


    // This test validates: Content avatar skeleton is `h-16 w-16 rounded-full`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Content area includes exactly two h-10 w-full rounded-lg input skeletons', async ({ page }) => {
    // Checkpoint 4: Content area includes exactly two `h-10 w-full rounded-lg` input skeletons
    // Section: Quick Test Workflow > Loading Skeleton Dimensions (loading.tsx:7–21)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Content area includes exactly two `h-10 w-full rounded-lg` input skeletons",
      section: "Quick Test Workflow",
      subsection: "Loading Skeleton Dimensions (loading.tsx:7–21)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-004 ' + "Content area includes exactly two `h-10 w-full rounded-lg` input skeletons");
    }


    // This test validates: Content area includes exactly two `h-10 w-full rounded-lg` input skeletons
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Content button skeleton is h-10 w-32 rounded-xl', async ({ page }) => {
    // Checkpoint 5: Content button skeleton is `h-10 w-32 rounded-xl`
    // Section: Quick Test Workflow > Loading Skeleton Dimensions (loading.tsx:7–21)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Content button skeleton is `h-10 w-32 rounded-xl`",
      section: "Quick Test Workflow",
      subsection: "Loading Skeleton Dimensions (loading.tsx:7–21)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-005 ' + "Content button skeleton is `h-10 w-32 rounded-xl`");
    }


    // This test validates: Content button skeleton is `h-10 w-32 rounded-xl`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Content heading skeleton is h-7 w-40', async ({ page }) => {
    // Checkpoint 6: Content heading skeleton is `h-7 w-40`
    // Section: Quick Test Workflow > Loading Skeleton Dimensions (loading.tsx:7–21)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Content heading skeleton is `h-7 w-40`",
      section: "Quick Test Workflow",
      subsection: "Loading Skeleton Dimensions (loading.tsx:7–21)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-006 ' + "Content heading skeleton is `h-7 w-40`");
    }


    // This test validates: Content heading skeleton is `h-7 w-40`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: createSubscription only updates the usersplan field when creating a NEW subscrip', async ({ page }) => {
    // Checkpoint 7: `createSubscription` only updates the `users.plan` field when creating a NEW subscription record — updating an existing subscription does NOT sync `users.plan`
    // Section: Quick Test Workflow > Billing Server Actions (billing.ts:36–49, 75–81)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "`createSubscription` only updates the `users.plan` field when creating a NEW subscription record — updating an existing subscription does NOT sync `users.plan`",
      section: "Quick Test Workflow",
      subsection: "Billing Server Actions (billing.ts:36–49, 75–81)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-007 ' + "`createSubscription` only updates the `users.plan` field when creating a NEW subscription record — updating an existing subscription does NOT sync `users.plan`");
    }


    // This test validates: `createSubscription` only updates the `users.plan` field when creating a NEW subscription record — updating an existing subscription does NOT sync `users.plan`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: cancelSubscription only targets subscriptions with status active non-active subs', async ({ page }) => {
    // Checkpoint 8: `cancelSubscription` only targets subscriptions with `status: "active"` — non-active subscriptions are unaffected and the function returns null
    // Section: Quick Test Workflow > Billing Server Actions (billing.ts:36–49, 75–81)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "`cancelSubscription` only targets subscriptions with `status: \"active\"` — non-active subscriptions are unaffected and the function returns null",
      section: "Quick Test Workflow",
      subsection: "Billing Server Actions (billing.ts:36–49, 75–81)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-008 ' + "`cancelSubscription` only targets subscriptions with `status: \"active\"` — non-active subscriptions are unaffected and the function returns null");
    }


    // This test validates: `cancelSubscription` only targets subscriptions with `status: "active"` — non-active subscriptions are unaffected and the function returns null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: verify-payment route applies rate limiting using RATE_LIMITSanalysis same limite', async ({ page }) => {
    // Checkpoint 9: `verify-payment` route applies rate limiting using `RATE_LIMITS.analysis` (same limiter as `create-order`)
    // Section: Quick Test Workflow > API Route: verify-payment (verify-payment/route.ts:13–14)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "`verify-payment` route applies rate limiting using `RATE_LIMITS.analysis` (same limiter as `create-order`)",
      section: "Quick Test Workflow",
      subsection: "API Route: verify-payment (verify-payment/route.ts:13–14)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-009 ' + "`verify-payment` route applies rate limiting using `RATE_LIMITS.analysis` (same limiter as `create-order`)");
    }


    // This test validates: `verify-payment` route applies rate limiting using `RATE_LIMITS.analysis` (same limiter as `create-order`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: verify-payment exact error for missing fields is Missing required fields orderId', async ({ page }) => {
    // Checkpoint 10: `verify-payment` exact error for missing fields is `"Missing required fields: orderId, paymentId, signature, plan"`
    // Section: Quick Test Workflow > API Route: verify-payment (verify-payment/route.ts:13–14)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "`verify-payment` exact error for missing fields is `\"Missing required fields: orderId, paymentId, signature, plan\"`",
      section: "Quick Test Workflow",
      subsection: "API Route: verify-payment (verify-payment/route.ts:13–14)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-010 ' + "`verify-payment` exact error for missing fields is `\"Missing required fields: orderId, paymentId, signature, plan\"`");
    }


    // This test validates: `verify-payment` exact error for missing fields is `"Missing required fields: orderId, paymentId, signature, plan"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Webhook returns 503 with Webhook not configured when RAZORPAY_WEBHOOK_SECRET env', async ({ page }) => {
    // Checkpoint 11: Webhook returns 503 with `"Webhook not configured"` when `RAZORPAY_WEBHOOK_SECRET` env var is not set
    // Section: Quick Test Workflow > API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Webhook returns 503 with `\"Webhook not configured\"` when `RAZORPAY_WEBHOOK_SECRET` env var is not set",
      section: "Quick Test Workflow",
      subsection: "API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-011 ' + "Webhook returns 503 with `\"Webhook not configured\"` when `RAZORPAY_WEBHOOK_SECRET` env var is not set");
    }


    // This test validates: Webhook returns 503 with `"Webhook not configured"` when `RAZORPAY_WEBHOOK_SECRET` env var is not set
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Webhook returns 401 with Missing signature when x-razorpay-signature header is a', async ({ page }) => {
    // Checkpoint 12: Webhook returns 401 with `"Missing signature"` when `x-razorpay-signature` header is absent
    // Section: Quick Test Workflow > API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Webhook returns 401 with `\"Missing signature\"` when `x-razorpay-signature` header is absent",
      section: "Quick Test Workflow",
      subsection: "API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-012 ' + "Webhook returns 401 with `\"Missing signature\"` when `x-razorpay-signature` header is absent");
    }


    // This test validates: Webhook returns 401 with `"Missing signature"` when `x-razorpay-signature` header is absent
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Webhook returns 401 with Invalid signature when signature verification fails not', async ({ page }) => {
    // Checkpoint 13: Webhook returns 401 with `"Invalid signature"` when signature verification fails (not 400 as previously documented)
    // Section: Quick Test Workflow > API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Webhook returns 401 with `\"Invalid signature\"` when signature verification fails (not 400 as previously documented)",
      section: "Quick Test Workflow",
      subsection: "API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-013 ' + "Webhook returns 401 with `\"Invalid signature\"` when signature verification fails (not 400 as previously documented)");
    }


    // This test validates: Webhook returns 401 with `"Invalid signature"` when signature verification fails (not 400 as previously documented)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Webhook success response body is received true not empty 200', async ({ page }) => {
    // Checkpoint 14: Webhook success response body is `{ received: true }` (not empty 200)
    // Section: Quick Test Workflow > API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Webhook success response body is `{ received: true }` (not empty 200)",
      section: "Quick Test Workflow",
      subsection: "API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-014 ' + "Webhook success response body is `{ received: true }` (not empty 200)");
    }


    // This test validates: Webhook success response body is `{ received: true }` (not empty 200)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Webhook server error returns 500 with Webhook processing failed', async ({ page }) => {
    // Checkpoint 15: Webhook server error returns 500 with `"Webhook processing failed"`
    // Section: Quick Test Workflow > API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Webhook server error returns 500 with `\"Webhook processing failed\"`",
      section: "Quick Test Workflow",
      subsection: "API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-015 ' + "Webhook server error returns 500 with `\"Webhook processing failed\"`");
    }


    // This test validates: Webhook server error returns 500 with `"Webhook processing failed"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: create-order auth failure from getCurrentUserId throwing is caught by the generi', async ({ page }) => {
    // Checkpoint 16: `create-order` auth failure (from `getCurrentUserId()` throwing) is caught by the generic catch block and returns 500 with `"Failed to create payment order"` — not a dedicated 401 response
    // Section: Quick Test Workflow > API Route: create-order Auth (create-order/route.ts:37–43)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "`create-order` auth failure (from `getCurrentUserId()` throwing) is caught by the generic catch block and returns 500 with `\"Failed to create payment order\"` — not a dedicated 401 response",
      section: "Quick Test Workflow",
      subsection: "API Route: create-order Auth (create-order/route.ts:37–43)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-016 ' + "`create-order` auth failure (from `getCurrentUserId()` throwing) is caught by the generic catch block and returns 500 with `\"Failed to create payment order\"` — not a dedicated 401 response");
    }


    // This test validates: `create-order` auth failure (from `getCurrentUserId()` throwing) is caught by the generic catch block and returns 500 with `"Failed to create payment order"` — not a dedicated 401 response
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
