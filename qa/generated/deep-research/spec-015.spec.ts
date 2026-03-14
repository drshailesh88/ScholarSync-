/**
 * Auto-generated Playwright test for deep-research/spec-015
 * Source: e2e/specs/deep-research/spec-015.md
 * Generated: 2026-03-14T10:16:25.021Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts deep-research spec-015
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';











import { assertDeepResearchCheckpoint } from '../../module-assertions/deep-research';








test.describe('deep-research / spec-015', () => {
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

  test('cp-000: Route appends References with a numbered citation list to the markdown before Ti', async ({ page }) => {
    // Checkpoint 0: Route appends `## References` with a numbered citation list to the markdown before Tiptap conversion.
    // Section: Quick Test Workflows > Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Route appends `## References` with a numbered citation list to the markdown before Tiptap conversion.",
      section: "Quick Test Workflows",
      subsection: "Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-000 ' + "Route appends `## References` with a numbered citation list to the markdown before Tiptap conversion.");
    }


    // This test validates: Route appends `## References` with a numbered citation list to the markdown before Tiptap conversion.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Route builds SourceReference with doi pmid title from sources and passes to mark', async ({ page }) => {
    // Checkpoint 1: Route builds `SourceReference[]` (with `doi`, `pmid`, `title`) from sources and passes to `markdownToTiptap()` for citation hyperlink mapping.
    // Section: Quick Test Workflows > Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Route builds `SourceReference[]` (with `doi`, `pmid`, `title`) from sources and passes to `markdownToTiptap()` for citation hyperlink mapping.",
      section: "Quick Test Workflows",
      subsection: "Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-001 ' + "Route builds `SourceReference[]` (with `doi`, `pmid`, `title`) from sources and passes to `markdownToTiptap()` for citation hyperlink mapping.");
    }


    // This test validates: Route builds `SourceReference[]` (with `doi`, `pmid`, `title`) from sources and passes to `markdownToTiptap()` for citation hyperlink mapping.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Route computes word_count from the plain text markdown and stores it on the sect', async ({ page }) => {
    // Checkpoint 2: Route computes `word_count` from the plain text markdown and stores it on the section record.
    // Section: Quick Test Workflows > Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Route computes `word_count` from the plain text markdown and stores it on the section record.",
      section: "Quick Test Workflows",
      subsection: "Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-002 ' + "Route computes `word_count` from the plain text markdown and stores it on the section record.");
    }


    // This test validates: Route computes `word_count` from the plain text markdown and stores it on the section record.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: If the authenticated user does not exist in the DB the route inserts a placehold', async ({ page }) => {
    // Checkpoint 3: If the authenticated user does not exist in the DB, the route inserts a placeholder user with `email: "{userId}@dev.local"` and `full_name: "Dev User"`; the comment describes a dev-mode fallback, but the code is not environment-gated.
    // Section: Quick Test Workflows > Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "If the authenticated user does not exist in the DB, the route inserts a placeholder user with `email: \"{userId}@dev.local\"` and `full_name: \"Dev User\"`; the comment describes a dev-mode fallback, but the code is not environment-gated.",
      section: "Quick Test Workflows",
      subsection: "Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-003 ' + "If the authenticated user does not exist in the DB, the route inserts a placeholder user with `email: \"{userId}@dev.local\"` and `full_name: \"Dev User\"`; the comment describes a dev-mode fallback, but the code is not environment-gated.");
    }


    // This test validates: If the authenticated user does not exist in the DB, the route inserts a placeholder user with `email: "{userId}@dev.local"` and `full_name: "Dev User"`; the comment describes a dev-mode fallback, but the code is not environment-gated.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Unexpected errors return 500 error Failed to create studio document', async ({ page }) => {
    // Checkpoint 4: Unexpected errors return `500 { "error": "Failed to create studio document" }`.
    // Section: Quick Test Workflows > Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Unexpected errors return `500 { \"error\": \"Failed to create studio document\" }`.",
      section: "Quick Test Workflows",
      subsection: "Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-004 ' + "Unexpected errors return `500 { \"error\": \"Failed to create studio document\" }`.");
    }


    // This test validates: Unexpected errors return `500 { "error": "Failed to create studio document" }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Auth failure returns 401 error Not authenticated', async ({ page }) => {
    // Checkpoint 5: Auth failure returns `401 { "error": "Not authenticated" }`.
    // Section: Quick Test Workflows > Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Auth failure returns `401 { \"error\": \"Not authenticated\" }`.",
      section: "Quick Test Workflows",
      subsection: "Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-005 ' + "Auth failure returns `401 { \"error\": \"Not authenticated\" }`.");
    }


    // This test validates: Auth failure returns `401 { "error": "Not authenticated" }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: EVIDENCE_BADGE_STYLES in CitationReferencetsx renders evidence labels as capital', async ({ page }) => {
    // Checkpoint 6: `EVIDENCE_BADGE_STYLES` in CitationReference.tsx renders evidence labels as capitalized: `"High"`, `"Moderate"`, `"Low"`, `"Unknown"`.
    // Section: Quick Test Workflows > Evidence Badge Labels (`src/components/deep-research/CitationReference.tsx`, `CitationsPanel.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`EVIDENCE_BADGE_STYLES` in CitationReference.tsx renders evidence labels as capitalized: `\"High\"`, `\"Moderate\"`, `\"Low\"`, `\"Unknown\"`.",
      section: "Quick Test Workflows",
      subsection: "Evidence Badge Labels (`src/components/deep-research/CitationReference.tsx`, `CitationsPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-006 ' + "`EVIDENCE_BADGE_STYLES` in CitationReference.tsx renders evidence labels as capitalized: `\"High\"`, `\"Moderate\"`, `\"Low\"`, `\"Unknown\"`.");
    }


    // This test validates: `EVIDENCE_BADGE_STYLES` in CitationReference.tsx renders evidence labels as capitalized: `"High"`, `"Moderate"`, `"Low"`, `"Unknown"`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: CitationsPaneltsx renders evidence labels via levelcharAt0toUpperCase levelslice', async ({ page }) => {
    // Checkpoint 7: CitationsPanel.tsx renders evidence labels via `level.charAt(0).toUpperCase() + level.slice(1)` — also capitalized.
    // Section: Quick Test Workflows > Evidence Badge Labels (`src/components/deep-research/CitationReference.tsx`, `CitationsPanel.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "CitationsPanel.tsx renders evidence labels via `level.charAt(0).toUpperCase() + level.slice(1)` — also capitalized.",
      section: "Quick Test Workflows",
      subsection: "Evidence Badge Labels (`src/components/deep-research/CitationReference.tsx`, `CitationsPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-007 ' + "CitationsPanel.tsx renders evidence labels via `level.charAt(0).toUpperCase() + level.slice(1)` — also capitalized.");
    }


    // This test validates: CitationsPanel.tsx renders evidence labels via `level.charAt(0).toUpperCase() + level.slice(1)` — also capitalized.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: EvidenceBadge tooltip text is Label evidence designLabel or Label evidence no de', async ({ page }) => {
    // Checkpoint 8: EvidenceBadge tooltip text is `"{Label} evidence — {designLabel}"` or `"{Label} evidence"` (no design label).
    // Section: Quick Test Workflows > Evidence Badge Labels (`src/components/deep-research/CitationReference.tsx`, `CitationsPanel.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "EvidenceBadge tooltip text is `\"{Label} evidence — {designLabel}\"` or `\"{Label} evidence\"` (no design label).",
      section: "Quick Test Workflows",
      subsection: "Evidence Badge Labels (`src/components/deep-research/CitationReference.tsx`, `CitationsPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-008 ' + "EvidenceBadge tooltip text is `\"{Label} evidence — {designLabel}\"` or `\"{Label} evidence\"` (no design label).");
    }


    // This test validates: EvidenceBadge tooltip text is `"{Label} evidence — {designLabel}"` or `"{Label} evidence"` (no design label).
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: citationsPanelOpen is initialized to true the citations panel starts open by def', async ({ page }) => {
    // Checkpoint 9: `citationsPanelOpen` is initialized to `true` — the citations panel starts open by default.
    // Section: Quick Test Workflows > Citations Panel Initialization (`src/components/deep-research/ResearchDocument.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`citationsPanelOpen` is initialized to `true` — the citations panel starts open by default.",
      section: "Quick Test Workflows",
      subsection: "Citations Panel Initialization (`src/components/deep-research/ResearchDocument.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-009 ' + "`citationsPanelOpen` is initialized to `true` — the citations panel starts open by default.");
    }


    // This test validates: `citationsPanelOpen` is initialized to `true` — the citations panel starts open by default.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Desktop TOC component TableOfContents returns null when itemslength 0 but the mo', async ({ page }) => {
    // Checkpoint 10: Desktop TOC component (`TableOfContents`) returns `null` when `items.length === 0`, but the mobile floating TOC button still renders.
    // Section: Quick Test Workflows > Citations Panel Initialization (`src/components/deep-research/ResearchDocument.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Desktop TOC component (`TableOfContents`) returns `null` when `items.length === 0`, but the mobile floating TOC button still renders.",
      section: "Quick Test Workflows",
      subsection: "Citations Panel Initialization (`src/components/deep-research/ResearchDocument.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-010 ' + "Desktop TOC component (`TableOfContents`) returns `null` when `items.length === 0`, but the mobile floating TOC button still renders.");
    }


    // This test validates: Desktop TOC component (`TableOfContents`) returns `null` when `items.length === 0`, but the mobile floating TOC button still renders.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: The handle bar element div classNamew-10 h-1 bg-gray-300 is purely decorative th', async ({ page }) => {
    // Checkpoint 11: The handle bar element (`<div className="w-10 h-1 bg-gray-300 ...">`) is purely decorative — there are no drag event handlers, touch listeners, or swipe-to-dismiss behavior attached to it.
    // Section: Quick Test Workflows > Mobile Citations Handle Bar (`src/components/deep-research/CitationsPanel.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The handle bar element (`<div className=\"w-10 h-1 bg-gray-300 ...\">`) is purely decorative — there are no drag event handlers, touch listeners, or swipe-to-dismiss behavior attached to it.",
      section: "Quick Test Workflows",
      subsection: "Mobile Citations Handle Bar (`src/components/deep-research/CitationsPanel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-011 ' + "The handle bar element (`<div className=\"w-10 h-1 bg-gray-300 ...\">`) is purely decorative — there are no drag event handlers, touch listeners, or swipe-to-dismiss behavior attached to it.");
    }


    // This test validates: The handle bar element (`<div className="w-10 h-1 bg-gray-300 ...">`) is purely decorative — there are no drag event handlers, touch listeners, or swipe-to-dismiss behavior attached to it.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Export button text labels use hidden sminline on mobile below sm breakpoint only', async ({ page }) => {
    // Checkpoint 12: Export button text labels use `.hidden sm:inline` — on mobile (below `sm` breakpoint) only icons are visible, no text.
    // Section: Quick Test Workflows > Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Export button text labels use `.hidden sm:inline` — on mobile (below `sm` breakpoint) only icons are visible, no text.",
      section: "Quick Test Workflows",
      subsection: "Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-012 ' + "Export button text labels use `.hidden sm:inline` — on mobile (below `sm` breakpoint) only icons are visible, no text.");
    }


    // This test validates: Export button text labels use `.hidden sm:inline` — on mobile (below `sm` breakpoint) only icons are visible, no text.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Buttons render in this order md PDF Copy vertical divider Open in Studio vertica', async ({ page }) => {
    // Checkpoint 13: Buttons render in this order: `.md` → `PDF` → `Copy` → vertical divider → `Open in Studio` → vertical divider → `.bib` → `.ris`.
    // Section: Quick Test Workflows > Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Buttons render in this order: `.md` → `PDF` → `Copy` → vertical divider → `Open in Studio` → vertical divider → `.bib` → `.ris`.",
      section: "Quick Test Workflows",
      subsection: "Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-013 ' + "Buttons render in this order: `.md` → `PDF` → `Copy` → vertical divider → `Open in Studio` → vertical divider → `.bib` → `.ris`.");
    }


    // This test validates: Buttons render in this order: `.md` → `PDF` → `Copy` → vertical divider → `Open in Studio` → vertical divider → `.bib` → `.ris`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Markdown button title attribute Download as Markdown', async ({ page }) => {
    // Checkpoint 14: Markdown button `title` attribute: `"Download as Markdown"`.
    // Section: Quick Test Workflows > Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Markdown button `title` attribute: `\"Download as Markdown\"`.",
      section: "Quick Test Workflows",
      subsection: "Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-014 ' + "Markdown button `title` attribute: `\"Download as Markdown\"`.");
    }


    // This test validates: Markdown button `title` attribute: `"Download as Markdown"`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Copy button title attribute Copies formatted text paste into Google Docs Word or', async ({ page }) => {
    // Checkpoint 15: Copy button `title` attribute: `"Copies formatted text — paste into Google Docs, Word, or any editor with formatting preserved"`.
    // Section: Quick Test Workflows > Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Copy button `title` attribute: `\"Copies formatted text — paste into Google Docs, Word, or any editor with formatting preserved\"`.",
      section: "Quick Test Workflows",
      subsection: "Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-015 ' + "Copy button `title` attribute: `\"Copies formatted text — paste into Google Docs, Word, or any editor with formatting preserved\"`.");
    }


    // This test validates: Copy button `title` attribute: `"Copies formatted text — paste into Google Docs, Word, or any editor with formatting preserved"`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: BibTeX button title attribute Download references as BibTeX', async ({ page }) => {
    // Checkpoint 16: BibTeX button `title` attribute: `"Download references as BibTeX"`.
    // Section: Quick Test Workflows > Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "BibTeX button `title` attribute: `\"Download references as BibTeX\"`.",
      section: "Quick Test Workflows",
      subsection: "Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-016 ' + "BibTeX button `title` attribute: `\"Download references as BibTeX\"`.");
    }


    // This test validates: BibTeX button `title` attribute: `"Download references as BibTeX"`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: RIS button title attribute Download references as RIS EndNoteMendeley', async ({ page }) => {
    // Checkpoint 17: RIS button `title` attribute: `"Download references as RIS (EndNote/Mendeley)"`.
    // Section: Quick Test Workflows > Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "RIS button `title` attribute: `\"Download references as RIS (EndNote/Mendeley)\"`.",
      section: "Quick Test Workflows",
      subsection: "Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-017 ' + "RIS button `title` attribute: `\"Download references as RIS (EndNote/Mendeley)\"`.");
    }


    // This test validates: RIS button `title` attribute: `"Download references as RIS (EndNote/Mendeley)"`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: RIS export when pdfUrl is absent but doi is present uses UR - httpsdoiorgdoi as ', async ({ page }) => {
    // Checkpoint 18: RIS export: when `pdfUrl` is absent but `doi` is present, uses `UR  - https://doi.org/{doi}` as fallback URL.
    // Section: Quick Test Workflows > Export Format Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "RIS export: when `pdfUrl` is absent but `doi` is present, uses `UR  - https://doi.org/{doi}` as fallback URL.",
      section: "Quick Test Workflows",
      subsection: "Export Format Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-018 ' + "RIS export: when `pdfUrl` is absent but `doi` is present, uses `UR  - https://doi.org/{doi}` as fallback URL.");
    }


    // This test validates: RIS export: when `pdfUrl` is absent but `doi` is present, uses `UR  - https://doi.org/{doi}` as fallback URL.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: BibTeX abstract field is truncated to 500 characters via sabstractslice0 500', async ({ page }) => {
    // Checkpoint 19: BibTeX `abstract` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.
    // Section: Quick Test Workflows > Export Format Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "BibTeX `abstract` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.",
      section: "Quick Test Workflows",
      subsection: "Export Format Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-019 ' + "BibTeX `abstract` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.");
    }


    // This test validates: BibTeX `abstract` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: RIS AB field is truncated to 500 characters via sabstractslice0 500', async ({ page }) => {
    // Checkpoint 20: RIS `AB` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.
    // Section: Quick Test Workflows > Export Format Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "RIS `AB` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.",
      section: "Quick Test Workflows",
      subsection: "Export Format Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-020 ' + "RIS `AB` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.");
    }


    // This test validates: RIS `AB` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: markdownToRichHTML generates a clipboard References section from ALL sources no ', async ({ page }) => {
    // Checkpoint 21: `markdownToRichHTML()` generates a clipboard References section from ALL sources — no 50-source cap, unlike the rendered references list and citations panel.
    // Section: Quick Test Workflows > Export Format Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`markdownToRichHTML()` generates a clipboard References section from ALL sources — no 50-source cap, unlike the rendered references list and citations panel.",
      section: "Quick Test Workflows",
      subsection: "Export Format Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-021 ' + "`markdownToRichHTML()` generates a clipboard References section from ALL sources — no 50-source cap, unlike the rendered references list and citations panel.");
    }


    // This test validates: `markdownToRichHTML()` generates a clipboard References section from ALL sources — no 50-source cap, unlike the rendered references list and citations panel.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: markdownToRichHTML applies inline bold text strong italic text em and citation s', async ({ page }) => {
    // Checkpoint 22: `markdownToRichHTML()` applies inline bold (`**text**` → `<strong>`), italic (`*text*` → `<em>`), and citation superscript (`[N]` → styled `<sup>`) formatting via `applyInlineFormatting()`.
    // Section: Quick Test Workflows > Export Format Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`markdownToRichHTML()` applies inline bold (`**text**` → `<strong>`), italic (`*text*` → `<em>`), and citation superscript (`[N]` → styled `<sup>`) formatting via `applyInlineFormatting()`.",
      section: "Quick Test Workflows",
      subsection: "Export Format Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-022 ' + "`markdownToRichHTML()` applies inline bold (`**text**` → `<strong>`), italic (`*text*` → `<em>`), and citation superscript (`[N]` → styled `<sup>`) formatting via `applyInlineFormatting()`.");
    }


    // This test validates: `markdownToRichHTML()` applies inline bold (`**text**` → `<strong>`), italic (`*text*` → `<em>`), and citation superscript (`[N]` → styled `<sup>`) formatting via `applyInlineFormatting()`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: markdownToRichHTML renders horizontal rules as hr with inline styles while markd', async ({ page }) => {
    // Checkpoint 23: `markdownToRichHTML()` renders horizontal rules as `<hr>` with inline styles, while `markdownToSimpleHTML()` skips them entirely.
    // Section: Quick Test Workflows > Export Format Details (`src/components/deep-research/ExportButtons.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`markdownToRichHTML()` renders horizontal rules as `<hr>` with inline styles, while `markdownToSimpleHTML()` skips them entirely.",
      section: "Quick Test Workflows",
      subsection: "Export Format Details (`src/components/deep-research/ExportButtons.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-023 ' + "`markdownToRichHTML()` renders horizontal rules as `<hr>` with inline styles, while `markdownToSimpleHTML()` skips them entirely.");
    }


    // This test validates: `markdownToRichHTML()` renders horizontal rules as `<hr>` with inline styles, while `markdownToSimpleHTML()` skips them entirely.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: h2 headings render with a bottom border border-b border-gray-200 darkborder-gray', async ({ page }) => {
    // Checkpoint 24: `h2` headings render with a bottom border: `border-b border-gray-200 dark:border-gray-700/50`.
    // Section: Quick Test Workflows > Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`h2` headings render with a bottom border: `border-b border-gray-200 dark:border-gray-700/50`.",
      section: "Quick Test Workflows",
      subsection: "Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-024 ' + "`h2` headings render with a bottom border: `border-b border-gray-200 dark:border-gray-700/50`.");
    }


    // This test validates: `h2` headings render with a bottom border: `border-b border-gray-200 dark:border-gray-700/50`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: h4 headings render with italic class applied', async ({ page }) => {
    // Checkpoint 25: `h4` headings render with `italic` class applied.
    // Section: Quick Test Workflows > Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`h4` headings render with `italic` class applied.",
      section: "Quick Test Workflows",
      subsection: "Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-025 ' + "`h4` headings render with `italic` class applied.");
    }


    // This test validates: `h4` headings render with `italic` class applied.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Heading ID generation lowercased strips a-z0-9s- replaces s with -', async ({ page }) => {
    // Checkpoint 26: Heading ID generation: lowercased, strips `[^a-z0-9\s-]`, replaces `\s+` with `-`.
    // Section: Quick Test Workflows > Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Heading ID generation: lowercased, strips `[^a-z0-9\\s-]`, replaces `\\s+` with `-`.",
      section: "Quick Test Workflows",
      subsection: "Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-026 ' + "Heading ID generation: lowercased, strips `[^a-z0-9\\s-]`, replaces `\\s+` with `-`.");
    }


    // This test validates: Heading ID generation: lowercased, strips `[^a-z0-9\s-]`, replaces `\s+` with `-`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: IntersectionObserver for active heading tracking rootMargin -80px 0px -60 0px th', async ({ page }) => {
    // Checkpoint 27: `IntersectionObserver` for active heading tracking: `rootMargin: "-80px 0px -60% 0px"`, `threshold: 0.1`.
    // Section: Quick Test Workflows > Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`IntersectionObserver` for active heading tracking: `rootMargin: \"-80px 0px -60% 0px\"`, `threshold: 0.1`.",
      section: "Quick Test Workflows",
      subsection: "Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-027 ' + "`IntersectionObserver` for active heading tracking: `rootMargin: \"-80px 0px -60% 0px\"`, `threshold: 0.1`.");
    }


    // This test validates: `IntersectionObserver` for active heading tracking: `rootMargin: "-80px 0px -60% 0px"`, `threshold: 0.1`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: hr elements render with my-8 border-gray-200 darkborder-gray-70050', async ({ page }) => {
    // Checkpoint 28: `<hr>` elements render with `my-8 border-gray-200 dark:border-gray-700/50`.
    // Section: Quick Test Workflows > Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`<hr>` elements render with `my-8 border-gray-200 dark:border-gray-700/50`.",
      section: "Quick Test Workflows",
      subsection: "Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-028 ' + "`<hr>` elements render with `my-8 border-gray-200 dark:border-gray-700/50`.");
    }


    // This test validates: `<hr>` elements render with `my-8 border-gray-200 dark:border-gray-700/50`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Even table rows background f9fafb in print', async ({ page }) => {
    // Checkpoint 29: Even table rows: `background: #f9fafb` in print.
    // Section: Quick Test Workflows > Print Styles (`src/components/deep-research/ResearchDocument.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Even table rows: `background: #f9fafb` in print.",
      section: "Quick Test Workflows",
      subsection: "Print Styles (`src/components/deep-research/ResearchDocument.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-029 ' + "Even table rows: `background: #f9fafb` in print.");
    }


    // This test validates: Even table rows: `background: #f9fafb` in print.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Blockquotes in print border 666 text 555 background transparent', async ({ page }) => {
    // Checkpoint 30: Blockquotes in print: border `#666`, text `#555`, background transparent.
    // Section: Quick Test Workflows > Print Styles (`src/components/deep-research/ResearchDocument.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Blockquotes in print: border `#666`, text `#555`, background transparent.",
      section: "Quick Test Workflows",
      subsection: "Print Styles (`src/components/deep-research/ResearchDocument.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-030 ' + "Blockquotes in print: border `#666`, text `#555`, background transparent.");
    }


    // This test validates: Blockquotes in print: border `#666`, text `#555`, background transparent.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Code elements in print background f3f4f6 text 333', async ({ page }) => {
    // Checkpoint 31: Code elements in print: background `#f3f4f6`, text `#333`.
    // Section: Quick Test Workflows > Print Styles (`src/components/deep-research/ResearchDocument.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Code elements in print: background `#f3f4f6`, text `#333`.",
      section: "Quick Test Workflows",
      subsection: "Print Styles (`src/components/deep-research/ResearchDocument.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-031 ' + "Code elements in print: background `#f3f4f6`, text `#333`.");
    }


    // This test validates: Code elements in print: background `#f3f4f6`, text `#333`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Links in print color 1a56db', async ({ page }) => {
    // Checkpoint 32: Links in print: color `#1a56db`.
    // Section: Quick Test Workflows > Print Styles (`src/components/deep-research/ResearchDocument.tsx`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Links in print: color `#1a56db`.",
      section: "Quick Test Workflows",
      subsection: "Print Styles (`src/components/deep-research/ResearchDocument.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-032 ' + "Links in print: color `#1a56db`.");
    }


    // This test validates: Links in print: color `#1a56db`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Both routes return headers Content-Type textevent-stream Cache-Control no-cache ', async ({ page }) => {
    // Checkpoint 33: Both routes return headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`, `Connection: keep-alive`, `X-Accel-Buffering: no`.
    // Section: Quick Test Workflows > SSE Stream Headers (both `plan/route.ts` and `execute/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Both routes return headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`, `Connection: keep-alive`, `X-Accel-Buffering: no`.",
      section: "Quick Test Workflows",
      subsection: "SSE Stream Headers (both `plan/route.ts` and `execute/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-033 ' + "Both routes return headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`, `Connection: keep-alive`, `X-Accel-Buffering: no`.");
    }


    // This test validates: Both routes return headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`, `Connection: keep-alive`, `X-Accel-Buffering: no`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Both routes export dynamic force-dynamic disables Nextjs static caching', async ({ page }) => {
    // Checkpoint 34: Both routes export `dynamic = "force-dynamic"` (disables Next.js static caching).
    // Section: Quick Test Workflows > SSE Stream Headers (both `plan/route.ts` and `execute/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Both routes export `dynamic = \"force-dynamic\"` (disables Next.js static caching).",
      section: "Quick Test Workflows",
      subsection: "SSE Stream Headers (both `plan/route.ts` and `execute/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-034 ' + "Both routes export `dynamic = \"force-dynamic\"` (disables Next.js static caching).");
    }


    // This test validates: Both routes export `dynamic = "force-dynamic"` (disables Next.js static caching).
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
