/**
 * Auto-generated Playwright test for slides-ai/spec-018
 * Source: e2e/specs/slides-ai/spec-018.md
 * Generated: 2026-03-14T10:19:37.655Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts slides-ai spec-018
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';













import { assertSlidesCheckpoint } from '../../module-assertions/slides';






test.describe('slides-ai / spec-018', () => {
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

  test('cp-000: 500 response error Slide regeneration failed', async ({ page }) => {
    // Checkpoint 0: 500 response: `{ error: "Slide regeneration failed" }`
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "500 response: `{ error: \"Slide regeneration failed\" }`",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-000 ' + "500 response: `{ error: \"Slide regeneration failed\" }`");
    }


    // This test validates: 500 response: `{ error: "Slide regeneration failed" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Uses provider-dependent getSmallModel with the default Anthropic provider this r', async ({ page }) => {
    // Checkpoint 1: Uses provider-dependent `getSmallModel()`; with the default Anthropic provider this resolves to `"claude-haiku-4-5-20251001"`
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Uses provider-dependent `getSmallModel()`; with the default Anthropic provider this resolves to `\"claude-haiku-4-5-20251001\"`",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-001 ' + "Uses provider-dependent `getSmallModel()`; with the default Anthropic provider this resolves to `\"claude-haiku-4-5-20251001\"`");
    }


    // This test validates: Uses provider-dependent `getSmallModel()`; with the default Anthropic provider this resolves to `"claude-haiku-4-5-20251001"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: action field min 1 char contentBlocks min 1 item', async ({ page }) => {
    // Checkpoint 2: `action` field min 1 char, `contentBlocks` min 1 item
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`action` field min 1 char, `contentBlocks` min 1 item",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-002 ' + "`action` field min 1 char, `contentBlocks` min 1 item");
    }


    // This test validates: `action` field min 1 char, `contentBlocks` min 1 item
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Each of the 14 AI actions has a distinct system prompt from getSlideEditorSystem', async ({ page }) => {
    // Checkpoint 3: Each of the 14 AI actions has a distinct system prompt from `getSlideEditorSystemPrompt(action)`
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Each of the 14 AI actions has a distinct system prompt from `getSlideEditorSystemPrompt(action)`",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-003 ' + "Each of the 14 AI actions has a distinct system prompt from `getSlideEditorSystemPrompt(action)`");
    }


    // This test validates: Each of the 14 AI actions has a distinct system prompt from `getSlideEditorSystemPrompt(action)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: 500 response error Slide editing failed', async ({ page }) => {
    // Checkpoint 4: 500 response: `{ error: "Slide editing failed" }`
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "500 response: `{ error: \"Slide editing failed\" }`",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-004 ' + "500 response: `{ error: \"Slide editing failed\" }`");
    }


    // This test validates: 500 response: `{ error: "Slide editing failed" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: slides array validated min 1 max 100', async ({ page }) => {
    // Checkpoint 5: `slides` array validated min 1, max 100
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`slides` array validated min 1, max 100",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-005 ' + "`slides` array validated min 1, max 100");
    }


    // This test validates: `slides` array validated min 1, max 100
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: audienceType is enum-validated same 10 values as generate-stream', async ({ page }) => {
    // Checkpoint 6: `audienceType` is enum-validated (same 10 values as generate-stream)
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`audienceType` is enum-validated (same 10 values as generate-stream)",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-006 ' + "`audienceType` is enum-validated (same 10 values as generate-stream)");
    }


    // This test validates: `audienceType` is enum-validated (same 10 values as generate-stream)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Prompttype contract allows suggestionsautoFixAvailable boolean but the coach rou', async ({ page }) => {
    // Checkpoint 7: Prompt/type contract allows `suggestions[].autoFixAvailable?: boolean`, but the coach route does not Zod-validate that response field
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Prompt/type contract allows `suggestions[].autoFixAvailable?: boolean`, but the coach route does not Zod-validate that response field",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-007 ' + "Prompt/type contract allows `suggestions[].autoFixAvailable?: boolean`, but the coach route does not Zod-validate that response field");
    }


    // This test validates: Prompt/type contract allows `suggestions[].autoFixAvailable?: boolean`, but the coach route does not Zod-validate that response field
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: 500 response error Coach evaluation failed', async ({ page }) => {
    // Checkpoint 8: 500 response: `{ error: "Coach evaluation failed" }`
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "500 response: `{ error: \"Coach evaluation failed\" }`",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-008 ' + "500 response: `{ error: \"Coach evaluation failed\" }`");
    }


    // This test validates: 500 response: `{ error: "Coach evaluation failed" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Supports institutionKit in request name logoUrl logoPosition top-left top-right ', async ({ page }) => {
    // Checkpoint 9: Supports `institutionKit` in request: `{ name, logoUrl, logoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right", footerText }`
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Supports `institutionKit` in request: `{ name, logoUrl, logoPosition: \"top-left\" | \"top-right\" | \"bottom-left\" | \"bottom-right\", footerText }`",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-009 ' + "Supports `institutionKit` in request: `{ name, logoUrl, logoPosition: \"top-left\" | \"top-right\" | \"bottom-left\" | \"bottom-right\", footerText }`");
    }


    // This test validates: Supports `institutionKit` in request: `{ name, logoUrl, logoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right", footerText }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Response headers Content-Type applicationvndopenxmlformats-officedocumentpresent', async ({ page }) => {
    // Checkpoint 10: Response headers: `Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation`
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Response headers: `Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation`",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-010 ' + "Response headers: `Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation`");
    }


    // This test validates: Response headers: `Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Uses 4 slide masters BRANDED TITLE_MASTER SECTION_MASTER CONTENT_MASTER', async ({ page }) => {
    // Checkpoint 11: Uses 4 slide masters: `"BRANDED"`, `"TITLE_MASTER"`, `"SECTION_MASTER"`, `"CONTENT_MASTER"`
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Uses 4 slide masters: `\"BRANDED\"`, `\"TITLE_MASTER\"`, `\"SECTION_MASTER\"`, `\"CONTENT_MASTER\"`",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-011 ' + "Uses 4 slide masters: `\"BRANDED\"`, `\"TITLE_MASTER\"`, `\"SECTION_MASTER\"`, `\"CONTENT_MASTER\"`");
    }


    // This test validates: Uses 4 slide masters: `"BRANDED"`, `"TITLE_MASTER"`, `"SECTION_MASTER"`, `"CONTENT_MASTER"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Rate limited via checkRateLimituserId export RATE_LIMITSexport', async ({ page }) => {
    // Checkpoint 12: Rate limited via `checkRateLimit(userId, "export", RATE_LIMITS.export)`
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Rate limited via `checkRateLimit(userId, \"export\", RATE_LIMITS.export)`",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-012 ' + "Rate limited via `checkRateLimit(userId, \"export\", RATE_LIMITS.export)`");
    }


    // This test validates: Rate limited via `checkRateLimit(userId, "export", RATE_LIMITS.export)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: 400 response includes error At least one slide is required for empty slides arra', async ({ page }) => {
    // Checkpoint 13: 400 response includes `{ error: "At least one slide is required" }` for empty slides array
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "400 response includes `{ error: \"At least one slide is required\" }` for empty slides array",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-013 ' + "400 response includes `{ error: \"At least one slide is required\" }` for empty slides array");
    }


    // This test validates: 400 response includes `{ error: "At least one slide is required" }` for empty slides array
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: layout validated as enum full_slide two_up three_up_notes six_up outline default', async ({ page }) => {
    // Checkpoint 14: `layout` validated as enum: `"full_slide" | "two_up" | "three_up_notes" | "six_up" | "outline"` (default `"full_slide"`)
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`layout` validated as enum: `\"full_slide\" | \"two_up\" | \"three_up_notes\" | \"six_up\" | \"outline\"` (default `\"full_slide\"`)",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-014 ' + "`layout` validated as enum: `\"full_slide\" | \"two_up\" | \"three_up_notes\" | \"six_up\" | \"outline\"` (default `\"full_slide\"`)");
    }


    // This test validates: `layout` validated as enum: `"full_slide" | "two_up" | "three_up_notes" | "six_up" | "outline"` (default `"full_slide"`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: paperSize validated as letter a4 default letter', async ({ page }) => {
    // Checkpoint 15: `paperSize` validated as `"letter" | "a4"` (default `"letter"`)
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`paperSize` validated as `\"letter\" | \"a4\"` (default `\"letter\"`)",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-015 ' + "`paperSize` validated as `\"letter\" | \"a4\"` (default `\"letter\"`)");
    }


    // This test validates: `paperSize` validated as `"letter" | "a4"` (default `"letter"`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: includeSlideNumbers includeHeader includeSpeakerNotes all default true', async ({ page }) => {
    // Checkpoint 16: `includeSlideNumbers`, `includeHeader`, `includeSpeakerNotes` all default true
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`includeSlideNumbers`, `includeHeader`, `includeSpeakerNotes` all default true",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-016 ' + "`includeSlideNumbers`, `includeHeader`, `includeSpeakerNotes` all default true");
    }


    // This test validates: `includeSlideNumbers`, `includeHeader`, `includeSpeakerNotes` all default true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Rate limited via checkRateLimituserId export RATE_LIMITSexport', async ({ page }) => {
    // Checkpoint 17: Rate limited via `checkRateLimit(userId, "export", RATE_LIMITS.export)`
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Rate limited via `checkRateLimit(userId, \"export\", RATE_LIMITS.export)`",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-017 ' + "Rate limited via `checkRateLimit(userId, \"export\", RATE_LIMITS.export)`");
    }


    // This test validates: Rate limited via `checkRateLimit(userId, "export", RATE_LIMITS.export)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Filename pattern safeTitle_handoutpdf', async ({ page }) => {
    // Checkpoint 18: Filename pattern: `${safeTitle}_handout.pdf`
    // Section:  > API Route Validation & Error Shapes

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Filename pattern: `${safeTitle}_handout.pdf`",
      section: "",
      subsection: "API Route Validation & Error Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-018 ' + "Filename pattern: `${safeTitle}_handout.pdf`");
    }


    // This test validates: Filename pattern: `${safeTitle}_handout.pdf`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Only PPTX format receives themeConfig in the request body PDF does not', async ({ page }) => {
    // Checkpoint 19: Only PPTX format receives `themeConfig` in the request body; PDF does not
    // Section:  > Gamma Export Helper (`export-deck.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Only PPTX format receives `themeConfig` in the request body; PDF does not",
      section: "",
      subsection: "Gamma Export Helper (`export-deck.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-019 ' + "Only PPTX format receives `themeConfig` in the request body; PDF does not");
    }


    // This test validates: Only PPTX format receives `themeConfig` in the request body; PDF does not
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Fallback title for empty titles Untitled Deck in request deck in filename', async ({ page }) => {
    // Checkpoint 20: Fallback title for empty titles: `"Untitled Deck"` in request, `"deck"` in filename
    // Section:  > Gamma Export Helper (`export-deck.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Fallback title for empty titles: `\"Untitled Deck\"` in request, `\"deck\"` in filename",
      section: "",
      subsection: "Gamma Export Helper (`export-deck.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-020 ' + "Fallback title for empty titles: `\"Untitled Deck\"` in request, `\"deck\"` in filename");
    }


    // This test validates: Fallback title for empty titles: `"Untitled Deck"` in request, `"deck"` in filename
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Filename sanitization replacea-zA-Z0-9_-g _', async ({ page }) => {
    // Checkpoint 21: Filename sanitization: `replace(/[^a-zA-Z0-9_-]/g, "_")`
    // Section:  > Gamma Export Helper (`export-deck.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Filename sanitization: `replace(/[^a-zA-Z0-9_-]/g, \"_\")`",
      section: "",
      subsection: "Gamma Export Helper (`export-deck.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-021 ' + "Filename sanitization: `replace(/[^a-zA-Z0-9_-]/g, \"_\")`");
    }


    // This test validates: Filename sanitization: `replace(/[^a-zA-Z0-9_-]/g, "_")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Cleanup of blob URL uses requestAnimationFrame not synchronous', async ({ page }) => {
    // Checkpoint 22: Cleanup of blob URL uses `requestAnimationFrame` (not synchronous)
    // Section:  > Gamma Export Helper (`export-deck.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Cleanup of blob URL uses `requestAnimationFrame` (not synchronous)",
      section: "",
      subsection: "Gamma Export Helper (`export-deck.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-022 ' + "Cleanup of blob URL uses `requestAnimationFrame` (not synchronous)");
    }


    // This test validates: Cleanup of blob URL uses `requestAnimationFrame` (not synchronous)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Quick action chips in Slides mode SET INPUT TEXT and focus only they do NOT auto', async ({ page }) => {
    // Checkpoint 23: Quick action chips in Slides mode SET INPUT TEXT and focus only — they do NOT auto-send (contradicts original doc Section 3 line "Clicking a chip sends the action as a message")
    // Section:  > SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Quick action chips in Slides mode SET INPUT TEXT and focus only — they do NOT auto-send (contradicts original doc Section 3 line \"Clicking a chip sends the action as a message\")",
      section: "",
      subsection: "SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-023 ' + "Quick action chips in Slides mode SET INPUT TEXT and focus only — they do NOT auto-send (contradicts original doc Section 3 line \"Clicking a chip sends the action as a message\")");
    }


    // This test validates: Quick action chips in Slides mode SET INPUT TEXT and focus only — they do NOT auto-send (contradicts original doc Section 3 line "Clicking a chip sends the action as a message")
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Input placeholder changes dynamically Edit this selectedBlockType block when blo', async ({ page }) => {
    // Checkpoint 24: Input placeholder changes dynamically: `"Edit this ${selectedBlockType} block..."` when block selected, `"Ask the AI to change your slides..."` otherwise
    // Section:  > SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Input placeholder changes dynamically: `\"Edit this ${selectedBlockType} block...\"` when block selected, `\"Ask the AI to change your slides...\"` otherwise",
      section: "",
      subsection: "SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-024 ' + "Input placeholder changes dynamically: `\"Edit this ${selectedBlockType} block...\"` when block selected, `\"Ask the AI to change your slides...\"` otherwise");
    }


    // This test validates: Input placeholder changes dynamically: `"Edit this ${selectedBlockType} block..."` when block selected, `"Ask the AI to change your slides..."` otherwise
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Suggested changes panel header shows N change suggested N changes suggested with', async ({ page }) => {
    // Checkpoint 25: Suggested changes panel header shows `"N change suggested"` / `"N changes suggested"` with singular/plural
    // Section:  > SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Suggested changes panel header shows `\"N change suggested\"` / `\"N changes suggested\"` with singular/plural",
      section: "",
      subsection: "SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-025 ' + "Suggested changes panel header shows `\"N change suggested\"` / `\"N changes suggested\"` with singular/plural");
    }


    // This test validates: Suggested changes panel header shows `"N change suggested"` / `"N changes suggested"` with singular/plural
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Apply to All button only rendered when msgsuggestedChangeslength 1', async ({ page }) => {
    // Checkpoint 26: "Apply to All" button only rendered when `msg.suggestedChanges.length > 1`
    // Section:  > SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"Apply to All\" button only rendered when `msg.suggestedChanges.length > 1`",
      section: "",
      subsection: "SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-026 ' + "\"Apply to All\" button only rendered when `msg.suggestedChanges.length > 1`");
    }


    // This test validates: "Apply to All" button only rendered when `msg.suggestedChanges.length > 1`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Apply button uses ArrowRight icon size 10 Apply to All uses ArrowsOutSimple icon', async ({ page }) => {
    // Checkpoint 27: "Apply" button uses `ArrowRight` icon (size 10), "Apply to All" uses `ArrowsOutSimple` icon (size 10)
    // Section:  > SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"Apply\" button uses `ArrowRight` icon (size 10), \"Apply to All\" uses `ArrowsOutSimple` icon (size 10)",
      section: "",
      subsection: "SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-027 ' + "\"Apply\" button uses `ArrowRight` icon (size 10), \"Apply to All\" uses `ArrowsOutSimple` icon (size 10)");
    }


    // This test validates: "Apply" button uses `ArrowRight` icon (size 10), "Apply to All" uses `ArrowsOutSimple` icon (size 10)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Empty state no messages not loading no stream shows centered text Ask the AI to ', async ({ page }) => {
    // Checkpoint 28: Empty state (no messages, not loading, no stream) shows centered text: "Ask the AI to modify your slides, or pick a quick action above." and slash command hints: `/learn`, `/draft`, `/visual`, `/illustrate`
    // Section:  > SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Empty state (no messages, not loading, no stream) shows centered text: \"Ask the AI to modify your slides, or pick a quick action above.\" and slash command hints: `/learn`, `/draft`, `/visual`, `/illustrate`",
      section: "",
      subsection: "SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-028 ' + "Empty state (no messages, not loading, no stream) shows centered text: \"Ask the AI to modify your slides, or pick a quick action above.\" and slash command hints: `/learn`, `/draft`, `/visual`, `/illustrate`");
    }


    // This test validates: Empty state (no messages, not loading, no stream) shows centered text: "Ask the AI to modify your slides, or pick a quick action above." and slash command hints: `/learn`, `/draft`, `/visual`, `/illustrate`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Send button aria-labelSend message', async ({ page }) => {
    // Checkpoint 29: Send button `aria-label="Send message"`
    // Section:  > SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Send button `aria-label=\"Send message\"`",
      section: "",
      subsection: "SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-029 ' + "Send button `aria-label=\"Send message\"`");
    }


    // This test validates: Send button `aria-label="Send message"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Textarea disabledisLoading send button disabledisLoading inputtrim', async ({ page }) => {
    // Checkpoint 30: Textarea `disabled={isLoading}`, send button `disabled={isLoading || !input.trim()}`
    // Section:  > SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Textarea `disabled={isLoading}`, send button `disabled={isLoading || !input.trim()}`",
      section: "",
      subsection: "SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-030 ' + "Textarea `disabled={isLoading}`, send button `disabled={isLoading || !input.trim()}`");
    }


    // This test validates: Textarea `disabled={isLoading}`, send button `disabled={isLoading || !input.trim()}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: User messages styled bg-brand text-white rounded-br-sm max-w-85', async ({ page }) => {
    // Checkpoint 31: User messages styled: `bg-brand text-white rounded-br-sm`, max-w-[85%]
    // Section:  > SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "User messages styled: `bg-brand text-white rounded-br-sm`, max-w-[85%]",
      section: "",
      subsection: "SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-031 ' + "User messages styled: `bg-brand text-white rounded-br-sm`, max-w-[85%]");
    }


    // This test validates: User messages styled: `bg-brand text-white rounded-br-sm`, max-w-[85%]
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Assistant messages styled bg-surface-raised text-ink border border-border rounde', async ({ page }) => {
    // Checkpoint 32: Assistant messages styled: `bg-surface-raised text-ink border border-border rounded-bl-sm`, max-w-[85%]
    // Section:  > SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Assistant messages styled: `bg-surface-raised text-ink border border-border rounded-bl-sm`, max-w-[85%]",
      section: "",
      subsection: "SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-032 ' + "Assistant messages styled: `bg-surface-raised text-ink border border-border rounded-bl-sm`, max-w-[85%]");
    }


    // This test validates: Assistant messages styled: `bg-surface-raised text-ink border border-border rounded-bl-sm`, max-w-[85%]
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Gamma agent uses LOCAL React state useState for chat messages NOT the stores age', async ({ page }) => {
    // Checkpoint 33: Gamma agent uses LOCAL React state (`useState`) for chat messages, NOT the store's `agentChatHistory`
    // Section:  > GammaAgentPanel — Additional Details (`gamma-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Gamma agent uses LOCAL React state (`useState`) for chat messages, NOT the store's `agentChatHistory`",
      section: "",
      subsection: "GammaAgentPanel — Additional Details (`gamma-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-033 ' + "Gamma agent uses LOCAL React state (`useState`) for chat messages, NOT the store's `agentChatHistory`");
    }


    // This test validates: Gamma agent uses LOCAL React state (`useState`) for chat messages, NOT the store's `agentChatHistory`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Header label is AI Agent with Sparkle icon size 16 weight fill not AI Chat as in', async ({ page }) => {
    // Checkpoint 34: Header label is `"AI Agent"` with Sparkle icon size 16 weight fill (not "AI Chat" as in Slides mode)
    // Section:  > GammaAgentPanel — Additional Details (`gamma-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Header label is `\"AI Agent\"` with Sparkle icon size 16 weight fill (not \"AI Chat\" as in Slides mode)",
      section: "",
      subsection: "GammaAgentPanel — Additional Details (`gamma-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-034 ' + "Header label is `\"AI Agent\"` with Sparkle icon size 16 weight fill (not \"AI Chat\" as in Slides mode)");
    }


    // This test validates: Header label is `"AI Agent"` with Sparkle icon size 16 weight fill (not "AI Chat" as in Slides mode)
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
