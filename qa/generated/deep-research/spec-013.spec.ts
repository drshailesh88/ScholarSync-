/**
 * Auto-generated Playwright test for deep-research/spec-013
 * Source: e2e/specs/deep-research/spec-013.md
 * Generated: 2026-03-14T18:45:20.596Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts deep-research spec-013
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';











import { assertDeepResearchCheckpoint } from '../../module-assertions/deep-research';








test.describe('deep-research / spec-013', () => {
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

  test('cp-000: Execute-route progress SSE payloads contain stage and message but no numeric pro', async ({ page }) => {
    // Checkpoint 0: Execute-route `progress` SSE payloads contain `stage` and `message`, but no numeric `progress`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Execute-route `progress` SSE payloads contain `stage` and `message`, but no numeric `progress`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-000 Execute-route `progress` SSE payloads contain `stage` and `message`, but no numeric `progress`.');
    }


    // This test validates: Execute-route `progress` SSE payloads contain `stage` and `message`, but no numeric `progress`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Execute-route report SSE payload nests the final report under report and include', async ({ page }) => {
    // Checkpoint 1: Execute-route `report` SSE payload nests the final report under `report` and includes `markdownReport`, `topic`, `mode`, `summary`, `keyFindings`, `gaps`, `contradictions`, `totalSources`, `searchRounds`, `citationTraversalPapers`, `extractedDataCount`, `durationMs`, `perspectives`, `perspectiveSections`, and `sources`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Execute-route `report` SSE payload nests the final report under `report` and includes `markdownReport`, `topic`, `mode`, `summary`, `keyFindings`, `gaps`, `contradictions`, `totalSources`, `searchRounds`, `citationTraversalPapers`, `extractedDataCount`, `durationMs`, `perspectives`, `perspectiveSections`, and `sources`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-001 Execute-route `report` SSE payload nests the final report under `report` and includes `markdownReport`, `topic`, `mode`, `summary`, `keyFindings`, `gaps`, `contradictions`, `totalSources`, `searchRounds`, `citationTraversalPapers`, `extractedDataCount`, `durationMs`, `perspectives`, `perspectiveSections`, and `sources`.');
    }


    // This test validates: Execute-route `report` SSE payload nests the final report under `report` and includes `markdownReport`, `topic`, `mode`, `summary`, `keyFindings`, `gaps`, `contradictions`, `totalSources`, `searchRounds`, `citationTraversalPapers`, `extractedDataCount`, `durationMs`, `perspectives`, `perspectiveSections`, and `sources`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: GET apideep-researchsessions reads from deepResearchSessions orders by completed', async ({ page }) => {
    // Checkpoint 2: `GET /api/deep-research/sessions` reads from `deepResearchSessions`, orders by `completedAt DESC`, applies `.limit(20)`, and returns `{ sessions: [...] }`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`GET /api/deep-research/sessions` reads from `deepResearchSessions`, orders by `completedAt DESC`, applies `.limit(20)`, and returns `{ sessions: [...] }`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-002 `GET /api/deep-research/sessions` reads from `deepResearchSessions`, orders by `completedAt DESC`, applies `.limit(20)`, and returns `{ sessions: [...] }`.');
    }


    // This test validates: `GET /api/deep-research/sessions` reads from `deepResearchSessions`, orders by `completedAt DESC`, applies `.limit(20)`, and returns `{ sessions: [...] }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: GET apideep-researchsessionsid filters by both session ID and userId returns 400', async ({ page }) => {
    // Checkpoint 3: `GET /api/deep-research/sessions/{id}` filters by both session ID and `userId`, returns `400 {"error":"Invalid session ID"}` for bad IDs, `404 {"error":"Session not found"}` for missing or unowned rows, and success payload `{ id, topic, mode, markdownReport, sources, keyFindings, gaps, papersFound, completedAt }`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`GET /api/deep-research/sessions/{id}` filters by both session ID and `userId`, returns `400 {\"error\":\"Invalid session ID\"}` for bad IDs, `404 {\"error\":\"Session not found\"}` for missing or unowned rows, and success payload `{ id, topic, mode, markdownReport, sources, keyFindings, gaps, papersFound, completedAt }`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-003 `GET /api/deep-research/sessions/{id}` filters by both session ID and `userId`, returns `400 {"error":"Invalid session ID"}` for bad IDs, `404 {"error":"Session not found"}` for missing or unowned rows, and success payload `{ id, topic, mode, markdownReport, sources, keyFindings, gaps, papersFound, completedAt }`.');
    }


    // This test validates: `GET /api/deep-research/sessions/{id}` filters by both session ID and `userId`, returns `400 {"error":"Invalid session ID"}` for bad IDs, `404 {"error":"Session not found"}` for missing or unowned rows, and success payload `{ id, topic, mode, markdownReport, sources, keyFindings, gaps, papersFound, completedAt }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: POST apideep-researchsave inserts into deepResearchSessions with userId original', async ({ page }) => {
    // Checkpoint 4: `POST /api/deep-research/save` inserts into `deepResearchSessions` with `userId`, `originalQuery`, `finalReport`, `keyFindings`, `gapsIdentified`, `researchPlan: { mode, sources }`, `status: "completed"`, `papersFound`, `papersRead`, and `completedAt`, then returns `{ id, success: true }`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/save` inserts into `deepResearchSessions` with `userId`, `originalQuery`, `finalReport`, `keyFindings`, `gapsIdentified`, `researchPlan: { mode, sources }`, `status: \"completed\"`, `papersFound`, `papersRead`, and `completedAt`, then returns `{ id, success: true }`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-004 `POST /api/deep-research/save` inserts into `deepResearchSessions` with `userId`, `originalQuery`, `finalReport`, `keyFindings`, `gapsIdentified`, `researchPlan: { mode, sources }`, `status: "completed"`, `papersFound`, `papersRead`, and `completedAt`, then returns `{ id, success: true }`.');
    }


    // This test validates: `POST /api/deep-research/save` inserts into `deepResearchSessions` with `userId`, `originalQuery`, `finalReport`, `keyFindings`, `gapsIdentified`, `researchPlan: { mode, sources }`, `status: "completed"`, `papersFound`, `papersRead`, and `completedAt`, then returns `{ id, success: true }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: POST apideep-researchopen-in-studio requires both topic and markdownReport other', async ({ page }) => {
    // Checkpoint 5: `POST /api/deep-research/open-in-studio` requires both `topic` and `markdownReport`; otherwise it returns `400 {"error":"Topic and markdownReport are required"}`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/open-in-studio` requires both `topic` and `markdownReport`; otherwise it returns `400 {\"error\":\"Topic and markdownReport are required\"}`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-005 `POST /api/deep-research/open-in-studio` requires both `topic` and `markdownReport`; otherwise it returns `400 {"error":"Topic and markdownReport are required"}`.');
    }


    // This test validates: `POST /api/deep-research/open-in-studio` requires both `topic` and `markdownReport`; otherwise it returns `400 {"error":"Topic and markdownReport are required"}`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: POST apideep-researchopen-in-studio best-effort inserts a matching deepResearchS', async ({ page }) => {
    // Checkpoint 6: `POST /api/deep-research/open-in-studio` best-effort inserts a matching `deepResearchSessions` row before creating Studio records; failures in that insert are logged and do not stop Studio creation.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/open-in-studio` best-effort inserts a matching `deepResearchSessions` row before creating Studio records; failures in that insert are logged and do not stop Studio creation.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-006 `POST /api/deep-research/open-in-studio` best-effort inserts a matching `deepResearchSessions` row before creating Studio records; failures in that insert are logged and do not stop Studio creation.');
    }


    // This test validates: `POST /api/deep-research/open-in-studio` best-effort inserts a matching `deepResearchSessions` row before creating Studio records; failures in that insert are logged and do not stop Studio creation.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: POST apideep-researchopen-in-studio inserts a projects row with project_type lit', async ({ page }) => {
    // Checkpoint 7: `POST /api/deep-research/open-in-studio` inserts a `projects` row with `project_type: "literature_review"` and `status: "drafting"`, inserts a `synthesisDocuments` row with `document_type: "review_article"`, inserts one `synthesisSections` row titled `Research Report`, and returns `{ projectId, documentId, redirectUrl }`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/open-in-studio` inserts a `projects` row with `project_type: \"literature_review\"` and `status: \"drafting\"`, inserts a `synthesisDocuments` row with `document_type: \"review_article\"`, inserts one `synthesisSections` row titled `Research Report`, and returns `{ projectId, documentId, redirectUrl }`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-007 `POST /api/deep-research/open-in-studio` inserts a `projects` row with `project_type: "literature_review"` and `status: "drafting"`, inserts a `synthesisDocuments` row with `document_type: "review_article"`, inserts one `synthesisSections` row titled `Research Report`, and returns `{ projectId, documentId, redirectUrl }`.');
    }


    // This test validates: `POST /api/deep-research/open-in-studio` inserts a `projects` row with `project_type: "literature_review"` and `status: "drafting"`, inserts a `synthesisDocuments` row with `document_type: "review_article"`, inserts one `synthesisSections` row titled `Research Report`, and returns `{ projectId, documentId, redirectUrl }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: POST apiexportpdf is the only route in this flow that uses Zod and rate limiting', async ({ page }) => {
    // Checkpoint 8: `POST /api/export/pdf` is the only route in this flow that uses Zod and rate limiting.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/export/pdf` is the only route in this flow that uses Zod and rate limiting.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-008 `POST /api/export/pdf` is the only route in this flow that uses Zod and rate limiting.');
    }


    // This test validates: `POST /api/export/pdf` is the only route in this flow that uses Zod and rate limiting.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: POST apiexportpdf requires auth and returns 401 errorAuthentication required whe', async ({ page }) => {
    // Checkpoint 9: `POST /api/export/pdf` requires auth and returns `401 {"error":"Authentication required"}` when auth fails.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/export/pdf` requires auth and returns `401 {\"error\":\"Authentication required\"}` when auth fails.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-009 `POST /api/export/pdf` requires auth and returns `401 {"error":"Authentication required"}` when auth fails.');
    }


    // This test validates: `POST /api/export/pdf` requires auth and returns `401 {"error":"Authentication required"}` when auth fails.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: POST apiexportpdf rate-limits the caller with checkRateLimituserId export RATE_L', async ({ page }) => {
    // Checkpoint 10: `POST /api/export/pdf` rate-limits the caller with `checkRateLimit(userId, "export", RATE_LIMITS.export)`, where `RATE_LIMITS.export` is `30` requests per `3600` seconds.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/export/pdf` rate-limits the caller with `checkRateLimit(userId, \"export\", RATE_LIMITS.export)`, where `RATE_LIMITS.export` is `30` requests per `3600` seconds.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-010 `POST /api/export/pdf` rate-limits the caller with `checkRateLimit(userId, "export", RATE_LIMITS.export)`, where `RATE_LIMITS.export` is `30` requests per `3600` seconds.');
    }


    // This test validates: `POST /api/export/pdf` rate-limits the caller with `checkRateLimit(userId, "export", RATE_LIMITS.export)`, where `RATE_LIMITS.export` is `30` requests per `3600` seconds.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: POST apiexportpdf returns 429 errorRate limit exceeded Please try again later wi', async ({ page }) => {
    // Checkpoint 11: `POST /api/export/pdf` returns `429 {"error":"Rate limit exceeded. Please try again later."}` with header `X-RateLimit-Remaining` when the rate limit is exceeded.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/export/pdf` returns `429 {\"error\":\"Rate limit exceeded. Please try again later.\"}` with header `X-RateLimit-Remaining` when the rate limit is exceeded.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-011 `POST /api/export/pdf` returns `429 {"error":"Rate limit exceeded. Please try again later."}` with header `X-RateLimit-Remaining` when the rate limit is exceeded.');
    }


    // This test validates: `POST /api/export/pdf` returns `429 {"error":"Rate limit exceeded. Please try again later."}` with header `X-RateLimit-Remaining` when the rate limit is exceeded.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: POST apiexportpdf validates the request with zobject title zstringmax500optional', async ({ page }) => {
    // Checkpoint 12: `POST /api/export/pdf` validates the request with `z.object({ title: z.string().max(500).optional(), content: z.string().max(500000), citations: z.array(z.string()).max(1000).optional() })`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/export/pdf` validates the request with `z.object({ title: z.string().max(500).optional(), content: z.string().max(500000), citations: z.array(z.string()).max(1000).optional() })`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-012 `POST /api/export/pdf` validates the request with `z.object({ title: z.string().max(500).optional(), content: z.string().max(500000), citations: z.array(z.string()).max(1000).optional() })`.');
    }


    // This test validates: `POST /api/export/pdf` validates the request with `z.object({ title: z.string().max(500).optional(), content: z.string().max(500000), citations: z.array(z.string()).max(1000).optional() })`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: POST apiexportpdf returns 400 errorInvalid request data on Zod validation failur', async ({ page }) => {
    // Checkpoint 13: `POST /api/export/pdf` returns `400 {"error":"Invalid request data"}` on Zod validation failure, `400 {"error":"Content is required"}` when `content` is an empty string, a binary PDF on success, and `500 {"error":"Export failed"}` on unexpected failure.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/export/pdf` returns `400 {\"error\":\"Invalid request data\"}` on Zod validation failure, `400 {\"error\":\"Content is required\"}` when `content` is an empty string, a binary PDF on success, and `500 {\"error\":\"Export failed\"}` on unexpected failure.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-013 `POST /api/export/pdf` returns `400 {"error":"Invalid request data"}` on Zod validation failure, `400 {"error":"Content is required"}` when `content` is an empty string, a binary PDF on success, and `500 {"error":"Export failed"}` on unexpected failure.');
    }


    // This test validates: `POST /api/export/pdf` returns `400 {"error":"Invalid request data"}` on Zod validation failure, `400 {"error":"Content is required"}` when `content` is an empty string, a binary PDF on success, and `500 {"error":"Export failed"}` on unexpected failure.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: validateTopic returns valid false error Topic must be at least 5 characters long', async ({ page }) => {
    // Checkpoint 14: `validateTopic()` returns `{ valid: false, error: "Topic must be at least 5 characters long" }` when `topic.trim().length < 5`.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`validateTopic()` returns `{ valid: false, error: \"Topic must be at least 5 characters long\" }` when `topic.trim().length < 5`.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-014 `validateTopic()` returns `{ valid: false, error: "Topic must be at least 5 characters long" }` when `topic.trim().length < 5`.');
    }


    // This test validates: `validateTopic()` returns `{ valid: false, error: "Topic must be at least 5 characters long" }` when `topic.trim().length < 5`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: validateTopic returns valid false error Topic must be 500 characters or fewer wh', async ({ page }) => {
    // Checkpoint 15: `validateTopic()` returns `{ valid: false, error: "Topic must be 500 characters or fewer" }` when `topic.trim().length > 500`.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`validateTopic()` returns `{ valid: false, error: \"Topic must be 500 characters or fewer\" }` when `topic.trim().length > 500`.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-015 `validateTopic()` returns `{ valid: false, error: "Topic must be 500 characters or fewer" }` when `topic.trim().length > 500`.');
    }


    // This test validates: `validateTopic()` returns `{ valid: false, error: "Topic must be 500 characters or fewer" }` when `topic.trim().length > 500`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Engine buildConfig uses quick depth 1 breadth 2 maxSources 15 perSourceLimit 10', async ({ page }) => {
    // Checkpoint 16: Engine `buildConfig()` uses `quick = { depth: 1, breadth: 2, maxSources: 15, perSourceLimit: 10 }`.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Engine `buildConfig()` uses `quick = { depth: 1, breadth: 2, maxSources: 15, perSourceLimit: 10 }`.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-016 Engine `buildConfig()` uses `quick = { depth: 1, breadth: 2, maxSources: 15, perSourceLimit: 10 }`.');
    }


    // This test validates: Engine `buildConfig()` uses `quick = { depth: 1, breadth: 2, maxSources: 15, perSourceLimit: 10 }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Engine buildConfig uses standard depth 2 breadth 3 maxSources 30 perSourceLimit ', async ({ page }) => {
    // Checkpoint 17: Engine `buildConfig()` uses `standard = { depth: 2, breadth: 3, maxSources: 30, perSourceLimit: 15 }`.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Engine `buildConfig()` uses `standard = { depth: 2, breadth: 3, maxSources: 30, perSourceLimit: 15 }`.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-017 Engine `buildConfig()` uses `standard = { depth: 2, breadth: 3, maxSources: 30, perSourceLimit: 15 }`.');
    }


    // This test validates: Engine `buildConfig()` uses `standard = { depth: 2, breadth: 3, maxSources: 30, perSourceLimit: 15 }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Engine buildConfig uses deep depth 3 breadth 5 maxSources 60 perSourceLimit 20', async ({ page }) => {
    // Checkpoint 18: Engine `buildConfig()` uses `deep = { depth: 3, breadth: 5, maxSources: 60, perSourceLimit: 20 }`.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Engine `buildConfig()` uses `deep = { depth: 3, breadth: 5, maxSources: 60, perSourceLimit: 20 }`.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-018 Engine `buildConfig()` uses `deep = { depth: 3, breadth: 5, maxSources: 60, perSourceLimit: 20 }`.');
    }


    // This test validates: Engine `buildConfig()` uses `deep = { depth: 3, breadth: 5, maxSources: 60, perSourceLimit: 20 }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Engine buildConfig uses exhaustive depth 4 breadth 7 maxSources 100 perSourceLim', async ({ page }) => {
    // Checkpoint 19: Engine `buildConfig()` uses `exhaustive = { depth: 4, breadth: 7, maxSources: 100, perSourceLimit: 25 }`.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Engine `buildConfig()` uses `exhaustive = { depth: 4, breadth: 7, maxSources: 100, perSourceLimit: 25 }`.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-019 Engine `buildConfig()` uses `exhaustive = { depth: 4, breadth: 7, maxSources: 100, perSourceLimit: 25 }`.');
    }


    // This test validates: Engine `buildConfig()` uses `exhaustive = { depth: 4, breadth: 7, maxSources: 100, perSourceLimit: 25 }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Engine search always fans out across PubMed Semantic Scholar and OpenAlex in sea', async ({ page }) => {
    // Checkpoint 20: Engine search always fans out across PubMed, Semantic Scholar, and OpenAlex in `searchAllSources()`; there is no user-selectable source filter in the route UI.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Engine search always fans out across PubMed, Semantic Scholar, and OpenAlex in `searchAllSources()`; there is no user-selectable source filter in the route UI.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-020 Engine search always fans out across PubMed, Semantic Scholar, and OpenAlex in `searchAllSources()`; there is no user-selectable source filter in the route UI.');
    }


    // This test validates: Engine search always fans out across PubMed, Semantic Scholar, and OpenAlex in `searchAllSources()`; there is no user-selectable source filter in the route UI.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Round-1 search batches three queries at a time and sleeps for exactly 500 ms bet', async ({ page }) => {
    // Checkpoint 21: Round-1 search batches three queries at a time and sleeps for exactly 500 ms between batches.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Round-1 search batches three queries at a time and sleeps for exactly 500 ms between batches.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-021 Round-1 search batches three queries at a time and sleeps for exactly 500 ms between batches.');
    }


    // This test validates: Round-1 search batches three queries at a time and sleeps for exactly 500 ms between batches.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Citation traversal batches three seed papers at a time calls Semantic Scholar ci', async ({ page }) => {
    // Checkpoint 22: Citation traversal batches three seed papers at a time, calls Semantic Scholar `citations` and `references` endpoints with a 15-second timeout each, and sleeps for exactly 500 ms between batches.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Citation traversal batches three seed papers at a time, calls Semantic Scholar `citations` and `references` endpoints with a 15-second timeout each, and sleeps for exactly 500 ms between batches.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-022 Citation traversal batches three seed papers at a time, calls Semantic Scholar `citations` and `references` endpoints with a 15-second timeout each, and sleeps for exactly 500 ms between batches.');
    }


    // This test validates: Citation traversal batches three seed papers at a time, calls Semantic Scholar `citations` and `references` endpoints with a 15-second timeout each, and sleeps for exactly 500 ms between batches.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Citation traversal seeds the graph with the top 5 papers in quick mode and the t', async ({ page }) => {
    // Checkpoint 23: Citation traversal seeds the graph with the top 5 papers in quick mode and the top 10 papers in all other modes.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Citation traversal seeds the graph with the top 5 papers in quick mode and the top 10 papers in all other modes.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-023 Citation traversal seeds the graph with the top 5 papers in quick mode and the top 10 papers in all other modes.');
    }


    // This test validates: Citation traversal seeds the graph with the top 5 papers in quick mode and the top 10 papers in all other modes.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Round-2 follow-up search only runs when configdepth 2', async ({ page }) => {
    // Checkpoint 24: Round-2 follow-up search only runs when `config.depth >= 2`.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Round-2 follow-up search only runs when `config.depth >= 2`.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-024 Round-2 follow-up search only runs when `config.depth >= 2`.');
    }


    // This test validates: Round-2 follow-up search only runs when `config.depth >= 2`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Round-3 follow-up search only runs when configdepth 3', async ({ page }) => {
    // Checkpoint 25: Round-3 follow-up search only runs when `config.depth >= 3`.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Round-3 follow-up search only runs when `config.depth >= 3`.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-025 Round-3 follow-up search only runs when `config.depth >= 3`.');
    }


    // This test validates: Round-3 follow-up search only runs when `config.depth >= 3`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Unpaywall lookup only checks the first 100 DOI-bearing papers', async ({ page }) => {
    // Checkpoint 26: Unpaywall lookup only checks the first 100 DOI-bearing papers.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Unpaywall lookup only checks the first 100 DOI-bearing papers.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-026 Unpaywall lookup only checks the first 100 DOI-bearing papers.');
    }


    // This test validates: Unpaywall lookup only checks the first 100 DOI-bearing papers.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Full-text extraction only targets open-access papers with fullTextUrl and isOpen', async ({ page }) => {
    // Checkpoint 27: Full-text extraction only targets open-access papers with `fullTextUrl` and `isOpenAccess`, and it picks the top 5 papers in quick mode, 10 in standard mode, and 20 in deep or exhaustive mode.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Full-text extraction only targets open-access papers with `fullTextUrl` and `isOpenAccess`, and it picks the top 5 papers in quick mode, 10 in standard mode, and 20 in deep or exhaustive mode.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-027 Full-text extraction only targets open-access papers with `fullTextUrl` and `isOpenAccess`, and it picks the top 5 papers in quick mode, 10 in standard mode, and 20 in deep or exhaustive mode.');
    }


    // This test validates: Full-text extraction only targets open-access papers with `fullTextUrl` and `isOpenAccess`, and it picks the top 5 papers in quick mode, 10 in standard mode, and 20 in deep or exhaustive mode.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Full-text extraction aborts each PDF fetch after exactly 15000 ms', async ({ page }) => {
    // Checkpoint 28: Full-text extraction aborts each PDF fetch after exactly `15000` ms.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Full-text extraction aborts each PDF fetch after exactly `15000` ms.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-028 Full-text extraction aborts each PDF fetch after exactly `15000` ms.');
    }


    // This test validates: Full-text extraction aborts each PDF fetch after exactly `15000` ms.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Full-text extraction rejects PDFs larger than 20 MB before or after download', async ({ page }) => {
    // Checkpoint 29: Full-text extraction rejects PDFs larger than 20 MB before or after download.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Full-text extraction rejects PDFs larger than 20 MB before or after download.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-029 Full-text extraction rejects PDFs larger than 20 MB before or after download.');
    }


    // This test validates: Full-text extraction rejects PDFs larger than 20 MB before or after download.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Extracted full text is truncated to 15000 characters after section extraction', async ({ page }) => {
    // Checkpoint 30: Extracted full text is truncated to `15000` characters after section extraction.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Extracted full text is truncated to `15000` characters after section extraction.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-030 Extracted full text is truncated to `15000` characters after section extraction.');
    }


    // This test validates: Extracted full text is truncated to `15000` characters after section extraction.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Full-text extraction failure returns null for that paper and increments the fail', async ({ page }) => {
    // Checkpoint 31: Full-text extraction failure returns `null` for that paper and increments the `failed` count; it does not fall back to the abstract.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Full-text extraction failure returns `null` for that paper and increments the `failed` count; it does not fall back to the abstract.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-031 Full-text extraction failure returns `null` for that paper and increments the `failed` count; it does not fall back to the abstract.');
    }


    // This test validates: Full-text extraction failure returns `null` for that paper and increments the `failed` count; it does not fall back to the abstract.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Data extraction batches five papers at a time and sleeps for exactly 200 ms betw', async ({ page }) => {
    // Checkpoint 32: Data extraction batches five papers at a time and sleeps for exactly 200 ms between batches.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Data extraction batches five papers at a time and sleeps for exactly 200 ms between batches.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-032 Data extraction batches five papers at a time and sleeps for exactly 200 ms between batches.');
    }


    // This test validates: Data extraction batches five papers at a time and sleeps for exactly 200 ms between batches.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Data extraction limits papers to 10 in quick mode 20 in standard mode and 40 in ', async ({ page }) => {
    // Checkpoint 33: Data extraction limits papers to 10 in quick mode, 20 in standard mode, and 40 in deep or exhaustive mode.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Data extraction limits papers to 10 in quick mode, 20 in standard mode, and 40 in deep or exhaustive mode.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-033 Data extraction limits papers to 10 in quick mode, 20 in standard mode, and 40 in deep or exhaustive mode.');
    }


    // This test validates: Data extraction limits papers to 10 in quick mode, 20 in standard mode, and 40 in deep or exhaustive mode.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Synthesis uses four passes per-perspective sections executive summaryintroductio', async ({ page }) => {
    // Checkpoint 34: Synthesis uses four passes: per-perspective sections, executive summary/introduction, tables and analysis, then critique-and-revision.
    // Section: Quick Test Workflows > Backend Engine and Library Behavior

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Synthesis uses four passes: per-perspective sections, executive summary/introduction, tables and analysis, then critique-and-revision.",
      section: "Quick Test Workflows",
      subsection: "Backend Engine and Library Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-034 Synthesis uses four passes: per-perspective sections, executive summary/introduction, tables and analysis, then critique-and-revision.');
    }


    // This test validates: Synthesis uses four passes: per-perspective sections, executive summary/introduction, tables and analysis, then critique-and-revision.
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
