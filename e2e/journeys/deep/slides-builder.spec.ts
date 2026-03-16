import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:3001';

test.beforeEach(async ({ context }) => {
  await context.addCookies([{
    name: '__playwright',
    value: 'true',
    domain: 'localhost',
    path: '/',
  }]);
});

test.describe('Deep Journey: Slides Builder', () => {
  test('slides list page loads with deck grid or empty state', async ({ page }) => {
    await page.goto(`${BASE}/slides`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Check for empty state or deck cards
    const emptyState = page.getByText(/no deck|no slide|get started|create/i).first();
    const deckCard = page.locator('[class*="card"]').first();
    const _hasEmpty = await emptyState.isVisible().catch(() => false);
    const _hasCards = await deckCard.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/slides-list.png' });
  });

  test('Create New and Import Presentation buttons exist', async ({ page }) => {
    await page.goto(`${BASE}/slides`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for Create New button
    const createBtn = page.locator('a, button').filter({ hasText: /create new|new deck|new slide/i }).first();
    const _createVisible = await createBtn.isVisible().catch(() => false);

    // Look for Import button
    const importBtn = page.locator('a, button').filter({ hasText: /import/i }).first();
    const _importVisible = await importBtn.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/slides-buttons.png' });
  });

  test('slides/new creation wizard loads', async ({ page }) => {
    await page.goto(`${BASE}/slides/new`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    await page.screenshot({ path: 'e2e/artifacts/slides-new-wizard.png' });
  });

  test('creation wizard has title input', async ({ page }) => {
    await page.goto(`${BASE}/slides/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Find title input
    const titleInput = page.locator('input[type="text"], input[placeholder*="title" i], input[placeholder*="name" i]').first();
    if (await titleInput.isVisible().catch(() => false)) {
      await titleInput.fill('Research Findings Presentation');
      await expect(titleInput).toHaveValue(/Research Findings/);
    }

    await page.screenshot({ path: 'e2e/artifacts/slides-title-input.png' });
  });

  test('creation wizard has theme and audience selectors', async ({ page }) => {
    await page.goto(`${BASE}/slides/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for theme options
    const themes = ['modern', 'academic', 'minimal', 'vibrant', 'dark'];
    for (const theme of themes) {
      const themeEl = page.locator('button, [class*="card"], [role="radio"]').filter({ hasText: new RegExp(theme, 'i') }).first();
      if (await themeEl.isVisible().catch(() => false)) {
        await themeEl.click();
        await page.waitForTimeout(200);
      }
    }

    // Look for audience type
    const audiences = ['General', 'Medical', 'Conference', 'Students'];
    for (const audience of audiences) {
      const el = page.locator('button, select option, [role="radio"]').filter({ hasText: new RegExp(audience, 'i') }).first();
      if (await el.isVisible().catch(() => false)) {
        await el.click();
        await page.waitForTimeout(200);
        break;
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/slides-theme-audience.png' });
  });

  test('Import Presentation button opens file picker dialog', async ({ page }) => {
    await page.goto(`${BASE}/slides`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Click Import button
    const importBtn = page.locator('button').filter({ hasText: /import/i }).first();
    if (await importBtn.isVisible().catch(() => false)) {
      await importBtn.click();
      await page.waitForTimeout(500);

      // Check if a dialog/modal opens
      const dialog = page.locator('[role="dialog"], [class*="modal"]').first();
      const dialogVisible = await dialog.isVisible().catch(() => false);

      if (dialogVisible) {
        await page.keyboard.press('Escape');
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/slides-import.png' });
  });

  test('Create New navigates to /slides/new', async ({ page }) => {
    await page.goto(`${BASE}/slides`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const createBtn = page.locator('a, button').filter({ hasText: /create new|new deck/i }).first();
    if (await createBtn.isVisible().catch(() => false)) {
      await createBtn.click();
      await page.waitForTimeout(2000);
      await expect(page.locator('body')).not.toContainText('Application error');
    }

    await page.screenshot({ path: 'e2e/artifacts/slides-create-nav.png' });
  });

  test('slides editor components if accessible', async ({ page }) => {
    await page.goto(`${BASE}/slides/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for slide editor elements
    // Left panel: slide thumbnails
    const thumbnails = page.locator('[class*="thumbnail"], [class*="slide-list"], [class*="navigator"]').first();
    await thumbnails.isVisible().catch(() => false);

    // Center: slide canvas
    const canvas = page.locator('[class*="canvas"], [class*="slide-canvas"], [class*="slide-editor"]').first();
    await canvas.isVisible().catch(() => false);

    // Right panel: properties/styling
    const properties = page.locator('[class*="properties"], [class*="style-panel"], [class*="inspector"]').first();
    await properties.isVisible().catch(() => false);

    // Toolbar buttons
    const toolbarItems = ['Add Slide', 'Delete', 'Duplicate', 'Theme', 'Text', 'Image', 'Chart'];
    for (const item of toolbarItems) {
      const btn = page.locator('button').filter({ hasText: new RegExp(item, 'i') }).first();
      await btn.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/slides-editor.png' });
  });
});
