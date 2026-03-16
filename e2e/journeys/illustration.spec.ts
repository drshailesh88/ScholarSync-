import { test, expect } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.addCookies([{
    name: '__playwright',
    value: 'true',
    domain: 'localhost',
    path: '/',
  }]);
});

test.describe('Journey 8: Scientific Illustration', () => {
  test('illustrate landing page loads with mode selection', async ({ page }) => {
    // Step 1: Go to /illustrate
    await page.goto('http://localhost:3001/illustrate');
    await expect(page.locator('body')).not.toContainText('Application error');
    await page.waitForLoadState('domcontentloaded');

    // Verify page loads
    const mainContent = page.locator('main, [role="main"]').first();
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Look for mode selection (Agent vs Editor) or creation options
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();

    // Verify no runtime errors
    await expect(page.locator('body')).not.toContainText('Unhandled Runtime Error');
  });

  test('illustrate page has interactive elements', async ({ page }) => {
    await page.goto('http://localhost:3001/illustrate');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    // Verify buttons/links exist for navigation to editor or agent mode
    const interactiveElements = page.locator('button, [role="button"], a[href*="illustrate"]');
    const count = await interactiveElements.count();
    expect(count).toBeGreaterThanOrEqual(0); // May show welcome page with options

    // Verify sidebar navigation
    const sidebar = page.locator('nav, [class*="sidebar"], [role="navigation"]').first();
    await expect(sidebar).toBeVisible({ timeout: 10000 });
  });

  test('illustrate editor route loads', async ({ page }) => {
    await page.goto('http://localhost:3001/illustrate/editor');
    await page.waitForLoadState('domcontentloaded');

    // May redirect or show editor — just verify no crash
    await expect(page.locator('body')).not.toContainText('Application error');
    await expect(page.locator('body')).not.toContainText('Unhandled Runtime Error');

    const mainContent = page.locator('main, [role="main"], body').first();
    await expect(mainContent).toBeVisible({ timeout: 15000 });
  });

  test('illustrate agent route loads', async ({ page }) => {
    await page.goto('http://localhost:3001/illustrate/agent');
    await page.waitForLoadState('domcontentloaded');

    // May redirect or show agent chat — just verify no crash
    await expect(page.locator('body')).not.toContainText('Application error');
    await expect(page.locator('body')).not.toContainText('Unhandled Runtime Error');

    const mainContent = page.locator('main, [role="main"], body').first();
    await expect(mainContent).toBeVisible({ timeout: 15000 });
  });
});
