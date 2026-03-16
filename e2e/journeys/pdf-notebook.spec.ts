import { test, expect } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.addCookies([{
    name: '__playwright',
    value: 'true',
    domain: 'localhost',
    path: '/',
  }]);
});

test.describe('Journey 7: PDF Chat & Notebook', () => {
  test('notebook page loads with chat interface', async ({ page }) => {
    // Step 1: Go to /notebook
    await page.goto('http://localhost:3001/notebook');
    await expect(page.locator('body')).not.toContainText('Application error');
    await page.waitForLoadState('domcontentloaded');

    // Verify main content area loads
    const mainContent = page.locator('main, [role="main"]').first();
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Verify "Notebook Chat" heading or chat placeholder is visible
    const chatHeading = page.locator('text=Notebook Chat');
    await expect(chatHeading).toBeVisible({ timeout: 15000 });

    // Verify the chat input area exists — placeholder may be in attribute or visible text
    const chatInput = page.locator('[placeholder*="Ask about your sources"], [placeholder*="ask"], textarea, input[type="text"]').first();
    const hasChatInput = await chatInput.isVisible({ timeout: 5000 }).catch(() => false);

    // Also check for the "Ready to analyze" text which confirms the chat panel loaded
    const readyText = page.locator('text=Ready to analyze');
    const hasReadyText = await readyText.isVisible({ timeout: 5000 }).catch(() => false);

    expect(hasChatInput || hasReadyText).toBeTruthy();

    // Verify no runtime errors
    await expect(page.locator('body')).not.toContainText('Unhandled Runtime Error');
  });

  test('notebook has source attachment UI', async ({ page }) => {
    await page.goto('http://localhost:3001/notebook');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    // Verify "Notebook Sources" panel is visible
    const sourcesPanel = page.locator('text=Notebook Sources');
    await expect(sourcesPanel).toBeVisible({ timeout: 15000 });

    // Verify drag-and-drop upload area exists
    const uploadArea = page.locator('text=Drag files here or click to upload');
    await expect(uploadArea).toBeVisible({ timeout: 10000 });

    // Verify "Add Link / URL" option exists
    const addLink = page.locator('text=Add Link');
    await expect(addLink).toBeVisible({ timeout: 10000 });
  });

  test('notebook page has sidebar navigation', async ({ page }) => {
    await page.goto('http://localhost:3001/notebook');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    // Verify sidebar navigation is present
    const sidebar = page.locator('nav, [class*="sidebar"], [role="navigation"]').first();
    await expect(sidebar).toBeVisible({ timeout: 10000 });
  });
});
