/**
 * Auto-generated Playwright test for research/spec-009
 * Source: e2e/specs/research/spec-009.md
 * Generated: 2026-03-14T07:49:01.583Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-009
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-009', () => {
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

  test('cp-000: Unhandled unified-search failures return HTTP 500 with error Search failed', async ({ page }) => {
    // Checkpoint 0: Unhandled unified-search failures return HTTP 500 with `{ "error": "Search failed" }`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unhandled unified-search failures return HTTP 500 with `{ \"error\": \"Search failed\" }`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-000 Unhandled unified-search failures return HTTP 500 with `{ "error": "Search failed" }`');
    }


    // This test validates: Unhandled unified-search failures return HTTP 500 with `{ "error": "Search failed" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: PubMed result parsing drops any PubmedArticle chunk whose ArticleTitle is missin', async ({ page }) => {
    // Checkpoint 1: PubMed result parsing drops any `<PubmedArticle>` chunk whose `<ArticleTitle>` is missing or empty
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed result parsing drops any `<PubmedArticle>` chunk whose `<ArticleTitle>` is missing or empty",
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
      throw new Error('Unhandled research checkpoint: cp-001 PubMed result parsing drops any `<PubmedArticle>` chunk whose `<ArticleTitle>` is missing or empty');
    }


    // This test validates: PubMed result parsing drops any `<PubmedArticle>` chunk whose `<ArticleTitle>` is missing or empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: PubMed structured abstracts concatenate every AbstractText segment into one stri', async ({ page }) => {
    // Checkpoint 2: PubMed structured abstracts concatenate every `<AbstractText>` segment into one string separated by spaces
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed structured abstracts concatenate every `<AbstractText>` segment into one string separated by spaces",
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
      throw new Error('Unhandled research checkpoint: cp-002 PubMed structured abstracts concatenate every `<AbstractText>` segment into one string separated by spaces');
    }


    // This test validates: PubMed structured abstracts concatenate every `<AbstractText>` segment into one string separated by spaces
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Labeled PubMed abstract segments are prefixed as Label text during parsing', async ({ page }) => {
    // Checkpoint 3: Labeled PubMed abstract segments are prefixed as `Label: text` during parsing
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Labeled PubMed abstract segments are prefixed as `Label: text` during parsing",
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
      throw new Error('Unhandled research checkpoint: cp-003 Labeled PubMed abstract segments are prefixed as `Label: text` during parsing');
    }


    // This test validates: Labeled PubMed abstract segments are prefixed as `Label: text` during parsing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: PubMed author names are normalized to LastName ForeName', async ({ page }) => {
    // Checkpoint 4: PubMed author names are normalized to `LastName ForeName`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed author names are normalized to `LastName ForeName`",
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
      throw new Error('Unhandled research checkpoint: cp-004 PubMed author names are normalized to `LastName ForeName`');
    }


    // This test validates: PubMed author names are normalized to `LastName ForeName`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: PubMed journal name prefers ISOAbbreviation and falls back to Title', async ({ page }) => {
    // Checkpoint 5: PubMed journal name prefers `<ISOAbbreviation>` and falls back to `<Title>`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed journal name prefers `<ISOAbbreviation>` and falls back to `<Title>`",
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
      throw new Error('Unhandled research checkpoint: cp-005 PubMed journal name prefers `<ISOAbbreviation>` and falls back to `<Title>`');
    }


    // This test validates: PubMed journal name prefers `<ISOAbbreviation>` and falls back to `<Title>`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: PubMed year parsing prefers Year inside PubDate and falls back to MedlineDate', async ({ page }) => {
    // Checkpoint 6: PubMed year parsing prefers `<Year>` inside `<PubDate>` and falls back to `<MedlineDate>`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed year parsing prefers `<Year>` inside `<PubDate>` and falls back to `<MedlineDate>`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-006 PubMed year parsing prefers `<Year>` inside `<PubDate>` and falls back to `<MedlineDate>`');
    }


    // This test validates: PubMed year parsing prefers `<Year>` inside `<PubDate>` and falls back to `<MedlineDate>`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: PubMed year parsing falls back to numeric 0 when no four-digit year can be extra', async ({ page }) => {
    // Checkpoint 7: PubMed year parsing falls back to numeric `0` when no four-digit year can be extracted
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed year parsing falls back to numeric `0` when no four-digit year can be extracted",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-007 PubMed year parsing falls back to numeric `0` when no four-digit year can be extracted');
    }


    // This test validates: PubMed year parsing falls back to numeric `0` when no four-digit year can be extracted
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: PubMed DOI is read from ArticleId IdTypedoi', async ({ page }) => {
    // Checkpoint 8: PubMed DOI is read from `<ArticleId IdType="doi">`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed DOI is read from `<ArticleId IdType=\"doi\">`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-008 PubMed DOI is read from `<ArticleId IdType="doi">`');
    }


    // This test validates: PubMed DOI is read from `<ArticleId IdType="doi">`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: PubMed publication types are collected from every PublicationType tag into publi', async ({ page }) => {
    // Checkpoint 9: PubMed publication types are collected from every `<PublicationType>` tag into `publicationTypes[]`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed publication types are collected from every `<PublicationType>` tag into `publicationTypes[]`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-009 PubMed publication types are collected from every `<PublicationType>` tag into `publicationTypes[]`');
    }


    // This test validates: PubMed publication types are collected from every `<PublicationType>` tag into `publicationTypes[]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: PubMed MeSH terms are collected from every DescriptorName tag into meshTerms', async ({ page }) => {
    // Checkpoint 10: PubMed MeSH terms are collected from every `<DescriptorName>` tag into `meshTerms[]`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed MeSH terms are collected from every `<DescriptorName>` tag into `meshTerms[]`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-010 PubMed MeSH terms are collected from every `<DescriptorName>` tag into `meshTerms[]`');
    }


    // This test validates: PubMed MeSH terms are collected from every `<DescriptorName>` tag into `meshTerms[]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: PubMed study type uses the first mapped publication type that is not other', async ({ page }) => {
    // Checkpoint 11: PubMed study type uses the first mapped publication type that is not `"other"`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed study type uses the first mapped publication type that is not `\"other\"`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-011 PubMed study type uses the first mapped publication type that is not `"other"`');
    }


    // This test validates: PubMed study type uses the first mapped publication type that is not `"other"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: PubMed results always set citationCount to 0', async ({ page }) => {
    // Checkpoint 12: PubMed results always set `citationCount` to `0`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed results always set `citationCount` to `0`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-012 PubMed results always set `citationCount` to `0`');
    }


    // This test validates: PubMed results always set `citationCount` to `0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: PubMed results always set isOpenAccess to false', async ({ page }) => {
    // Checkpoint 13: PubMed results always set `isOpenAccess` to `false`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed results always set `isOpenAccess` to `false`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-013 PubMed results always set `isOpenAccess` to `false`');
    }


    // This test validates: PubMed results always set `isOpenAccess` to `false`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: PubMed source adapter returns results total 0 immediately when its circuit break', async ({ page }) => {
    // Checkpoint 14: PubMed source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-014 PubMed source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open');
    }


    // This test validates: PubMed source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: PubMed resilient fetch calls use timeout 15000 and baseDelay 400', async ({ page }) => {
    // Checkpoint 15: PubMed resilient fetch calls use timeout `15000` and `baseDelay: 400`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "PubMed resilient fetch calls use timeout `15000` and `baseDelay: 400`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-015 PubMed resilient fetch calls use timeout `15000` and `baseDelay: 400`');
    }


    // This test validates: PubMed resilient fetch calls use timeout `15000` and `baseDelay: 400`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Semantic Scholar sanitization strips PubMed field tags such as MeSH tiab pt au t', async ({ page }) => {
    // Checkpoint 16: Semantic Scholar sanitization strips PubMed field tags such as `[MeSH]`, `[tiab]`, `[pt]`, `[au]`, `[ta]`, `[dp]`, and `[mesh]` before querying S2
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Semantic Scholar sanitization strips PubMed field tags such as `[MeSH]`, `[tiab]`, `[pt]`, `[au]`, `[ta]`, `[dp]`, and `[mesh]` before querying S2",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-016 Semantic Scholar sanitization strips PubMed field tags such as `[MeSH]`, `[tiab]`, `[pt]`, `[au]`, `[ta]`, `[dp]`, and `[mesh]` before querying S2');
    }


    // This test validates: Semantic Scholar sanitization strips PubMed field tags such as `[MeSH]`, `[tiab]`, `[pt]`, `[au]`, `[ta]`, `[dp]`, and `[mesh]` before querying S2
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Semantic Scholar sanitization removes parentheses double quotes and boolean oper', async ({ page }) => {
    // Checkpoint 17: Semantic Scholar sanitization removes parentheses, double quotes, and boolean operators `AND`, `OR`, and `NOT`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Semantic Scholar sanitization removes parentheses, double quotes, and boolean operators `AND`, `OR`, and `NOT`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-017 Semantic Scholar sanitization removes parentheses, double quotes, and boolean operators `AND`, `OR`, and `NOT`');
    }


    // This test validates: Semantic Scholar sanitization removes parentheses, double quotes, and boolean operators `AND`, `OR`, and `NOT`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Semantic Scholar year filtering serializes as YYYY-YYYY YYYY- or -YYYY depending', async ({ page }) => {
    // Checkpoint 18: Semantic Scholar year filtering serializes as `YYYY-YYYY`, `YYYY-`, or `-YYYY` depending on which bounds are present
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Semantic Scholar year filtering serializes as `YYYY-YYYY`, `YYYY-`, or `-YYYY` depending on which bounds are present",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-018 Semantic Scholar year filtering serializes as `YYYY-YYYY`, `YYYY-`, or `-YYYY` depending on which bounds are present');
    }


    // This test validates: Semantic Scholar year filtering serializes as `YYYY-YYYY`, `YYYY-`, or `-YYYY` depending on which bounds are present
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Semantic Scholar results expose openAccessPdfUrl separately from isOpenAccess', async ({ page }) => {
    // Checkpoint 19: Semantic Scholar results expose `openAccessPdfUrl` separately from `isOpenAccess`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Semantic Scholar results expose `openAccessPdfUrl` separately from `isOpenAccess`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-019 Semantic Scholar results expose `openAccessPdfUrl` separately from `isOpenAccess`');
    }


    // This test validates: Semantic Scholar results expose `openAccessPdfUrl` separately from `isOpenAccess`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Semantic Scholar results default fieldsOfStudy to an empty array when the API om', async ({ page }) => {
    // Checkpoint 20: Semantic Scholar results default `fieldsOfStudy` to an empty array when the API omits them
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Semantic Scholar results default `fieldsOfStudy` to an empty array when the API omits them",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-020 Semantic Scholar results default `fieldsOfStudy` to an empty array when the API omits them');
    }


    // This test validates: Semantic Scholar results default `fieldsOfStudy` to an empty array when the API omits them
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Semantic Scholar result mapping treats JournalArticle Journal Article publicatio', async ({ page }) => {
    // Checkpoint 21: Semantic Scholar result mapping treats `JournalArticle` / `Journal Article` publication types as study type `"other"`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Semantic Scholar result mapping treats `JournalArticle` / `Journal Article` publication types as study type `\"other\"`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-021 Semantic Scholar result mapping treats `JournalArticle` / `Journal Article` publication types as study type `"other"`');
    }


    // This test validates: Semantic Scholar result mapping treats `JournalArticle` / `Journal Article` publication types as study type `"other"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Semantic Scholar source adapter returns results total 0 immediately when its cir', async ({ page }) => {
    // Checkpoint 22: Semantic Scholar source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Semantic Scholar source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-022 Semantic Scholar source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open');
    }


    // This test validates: Semantic Scholar source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Semantic Scholar resilient fetch calls use timeout 15000 and baseDelay 1000', async ({ page }) => {
    // Checkpoint 23: Semantic Scholar resilient fetch calls use timeout `15000` and `baseDelay: 1000`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Semantic Scholar resilient fetch calls use timeout `15000` and `baseDelay: 1000`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-023 Semantic Scholar resilient fetch calls use timeout `15000` and `baseDelay: 1000`');
    }


    // This test validates: Semantic Scholar resilient fetch calls use timeout `15000` and `baseDelay: 1000`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: OpenAlex strips the httpsdoiorg prefix before storing DOI values on unified resu', async ({ page }) => {
    // Checkpoint 24: OpenAlex strips the `https://doi.org/` prefix before storing DOI values on unified results
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "OpenAlex strips the `https://doi.org/` prefix before storing DOI values on unified results",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-024 OpenAlex strips the `https://doi.org/` prefix before storing DOI values on unified results');
    }


    // This test validates: OpenAlex strips the `https://doi.org/` prefix before storing DOI values on unified results
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: OpenAlex reconstructs abstract text from abstract_inverted_index by sorting word', async ({ page }) => {
    // Checkpoint 25: OpenAlex reconstructs abstract text from `abstract_inverted_index` by sorting word-position pairs numerically
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "OpenAlex reconstructs abstract text from `abstract_inverted_index` by sorting word-position pairs numerically",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-025 OpenAlex reconstructs abstract text from `abstract_inverted_index` by sorting word-position pairs numerically');
    }


    // This test validates: OpenAlex reconstructs abstract text from `abstract_inverted_index` by sorting word-position pairs numerically
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: OpenAlex concept chips are limited to concepts whose score is greater than 03', async ({ page }) => {
    // Checkpoint 26: OpenAlex concept chips are limited to concepts whose score is greater than `0.3`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "OpenAlex concept chips are limited to concepts whose score is greater than `0.3`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-026 OpenAlex concept chips are limited to concepts whose score is greater than `0.3`');
    }


    // This test validates: OpenAlex concept chips are limited to concepts whose score is greater than `0.3`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: OpenAlex year filtering serializes into the filter query param as publication_ye', async ({ page }) => {
    // Checkpoint 27: OpenAlex year filtering serializes into the `filter=` query param as `publication_year:start-end`, `publication_year:start-`, or `publication_year:-end`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "OpenAlex year filtering serializes into the `filter=` query param as `publication_year:start-end`, `publication_year:start-`, or `publication_year:-end`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-027 OpenAlex year filtering serializes into the `filter=` query param as `publication_year:start-end`, `publication_year:start-`, or `publication_year:-end`');
    }


    // This test validates: OpenAlex year filtering serializes into the `filter=` query param as `publication_year:start-end`, `publication_year:start-`, or `publication_year:-end`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: OpenAlex adds is_oatrue to its filter query param only when onlyOpenAccess is tr', async ({ page }) => {
    // Checkpoint 28: OpenAlex adds `is_oa:true` to its `filter=` query param only when `onlyOpenAccess` is true
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "OpenAlex adds `is_oa:true` to its `filter=` query param only when `onlyOpenAccess` is true",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-028 OpenAlex adds `is_oa:true` to its `filter=` query param only when `onlyOpenAccess` is true');
    }


    // This test validates: OpenAlex adds `is_oa:true` to its `filter=` query param only when `onlyOpenAccess` is true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: OpenAlex source adapter returns results total 0 immediately when its circuit bre', async ({ page }) => {
    // Checkpoint 29: OpenAlex source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "OpenAlex source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-029 OpenAlex source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open');
    }


    // This test validates: OpenAlex source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: ClinicalTrials keyword extraction strips punctuation characters including', async ({ page }) => {
    // Checkpoint 30: ClinicalTrials keyword extraction strips punctuation characters including `? . , ! ; : ' " ( ) [ ] { }`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "ClinicalTrials keyword extraction strips punctuation characters including `? . , ! ; : ' \" ( ) [ ] { }`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-030 ClinicalTrials keyword extraction strips punctuation characters including `? . , ! ; : \' " ( ) [ ] { }`');
    }


    // This test validates: ClinicalTrials keyword extraction strips punctuation characters including `? . , ! ; : ' " ( ) [ ] { }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: ClinicalTrials keyword extraction drops single-character tokens and a built-in s', async ({ page }) => {
    // Checkpoint 31: ClinicalTrials keyword extraction drops single-character tokens and a built-in stop-word list before joining the remaining search terms
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "ClinicalTrials keyword extraction drops single-character tokens and a built-in stop-word list before joining the remaining search terms",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-031 ClinicalTrials keyword extraction drops single-character tokens and a built-in stop-word list before joining the remaining search terms');
    }


    // This test validates: ClinicalTrials keyword extraction drops single-character tokens and a built-in stop-word list before joining the remaining search terms
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: ClinicalTrials falls back to the raw query string when keyword extraction produc', async ({ page }) => {
    // Checkpoint 32: ClinicalTrials falls back to the raw query string when keyword extraction produces an empty term string
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "ClinicalTrials falls back to the raw query string when keyword extraction produces an empty term string",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-032 ClinicalTrials falls back to the raw query string when keyword extraction produces an empty term string');
    }


    // This test validates: ClinicalTrials falls back to the raw query string when keyword extraction produces an empty term string
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: ClinicalTrials requests always include sortrelevance formatjson and countTotaltr', async ({ page }) => {
    // Checkpoint 33: ClinicalTrials requests always include `sort=@relevance`, `format=json`, and `countTotal=true`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "ClinicalTrials requests always include `sort=@relevance`, `format=json`, and `countTotal=true`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-033 ClinicalTrials requests always include `sort=@relevance`, `format=json`, and `countTotal=true`');
    }


    // This test validates: ClinicalTrials requests always include `sort=@relevance`, `format=json`, and `countTotal=true`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: ClinicalTrials status filtering only maps recruiting to RECRUITING and completed', async ({ page }) => {
    // Checkpoint 34: ClinicalTrials status filtering only maps `recruiting` to `RECRUITING` and `completed` to `COMPLETED`
    // Section: Quick Test Workflows > Source Adapter Normalization

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "ClinicalTrials status filtering only maps `recruiting` to `RECRUITING` and `completed` to `COMPLETED`",
      section: "Quick Test Workflows",
      subsection: "Source Adapter Normalization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-034 ClinicalTrials status filtering only maps `recruiting` to `RECRUITING` and `completed` to `COMPLETED`');
    }


    // This test validates: ClinicalTrials status filtering only maps `recruiting` to `RECRUITING` and `completed` to `COMPLETED`
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
