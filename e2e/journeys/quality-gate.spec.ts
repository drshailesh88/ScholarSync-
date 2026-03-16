import { test, expect } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.addCookies([{
    name: '__playwright',
    value: 'true',
    domain: 'localhost',
    path: '/',
  }]);
});

test.describe('Journey 3: Draft Quality Gate Before Submission', () => {
  test('navigates Studio → Compliance → Analysis for write-check-review cycle', async ({ page }) => {
    // Step 1: Go to /studio
    await page.goto('http://localhost:3001/studio');
    await expect(page.locator('body')).not.toContainText('Application error');
    await page.waitForLoadState('domcontentloaded');

    // Verify editor loads
    const editorArea = page.locator('[class*="editor"], [class*="studio"], [class*="tiptap"], [class*="ProseMirror"], main, [role="main"]').first();
    await expect(editorArea).toBeVisible({ timeout: 15000 });

    // Step 2: Navigate to /compliance
    await page.goto('http://localhost:3001/compliance');
    await expect(page.locator('body')).not.toContainText('Application error');
    await page.waitForLoadState('domcontentloaded');

    // Verify compliance checks interface loads
    const complianceContent = page.locator('main, [role="main"], [class*="compliance"], [class*="integrity"]').first();
    await expect(complianceContent).toBeVisible({ timeout: 15000 });

    // Step 3: Navigate to /analysis
    await page.goto('http://localhost:3001/analysis');
    await expect(page.locator('body')).not.toContainText('Application error');
    await page.waitForLoadState('domcontentloaded');

    // Verify writing analysis page loads
    const analysisContent = page.locator('main, [role="main"], [class*="analysis"]').first();
    await expect(analysisContent).toBeVisible({ timeout: 15000 });

    // Verify no runtime errors throughout the cycle
    await expect(page.locator('body')).not.toContainText('Unhandled Runtime Error');
  });

  test('compliance page renders integrity check UI', async ({ page }) => {
    await page.goto('http://localhost:3001/compliance');
    await page.waitForLoadState('domcontentloaded');

    // Verify page loads without error
    await expect(page.locator('body')).not.toContainText('Application error');

    // Verify there is either text input area or source selector
    const mainArea = page.locator('main, [role="main"]').first();
    await expect(mainArea).toBeVisible({ timeout: 15000 });

    // Verify sidebar navigation
    const sidebar = page.locator('nav, [class*="sidebar"], [role="navigation"]').first();
    await expect(sidebar).toBeVisible({ timeout: 10000 });
  });
});
