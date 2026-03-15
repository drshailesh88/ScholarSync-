/**
 * Auto-generated Playwright test for slides-ai/spec-001
 * Source: e2e/specs/slides-ai/spec-001.md
 * Generated: 2026-03-14T22:05:06.482Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts slides-ai spec-001
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';













import { assertSlidesCheckpoint } from '../../module-assertions/slides';






test.describe('slides-ai / spec-001', () => {
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

  test('cp-000: Mode selector displayed in toolbar with two buttons Slides and Create', async ({ page }) => {
    // Checkpoint 0: Mode selector displayed in toolbar with two buttons: "Slides" and "Create"
    // Section:  > 1. Mode Selector Toggle

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Mode selector displayed in toolbar with two buttons: \"Slides\" and \"Create\"",
      section: "",
      subsection: "1. Mode Selector Toggle",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-000 Mode selector displayed in toolbar with two buttons: "Slides" and "Create"');
    }


    // This test validates: Mode selector displayed in toolbar with two buttons: "Slides" and "Create"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Active mode highlighted with brand-colored background white text', async ({ page }) => {
    // Checkpoint 1: Active mode highlighted with brand-colored background + white text
    // Section:  > 1. Mode Selector Toggle

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Active mode highlighted with brand-colored background + white text",
      section: "",
      subsection: "1. Mode Selector Toggle",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-001 Active mode highlighted with brand-colored background + white text');
    }


    // This test validates: Active mode highlighted with brand-colored background + white text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Inactive mode shows muted text hover highlights', async ({ page }) => {
    // Checkpoint 2: Inactive mode shows muted text, hover highlights
    // Section:  > 1. Mode Selector Toggle

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Inactive mode shows muted text, hover highlights",
      section: "",
      subsection: "1. Mode Selector Toggle",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-002 Inactive mode shows muted text, hover highlights');
    }


    // This test validates: Inactive mode shows muted text, hover highlights
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Clicking Slides switches to PowerPoint-style editing', async ({ page }) => {
    // Checkpoint 3: Clicking "Slides" switches to PowerPoint-style editing
    // Section:  > 1. Mode Selector Toggle

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Clicking \"Slides\" switches to PowerPoint-style editing",
      section: "",
      subsection: "1. Mode Selector Toggle",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-003 Clicking "Slides" switches to PowerPoint-style editing');
    }


    // This test validates: Clicking "Slides" switches to PowerPoint-style editing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Clicking Create switches to Gamma card-based editing', async ({ page }) => {
    // Checkpoint 4: Clicking "Create" switches to Gamma card-based editing
    // Section:  > 1. Mode Selector Toggle

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Clicking \"Create\" switches to Gamma card-based editing",
      section: "",
      subsection: "1. Mode Selector Toggle",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-004 Clicking "Create" switches to Gamma card-based editing');
    }


    // This test validates: Clicking "Create" switches to Gamma card-based editing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Mode persists across navigation within the deck', async ({ page }) => {
    // Checkpoint 5: Mode persists across navigation within the deck
    // Section:  > 1. Mode Selector Toggle

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Mode persists across navigation within the deck",
      section: "",
      subsection: "1. Mode Selector Toggle",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-005 Mode persists across navigation within the deck');
    }


    // This test validates: Mode persists across navigation within the deck
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Full-screen mode selection displayed for new decks', async ({ page }) => {
    // Checkpoint 6: Full-screen mode selection displayed for new decks
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Full-screen mode selection displayed for new decks",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-006 Full-screen mode selection displayed for new decks');
    }


    // This test validates: Full-screen mode selection displayed for new decks
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: How do you want to work heading with subtitle You can switch anytime', async ({ page }) => {
    // Checkpoint 7: "How do you want to work?" heading with subtitle "You can switch anytime"
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"How do you want to work?\" heading with subtitle \"You can switch anytime\"",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-007 "How do you want to work?" heading with subtitle "You can switch anytime"');
    }


    // This test validates: "How do you want to work?" heading with subtitle "You can switch anytime"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Slides Mode card', async ({ page }) => {
    // Checkpoint 8: **Slides Mode card:**
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "**Slides Mode card:**",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-008 **Slides Mode card:**');
    }


    // This test validates: **Slides Mode card:**
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Slide-layout icon 16x16 rounded brand colors', async ({ page }) => {
    // Checkpoint 9: Slide-layout icon (16x16 rounded, brand colors)
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Slide-layout icon (16x16 rounded, brand colors)",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-009 Slide-layout icon (16x16 rounded, brand colors)');
    }


    // This test validates: Slide-layout icon (16x16 rounded, brand colors)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Slides Mode title', async ({ page }) => {
    // Checkpoint 10: "Slides Mode" title
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"Slides Mode\" title",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-010 "Slides Mode" title');
    }


    // This test validates: "Slides Mode" title
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Click and build like PowerPoint description', async ({ page }) => {
    // Checkpoint 11: "Click and build like PowerPoint" description
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"Click and build like PowerPoint\" description",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-011 "Click and build like PowerPoint" description');
    }


    // This test validates: "Click and build like PowerPoint" description
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Hover border brand background brand5', async ({ page }) => {
    // Checkpoint 12: Hover: border → brand, background → brand/5
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Hover: border → brand, background → brand/5",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-012 Hover: border → brand, background → brand/5');
    }


    // This test validates: Hover: border → brand, background → brand/5
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Create Mode card', async ({ page }) => {
    // Checkpoint 13: **Create Mode card:**
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "**Create Mode card:**",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-013 **Create Mode card:**');
    }


    // This test validates: **Create Mode card:**
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Star icon brand colors', async ({ page }) => {
    // Checkpoint 14: Star icon (brand colors)
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Star icon (brand colors)",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-014 Star icon (brand colors)');
    }


    // This test validates: Star icon (brand colors)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Create Mode title', async ({ page }) => {
    // Checkpoint 15: "Create Mode" title
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"Create Mode\" title",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-015 "Create Mode" title');
    }


    // This test validates: "Create Mode" title
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: AI builds it you refine description', async ({ page }) => {
    // Checkpoint 16: "AI builds it, you refine" description
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"AI builds it, you refine\" description",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-016 "AI builds it, you refine" description');
    }


    // This test validates: "AI builds it, you refine" description
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Hover same interaction as Slides card', async ({ page }) => {
    // Checkpoint 17: Hover: same interaction as Slides card
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Hover: same interaction as Slides card",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-017 Hover: same interaction as Slides card');
    }


    // This test validates: Hover: same interaction as Slides card
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Selecting either mode navigates to the appropriate editor', async ({ page }) => {
    // Checkpoint 18: Selecting either mode navigates to the appropriate editor
    // Section:  > 2. Mode Selection Screen (First-Time Entry)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Selecting either mode navigates to the appropriate editor",
      section: "",
      subsection: "2. Mode Selection Screen (First-Time Entry)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-018 Selecting either mode navigates to the appropriate editor');
    }


    // This test validates: Selecting either mode navigates to the appropriate editor
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: AI Chat label with Sparkle icon', async ({ page }) => {
    // Checkpoint 19: "AI Chat" label with Sparkle icon
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"AI Chat\" label with Sparkle icon",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-019 "AI Chat" label with Sparkle icon');
    }


    // This test validates: "AI Chat" label with Sparkle icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Panel opens as right sidebar in Slides Mode', async ({ page }) => {
    // Checkpoint 20: Panel opens as right sidebar in Slides Mode
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Panel opens as right sidebar in Slides Mode",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-020 Panel opens as right sidebar in Slides Mode');
    }


    // This test validates: Panel opens as right sidebar in Slides Mode
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Toggled via right panel selector properties agent', async ({ page }) => {
    // Checkpoint 21: Toggled via right panel selector (properties → agent)
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Toggled via right panel selector (properties → agent)",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-021 Toggled via right panel selector (properties → agent)');
    }


    // This test validates: Toggled via right panel selector (properties → agent)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Badge showing selected block type with icon', async ({ page }) => {
    // Checkpoint 22: Badge showing selected block type with icon:
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Badge showing selected block type with icon:",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-022 Badge showing selected block type with icon:');
    }


    // This test validates: Badge showing selected block type with icon:
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: TextBulletsQuoteCallout TextAa icon', async ({ page }) => {
    // Checkpoint 23: Text/Bullets/Quote/Callout → TextAa icon
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Text/Bullets/Quote/Callout → TextAa icon",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-023 Text/Bullets/Quote/Callout → TextAa icon');
    }


    // This test validates: Text/Bullets/Quote/Callout → TextAa icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Chart ChartBar icon', async ({ page }) => {
    // Checkpoint 24: Chart → ChartBar icon
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Chart → ChartBar icon",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-024 Chart → ChartBar icon');
    }


    // This test validates: Chart → ChartBar icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: ImageIllustration Image icon', async ({ page }) => {
    // Checkpoint 25: Image/Illustration → Image icon
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Image/Illustration → Image icon",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-025 Image/Illustration → Image icon');
    }


    // This test validates: Image/Illustration → Image icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Table Table icon', async ({ page }) => {
    // Checkpoint 26: Table → Table icon
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Table → Table icon",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-026 Table → Table icon');
    }


    // This test validates: Table → Table icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: No block selected shows slide-level context', async ({ page }) => {
    // Checkpoint 27: No block selected → shows slide-level context
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "No block selected → shows slide-level context",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-027 No block selected → shows slide-level context');
    }


    // This test validates: No block selected → shows slide-level context
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Context updates when selection changes', async ({ page }) => {
    // Checkpoint 28: Context updates when selection changes
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Context updates when selection changes",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-028 Context updates when selection changes');
    }


    // This test validates: Context updates when selection changes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Default actions no block or unknown block', async ({ page }) => {
    // Checkpoint 29: **Default actions** (no block or unknown block):
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "**Default actions** (no block or unknown block):",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-029 **Default actions** (no block or unknown block):');
    }


    // This test validates: **Default actions** (no block or unknown block):
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Improve this slide', async ({ page }) => {
    // Checkpoint 30: "Improve this slide"
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"Improve this slide\"",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-030 "Improve this slide"');
    }


    // This test validates: "Improve this slide"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Add more detail', async ({ page }) => {
    // Checkpoint 31: "Add more detail"
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"Add more detail\"",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-031 "Add more detail"');
    }


    // This test validates: "Add more detail"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Simplify', async ({ page }) => {
    // Checkpoint 32: "Simplify"
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"Simplify\"",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-032 "Simplify"');
    }


    // This test validates: "Simplify"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Add citations', async ({ page }) => {
    // Checkpoint 33: "Add citations"
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"Add citations\"",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-033 "Add citations"');
    }


    // This test validates: "Add citations"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Fix formatting', async ({ page }) => {
    // Checkpoint 34: "Fix formatting"
    // Section:  > 3. Slides Agent Panel (`slides-agent-panel.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "\"Fix formatting\"",
      section: "",
      subsection: "3. Slides Agent Panel (`slides-agent-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-034 "Fix formatting"');
    }


    // This test validates: "Fix formatting"
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
