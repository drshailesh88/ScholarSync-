/**
 * Auto-generated Playwright test for presentation/spec-015
 * Source: e2e/specs/presentation/spec-015.md
 * Generated: 2026-03-14T19:59:44.412Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts presentation spec-015
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';














import { assertPresentationCheckpoint } from '../../module-assertions/presentation';





test.describe('presentation / spec-015', () => {
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

  test('cp-000: 2712 Count turns amber when 260 characters social-export-modaltsx247', async ({ page }) => {
    // Checkpoint 0: **27.12** Count turns amber when > 260 characters (`social-export-modal.tsx:247`)
    // Section: Social Export > Twitter Thread

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.12** Count turns amber when > 260 characters (`social-export-modal.tsx:247`)",
      section: "Social Export",
      subsection: "Twitter Thread",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-000 **27.12** Count turns amber when > 260 characters (`social-export-modal.tsx:247`)');
    }


    // This test validates: **27.12** Count turns amber when > 260 characters (`social-export-modal.tsx:247`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: 2713 Download txt button for thread social-export-modaltsx383 387', async ({ page }) => {
    // Checkpoint 1: **27.13** Download .txt button for thread (`social-export-modal.tsx:383`, `:387`)
    // Section: Social Export > Twitter Thread

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.13** Download .txt button for thread (`social-export-modal.tsx:383`, `:387`)",
      section: "Social Export",
      subsection: "Twitter Thread",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-001 **27.13** Download .txt button for thread (`social-export-modal.tsx:383`, `:387`)');
    }


    // This test validates: **27.13** Download .txt button for thread (`social-export-modal.tsx:383`, `:387`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: 2714 Copy Thread button toggles to Copied with Check icon for 2 seconds social-e', async ({ page }) => {
    // Checkpoint 2: **27.14** Copy Thread button toggles to "Copied!" with Check icon for 2 seconds (`social-export-modal.tsx:390`, `:393`, `:394`)
    // Section: Social Export > Twitter Thread

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.14** Copy Thread button toggles to \"Copied!\" with Check icon for 2 seconds (`social-export-modal.tsx:390`, `:393`, `:394`)",
      section: "Social Export",
      subsection: "Twitter Thread",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-002 **27.14** Copy Thread button toggles to "Copied!" with Check icon for 2 seconds (`social-export-modal.tsx:390`, `:393`, `:394`)');
    }


    // This test validates: **27.14** Copy Thread button toggles to "Copied!" with Check icon for 2 seconds (`social-export-modal.tsx:390`, `:393`, `:394`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: 2715 Show Created with ScholarSync branding checkbox social-export-modaltsx278 2', async ({ page }) => {
    // Checkpoint 3: **27.15** "Show “Created with ScholarSync” branding" checkbox (`social-export-modal.tsx:278`, `:281`)
    // Section: Social Export > Export Options

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.15** \"Show “Created with ScholarSync” branding\" checkbox (`social-export-modal.tsx:278`, `:281`)",
      section: "Social Export",
      subsection: "Export Options",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-003 **27.15** "Show “Created with ScholarSync” branding" checkbox (`social-export-modal.tsx:278`, `:281`)');
    }


    // This test validates: **27.15** "Show “Created with ScholarSync” branding" checkbox (`social-export-modal.tsx:278`, `:281`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: 2716 Slide limit warning when format has maxSlides total slides social-export-mo', async ({ page }) => {
    // Checkpoint 4: **27.16** Slide limit warning when format has maxSlides < total slides (`social-export-modal.tsx:283`)
    // Section: Social Export > Export Options

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.16** Slide limit warning when format has maxSlides < total slides (`social-export-modal.tsx:283`)",
      section: "Social Export",
      subsection: "Export Options",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-004 **27.16** Slide limit warning when format has maxSlides < total slides (`social-export-modal.tsx:283`)');
    }


    // This test validates: **27.16** Slide limit warning when format has maxSlides < total slides (`social-export-modal.tsx:283`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: 2717 Preview grid shows Preview N slides header social-export-modaltsx292', async ({ page }) => {
    // Checkpoint 5: **27.17** Preview grid shows "Preview (N slides)" header (`social-export-modal.tsx:292`)
    // Section: Social Export > Export Options

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.17** Preview grid shows \"Preview (N slides)\" header (`social-export-modal.tsx:292`)",
      section: "Social Export",
      subsection: "Export Options",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-005 **27.17** Preview grid shows "Preview (N slides)" header (`social-export-modal.tsx:292`)');
    }


    // This test validates: **27.17** Preview grid shows "Preview (N slides)" header (`social-export-modal.tsx:292`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: 2718 Preview uses SocialSlideRenderer component social-export-modaltsx329 358', async ({ page }) => {
    // Checkpoint 6: **27.18** Preview uses SocialSlideRenderer component (`social-export-modal.tsx:329`, `:358`)
    // Section: Social Export > Export Options

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.18** Preview uses SocialSlideRenderer component (`social-export-modal.tsx:329`, `:358`)",
      section: "Social Export",
      subsection: "Export Options",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-006 **27.18** Preview uses SocialSlideRenderer component (`social-export-modal.tsx:329`, `:358`)');
    }


    // This test validates: **27.18** Preview uses SocialSlideRenderer component (`social-export-modal.tsx:329`, `:358`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: 2719 Grid columns adapt portrait formats use 2-3 cols landscape use 2 social-exp', async ({ page }) => {
    // Checkpoint 7: **27.19** Grid columns adapt: portrait formats use 2-3 cols, landscape use 2 (`social-export-modal.tsx:298`)
    // Section: Social Export > Export Options

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.19** Grid columns adapt: portrait formats use 2-3 cols, landscape use 2 (`social-export-modal.tsx:298`)",
      section: "Social Export",
      subsection: "Export Options",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-007 **27.19** Grid columns adapt: portrait formats use 2-3 cols, landscape use 2 (`social-export-modal.tsx:298`)');
    }


    // This test validates: **27.19** Grid columns adapt: portrait formats use 2-3 cols, landscape use 2 (`social-export-modal.tsx:298`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: 2720 Aspect ratio applied from format config social-export-modaltsx310', async ({ page }) => {
    // Checkpoint 8: **27.20** Aspect ratio applied from format config (`social-export-modal.tsx:310`)
    // Section: Social Export > Export Options

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.20** Aspect ratio applied from format config (`social-export-modal.tsx:310`)",
      section: "Social Export",
      subsection: "Export Options",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-008 **27.20** Aspect ratio applied from format config (`social-export-modal.tsx:310`)');
    }


    // This test validates: **27.20** Aspect ratio applied from format config (`social-export-modal.tsx:310`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: 2721 Download button shows Download Images or Download PDF for LinkedIn carousel', async ({ page }) => {
    // Checkpoint 9: **27.21** Download button shows "Download Images" or "Download PDF" for LinkedIn carousel (`social-export-modal.tsx:412`)
    // Section: Social Export > Export Options

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.21** Download button shows \"Download Images\" or \"Download PDF\" for LinkedIn carousel (`social-export-modal.tsx:412`)",
      section: "Social Export",
      subsection: "Export Options",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-009 **27.21** Download button shows "Download Images" or "Download PDF" for LinkedIn carousel (`social-export-modal.tsx:412`)');
    }


    // This test validates: **27.21** Download button shows "Download Images" or "Download PDF" for LinkedIn carousel (`social-export-modal.tsx:412`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: 2722 Exporting state disables download button and shows Exporting with spinner s', async ({ page }) => {
    // Checkpoint 10: **27.22** Exporting state disables download button and shows "Exporting..." with spinner (`social-export-modal.tsx:400`, `:403`, `:406`)
    // Section: Social Export > Export Options

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.22** Exporting state disables download button and shows \"Exporting...\" with spinner (`social-export-modal.tsx:400`, `:403`, `:406`)",
      section: "Social Export",
      subsection: "Export Options",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-010 **27.22** Exporting state disables download button and shows "Exporting..." with spinner (`social-export-modal.tsx:400`, `:403`, `:406`)');
    }


    // This test validates: **27.22** Exporting state disables download button and shows "Exporting..." with spinner (`social-export-modal.tsx:400`, `:403`, `:406`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: 2723 Export errors logged to console social-export-modaltsx100', async ({ page }) => {
    // Checkpoint 11: **27.23** Export errors logged to console (`social-export-modal.tsx:100`)
    // Section: Social Export > Export Options

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.23** Export errors logged to console (`social-export-modal.tsx:100`)",
      section: "Social Export",
      subsection: "Export Options",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-011 **27.23** Export errors logged to console (`social-export-modal.tsx:100`)');
    }


    // This test validates: **27.23** Export errors logged to console (`social-export-modal.tsx:100`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: 2724 Slide number indicator shown when totalSlides 1 social-slide-renderertsx95', async ({ page }) => {
    // Checkpoint 12: **27.24** Slide number indicator shown when totalSlides > 1 (`social-slide-renderer.tsx:95`)
    // Section: Social Export > Social Slide Renderer

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.24** Slide number indicator shown when totalSlides > 1 (`social-slide-renderer.tsx:95`)",
      section: "Social Export",
      subsection: "Social Slide Renderer",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-012 **27.24** Slide number indicator shown when totalSlides > 1 (`social-slide-renderer.tsx:95`)');
    }


    // This test validates: **27.24** Slide number indicator shown when totalSlides > 1 (`social-slide-renderer.tsx:95`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: 2725 Vertical format uses larger paddinggaps than horizontal social-slide-render', async ({ page }) => {
    // Checkpoint 13: **27.25** Vertical format uses larger padding/gaps than horizontal (`social-slide-renderer.tsx:88`, `:117-119`)
    // Section: Social Export > Social Slide Renderer

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.25** Vertical format uses larger padding/gaps than horizontal (`social-slide-renderer.tsx:88`, `:117-119`)",
      section: "Social Export",
      subsection: "Social Slide Renderer",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-013 **27.25** Vertical format uses larger padding/gaps than horizontal (`social-slide-renderer.tsx:88`, `:117-119`)');
    }


    // This test validates: **27.25** Vertical format uses larger padding/gaps than horizontal (`social-slide-renderer.tsx:88`, `:117-119`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: 2726 Title conditionally rendered social-slide-renderertsx124', async ({ page }) => {
    // Checkpoint 14: **27.26** Title conditionally rendered (`social-slide-renderer.tsx:124`)
    // Section: Social Export > Social Slide Renderer

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.26** Title conditionally rendered (`social-slide-renderer.tsx:124`)",
      section: "Social Export",
      subsection: "Social Slide Renderer",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-014 **27.26** Title conditionally rendered (`social-slide-renderer.tsx:124`)');
    }


    // This test validates: **27.26** Title conditionally rendered (`social-slide-renderer.tsx:124`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: 2727 Subtitle conditionally rendered social-slide-renderertsx141', async ({ page }) => {
    // Checkpoint 15: **27.27** Subtitle conditionally rendered (`social-slide-renderer.tsx:141`)
    // Section: Social Export > Social Slide Renderer

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.27** Subtitle conditionally rendered (`social-slide-renderer.tsx:141`)",
      section: "Social Export",
      subsection: "Social Slide Renderer",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-015 **27.27** Subtitle conditionally rendered (`social-slide-renderer.tsx:141`)');
    }


    // This test validates: **27.27** Subtitle conditionally rendered (`social-slide-renderer.tsx:141`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: 2728 Bullet lists support ordered numbered and unordered bullet social-slide-ren', async ({ page }) => {
    // Checkpoint 16: **27.28** Bullet lists support ordered (numbered) and unordered (bullet) (`social-slide-renderer.tsx:199`)
    // Section: Social Export > Social Slide Renderer

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.28** Bullet lists support ordered (numbered) and unordered (bullet) (`social-slide-renderer.tsx:199`)",
      section: "Social Export",
      subsection: "Social Slide Renderer",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-016 **27.28** Bullet lists support ordered (numbered) and unordered (bullet) (`social-slide-renderer.tsx:199`)');
    }


    // This test validates: **27.28** Bullet lists support ordered (numbered) and unordered (bullet) (`social-slide-renderer.tsx:199`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: 2729 Excess bullets show N more text social-slide-renderertsx204 212', async ({ page }) => {
    // Checkpoint 17: **27.29** Excess bullets show `+N more...` text (`social-slide-renderer.tsx:204`, `:212`)
    // Section: Social Export > Social Slide Renderer

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.29** Excess bullets show `+N more...` text (`social-slide-renderer.tsx:204`, `:212`)",
      section: "Social Export",
      subsection: "Social Slide Renderer",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-017 **27.29** Excess bullets show `+N more...` text (`social-slide-renderer.tsx:204`, `:212`)');
    }


    // This test validates: **27.29** Excess bullets show `+N more...` text (`social-slide-renderer.tsx:204`, `:212`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: 2730 Quote attribution conditionally shown social-slide-renderertsx262', async ({ page }) => {
    // Checkpoint 18: **27.30** Quote attribution conditionally shown (`social-slide-renderer.tsx:262`)
    // Section: Social Export > Social Slide Renderer

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.30** Quote attribution conditionally shown (`social-slide-renderer.tsx:262`)",
      section: "Social Export",
      subsection: "Social Slide Renderer",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-018 **27.30** Quote attribution conditionally shown (`social-slide-renderer.tsx:262`)');
    }


    // This test validates: **27.30** Quote attribution conditionally shown (`social-slide-renderer.tsx:262`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: 2731 Callout title conditionally shown social-slide-renderertsx289', async ({ page }) => {
    // Checkpoint 19: **27.31** Callout title conditionally shown (`social-slide-renderer.tsx:289`)
    // Section: Social Export > Social Slide Renderer

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.31** Callout title conditionally shown (`social-slide-renderer.tsx:289`)",
      section: "Social Export",
      subsection: "Social Slide Renderer",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-019 **27.31** Callout title conditionally shown (`social-slide-renderer.tsx:289`)');
    }


    // This test validates: **27.31** Callout title conditionally shown (`social-slide-renderer.tsx:289`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: 2732 Stat result interpretation conditionally shown social-slide-renderertsx346', async ({ page }) => {
    // Checkpoint 20: **27.32** Stat result interpretation conditionally shown (`social-slide-renderer.tsx:346`)
    // Section: Social Export > Social Slide Renderer

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.32** Stat result interpretation conditionally shown (`social-slide-renderer.tsx:346`)",
      section: "Social Export",
      subsection: "Social Slide Renderer",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-020 **27.32** Stat result interpretation conditionally shown (`social-slide-renderer.tsx:346`)');
    }


    // This test validates: **27.32** Stat result interpretation conditionally shown (`social-slide-renderer.tsx:346`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: 2733 Branding footer Created with ScholarSync conditionally shown social-slide-r', async ({ page }) => {
    // Checkpoint 21: **27.33** Branding footer "Created with ScholarSync" conditionally shown (`social-slide-renderer.tsx:368`, `:387`)
    // Section: Social Export > Social Slide Renderer

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**27.33** Branding footer \"Created with ScholarSync\" conditionally shown (`social-slide-renderer.tsx:368`, `:387`)",
      section: "Social Export",
      subsection: "Social Slide Renderer",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-021 **27.33** Branding footer "Created with ScholarSync" conditionally shown (`social-slide-renderer.tsx:368`, `:387`)');
    }


    // This test validates: **27.33** Branding footer "Created with ScholarSync" conditionally shown (`social-slide-renderer.tsx:368`, `:387`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: 281 Three import tabs File Upload Zotero DOI Lookup reference-import-paneltsx299', async ({ page }) => {
    // Checkpoint 22: **28.1** Three import tabs: File Upload, Zotero, DOI Lookup (`reference-import-panel.tsx:299`, `:302`)
    // Section: Reference Import Panel > Tabs

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.1** Three import tabs: File Upload, Zotero, DOI Lookup (`reference-import-panel.tsx:299`, `:302`)",
      section: "Reference Import Panel",
      subsection: "Tabs",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-022 **28.1** Three import tabs: File Upload, Zotero, DOI Lookup (`reference-import-panel.tsx:299`, `:302`)');
    }


    // This test validates: **28.1** Three import tabs: File Upload, Zotero, DOI Lookup (`reference-import-panel.tsx:299`, `:302`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: 282 Active tab shows white bg with shadow reference-import-paneltsx308', async ({ page }) => {
    // Checkpoint 23: **28.2** Active tab shows white bg with shadow (`reference-import-panel.tsx:308`)
    // Section: Reference Import Panel > Tabs

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.2** Active tab shows white bg with shadow (`reference-import-panel.tsx:308`)",
      section: "Reference Import Panel",
      subsection: "Tabs",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-023 **28.2** Active tab shows white bg with shadow (`reference-import-panel.tsx:308`)');
    }


    // This test validates: **28.2** Active tab shows white bg with shadow (`reference-import-panel.tsx:308`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: 283 Drag-and-drop zone for file upload reference-import-paneltsx321 329-330', async ({ page }) => {
    // Checkpoint 24: **28.3** Drag-and-drop zone for file upload (`reference-import-panel.tsx:321`, `:329-330`)
    // Section: Reference Import Panel > File Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.3** Drag-and-drop zone for file upload (`reference-import-panel.tsx:321`, `:329-330`)",
      section: "Reference Import Panel",
      subsection: "File Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-024 **28.3** Drag-and-drop zone for file upload (`reference-import-panel.tsx:321`, `:329-330`)');
    }


    // This test validates: **28.3** Drag-and-drop zone for file upload (`reference-import-panel.tsx:321`, `:329-330`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: 284 Drop zone highlights on drag border-brand bg-brand5 reference-import-panelts', async ({ page }) => {
    // Checkpoint 25: **28.4** Drop zone highlights on drag: `border-brand bg-brand/5` (`reference-import-panel.tsx:333`)
    // Section: Reference Import Panel > File Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.4** Drop zone highlights on drag: `border-brand bg-brand/5` (`reference-import-panel.tsx:333`)",
      section: "Reference Import Panel",
      subsection: "File Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-025 **28.4** Drop zone highlights on drag: `border-brand bg-brand/5` (`reference-import-panel.tsx:333`)');
    }


    // This test validates: **28.4** Drop zone highlights on drag: `border-brand bg-brand/5` (`reference-import-panel.tsx:333`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: 285 FileArrowUp icon changes color on drag reference-import-paneltsx338 341', async ({ page }) => {
    // Checkpoint 26: **28.5** FileArrowUp icon changes color on drag (`reference-import-panel.tsx:338`, `:341`)
    // Section: Reference Import Panel > File Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.5** FileArrowUp icon changes color on drag (`reference-import-panel.tsx:338`, `:341`)",
      section: "Reference Import Panel",
      subsection: "File Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-026 **28.5** FileArrowUp icon changes color on drag (`reference-import-panel.tsx:338`, `:341`)');
    }


    // This test validates: **28.5** FileArrowUp icon changes color on drag (`reference-import-panel.tsx:338`, `:341`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: 286 Drop text Drop a bib or ris file here reference-import-paneltsx346', async ({ page }) => {
    // Checkpoint 27: **28.6** Drop text: "Drop a .bib or .ris file here" (`reference-import-panel.tsx:346`)
    // Section: Reference Import Panel > File Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.6** Drop text: \"Drop a .bib or .ris file here\" (`reference-import-panel.tsx:346`)",
      section: "Reference Import Panel",
      subsection: "File Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-027 **28.6** Drop text: "Drop a .bib or .ris file here" (`reference-import-panel.tsx:346`)');
    }


    // This test validates: **28.6** Drop text: "Drop a .bib or .ris file here" (`reference-import-panel.tsx:346`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: 287 or click to browse sub-text reference-import-paneltsx349', async ({ page }) => {
    // Checkpoint 28: **28.7** "or click to browse" sub-text (`reference-import-panel.tsx:349`)
    // Section: Reference Import Panel > File Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.7** \"or click to browse\" sub-text (`reference-import-panel.tsx:349`)",
      section: "Reference Import Panel",
      subsection: "File Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-028 **28.7** "or click to browse" sub-text (`reference-import-panel.tsx:349`)');
    }


    // This test validates: **28.7** "or click to browse" sub-text (`reference-import-panel.tsx:349`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: 288 Format support text Supports BibTeX bib RIS ris and CSL-JSON json reference-', async ({ page }) => {
    // Checkpoint 29: **28.8** Format support text: "Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)" (`reference-import-panel.tsx:352`)
    // Section: Reference Import Panel > File Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.8** Format support text: \"Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)\" (`reference-import-panel.tsx:352`)",
      section: "Reference Import Panel",
      subsection: "File Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-029 **28.8** Format support text: "Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)" (`reference-import-panel.tsx:352`)');
    }


    // This test validates: **28.8** Format support text: "Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)" (`reference-import-panel.tsx:352`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: 289 Hidden file input for click-to-browse reference-import-paneltsx358', async ({ page }) => {
    // Checkpoint 30: **28.9** Hidden file input for click-to-browse (`reference-import-panel.tsx:358`)
    // Section: Reference Import Panel > File Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.9** Hidden file input for click-to-browse (`reference-import-panel.tsx:358`)",
      section: "Reference Import Panel",
      subsection: "File Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-030 **28.9** Hidden file input for click-to-browse (`reference-import-panel.tsx:358`)');
    }


    // This test validates: **28.9** Hidden file input for click-to-browse (`reference-import-panel.tsx:358`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: 2810 Mendeley tip Tip Export your Mendeley library as BibTeX then upload here re', async ({ page }) => {
    // Checkpoint 31: **28.10** Mendeley tip: "Tip: Export your Mendeley library as BibTeX, then upload here." (`reference-import-panel.tsx:363`)
    // Section: Reference Import Panel > File Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.10** Mendeley tip: \"Tip: Export your Mendeley library as BibTeX, then upload here.\" (`reference-import-panel.tsx:363`)",
      section: "Reference Import Panel",
      subsection: "File Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-031 **28.10** Mendeley tip: "Tip: Export your Mendeley library as BibTeX, then upload here." (`reference-import-panel.tsx:363`)');
    }


    // This test validates: **28.10** Mendeley tip: "Tip: Export your Mendeley library as BibTeX, then upload here." (`reference-import-panel.tsx:363`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: 2811 Parse errors show error message or fallback Parse failed reference-import-p', async ({ page }) => {
    // Checkpoint 32: **28.11** Parse errors show error message or fallback "Parse failed" (`reference-import-panel.tsx:100`)
    // Section: Reference Import Panel > File Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.11** Parse errors show error message or fallback \"Parse failed\" (`reference-import-panel.tsx:100`)",
      section: "Reference Import Panel",
      subsection: "File Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-032 **28.11** Parse errors show error message or fallback "Parse failed" (`reference-import-panel.tsx:100`)');
    }


    // This test validates: **28.11** Parse errors show error message or fallback "Parse failed" (`reference-import-panel.tsx:100`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: 2812 API POST apireferencesparse reference-import-paneltsx75', async ({ page }) => {
    // Checkpoint 33: **28.12** API: POST /api/references/parse (`reference-import-panel.tsx:75`)
    // Section: Reference Import Panel > File Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.12** API: POST /api/references/parse (`reference-import-panel.tsx:75`)",
      section: "Reference Import Panel",
      subsection: "File Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-033 **28.12** API: POST /api/references/parse (`reference-import-panel.tsx:75`)');
    }


    // This test validates: **28.12** API: POST /api/references/parse (`reference-import-panel.tsx:75`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: 2813 Instructions with link to zoteroorgsettingskeys reference-import-paneltsx36', async ({ page }) => {
    // Checkpoint 34: **28.13** Instructions with link to zotero.org/settings/keys (`reference-import-panel.tsx:369`, `:372`, `:374`, `:379`)
    // Section: Reference Import Panel > Zotero Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.13** Instructions with link to zotero.org/settings/keys (`reference-import-panel.tsx:369`, `:372`, `:374`, `:379`)",
      section: "Reference Import Panel",
      subsection: "Zotero Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-034 **28.13** Instructions with link to zotero.org/settings/keys (`reference-import-panel.tsx:369`, `:372`, `:374`, `:379`)');
    }


    // This test validates: **28.13** Instructions with link to zotero.org/settings/keys (`reference-import-panel.tsx:369`, `:372`, `:374`, `:379`)
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
