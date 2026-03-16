/**
 * Auto-generated Playwright test for research/spec-016
 * Source: e2e/specs/research/spec-016.md
 * Generated: 2026-03-15T17:34:43.232Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-016
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-016', () => {
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

  test('cp-000: getEvidenceLevel maps meta_analysis and systematic_review to Level I', async ({ page }) => {
    // Checkpoint 0: `getEvidenceLevel()` maps `meta_analysis` and `systematic_review` to Level I
    // Section: Quick Test Workflows > Evidence Level Mapping

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getEvidenceLevel()` maps `meta_analysis` and `systematic_review` to Level I",
      section: "Quick Test Workflows",
      subsection: "Evidence Level Mapping",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-000 ' + "`getEvidenceLevel()` maps `meta_analysis` and `systematic_review` to Level I");
    }


    // This test validates: `getEvidenceLevel()` maps `meta_analysis` and `systematic_review` to Level I
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: getEvidenceLevel maps rct to Level II', async ({ page }) => {
    // Checkpoint 1: `getEvidenceLevel()` maps `rct` to Level II
    // Section: Quick Test Workflows > Evidence Level Mapping

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getEvidenceLevel()` maps `rct` to Level II",
      section: "Quick Test Workflows",
      subsection: "Evidence Level Mapping",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-001 ' + "`getEvidenceLevel()` maps `rct` to Level II");
    }


    // This test validates: `getEvidenceLevel()` maps `rct` to Level II
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: getEvidenceLevel maps cohort and observational to Level III', async ({ page }) => {
    // Checkpoint 2: `getEvidenceLevel()` maps `cohort` and `observational` to Level III
    // Section: Quick Test Workflows > Evidence Level Mapping

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getEvidenceLevel()` maps `cohort` and `observational` to Level III",
      section: "Quick Test Workflows",
      subsection: "Evidence Level Mapping",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-002 ' + "`getEvidenceLevel()` maps `cohort` and `observational` to Level III");
    }


    // This test validates: `getEvidenceLevel()` maps `cohort` and `observational` to Level III
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: getEvidenceLevel maps case_control and case_report to Level IV', async ({ page }) => {
    // Checkpoint 3: `getEvidenceLevel()` maps `case_control` and `case_report` to Level IV
    // Section: Quick Test Workflows > Evidence Level Mapping

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getEvidenceLevel()` maps `case_control` and `case_report` to Level IV",
      section: "Quick Test Workflows",
      subsection: "Evidence Level Mapping",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-003 ' + "`getEvidenceLevel()` maps `case_control` and `case_report` to Level IV");
    }


    // This test validates: `getEvidenceLevel()` maps `case_control` and `case_report` to Level IV
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: getEvidenceLevel maps all other study types including review other and unknown v', async ({ page }) => {
    // Checkpoint 4: `getEvidenceLevel()` maps all other study types (including `review`, `other`, and unknown values) to Level V
    // Section: Quick Test Workflows > Evidence Level Mapping

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getEvidenceLevel()` maps all other study types (including `review`, `other`, and unknown values) to Level V",
      section: "Quick Test Workflows",
      subsection: "Evidence Level Mapping",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-004 ' + "`getEvidenceLevel()` maps all other study types (including `review`, `other`, and unknown values) to Level V");
    }


    // This test validates: `getEvidenceLevel()` maps all other study types (including `review`, `other`, and unknown values) to Level V
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: mapPubMedPublicationType maps clinical trial publications to rct study type', async ({ page }) => {
    // Checkpoint 5: `mapPubMedPublicationType()` maps "clinical trial" publications to `rct` study type
    // Section: Quick Test Workflows > Evidence Level Mapping

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`mapPubMedPublicationType()` maps \"clinical trial\" publications to `rct` study type",
      section: "Quick Test Workflows",
      subsection: "Evidence Level Mapping",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-005 ' + "`mapPubMedPublicationType()` maps \"clinical trial\" publications to `rct` study type");
    }


    // This test validates: `mapPubMedPublicationType()` maps "clinical trial" publications to `rct` study type
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: mapPubMedPublicationType maps a bare review that doesnt match systematic review ', async ({ page }) => {
    // Checkpoint 6: `mapPubMedPublicationType()` maps a bare "review" (that doesn't match "systematic review") to `review` study type, which then maps to Level V
    // Section: Quick Test Workflows > Evidence Level Mapping

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`mapPubMedPublicationType()` maps a bare \"review\" (that doesn't match \"systematic review\") to `review` study type, which then maps to Level V",
      section: "Quick Test Workflows",
      subsection: "Evidence Level Mapping",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-006 ' + "`mapPubMedPublicationType()` maps a bare \"review\" (that doesn't match \"systematic review\") to `review` study type, which then maps to Level V");
    }


    // This test validates: `mapPubMedPublicationType()` maps a bare "review" (that doesn't match "systematic review") to `review` study type, which then maps to Level V
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: mapS2PublicationType maps editorial and letter to other study type', async ({ page }) => {
    // Checkpoint 7: `mapS2PublicationType()` maps `editorial` and `letter` to `other` study type
    // Section: Quick Test Workflows > Evidence Level Mapping

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`mapS2PublicationType()` maps `editorial` and `letter` to `other` study type",
      section: "Quick Test Workflows",
      subsection: "Evidence Level Mapping",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-007 ' + "`mapS2PublicationType()` maps `editorial` and `letter` to `other` study type");
    }


    // This test validates: `mapS2PublicationType()` maps `editorial` and `letter` to `other` study type
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: isSamePaper checks identity in order DOI match case-insensitive then PMID match ', async ({ page }) => {
    // Checkpoint 8: `isSamePaper()` checks identity in order: DOI match (case-insensitive), then PMID match, then S2 ID match, then normalized title + year match
    // Section: Quick Test Workflows > Dedup & Rank Fusion Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`isSamePaper()` checks identity in order: DOI match (case-insensitive), then PMID match, then S2 ID match, then normalized title + year match",
      section: "Quick Test Workflows",
      subsection: "Dedup & Rank Fusion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-008 ' + "`isSamePaper()` checks identity in order: DOI match (case-insensitive), then PMID match, then S2 ID match, then normalized title + year match");
    }


    // This test validates: `isSamePaper()` checks identity in order: DOI match (case-insensitive), then PMID match, then S2 ID match, then normalized title + year match
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: normalizeTitle lowercases strips all non-alphanumeric characters except spaces n', async ({ page }) => {
    // Checkpoint 9: `normalizeTitle()` lowercases, strips all non-alphanumeric characters except spaces, normalizes whitespace, trims, and truncates to 150 characters
    // Section: Quick Test Workflows > Dedup & Rank Fusion Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`normalizeTitle()` lowercases, strips all non-alphanumeric characters except spaces, normalizes whitespace, trims, and truncates to 150 characters",
      section: "Quick Test Workflows",
      subsection: "Dedup & Rank Fusion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-009 ' + "`normalizeTitle()` lowercases, strips all non-alphanumeric characters except spaces, normalizes whitespace, trims, and truncates to 150 characters");
    }


    // This test validates: `normalizeTitle()` lowercases, strips all non-alphanumeric characters except spaces, normalizes whitespace, trims, and truncates to 150 characters
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: mergeMetadata keeps the primary papers fields and fills in missing values from t', async ({ page }) => {
    // Checkpoint 10: `mergeMetadata()` keeps the primary paper's fields and fills in missing values from the secondary paper — primary always wins for populated fields
    // Section: Quick Test Workflows > Dedup & Rank Fusion Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`mergeMetadata()` keeps the primary paper's fields and fills in missing values from the secondary paper — primary always wins for populated fields",
      section: "Quick Test Workflows",
      subsection: "Dedup & Rank Fusion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-010 ' + "`mergeMetadata()` keeps the primary paper's fields and fills in missing values from the secondary paper — primary always wins for populated fields");
    }


    // This test validates: `mergeMetadata()` keeps the primary paper's fields and fills in missing values from the secondary paper — primary always wins for populated fields
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: mergeMetadata takes MathmaxprimarycitationCount 0 secondarycitationCount 0 the h', async ({ page }) => {
    // Checkpoint 11: `mergeMetadata()` takes `Math.max(primary.citationCount || 0, secondary.citationCount || 0)` — the higher citation count always wins
    // Section: Quick Test Workflows > Dedup & Rank Fusion Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`mergeMetadata()` takes `Math.max(primary.citationCount || 0, secondary.citationCount || 0)` — the higher citation count always wins",
      section: "Quick Test Workflows",
      subsection: "Dedup & Rank Fusion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-011 ' + "`mergeMetadata()` takes `Math.max(primary.citationCount || 0, secondary.citationCount || 0)` — the higher citation count always wins");
    }


    // This test validates: `mergeMetadata()` takes `Math.max(primary.citationCount || 0, secondary.citationCount || 0)` — the higher citation count always wins
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: mergeMetadata merges publicationTypes fieldsOfStudy and concepts arrays via Set-', async ({ page }) => {
    // Checkpoint 12: `mergeMetadata()` merges `publicationTypes`, `fieldsOfStudy`, and `concepts` arrays via Set-based deduplication
    // Section: Quick Test Workflows > Dedup & Rank Fusion Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`mergeMetadata()` merges `publicationTypes`, `fieldsOfStudy`, and `concepts` arrays via Set-based deduplication",
      section: "Quick Test Workflows",
      subsection: "Dedup & Rank Fusion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-012 ' + "`mergeMetadata()` merges `publicationTypes`, `fieldsOfStudy`, and `concepts` arrays via Set-based deduplication");
    }


    // This test validates: `mergeMetadata()` merges `publicationTypes`, `fieldsOfStudy`, and `concepts` arrays via Set-based deduplication
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: mergeMetadata prefers primary meshTerms when it has entries primarymeshTermsleng', async ({ page }) => {
    // Checkpoint 13: `mergeMetadata()` prefers primary `meshTerms` when it has entries (`primary.meshTerms?.length`), otherwise falls back to secondary
    // Section: Quick Test Workflows > Dedup & Rank Fusion Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`mergeMetadata()` prefers primary `meshTerms` when it has entries (`primary.meshTerms?.length`), otherwise falls back to secondary",
      section: "Quick Test Workflows",
      subsection: "Dedup & Rank Fusion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-013 ' + "`mergeMetadata()` prefers primary `meshTerms` when it has entries (`primary.meshTerms?.length`), otherwise falls back to secondary");
    }


    // This test validates: `mergeMetadata()` prefers primary `meshTerms` when it has entries (`primary.meshTerms?.length`), otherwise falls back to secondary
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: RRF contribution formula is 1 k rank 1 where k defaults to 60 and rank is the 0-', async ({ page }) => {
    // Checkpoint 14: RRF contribution formula is `1 / (k + rank + 1)` where `k` defaults to `60` and `rank` is the 0-indexed position in the source list
    // Section: Quick Test Workflows > Dedup & Rank Fusion Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "RRF contribution formula is `1 / (k + rank + 1)` where `k` defaults to `60` and `rank` is the 0-indexed position in the source list",
      section: "Quick Test Workflows",
      subsection: "Dedup & Rank Fusion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-014 ' + "RRF contribution formula is `1 / (k + rank + 1)` where `k` defaults to `60` and `rank` is the 0-indexed position in the source list");
    }


    // This test validates: RRF contribution formula is `1 / (k + rank + 1)` where `k` defaults to `60` and `rank` is the 0-indexed position in the source list
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: RRF output is sorted by accumulated rrfScore descending before pagination', async ({ page }) => {
    // Checkpoint 15: RRF output is sorted by accumulated `rrfScore` descending before pagination
    // Section: Quick Test Workflows > Dedup & Rank Fusion Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "RRF output is sorted by accumulated `rrfScore` descending before pagination",
      section: "Quick Test Workflows",
      subsection: "Dedup & Rank Fusion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-015 ' + "RRF output is sorted by accumulated `rrfScore` descending before pagination");
    }


    // This test validates: RRF output is sorted by accumulated `rrfScore` descending before pagination
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Cohere rerank documents are constructed by concatenating title abstract tldr for', async ({ page }) => {
    // Checkpoint 16: Cohere rerank documents are constructed by concatenating `${title}. ${abstract || tldr || ""}` for each result
    // Section: Quick Test Workflows > Cohere Reranking Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Cohere rerank documents are constructed by concatenating `${title}. ${abstract || tldr || \"\"}` for each result",
      section: "Quick Test Workflows",
      subsection: "Cohere Reranking Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-016 ' + "Cohere rerank documents are constructed by concatenating `${title}. ${abstract || tldr || \"\"}` for each result");
    }


    // This test validates: Cohere rerank documents are constructed by concatenating `${title}. ${abstract || tldr || ""}` for each result
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Cohere rerank request uses resilientFetch with timeout 10000 10s and maxRetries ', async ({ page }) => {
    // Checkpoint 17: Cohere rerank request uses `resilientFetch` with `timeout: 10000` (10s) and `maxRetries: 2`
    // Section: Quick Test Workflows > Cohere Reranking Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Cohere rerank request uses `resilientFetch` with `timeout: 10000` (10s) and `maxRetries: 2`",
      section: "Quick Test Workflows",
      subsection: "Cohere Reranking Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-017 ' + "Cohere rerank request uses `resilientFetch` with `timeout: 10000` (10s) and `maxRetries: 2`");
    }


    // This test validates: Cohere rerank request uses `resilientFetch` with `timeout: 10000` (10s) and `maxRetries: 2`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Cohere rerank request sends return_documents false only index relevance_score ar', async ({ page }) => {
    // Checkpoint 18: Cohere rerank request sends `return_documents: false` — only index + relevance_score are returned
    // Section: Quick Test Workflows > Cohere Reranking Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Cohere rerank request sends `return_documents: false` — only index + relevance_score are returned",
      section: "Quick Test Workflows",
      subsection: "Cohere Reranking Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-018 ' + "Cohere rerank request sends `return_documents: false` — only index + relevance_score are returned");
    }


    // This test validates: Cohere rerank request sends `return_documents: false` — only index + relevance_score are returned
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Cohere reranked results have rerankScore set from the Cohere relevance_score fie', async ({ page }) => {
    // Checkpoint 19: Cohere reranked results have `rerankScore` set from the Cohere `relevance_score` field
    // Section: Quick Test Workflows > Cohere Reranking Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Cohere reranked results have `rerankScore` set from the Cohere `relevance_score` field",
      section: "Quick Test Workflows",
      subsection: "Cohere Reranking Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-019 ' + "Cohere reranked results have `rerankScore` set from the Cohere `relevance_score` field");
    }


    // This test validates: Cohere reranked results have `rerankScore` set from the Cohere `relevance_score` field
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: handleSaveresult forwards abstract mesh_terms publication_types fields_of_study ', async ({ page }) => {
    // Checkpoint 20: `handleSave(result)` forwards `abstract`, `mesh_terms`, `publication_types`, `fields_of_study`, `study_type`, `evidence_level`, `influential_citation_count`, and `reference_count` to the `savePaper()` server action — not just title, authors, journal, year, doi, source
    // Section: Quick Test Workflows > Save Paper Data Flow

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`handleSave(result)` forwards `abstract`, `mesh_terms`, `publication_types`, `fields_of_study`, `study_type`, `evidence_level`, `influential_citation_count`, and `reference_count` to the `savePaper()` server action — not just title, authors, journal, year, doi, source",
      section: "Quick Test Workflows",
      subsection: "Save Paper Data Flow",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-020 ' + "`handleSave(result)` forwards `abstract`, `mesh_terms`, `publication_types`, `fields_of_study`, `study_type`, `evidence_level`, `influential_citation_count`, and `reference_count` to the `savePaper()` server action — not just title, authors, journal, year, doi, source");
    }


    // This test validates: `handleSave(result)` forwards `abstract`, `mesh_terms`, `publication_types`, `fields_of_study`, `study_type`, `evidence_level`, `influential_citation_count`, and `reference_count` to the `savePaper()` server action — not just title, authors, journal, year, doi, source
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: handleSaveresult sends pubmed_id resultpmid and semantic_scholar_id results2Id a', async ({ page }) => {
    // Checkpoint 21: `handleSave(result)` sends `pubmed_id: result.pmid` and `semantic_scholar_id: result.s2Id` as separate identifier fields
    // Section: Quick Test Workflows > Save Paper Data Flow

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`handleSave(result)` sends `pubmed_id: result.pmid` and `semantic_scholar_id: result.s2Id` as separate identifier fields",
      section: "Quick Test Workflows",
      subsection: "Save Paper Data Flow",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-021 ' + "`handleSave(result)` sends `pubmed_id: result.pmid` and `semantic_scholar_id: result.s2Id` as separate identifier fields");
    }


    // This test validates: `handleSave(result)` sends `pubmed_id: result.pmid` and `semantic_scholar_id: result.s2Id` as separate identifier fields
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: handleSaveresult sends citation_count resultcitationCount not citations or citat', async ({ page }) => {
    // Checkpoint 22: `handleSave(result)` sends `citation_count: result.citationCount` — not `citations` or `citationCount`
    // Section: Quick Test Workflows > Save Paper Data Flow

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`handleSave(result)` sends `citation_count: result.citationCount` — not `citations` or `citationCount`",
      section: "Quick Test Workflows",
      subsection: "Save Paper Data Flow",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-022 ' + "`handleSave(result)` sends `citation_count: result.citationCount` — not `citations` or `citationCount`");
    }


    // This test validates: `handleSave(result)` sends `citation_count: result.citationCount` — not `citations` or `citationCount`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: handleSaveresult derives open_access_url from resultopenAccessPdfUrl undefined t', async ({ page }) => {
    // Checkpoint 23: `handleSave(result)` derives `open_access_url` from `result.openAccessPdfUrl || undefined` — the `|| undefined` ensures `null` is converted to `undefined`
    // Section: Quick Test Workflows > Save Paper Data Flow

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`handleSave(result)` derives `open_access_url` from `result.openAccessPdfUrl || undefined` — the `|| undefined` ensures `null` is converted to `undefined`",
      section: "Quick Test Workflows",
      subsection: "Save Paper Data Flow",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-023 ' + "`handleSave(result)` derives `open_access_url` from `result.openAccessPdfUrl || undefined` — the `|| undefined` ensures `null` is converted to `undefined`");
    }


    // This test validates: `handleSave(result)` derives `open_access_url` from `result.openAccessPdfUrl || undefined` — the `|| undefined` ensures `null` is converted to `undefined`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: UnifiedSearchResult type includes openalexId string field for OpenAlex-originate', async ({ page }) => {
    // Checkpoint 24: `UnifiedSearchResult` type includes `openalexId?: string` field for OpenAlex-originated results
    // Section: Quick Test Workflows > Type Definitions & Response Shapes

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`UnifiedSearchResult` type includes `openalexId?: string` field for OpenAlex-originated results",
      section: "Quick Test Workflows",
      subsection: "Type Definitions & Response Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-024 ' + "`UnifiedSearchResult` type includes `openalexId?: string` field for OpenAlex-originated results");
    }


    // This test validates: `UnifiedSearchResult` type includes `openalexId?: string` field for OpenAlex-originated results
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: UnifiedSearchResult type includes clinical trial fields nctId string trialStatus', async ({ page }) => {
    // Checkpoint 25: `UnifiedSearchResult` type includes clinical trial fields: `nctId?: string`, `trialStatus?: string`, `trialPhase?: string` — only populated for ClinicalTrials.gov results
    // Section: Quick Test Workflows > Type Definitions & Response Shapes

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`UnifiedSearchResult` type includes clinical trial fields: `nctId?: string`, `trialStatus?: string`, `trialPhase?: string` — only populated for ClinicalTrials.gov results",
      section: "Quick Test Workflows",
      subsection: "Type Definitions & Response Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-025 ' + "`UnifiedSearchResult` type includes clinical trial fields: `nctId?: string`, `trialStatus?: string`, `trialPhase?: string` — only populated for ClinicalTrials.gov results");
    }


    // This test validates: `UnifiedSearchResult` type includes clinical trial fields: `nctId?: string`, `trialStatus?: string`, `trialPhase?: string` — only populated for ClinicalTrials.gov results
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: UnifiedSearchResult type includes rerankScore number field populated only when C', async ({ page }) => {
    // Checkpoint 26: `UnifiedSearchResult` type includes `rerankScore?: number` field, populated only when Cohere reranking is active
    // Section: Quick Test Workflows > Type Definitions & Response Shapes

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`UnifiedSearchResult` type includes `rerankScore?: number` field, populated only when Cohere reranking is active",
      section: "Quick Test Workflows",
      subsection: "Type Definitions & Response Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-026 ' + "`UnifiedSearchResult` type includes `rerankScore?: number` field, populated only when Cohere reranking is active");
    }


    // This test validates: `UnifiedSearchResult` type includes `rerankScore?: number` field, populated only when Cohere reranking is active
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: UnifiedSearchResult type includes optional pico object with population intervent', async ({ page }) => {
    // Checkpoint 27: `UnifiedSearchResult` type includes optional `pico` object with `population`, `intervention`, `comparison`, `outcome` string fields
    // Section: Quick Test Workflows > Type Definitions & Response Shapes

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`UnifiedSearchResult` type includes optional `pico` object with `population`, `intervention`, `comparison`, `outcome` string fields",
      section: "Quick Test Workflows",
      subsection: "Type Definitions & Response Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-027 ' + "`UnifiedSearchResult` type includes optional `pico` object with `population`, `intervention`, `comparison`, `outcome` string fields");
    }


    // This test validates: `UnifiedSearchResult` type includes optional `pico` object with `population`, `intervention`, `comparison`, `outcome` string fields
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: SearchResponseaugmentedQueries type includes pubmed semanticScholar openAlex key', async ({ page }) => {
    // Checkpoint 28: `SearchResponse.augmentedQueries` type includes `pubmed`, `semanticScholar`, `openAlex` keys but NOT a ClinicalTrials variant — ClinicalTrials always receives the raw user query
    // Section: Quick Test Workflows > Type Definitions & Response Shapes

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`SearchResponse.augmentedQueries` type includes `pubmed`, `semanticScholar`, `openAlex` keys but NOT a ClinicalTrials variant — ClinicalTrials always receives the raw user query",
      section: "Quick Test Workflows",
      subsection: "Type Definitions & Response Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-028 ' + "`SearchResponse.augmentedQueries` type includes `pubmed`, `semanticScholar`, `openAlex` keys but NOT a ClinicalTrials variant — ClinicalTrials always receives the raw user query");
    }


    // This test validates: `SearchResponse.augmentedQueries` type includes `pubmed`, `semanticScholar`, `openAlex` keys but NOT a ClinicalTrials variant — ClinicalTrials always receives the raw user query
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: EvidenceLevel type is defined as the exact union I II III IV V', async ({ page }) => {
    // Checkpoint 29: `EvidenceLevel` type is defined as the exact union `"I" | "II" | "III" | "IV" | "V"`
    // Section: Quick Test Workflows > Type Definitions & Response Shapes

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`EvidenceLevel` type is defined as the exact union `\"I\" | \"II\" | \"III\" | \"IV\" | \"V\"`",
      section: "Quick Test Workflows",
      subsection: "Type Definitions & Response Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-029 ' + "`EvidenceLevel` type is defined as the exact union `\"I\" | \"II\" | \"III\" | \"IV\" | \"V\"`");
    }


    // This test validates: `EvidenceLevel` type is defined as the exact union `"I" | "II" | "III" | "IV" | "V"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: UnifiedSearchResultjournalQuartile type is Q1 Q2 Q3 Q4 null', async ({ page }) => {
    // Checkpoint 30: `UnifiedSearchResult.journalQuartile` type is `"Q1" | "Q2" | "Q3" | "Q4" | null`
    // Section: Quick Test Workflows > Type Definitions & Response Shapes

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`UnifiedSearchResult.journalQuartile` type is `\"Q1\" | \"Q2\" | \"Q3\" | \"Q4\" | null`",
      section: "Quick Test Workflows",
      subsection: "Type Definitions & Response Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-030 ' + "`UnifiedSearchResult.journalQuartile` type is `\"Q1\" | \"Q2\" | \"Q3\" | \"Q4\" | null`");
    }


    // This test validates: `UnifiedSearchResult.journalQuartile` type is `"Q1" | "Q2" | "Q3" | "Q4" | null`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: SearchFilters interface includes minCitations number field currently unused by t', async ({ page }) => {
    // Checkpoint 31: `SearchFilters` interface includes `minCitations?: number` field, currently unused by the research page UI
    // Section: Quick Test Workflows > Type Definitions & Response Shapes

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`SearchFilters` interface includes `minCitations?: number` field, currently unused by the research page UI",
      section: "Quick Test Workflows",
      subsection: "Type Definitions & Response Shapes",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-031 ' + "`SearchFilters` interface includes `minCitations?: number` field, currently unused by the research page UI");
    }


    // This test validates: `SearchFilters` interface includes `minCitations?: number` field, currently unused by the research page UI
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Page layout uses h-calc100vh-7rem as the overall container height constraint', async ({ page }) => {
    // Checkpoint 32: Page layout uses `h-[calc(100vh-7rem)]` as the overall container height constraint
    // Section: Quick Test Workflows > Page Layout & CSS Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Page layout uses `h-[calc(100vh-7rem)]` as the overall container height constraint",
      section: "Quick Test Workflows",
      subsection: "Page Layout & CSS Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-032 ' + "Page layout uses `h-[calc(100vh-7rem)]` as the overall container height constraint");
    }


    // This test validates: Page layout uses `h-[calc(100vh-7rem)]` as the overall container height constraint
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Main content area uses overflow-y-auto pr-2 for scrolling within the fixed-heigh', async ({ page }) => {
    // Checkpoint 33: Main content area uses `overflow-y-auto pr-2` for scrolling within the fixed-height container
    // Section: Quick Test Workflows > Page Layout & CSS Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Main content area uses `overflow-y-auto pr-2` for scrolling within the fixed-height container",
      section: "Quick Test Workflows",
      subsection: "Page Layout & CSS Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-033 ' + "Main content area uses `overflow-y-auto pr-2` for scrolling within the fixed-height container");
    }


    // This test validates: Main content area uses `overflow-y-auto pr-2` for scrolling within the fixed-height container
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Active filter chip styling bg-brand10 text-brand border-brand30', async ({ page }) => {
    // Checkpoint 34: Active filter chip styling: `bg-brand/10 text-brand border-brand/30`
    // Section: Quick Test Workflows > Page Layout & CSS Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Active filter chip styling: `bg-brand/10 text-brand border-brand/30`",
      section: "Quick Test Workflows",
      subsection: "Page Layout & CSS Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-034 ' + "Active filter chip styling: `bg-brand/10 text-brand border-brand/30`");
    }


    // This test validates: Active filter chip styling: `bg-brand/10 text-brand border-brand/30`
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
