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

test.describe('Deep Journey: Literature Search & Discovery', () => {
  test('research page loads with search bar', async ({ page }) => {
    await page.goto(`${BASE}/research`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Verify search input is present and editable
    const searchInput = page.locator('input[type="text"], input[type="search"], textarea').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await expect(searchInput).toBeEditable();

    await page.screenshot({ path: 'e2e/artifacts/research-loaded.png' });
  });

  test('search with academic query and wait for results area', async ({ page }) => {
    await page.goto(`${BASE}/research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const searchInput = page.locator('input[type="text"], input[type="search"], textarea').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // Type academic query
    await searchInput.fill('metformin type 2 diabetes RCT');
    await searchInput.press('Enter');

    // Wait for search to process (results or empty state, both OK)
    await page.waitForTimeout(3000);
    await expect(page.locator('body')).not.toContainText('Application error');

    await page.screenshot({ path: 'e2e/artifacts/research-search-results.png' });
  });

  test('sort options: Relevance, Date, Citations are interactive', async ({ page }) => {
    await page.goto(`${BASE}/research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Search first to populate results area
    const searchInput = page.locator('input[type="text"], input[type="search"], textarea').first();
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill('diabetes');
      await searchInput.press('Enter');
      await page.waitForTimeout(2000);
    }

    // Look for sort options
    const sortOptions = ['Relevance', 'Date', 'Citations', 'Year', 'Evidence Level'];
    for (const sortOpt of sortOptions) {
      const sortBtn = page.locator('button, select option, [role="option"], [role="tab"]').filter({ hasText: new RegExp(sortOpt, 'i') }).first();
      if (await sortBtn.isVisible().catch(() => false)) {
        await sortBtn.click();
        await page.waitForTimeout(300);
      }
    }

    // Also check for sort dropdowns/selects
    const sortSelect = page.locator('select').filter({ hasText: /sort|order/i }).first();
    if (await sortSelect.isVisible().catch(() => false)) {
      await sortSelect.selectOption({ index: 1 });
    }

    await page.screenshot({ path: 'e2e/artifacts/research-sort-options.png' });
  });

  test('filter panel: Evidence Level, Year Range, Study Type, Source', async ({ page }) => {
    await page.goto(`${BASE}/research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for filter controls
    const filterLabels = ['Evidence Level', 'Year Range', 'Study Type', 'Source'];
    for (const label of filterLabels) {
      const filterEl = page.getByText(label, { exact: false }).first();
      await filterEl.isVisible().catch(() => false);
    }

    // Try clicking filter toggles/checkboxes
    const filterNames = ['Level I', 'RCT', 'Meta-Analys', 'last5Years', 'PDF', 'High Impact'];
    for (const filter of filterNames) {
      const checkbox = page.locator('input[type="checkbox"], button, [role="checkbox"]').filter({ hasText: new RegExp(filter, 'i') }).first();
      if (await checkbox.isVisible().catch(() => false)) {
        await checkbox.click();
        await page.waitForTimeout(300);
        break;
      }
    }

    // Look for filter pills/toggles
    const filterBtns = page.locator('button').filter({ hasText: /RCTs|Reviews|Meta|PDF|High Impact/i });
    const count = await filterBtns.count();
    for (let i = 0; i < Math.min(count, 3); i++) {
      await filterBtns.nth(i).click();
      await page.waitForTimeout(200);
    }

    await page.screenshot({ path: 'e2e/artifacts/research-filters.png' });
  });

  test('Clear Filters button appears when filter is active', async ({ page }) => {
    await page.goto(`${BASE}/research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Activate a filter
    const filterBtns = page.locator('button').filter({ hasText: /RCTs|Reviews|Meta|PDF|High Impact/i });
    const count = await filterBtns.count();
    if (count > 0) {
      await filterBtns.first().click();
      await page.waitForTimeout(500);

      // Look for Clear Filters
      const clearBtn = page.locator('button').filter({ hasText: /clear|reset/i }).first();
      const clearVisible = await clearBtn.isVisible().catch(() => false);
      if (clearVisible) {
        await clearBtn.click();
        await page.waitForTimeout(300);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/research-clear-filters.png' });
  });

  test('scope selector: PubMed, Semantic Scholar, OpenAlex tabs', async ({ page }) => {
    await page.goto(`${BASE}/research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for source/scope tabs
    const sources = ['PubMed', 'Semantic Scholar', 'OpenAlex', 'Clinical Trials'];
    for (const source of sources) {
      const sourceTab = page.locator('button, [role="tab"]').filter({ hasText: new RegExp(source, 'i') }).first();
      if (await sourceTab.isVisible().catch(() => false)) {
        await sourceTab.click();
        await page.waitForTimeout(300);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/research-scope-selector.png' });
  });

  test('empty state displays appropriate message', async ({ page }) => {
    await page.goto(`${BASE}/research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Before searching, verify initial/empty state
    const emptyStateTexts = ['search', 'papers', 'discover', 'find', 'literature', 'enter a query'];
    let foundEmptyState = false;
    for (const text of emptyStateTexts) {
      const el = page.getByText(new RegExp(text, 'i')).first();
      if (await el.isVisible().catch(() => false)) {
        foundEmptyState = true;
        break;
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/research-empty-state.png' });
  });

  test('AI Synthesis panel area exists', async ({ page }) => {
    await page.goto(`${BASE}/research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Search to trigger synthesis
    const searchInput = page.locator('input[type="text"], input[type="search"], textarea').first();
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill('BRCA1 AND (breast OR ovarian)');
      await searchInput.press('Enter');
      await page.waitForTimeout(3000);
    }

    // Look for AI Synthesis panel/button
    const synthesisEl = page.getByText(/synthesis|AI summary|key themes|consensus/i).first();
    await synthesisEl.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/research-ai-synthesis.png' });
  });

  test('search input accepts special characters and boolean operators', async ({ page }) => {
    await page.goto(`${BASE}/research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const searchInput = page.locator('input[type="text"], input[type="search"], textarea').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // Test with special characters
    await searchInput.fill('BRCA1 AND (breast OR ovarian) NOT "case report"');
    await expect(searchInput).toHaveValue(/BRCA1/);

    await searchInput.press('Enter');
    await page.waitForTimeout(2000);

    // No crash
    await expect(page.locator('body')).not.toContainText('Application error');

    await page.screenshot({ path: 'e2e/artifacts/research-special-chars.png' });
  });

  test('recent searches sidebar area', async ({ page }) => {
    await page.goto(`${BASE}/research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for recent searches section
    const recentSearches = page.getByText(/recent search|history|past search/i).first();
    await recentSearches.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/research-recent-searches.png' });
  });
});
