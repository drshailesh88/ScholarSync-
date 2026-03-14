/**
 * Auto-generated Playwright test for presentation/spec-025
 * Source: e2e/specs/presentation/spec-025.md
 * Generated: 2026-03-14T20:11:46.271Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts presentation spec-025
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';














import { assertPresentationCheckpoint } from '../../module-assertions/presentation';





test.describe('presentation / spec-025', () => {
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

  test('cp-000: Completed steps show Check icon current step bg-brand10 text-brand border-brand ', async ({ page }) => {
    // Checkpoint 0: Completed steps show `Check` icon; current step: `bg-brand/10 text-brand border-brand`; future: `bg-surface-raised text-ink-muted`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Completed steps show `Check` icon; current step: `bg-brand/10 text-brand border-brand`; future: `bg-surface-raised text-ink-muted`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-000 Completed steps show `Check` icon; current step: `bg-brand/10 text-brand border-brand`; future: `bg-surface-raised text-ink-muted`');
    }


    // This test validates: Completed steps show `Check` icon; current step: `bg-brand/10 text-brand border-brand`; future: `bg-surface-raised text-ink-muted`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Steps separated by w-8 h-px bg-border dividers', async ({ page }) => {
    // Checkpoint 1: Steps separated by `w-8 h-px bg-border` dividers
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Steps separated by `w-8 h-px bg-border` dividers",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-001 Steps separated by `w-8 h-px bg-border` dividers');
    }


    // This test validates: Steps separated by `w-8 h-px bg-border` dividers
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Heading Select Source Material with subheading Choose where to generate your pre', async ({ page }) => {
    // Checkpoint 2: Heading `"Select Source Material"` with subheading `"Choose where to generate your presentation from"`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Heading `\"Select Source Material\"` with subheading `\"Choose where to generate your presentation from\"`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-002 Heading `"Select Source Material"` with subheading `"Choose where to generate your presentation from"`');
    }


    // This test validates: Heading `"Select Source Material"` with subheading `"Choose where to generate your presentation from"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Deep Research full-width card with Sparkle icon text From Deep Research descript', async ({ page }) => {
    // Checkpoint 3: Deep Research: full-width card with `Sparkle` icon, text `"From Deep Research"`, description `"Import findings from a Deep Research session"`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Deep Research: full-width card with `Sparkle` icon, text `\"From Deep Research\"`, description `\"Import findings from a Deep Research session\"`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-003 Deep Research: full-width card with `Sparkle` icon, text `"From Deep Research"`, description `"Import findings from a Deep Research session"`');
    }


    // This test validates: Deep Research: full-width card with `Sparkle` icon, text `"From Deep Research"`, description `"Import findings from a Deep Research session"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Deep Research input typenumber placeholder Deep Research session ID only renders', async ({ page }) => {
    // Checkpoint 4: Deep Research input: `type="number"` placeholder `"Deep Research session ID"`; only renders when `sourceType === "deep_research"`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Deep Research input: `type=\"number\"` placeholder `\"Deep Research session ID\"`; only renders when `sourceType === \"deep_research\"`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-004 Deep Research input: `type="number"` placeholder `"Deep Research session ID"`; only renders when `sourceType === "deep_research"`');
    }


    // This test validates: Deep Research input: `type="number"` placeholder `"Deep Research session ID"`; only renders when `sourceType === "deep_research"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Text validation rawTexttrimlength 50 URL validation at least one fetched source ', async ({ page }) => {
    // Checkpoint 5: Text validation: `rawText.trim().length > 50`; URL validation: at least one fetched source; Import deck: `importedDeck != null`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Text validation: `rawText.trim().length > 50`; URL validation: at least one fetched source; Import deck: `importedDeck != null`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-005 Text validation: `rawText.trim().length > 50`; URL validation: at least one fetched source; Import deck: `importedDeck != null`');
    }


    // This test validates: Text validation: `rawText.trim().length > 50`; URL validation: at least one fetched source; Import deck: `importedDeck != null`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Disabled Next bg-surface-raised text-ink-muted cursor-not-allowed', async ({ page }) => {
    // Checkpoint 6: Disabled Next: `bg-surface-raised text-ink-muted cursor-not-allowed`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Disabled Next: `bg-surface-raised text-ink-muted cursor-not-allowed`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-006 Disabled Next: `bg-surface-raised text-ink-muted cursor-not-allowed`');
    }


    // This test validates: Disabled Next: `bg-surface-raised text-ink-muted cursor-not-allowed`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Heading Template Audience sub Choose a presentation template and target audience', async ({ page }) => {
    // Checkpoint 7: Heading `"Template & Audience"` sub `"Choose a presentation template and target audience"`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Heading `\"Template & Audience\"` sub `\"Choose a presentation template and target audience\"`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-007 Heading `"Template & Audience"` sub `"Choose a presentation template and target audience"`');
    }


    // This test validates: Heading `"Template & Audience"` sub `"Choose a presentation template and target audience"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Template label Presentation Template with optional uses TemplateSelector with on', async ({ page }) => {
    // Checkpoint 8: Template label: `"Presentation Template"` with `"(optional)"`; uses `TemplateSelector` with `onAudienceChange`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Template label: `\"Presentation Template\"` with `\"(optional)\"`; uses `TemplateSelector` with `onAudienceChange`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-008 Template label: `"Presentation Template"` with `"(optional)"`; uses `TemplateSelector` with `onAudienceChange`');
    }


    // This test validates: Template label: `"Presentation Template"` with `"(optional)"`; uses `TemplateSelector` with `onAudienceChange`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: 10 audience pill buttons General Thesis Defense Conference Journal Club Classroo', async ({ page }) => {
    // Checkpoint 9: 10 audience pill buttons: General, Thesis Defense, Conference, Journal Club, Classroom, Grant Presentation, Poster Session, Systematic Review, Patient Case, Grand Rounds
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "10 audience pill buttons: General, Thesis Defense, Conference, Journal Club, Classroom, Grant Presentation, Poster Session, Systematic Review, Patient Case, Grand Rounds",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-009 10 audience pill buttons: General, Thesis Defense, Conference, Journal Club, Classroom, Grant Presentation, Poster Session, Systematic Review, Patient Case, Grand Rounds');
    }


    // This test validates: 10 audience pill buttons: General, Thesis Defense, Conference, Journal Club, Classroom, Grant Presentation, Poster Session, Systematic Review, Patient Case, Grand Rounds
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Selected audience border-brand bg-brand5 text-brand Next always enabled Back pre', async ({ page }) => {
    // Checkpoint 10: Selected audience: `border-brand bg-brand/5 text-brand`; Next always enabled; Back preserves source state
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Selected audience: `border-brand bg-brand/5 text-brand`; Next always enabled; Back preserves source state",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-010 Selected audience: `border-brand bg-brand/5 text-brand`; Next always enabled; Back preserves source state');
    }


    // This test validates: Selected audience: `border-brand bg-brand/5 text-brand`; Next always enabled; Back preserves source state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Heading Configure Presentation sub Set title theme and generation preferences', async ({ page }) => {
    // Checkpoint 11: Heading `"Configure Presentation"` sub `"Set title, theme, and generation preferences"`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Heading `\"Configure Presentation\"` sub `\"Set title, theme, and generation preferences\"`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-011 Heading `"Configure Presentation"` sub `"Set title, theme, and generation preferences"`');
    }


    // This test validates: Heading `"Configure Presentation"` sub `"Set title, theme, and generation preferences"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Title placeholder Presentation title with autoFocus slide count label Target Sli', async ({ page }) => {
    // Checkpoint 12: Title placeholder `"Presentation title"` with `autoFocus`; slide count label `"Target Slide Count: {slideCount}"` range min=5 max=30
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Title placeholder `\"Presentation title\"` with `autoFocus`; slide count label `\"Target Slide Count: {slideCount}\"` range min=5 max=30",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-012 Title placeholder `"Presentation title"` with `autoFocus`; slide count label `"Target Slide Count: {slideCount}"` range min=5 max=30');
    }


    // This test validates: Title placeholder `"Presentation title"` with `autoFocus`; slide count label `"Target Slide Count: {slideCount}"` range min=5 max=30
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Citation style label Citation Style as pill buttons theme label Theme in grid gr', async ({ page }) => {
    // Checkpoint 13: Citation style label `"Citation Style"` as pill buttons; theme label `"Theme"` in `grid grid-cols-7 gap-2`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Citation style label `\"Citation Style\"` as pill buttons; theme label `\"Theme\"` in `grid grid-cols-7 gap-2`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-013 Citation style label `"Citation Style"` as pill buttons; theme label `"Theme"` in `grid grid-cols-7 gap-2`');
    }


    // This test validates: Citation style label `"Citation Style"` as pill buttons; theme label `"Theme"` in `grid grid-cols-7 gap-2`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Theme tiles aspect-video with name at text-8px font-bold selected border-brand r', async ({ page }) => {
    // Checkpoint 14: Theme tiles: `aspect-video` with name at `text-[8px] font-bold`; selected: `border-brand ring-1 ring-brand/30`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Theme tiles: `aspect-video` with name at `text-[8px] font-bold`; selected: `border-brand ring-1 ring-brand/30`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-014 Theme tiles: `aspect-video` with name at `text-[8px] font-bold`; selected: `border-brand ring-1 ring-brand/30`');
    }


    // This test validates: Theme tiles: `aspect-video` with name at `text-[8px] font-bold`; selected: `border-brand ring-1 ring-brand/30`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Structure preview toggle Template Structure Preview name with CaretUpCaretDown m', async ({ page }) => {
    // Checkpoint 15: Structure preview toggle: `"Template Structure Preview ({name})"` with CaretUp/CaretDown; `max-h-64 overflow-y-auto`; shows numeric slot index, title, (optional), guidance (line-clamp-1), layout name
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Structure preview toggle: `\"Template Structure Preview ({name})\"` with CaretUp/CaretDown; `max-h-64 overflow-y-auto`; shows numeric slot index, title, (optional), guidance (line-clamp-1), layout name",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-015 Structure preview toggle: `"Template Structure Preview ({name})"` with CaretUp/CaretDown; `max-h-64 overflow-y-auto`; shows numeric slot index, title, (optional), guidance (line-clamp-1), layout name');
    }


    // This test validates: Structure preview toggle: `"Template Structure Preview ({name})"` with CaretUp/CaretDown; `max-h-64 overflow-y-auto`; shows numeric slot index, title, (optional), guidance (line-clamp-1), layout name
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Instructions label Additional Instructions optional placeholder eg Focus on meth', async ({ page }) => {
    // Checkpoint 16: Instructions label `"Additional Instructions"` `"(optional)"`; placeholder `"e.g., Focus on methodology, include more charts..."`; 3 rows; empty sent as `undefined`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Instructions label `\"Additional Instructions\"` `\"(optional)\"`; placeholder `\"e.g., Focus on methodology, include more charts...\"`; 3 rows; empty sent as `undefined`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-016 Instructions label `"Additional Instructions"` `"(optional)"`; placeholder `"e.g., Focus on methodology, include more charts..."`; 3 rows; empty sent as `undefined`');
    }


    // This test validates: Instructions label `"Additional Instructions"` `"(optional)"`; placeholder `"e.g., Focus on methodology, include more charts..."`; 3 rows; empty sent as `undefined`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Generate button Sparkle icon Generate disabled when titletrimlength 0', async ({ page }) => {
    // Checkpoint 17: Generate button: `Sparkle` icon + `"Generate"`; disabled when `title.trim().length === 0`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Generate button: `Sparkle` icon + `\"Generate\"`; disabled when `title.trim().length === 0`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-017 Generate button: `Sparkle` icon + `"Generate"`; disabled when `title.trim().length === 0`');
    }


    // This test validates: Generate button: `Sparkle` icon + `"Generate"`; disabled when `title.trim().length === 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Heading Generating Presentation sub AI is creating your slide deck', async ({ page }) => {
    // Checkpoint 18: Heading `"Generating Presentation"` sub `"AI is creating your slide deck"`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Heading `\"Generating Presentation\"` sub `\"AI is creating your slide deck\"`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-018 Heading `"Generating Presentation"` sub `"AI is creating your slide deck"`');
    }


    // This test validates: Heading `"Generating Presentation"` sub `"AI is creating your slide deck"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Progress rows Preprocessing content Generating slides Generating bibliography', async ({ page }) => {
    // Checkpoint 19: Progress rows: `"Preprocessing content"`, `"Generating slides"`, `"Generating bibliography"`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Progress rows: `\"Preprocessing content\"`, `\"Generating slides\"`, `\"Generating bibliography\"`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-019 Progress rows: `"Preprocessing content"`, `"Generating slides"`, `"Generating bibliography"`');
    }


    // This test validates: Progress rows: `"Preprocessing content"`, `"Generating slides"`, `"Generating bibliography"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: 4 states pending empty circle loading CircleNotch brand spin done green Check bo', async ({ page }) => {
    // Checkpoint 20: 4 states: pending (empty circle), loading (CircleNotch brand spin), done (green Check bold), error (red Warning)
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "4 states: pending (empty circle), loading (CircleNotch brand spin), done (green Check bold), error (red Warning)",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-020 4 states: pending (empty circle), loading (CircleNotch brand spin), done (green Check bold), error (red Warning)');
    }


    // This test validates: 4 states: pending (empty circle), loading (CircleNotch brand spin), done (green Check bold), error (red Warning)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: handleStartGeneration calls setStep3 then handlePreprocess step changes before p', async ({ page }) => {
    // Checkpoint 21: `handleStartGeneration` calls `setStep(3)` then `handlePreprocess()` — step changes before preprocess
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "`handleStartGeneration` calls `setStep(3)` then `handlePreprocess()` — step changes before preprocess",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-021 `handleStartGeneration` calls `setStep(3)` then `handlePreprocess()` — step changes before preprocess');
    }


    // This test validates: `handleStartGeneration` calls `setStep(3)` then `handlePreprocess()` — step changes before preprocess
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: AutoTrigger 500ms setTimeout fires handleGenerate when preprocessedData generati', async ({ page }) => {
    // Checkpoint 22: `AutoTrigger`: 500ms setTimeout fires `handleGenerate` when `preprocessedData && !generating && !generationResult && !error`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "`AutoTrigger`: 500ms setTimeout fires `handleGenerate` when `preprocessedData && !generating && !generationResult && !error`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-022 `AutoTrigger`: 500ms setTimeout fires `handleGenerate` when `preprocessedData && !generating && !generationResult && !error`');
    }


    // This test validates: `AutoTrigger`: 500ms setTimeout fires `handleGenerate` when `preprocessedData && !generating && !generationResult && !error`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Bibliography simulated 1500ms timeout after slides succeed', async ({ page }) => {
    // Checkpoint 23: Bibliography: simulated 1500ms timeout after slides succeed
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Bibliography: simulated 1500ms timeout after slides succeed",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-023 Bibliography: simulated 1500ms timeout after slides succeed');
    }


    // This test validates: Bibliography: simulated 1500ms timeout after slides succeed
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Success Generated slideCount slides successfully optional using the name templat', async ({ page }) => {
    // Checkpoint 24: Success: `"Generated {slideCount} slides successfully"` + optional `" using the {name} template"`; green `bg-green-500/10`; CTA `"Open Presentation"` with ArrowRight
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Success: `\"Generated {slideCount} slides successfully\"` + optional `\" using the {name} template\"`; green `bg-green-500/10`; CTA `\"Open Presentation\"` with ArrowRight",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-024 Success: `"Generated {slideCount} slides successfully"` + optional `" using the {name} template"`; green `bg-green-500/10`; CTA `"Open Presentation"` with ArrowRight');
    }


    // This test validates: Success: `"Generated {slideCount} slides successfully"` + optional `" using the {name} template"`; green `bg-green-500/10`; CTA `"Open Presentation"` with ArrowRight
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Error red bg-red-50010 with Warning Retry reruns preprocess if empty else handle', async ({ page }) => {
    // Checkpoint 25: Error: red `bg-red-500/10` with Warning; Retry reruns preprocess if empty else handleGenerate; Back resets error+data+result to step 2
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Error: red `bg-red-500/10` with Warning; Retry reruns preprocess if empty else handleGenerate; Back resets error+data+result to step 2",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-025 Error: red `bg-red-500/10` with Warning; Retry reruns preprocess if empty else handleGenerate; Back resets error+data+result to step 2');
    }


    // This test validates: Error: red `bg-red-500/10` with Warning; Retry reruns preprocess if empty else handleGenerate; Back resets error+data+result to step 2
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: References text formatReferencesAsContent URL text fetch apislidesfetch-url per ', async ({ page }) => {
    // Checkpoint 26: References → `"text"` + `formatReferencesAsContent`; URL → `"text"` + fetch `/api/slides/fetch-url` per source + concatenate `"--- Source: {title} ---"`; Import → `"text"` + `importedDeck.sourceText`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "References → `\"text\"` + `formatReferencesAsContent`; URL → `\"text\"` + fetch `/api/slides/fetch-url` per source + concatenate `\"--- Source: {title} ---\"`; Import → `\"text\"` + `importedDeck.sourceText`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-026 References → `"text"` + `formatReferencesAsContent`; URL → `"text"` + fetch `/api/slides/fetch-url` per source + concatenate `"--- Source: {title} ---"`; Import → `"text"` + `importedDeck.sourceText`');
    }


    // This test validates: References → `"text"` + `formatReferencesAsContent`; URL → `"text"` + fetch `/api/slides/fetch-url` per source + concatenate `"--- Source: {title} ---"`; Import → `"text"` + `importedDeck.sourceText`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Stream getReader TextDecoder only 0 prefixed lines parsed via JSONparse malforme', async ({ page }) => {
    // Checkpoint 27: Stream: `getReader()` + `TextDecoder`; only `"0:"` prefixed lines parsed via `JSON.parse`; malformed skipped silently
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Stream: `getReader()` + `TextDecoder`; only `\"0:\"` prefixed lines parsed via `JSON.parse`; malformed skipped silently",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-027 Stream: `getReader()` + `TextDecoder`; only `"0:"` prefixed lines parsed via `JSON.parse`; malformed skipped silently');
    }


    // This test validates: Stream: `getReader()` + `TextDecoder`; only `"0:"` prefixed lines parsed via `JSON.parse`; malformed skipped silently
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Generate request sends preprocessedData title audienceType slideCount themeKey o', async ({ page }) => {
    // Checkpoint 28: Generate request sends: `preprocessedData`, `title`, `audienceType`, `slideCount`, `themeKey`, optional `additionalInstructions`, optional `templateId`, `citationStyle`
    // Section: Reference Import Panel > GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Generate request sends: `preprocessedData`, `title`, `audienceType`, `slideCount`, `themeKey`, optional `additionalInstructions`, optional `templateId`, `citationStyle`",
      section: "Reference Import Panel",
      subsection: "GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-028 Generate request sends: `preprocessedData`, `title`, `audienceType`, `slideCount`, `themeKey`, optional `additionalInstructions`, optional `templateId`, `citationStyle`');
    }


    // This test validates: Generate request sends: `preprocessedData`, `title`, `audienceType`, `slideCount`, `themeKey`, optional `additionalInstructions`, optional `templateId`, `citationStyle`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: 3 tabs File Upload Zotero DOI Lookup in bg-surface-raised rounded-xl bar', async ({ page }) => {
    // Checkpoint 29: 3 tabs: `File Upload`, `Zotero`, `DOI Lookup` in `bg-surface-raised rounded-xl` bar
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "3 tabs: `File Upload`, `Zotero`, `DOI Lookup` in `bg-surface-raised rounded-xl` bar",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-029 3 tabs: `File Upload`, `Zotero`, `DOI Lookup` in `bg-surface-raised rounded-xl` bar');
    }


    // This test validates: 3 tabs: `File Upload`, `Zotero`, `DOI Lookup` in `bg-surface-raised rounded-xl` bar
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Active tab bg-white text-ink shadow-sm dark bg-surface text-ink inactive text-in', async ({ page }) => {
    // Checkpoint 30: Active tab: `bg-white text-ink shadow-sm` / dark `bg-surface text-ink`; inactive: `text-ink-muted hover:text-ink`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Active tab: `bg-white text-ink shadow-sm` / dark `bg-surface text-ink`; inactive: `text-ink-muted hover:text-ink`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-030 Active tab: `bg-white text-ink shadow-sm` / dark `bg-surface text-ink`; inactive: `text-ink-muted hover:text-ink`');
    }


    // This test validates: Active tab: `bg-white text-ink shadow-sm` / dark `bg-surface text-ink`; inactive: `text-ink-muted hover:text-ink`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Switching tabs clears error', async ({ page }) => {
    // Checkpoint 31: Switching tabs clears error
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Switching tabs clears error",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-031 Switching tabs clears error');
    }


    // This test validates: Switching tabs clears error
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: FileArrowUp icon size 28 text Drop a bib or ris file here bold or click to brows', async ({ page }) => {
    // Checkpoint 32: `FileArrowUp` icon size 28; text: `"Drop a .bib or .ris file here"` (bold) / `"or click to browse"`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "`FileArrowUp` icon size 28; text: `\"Drop a .bib or .ris file here\"` (bold) / `\"or click to browse\"`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-032 `FileArrowUp` icon size 28; text: `"Drop a .bib or .ris file here"` (bold) / `"or click to browse"`');
    }


    // This test validates: `FileArrowUp` icon size 28; text: `"Drop a .bib or .ris file here"` (bold) / `"or click to browse"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Format text Supports BibTeX bib RIS ris and CSL-JSON json accepts bibrisjsontxt', async ({ page }) => {
    // Checkpoint 33: Format text: `"Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)"`; accepts `.bib,.ris,.json,.txt`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Format text: `\"Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)\"`; accepts `.bib,.ris,.json,.txt`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-033 Format text: `"Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)"`; accepts `.bib,.ris,.json,.txt`');
    }


    // This test validates: Format text: `"Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)"`; accepts `.bib,.ris,.json,.txt`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Tip Tip Export your Mendeley library as BibTeX then upload here', async ({ page }) => {
    // Checkpoint 34: Tip: `"Tip: Export your Mendeley library as BibTeX, then upload here."`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-025');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Tip: `\"Tip: Export your Mendeley library as BibTeX, then upload here.\"`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-034 Tip: `"Tip: Export your Mendeley library as BibTeX, then upload here."`');
    }


    // This test validates: Tip: `"Tip: Export your Mendeley library as BibTeX, then upload here."`
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
