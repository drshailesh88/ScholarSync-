import { test, expect } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.addCookies([{
    name: '__playwright',
    value: 'true',
    domain: 'localhost',
    path: '/',
  }]);
});

test.describe('Journey 1: Search → Save → Synthesize → Write', () => {
  test('navigates from Research to Notebook to Studio without errors', async ({ page }) => {
    // Step 1: Go to /research and verify search interface
    await page.goto('http://localhost:3001/research');
    await expect(page.locator('body')).not.toContainText('Application error');
    await page.waitForLoadState('domcontentloaded');

    // Verify search input renders
    const searchInput = page.locator('input[type="text"], input[type="search"], textarea').first();
    await expect(searchInput).toBeVisible({ timeout: 15000 });

    // Enter a search query
    await searchInput.fill('metformin type 2 diabetes');

    // Step 2: Trigger search (press Enter or click search button)
    await searchInput.press('Enter');

    // Wait a moment for results area to appear (may be empty without API keys)
    await page.waitForTimeout(2000);

    // Verify no crash occurred
    await expect(page.locator('body')).not.toContainText('Application error');

    // Step 3: Navigate to /notebook
    await page.goto('http://localhost:3001/notebook');
    await expect(page.locator('body')).not.toContainText('Application error');
    await page.waitForLoadState('domcontentloaded');

    // Verify notebook interface loads — look for chat input or main container
    const notebookContent = page.locator('[data-testid="notebook"], [class*="notebook"], [class*="chat"], main, [role="main"]').first();
    await expect(notebookContent).toBeVisible({ timeout: 15000 });

    // Step 4: Navigate to /studio
    await page.goto('http://localhost:3001/studio');
    await expect(page.locator('body')).not.toContainText('Application error');
    await page.waitForLoadState('domcontentloaded');

    // Verify studio/editor loads — look for editor area or main content
    const studioContent = page.locator('[class*="editor"], [class*="studio"], [class*="tiptap"], [class*="ProseMirror"], main, [role="main"]').first();
    await expect(studioContent).toBeVisible({ timeout: 15000 });

    // Verify full navigation chain completed without errors
    await expect(page.locator('body')).not.toContainText('Application error');
    await expect(page.locator('body')).not.toContainText('Unhandled Runtime Error');
  });

  test('search page has functional search UI elements', async ({ page }) => {
    await page.goto('http://localhost:3001/research');
    await page.waitForLoadState('domcontentloaded');

    // Verify search input is interactive
    const searchInput = page.locator('input[type="text"], input[type="search"], textarea').first();
    await expect(searchInput).toBeVisible({ timeout: 15000 });
    await expect(searchInput).toBeEditable();

    // Verify page has sidebar navigation
    const sidebar = page.locator('nav, [class*="sidebar"], [role="navigation"]').first();
    await expect(sidebar).toBeVisible({ timeout: 10000 });
  });
});
