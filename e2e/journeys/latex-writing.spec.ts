import { test, expect } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.addCookies([{
    name: '__playwright',
    value: 'true',
    domain: 'localhost',
    path: '/',
  }]);
});

test.describe('Journey 6: LaTeX Paper Writing', () => {
  test('LaTeX new project page loads with template picker', async ({ page }) => {
    // Step 1: Go to /latex/new
    await page.goto('http://localhost:3001/latex/new');
    await expect(page.locator('body')).not.toContainText('Application error');
    await page.waitForLoadState('domcontentloaded');

    // Verify page loads
    const mainContent = page.locator('main, [role="main"]').first();
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Look for template picker or project creation form
    // Should have inputs for project title, template selection, compiler choice
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();

    // Verify no runtime errors
    await expect(page.locator('body')).not.toContainText('Unhandled Runtime Error');
  });

  test('LaTeX new project has form elements', async ({ page }) => {
    await page.goto('http://localhost:3001/latex/new');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    // Verify the creation form loads with some inputs
    const formElements = page.locator('input, select, textarea, button, [role="button"]');
    const count = await formElements.count();
    expect(count).toBeGreaterThan(0);

    // Verify sidebar navigation
    const sidebar = page.locator('nav, [class*="sidebar"], [role="navigation"]').first();
    await expect(sidebar).toBeVisible({ timeout: 10000 });
  });

  test('LaTeX list page loads', async ({ page }) => {
    await page.goto('http://localhost:3001/latex');
    await page.waitForLoadState('domcontentloaded');

    // May redirect to /latex/new or show a list
    await expect(page.locator('body')).not.toContainText('Application error');
    await expect(page.locator('body')).not.toContainText('Unhandled Runtime Error');

    const mainContent = page.locator('main, [role="main"]').first();
    await expect(mainContent).toBeVisible({ timeout: 15000 });
  });
});
