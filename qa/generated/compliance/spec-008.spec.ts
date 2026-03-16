/**
 * Auto-generated Playwright test for compliance/spec-008
 * Source: e2e/specs/compliance/spec-008.md
 * Generated: 2026-03-15T18:31:29.469Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts compliance spec-008
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';









import { assertComplianceCheckpoint } from '../../module-assertions/compliance';










test.describe('compliance / spec-008', () => {
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

  test('cp-000: Project-list load failures are silent and leave the selector hidden when no proj', async ({ page }) => {
    // Checkpoint 0: Project-list load failures are silent and leave the selector hidden when no projects are available
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Project-list load failures are silent and leave the selector hidden when no projects are available",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-000 ' + "Project-list load failures are silent and leave the selector hidden when no projects are available");
    }


    // This test validates: Project-list load failures are silent and leave the selector hidden when no projects are available
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Project dropdown button falls back to Select project when no project is selected', async ({ page }) => {
    // Checkpoint 1: Project dropdown button falls back to `Select project` when no project is selected
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Project dropdown button falls back to `Select project` when no project is selected",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-001 ' + "Project dropdown button falls back to `Select project` when no project is selected");
    }


    // This test validates: Project dropdown button falls back to `Select project` when no project is selected
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Project dropdown is rendered only in document mode and only when projectslength ', async ({ page }) => {
    // Checkpoint 2: Project dropdown is rendered only in document mode and only when `projects.length > 0`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Project dropdown is rendered only in document mode and only when `projects.length > 0`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-002 ' + "Project dropdown is rendered only in document mode and only when `projects.length > 0`");
    }


    // This test validates: Project dropdown is rendered only in document mode and only when `projects.length > 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Clicking a project option updates selectedProjectId and immediately closes the d', async ({ page }) => {
    // Checkpoint 3: Clicking a project option updates `selectedProjectId` and immediately closes the dropdown
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Clicking a project option updates `selectedProjectId` and immediately closes the dropdown",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-003 ' + "Clicking a project option updates `selectedProjectId` and immediately closes the dropdown");
    }


    // This test validates: Clicking a project option updates `selectedProjectId` and immediately closes the dropdown
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Outside-click handling for the project dropdown uses a mousedown listener on doc', async ({ page }) => {
    // Checkpoint 4: Outside-click handling for the project dropdown uses a `mousedown` listener on `document`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Outside-click handling for the project dropdown uses a `mousedown` listener on `document`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-004 ' + "Outside-click handling for the project dropdown uses a `mousedown` listener on `document`");
    }


    // This test validates: Outside-click handling for the project dropdown uses a `mousedown` listener on `document`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Switching into document mode clears the page-level error state before fetching t', async ({ page }) => {
    // Checkpoint 5: Switching into document mode clears the page-level `error` state before fetching the active document
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Switching into document mode clears the page-level `error` state before fetching the active document",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-005 ' + "Switching into document mode clears the page-level `error` state before fetching the active document");
    }


    // This test validates: Switching into document mode clears the page-level `error` state before fetching the active document
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Document fetch runs only while sourceMode document', async ({ page }) => {
    // Checkpoint 6: Document fetch runs only while `sourceMode === "document"`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Document fetch runs only while `sourceMode === \"document\"`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-006 ' + "Document fetch runs only while `sourceMode === \"document\"`");
    }


    // This test validates: Document fetch runs only while `sourceMode === "document"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Successful document fetch sets both activeDoc and inputText activeDocplainText', async ({ page }) => {
    // Checkpoint 7: Successful document fetch sets both `activeDoc` and `inputText = activeDoc.plainText`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Successful document fetch sets both `activeDoc` and `inputText = activeDoc.plainText`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-007 ' + "Successful document fetch sets both `activeDoc` and `inputText = activeDoc.plainText`");
    }


    // This test validates: Successful document fetch sets both `activeDoc` and `inputText = activeDoc.plainText`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Failed document fetch clears activeDoc and inputText without showing a user-faci', async ({ page }) => {
    // Checkpoint 8: Failed document fetch clears `activeDoc` and `inputText` without showing a user-facing fetch error
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Failed document fetch clears `activeDoc` and `inputText` without showing a user-facing fetch error",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-008 ' + "Failed document fetch clears `activeDoc` and `inputText` without showing a user-facing fetch error");
    }


    // This test validates: Failed document fetch clears `activeDoc` and `inputText` without showing a user-facing fetch error
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Switching from document mode to paste mode does not clear inputText the currentl', async ({ page }) => {
    // Checkpoint 9: Switching from document mode to paste mode does not clear `inputText`; the currently loaded document text remains available for editing
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Switching from document mode to paste mode does not clear `inputText`; the currently loaded document text remains available for editing",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-009 ' + "Switching from document mode to paste mode does not clear `inputText`; the currently loaded document text remains available for editing");
    }


    // This test validates: Switching from document mode to paste mode does not clear `inputText`; the currently loaded document text remains available for editing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Document-mode textarea is explicitly readOnly', async ({ page }) => {
    // Checkpoint 10: Document-mode textarea is explicitly `readOnly`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Document-mode textarea is explicitly `readOnly`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-010 ' + "Document-mode textarea is explicitly `readOnly`");
    }


    // This test validates: Document-mode textarea is explicitly `readOnly`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Paste-mode textarea is editable and uses the same shared inputText state as docu', async ({ page }) => {
    // Checkpoint 11: Paste-mode textarea is editable and uses the same shared `inputText` state as document mode
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Paste-mode textarea is editable and uses the same shared `inputText` state as document mode",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-011 ' + "Paste-mode textarea is editable and uses the same shared `inputText` state as document mode");
    }


    // This test validates: Paste-mode textarea is editable and uses the same shared `inputText` state as document mode
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Textarea placeholder switches between the document-mode and paste-mode helper co', async ({ page }) => {
    // Checkpoint 12: Textarea placeholder switches between the document-mode and paste-mode helper copy based on `sourceMode`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Textarea placeholder switches between the document-mode and paste-mode helper copy based on `sourceMode`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-012 ' + "Textarea placeholder switches between the document-mode and paste-mode helper copy based on `sourceMode`");
    }


    // This test validates: Textarea placeholder switches between the document-mode and paste-mode helper copy based on `sourceMode`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Word count is always shown beneath the textarea including document mode', async ({ page }) => {
    // Checkpoint 13: Word count is always shown beneath the textarea, including document mode
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Word count is always shown beneath the textarea, including document mode",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-013 ' + "Word count is always shown beneath the textarea, including document mode");
    }


    // This test validates: Word count is always shown beneath the textarea, including document mode
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Document-mode word-count row appends from documentTitle when activeDoc exists', async ({ page }) => {
    // Checkpoint 14: Document-mode word-count row appends `from {documentTitle}` when `activeDoc` exists
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Document-mode word-count row appends `from {documentTitle}` when `activeDoc` exists",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-014 ' + "Document-mode word-count row appends `from {documentTitle}` when `activeDoc` exists");
    }


    // This test validates: Document-mode word-count row appends `from {documentTitle}` when `activeDoc` exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Word count is calculated from inputTextsplitsfilterBooleanlength', async ({ page }) => {
    // Checkpoint 15: Word count is calculated from `inputText.split(/\\s+/).filter(Boolean).length`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Word count is calculated from `inputText.split(/\\\\s+/).filter(Boolean).length`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-015 ' + "Word count is calculated from `inputText.split(/\\\\s+/).filter(Boolean).length`");
    }


    // This test validates: Word count is calculated from `inputText.split(/\\s+/).filter(Boolean).length`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Realtime Live toggle is rendered only in paste mode before a full result exists', async ({ page }) => {
    // Checkpoint 16: Realtime `Live` toggle is rendered only in paste mode before a full result exists
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Realtime `Live` toggle is rendered only in paste mode before a full result exists",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-016 ' + "Realtime `Live` toggle is rendered only in paste mode before a full result exists");
    }


    // This test validates: Realtime `Live` toggle is rendered only in paste mode before a full result exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Realtime toggle score pill is shown only when realtime is enabled and realtimeRe', async ({ page }) => {
    // Checkpoint 17: Realtime toggle score pill is shown only when realtime is enabled and `realtimeResult.score` is non-null
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Realtime toggle score pill is shown only when realtime is enabled and `realtimeResult.score` is non-null",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-017 ' + "Realtime toggle score pill is shown only when realtime is enabled and `realtimeResult.score` is non-null");
    }


    // This test validates: Realtime toggle score pill is shown only when realtime is enabled and `realtimeResult.score` is non-null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Realtime toggle color coding uses 60 green 40 amber and 40 orange', async ({ page }) => {
    // Checkpoint 18: Realtime toggle color coding uses `>60` green, `>40` amber, and `<=40` orange
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Realtime toggle color coding uses `>60` green, `>40` amber, and `<=40` orange",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-018 ' + "Realtime toggle color coding uses `>60` green, `>40` amber, and `<=40` orange");
    }


    // This test validates: Realtime toggle color coding uses `>60` green, `>40` amber, and `<=40` orange
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Realtime hook waits 2 seconds after typing before firing', async ({ page }) => {
    // Checkpoint 19: Realtime hook waits 2 seconds after typing before firing
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Realtime hook waits 2 seconds after typing before firing",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-019 ' + "Realtime hook waits 2 seconds after typing before firing");
    }


    // This test validates: Realtime hook waits 2 seconds after typing before firing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Realtime hook does not run until text length reaches at least 100 characters', async ({ page }) => {
    // Checkpoint 20: Realtime hook does not run until text length reaches at least 100 characters
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Realtime hook does not run until text length reaches at least 100 characters",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-020 ' + "Realtime hook does not run until text length reaches at least 100 characters");
    }


    // This test validates: Realtime hook does not run until text length reaches at least 100 characters
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Realtime hook skips reruns when the new text length differs by fewer than 10 cha', async ({ page }) => {
    // Checkpoint 21: Realtime hook skips reruns when the new text length differs by fewer than 10 characters from the last checked text
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Realtime hook skips reruns when the new text length differs by fewer than 10 characters from the last checked text",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-021 ' + "Realtime hook skips reruns when the new text length differs by fewer than 10 characters from the last checked text");
    }


    // This test validates: Realtime hook skips reruns when the new text length differs by fewer than 10 characters from the last checked text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Realtime hook posts mode ai_detection to apiintegrity-check', async ({ page }) => {
    // Checkpoint 22: Realtime hook posts `{ mode: "ai_detection" }` to `/api/integrity-check`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Realtime hook posts `{ mode: \"ai_detection\" }` to `/api/integrity-check`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-022 ' + "Realtime hook posts `{ mode: \"ai_detection\" }` to `/api/integrity-check`");
    }


    // This test validates: Realtime hook posts `{ mode: "ai_detection" }` to `/api/integrity-check`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Realtime hook aborts any in-flight request before starting a new one', async ({ page }) => {
    // Checkpoint 23: Realtime hook aborts any in-flight request before starting a new one
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Realtime hook aborts any in-flight request before starting a new one",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-023 ' + "Realtime hook aborts any in-flight request before starting a new one");
    }


    // This test validates: Realtime hook aborts any in-flight request before starting a new one
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Realtime hook stores aiDetectionhumanScore as the displayed percentage', async ({ page }) => {
    // Checkpoint 24: Realtime hook stores `aiDetection.humanScore` as the displayed percentage
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Realtime hook stores `aiDetection.humanScore` as the displayed percentage",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-024 ' + "Realtime hook stores `aiDetection.humanScore` as the displayed percentage");
    }


    // This test validates: Realtime hook stores `aiDetection.humanScore` as the displayed percentage
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Realtime hook errors are not surfaced anywhere in the page UI', async ({ page }) => {
    // Checkpoint 25: Realtime hook errors are not surfaced anywhere in the page UI
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Realtime hook errors are not surfaced anywhere in the page UI",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-025 ' + "Realtime hook errors are not surfaced anywhere in the page UI");
    }


    // This test validates: Realtime hook errors are not surfaced anywhere in the page UI
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Disabling Live hides the score display but does not explicitly clear the last co', async ({ page }) => {
    // Checkpoint 26: Disabling Live hides the score display but does not explicitly clear the last computed realtime score from hook state
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Disabling Live hides the score display but does not explicitly clear the last computed realtime score from hook state",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-026 ' + "Disabling Live hides the score display but does not explicitly clear the last computed realtime score from hook state");
    }


    // This test validates: Disabling Live hides the score display but does not explicitly clear the last computed realtime score from hook state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Run Integrity Check button is disabled whenever loading is true or trimmed text ', async ({ page }) => {
    // Checkpoint 27: `Run Integrity Check` button is disabled whenever `loading` is true or trimmed text length is under 50 characters
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`Run Integrity Check` button is disabled whenever `loading` is true or trimmed text length is under 50 characters",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-027 ' + "`Run Integrity Check` button is disabled whenever `loading` is true or trimmed text length is under 50 characters");
    }


    // This test validates: `Run Integrity Check` button is disabled whenever `loading` is true or trimmed text length is under 50 characters
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Clicking Run Integrity Check with fewer than 50 characters sets the exact error ', async ({ page }) => {
    // Checkpoint 28: Clicking `Run Integrity Check` with fewer than 50 characters sets the exact error `Please enter at least 50 characters of text to analyze.`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Clicking `Run Integrity Check` with fewer than 50 characters sets the exact error `Please enter at least 50 characters of text to analyze.`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-028 ' + "Clicking `Run Integrity Check` with fewer than 50 characters sets the exact error `Please enter at least 50 characters of text to analyze.`");
    }


    // This test validates: Clicking `Run Integrity Check` with fewer than 50 characters sets the exact error `Please enter at least 50 characters of text to analyze.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Starting a full check clears the previous page-level error', async ({ page }) => {
    // Checkpoint 29: Starting a full check clears the previous page-level error
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Starting a full check clears the previous page-level error",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-029 ' + "Starting a full check clears the previous page-level error");
    }


    // This test validates: Starting a full check clears the previous page-level error
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Full checks split inputText into paragraphs using blank-line boundaries before s', async ({ page }) => {
    // Checkpoint 30: Full checks split `inputText` into `paragraphs` using blank-line boundaries before sending the request
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Full checks split `inputText` into `paragraphs` using blank-line boundaries before sending the request",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-030 ' + "Full checks split `inputText` into `paragraphs` using blank-line boundaries before sending the request");
    }


    // This test validates: Full checks split `inputText` into `paragraphs` using blank-line boundaries before sending the request
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Full-check request posts text inputText mode full to apiintegrity-check', async ({ page }) => {
    // Checkpoint 31: Full-check request posts `{ text: inputText, mode: "full" }` to `/api/integrity-check`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Full-check request posts `{ text: inputText, mode: \"full\" }` to `/api/integrity-check`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-031 ' + "Full-check request posts `{ text: inputText, mode: \"full\" }` to `/api/integrity-check`");
    }


    // This test validates: Full-check request posts `{ text: inputText, mode: "full" }` to `/api/integrity-check`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Full-check timeout aborts after 30 seconds', async ({ page }) => {
    // Checkpoint 32: Full-check timeout aborts after 30 seconds
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Full-check timeout aborts after 30 seconds",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-032 ' + "Full-check timeout aborts after 30 seconds");
    }


    // This test validates: Full-check timeout aborts after 30 seconds
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Non-OK full-check responses surface dataerror when present before falling back t', async ({ page }) => {
    // Checkpoint 33: Non-OK full-check responses surface `data.error` when present before falling back to `Integrity check failed. Please try again.`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Non-OK full-check responses surface `data.error` when present before falling back to `Integrity check failed. Please try again.`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-033 ' + "Non-OK full-check responses surface `data.error` when present before falling back to `Integrity check failed. Please try again.`");
    }


    // This test validates: Non-OK full-check responses surface `data.error` when present before falling back to `Integrity check failed. Please try again.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Timeout errors surface The check took too long Please try again with shorter tex', async ({ page }) => {
    // Checkpoint 34: Timeout errors surface `The check took too long. Please try again with shorter text.`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Timeout errors surface `The check took too long. Please try again with shorter text.`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-034 ' + "Timeout errors surface `The check took too long. Please try again with shorter text.`");
    }


    // This test validates: Timeout errors surface `The check took too long. Please try again with shorter text.`
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
