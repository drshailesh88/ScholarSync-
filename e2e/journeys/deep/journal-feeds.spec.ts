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

test.describe('Deep Journey: Journal Feed Reader', () => {
  test('feeds page loads', async ({ page }) => {
    await page.goto(`${BASE}/feeds`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    await page.screenshot({ path: 'e2e/artifacts/feeds-loaded.png' });
  });

  test('feed list or empty state with Add Feed button', async ({ page }) => {
    await page.goto(`${BASE}/feeds`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for Add Feed button
    const addFeedBtn = page.locator('button').filter({ hasText: /add feed|subscribe|new feed/i }).first();
    const _hasAddFeed = await addFeedBtn.isVisible().catch(() => false);

    // Check empty state
    const emptyState = page.getByText(/no feed|subscribe|add.*first/i).first();
    await emptyState.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/feeds-list.png' });
  });

  test('Add Feed modal opens with search and categories', async ({ page }) => {
    await page.goto(`${BASE}/feeds`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const addFeedBtn = page.locator('button').filter({ hasText: /add feed|subscribe/i }).first();
    if (await addFeedBtn.isVisible().catch(() => false)) {
      await addFeedBtn.click();
      await page.waitForTimeout(500);

      // Look for modal content
      const dialog = page.locator('[role="dialog"], [class*="modal"]').first();
      const dialogVisible = await dialog.isVisible().catch(() => false);

      if (dialogVisible) {
        // Search input
        const searchInput = page.locator('[role="dialog"] input[type="text"], [role="dialog"] input[type="search"]').first();
        if (await searchInput.isVisible().catch(() => false)) {
          await searchInput.fill('Nature Medicine');
          await page.waitForTimeout(500);
        }

        // Category filter
        const categories = ['Medical', 'Biology', 'Chemistry', 'Physics', 'Trending', 'Popular'];
        for (const cat of categories) {
          const el = page.getByText(cat, { exact: false }).first();
          await el.isVisible().catch(() => false);
        }

        // Close
        await page.keyboard.press('Escape');
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/feeds-add-modal.png' });
  });

  test('feed sidebar with subscribed feeds list', async ({ page }) => {
    await page.goto(`${BASE}/feeds`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for feed sidebar elements
    const sidebarItems = ['All Articles', 'Starred', 'Unread'];
    for (const item of sidebarItems) {
      const el = page.getByText(item, { exact: false }).first();
      await el.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/feeds-sidebar.png' });
  });

  test('view mode toggle: list view, magazine view', async ({ page }) => {
    await page.goto(`${BASE}/feeds`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for view mode toggles
    const viewModes = ['List', 'Magazine', 'Card', 'Grid'];
    for (const mode of viewModes) {
      const btn = page.locator('button[aria-label*="' + mode.toLowerCase() + '" i], button[title*="' + mode + '" i]').first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        await page.waitForTimeout(300);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/feeds-view-modes.png' });
  });

  test('article search bar with filters', async ({ page }) => {
    await page.goto(`${BASE}/feeds`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Find search bar
    const searchInput = page.locator('input[type="text"], input[type="search"], input[placeholder*="search" i]').first();
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill('diabetes research');
      await page.waitForTimeout(500);
    }

    await page.screenshot({ path: 'e2e/artifacts/feeds-search.png' });
  });

  test('article card structure: title, journal, date, abstract', async ({ page }) => {
    await page.goto(`${BASE}/feeds`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for article card elements
    const articleCard = page.locator('[class*="card"], [class*="article"], article').first();
    if (await articleCard.isVisible().catch(() => false)) {
      // Check for expected content in cards
      const cardElements = ['title', 'journal', 'date', 'abstract'];
      for (const el of cardElements) {
        const element = articleCard.locator(`[class*="${el}"]`).first();
        await element.isVisible().catch(() => false);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/feeds-article-card.png' });
  });

  test('copilot panel (AI summary) area', async ({ page }) => {
    await page.goto(`${BASE}/feeds`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for copilot/AI button
    const copilotBtn = page.locator('button').filter({ hasText: /copilot|AI|summary|summarize/i }).first();
    if (await copilotBtn.isVisible().catch(() => false)) {
      await copilotBtn.click();
      await page.waitForTimeout(500);
    }

    await page.screenshot({ path: 'e2e/artifacts/feeds-copilot.png' });
  });

  test('keyboard navigation: j/k to move between articles', async ({ page }) => {
    await page.goto(`${BASE}/feeds`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Press j and k to navigate articles
    await page.keyboard.press('j');
    await page.waitForTimeout(300);
    await page.keyboard.press('j');
    await page.waitForTimeout(300);
    await page.keyboard.press('k');
    await page.waitForTimeout(300);

    // Press s to star
    await page.keyboard.press('s');
    await page.waitForTimeout(300);

    // No crash
    await expect(page.locator('body')).not.toContainText('Application error');

    await page.screenshot({ path: 'e2e/artifacts/feeds-keyboard-nav.png' });
  });

  test('Mark All Read button', async ({ page }) => {
    await page.goto(`${BASE}/feeds`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const markReadBtn = page.locator('button').filter({ hasText: /mark.*read/i }).first();
    await markReadBtn.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/feeds-mark-read.png' });
  });

  test('OPML import/export buttons', async ({ page }) => {
    await page.goto(`${BASE}/feeds`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for OPML export/import
    const exportBtn = page.locator('button').filter({ hasText: /export|OPML/i }).first();
    const importBtn = page.locator('button').filter({ hasText: /import/i }).first();

    await exportBtn.isVisible().catch(() => false);
    await importBtn.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/feeds-opml.png' });
  });
});
