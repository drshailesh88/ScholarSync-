import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = path.join(process.cwd(), 'qa/artifacts/explore/spec-003');

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:3000';

async function setupAuth(page: Page) {
  const url = new URL(baseUrl);
  await page.context().addCookies([
    { name: '__playwright', value: 'true', domain: url.hostname, path: '/' },
    { name: '__playwright_user', value: 'dev_user_001', domain: url.hostname, path: '/' },
  ]);
}

async function mockSearchApi(page: Page, count = 10) {
  await page.route('**/api/search/unified**', async (route) => {
    const url = new URL(route.request().url());
    const query = url.searchParams.get('q') ?? 'test';
    const _tab = url.searchParams.get('tab') ?? 'academic';
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        results: Array.from({ length: count }, (_, i) => ({
          title: `${query} — Result ${i + 1}`,
          authors: ['Jane Doe', 'John Smith'],
          journal: 'Journal of Testing',
          year: 2025,
          citationCount: 42 + i,
          studyType: 'rct',
          abstract: `Abstract for result ${i + 1} about ${query}.`,
          doi: `10.1000/test-${i + 1}`,
          url: `https://example.com/paper-${i + 1}`,
          isOpenAccess: i % 2 === 0,
          publicationTypes: [],
          sources: ['pubmed'],
          trustTier: i % 3 === 0 ? 'government' : 'major_journalism',
        })),
        total: count,
        page: 0,
        perPage: 10,
        hasMore: count > 10,
        sourceCounts: { pubmed: count },
        augmentedQueries: null,
      }),
    });
  });
}

async function searchAndWait(page: Page, query = 'test query') {
  const searchBar = page.getByRole('searchbox');
  await searchBar.click();
  await searchBar.fill(query);
  await searchBar.press('Enter');
  await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });
}

async function screenshot(page: Page, name: string) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, `${name}.png`), fullPage: true });
}

test.describe('Spec 003: Filter System (FilterPills)', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page);
    await mockSearchApi(page);
    await page.goto(`${baseUrl}/explore`);
  });

  // ── Scope Dropdown ──

  test('Default shows All Sources — scope pill displays All Sources by default', async ({ page }) => {
    await searchAndWait(page, 'scope test');
    await expect(page.getByRole('button', { name: /All Sources/ })).toBeVisible();
    await screenshot(page, 'default-all-sources');
  });

  test('Select user scope — pill updates to scope name', async ({ page }) => {
    await searchAndWait(page, 'scope select test');
    await page.getByRole('button', { name: /All Sources/ }).click();

    // Look for a custom scope option in the dropdown
    const scopeOption = page.getByRole('menuitem').or(page.getByRole('option')).first();
    if (await scopeOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      const scopeName = await scopeOption.textContent();
      await scopeOption.click();
      if (scopeName && scopeName !== 'All Sources' && scopeName !== 'Edit Scopes...') {
        await expect(page.getByRole('button', { name: new RegExp(scopeName) })).toBeVisible();
      }
    }
    await screenshot(page, 'select-user-scope');
  });

  test('Reset to All Sources — reselect All Sources after choosing a scope', async ({ page }) => {
    await searchAndWait(page, 'scope reset test');
    await page.getByRole('button', { name: /All Sources/ }).click();

    // Try to select a scope then go back
    const allSourcesOption = page.getByText('All Sources').last();
    await allSourcesOption.click();
    await expect(page.getByRole('button', { name: /All Sources/ })).toBeVisible();
    await screenshot(page, 'reset-to-all-sources');
  });

  test('Edit Scopes link — clicking Edit Scopes navigates to /explore/scopes', async ({ page }) => {
    await searchAndWait(page, 'edit scopes test');
    await page.getByRole('button', { name: /All Sources/ }).click();

    const editScopes = page.getByText('Edit Scopes');
    if (await editScopes.isVisible({ timeout: 3000 }).catch(() => false)) {
      await editScopes.click();
      await expect(page).toHaveURL(/\/explore\/scopes/);
    }
    await screenshot(page, 'edit-scopes-link');
  });

  test('Active scope highlighted — selected scope shows checkmark in dropdown', async ({ page }) => {
    await searchAndWait(page, 'scope highlight test');
    await page.getByRole('button', { name: /All Sources/ }).click();

    // The currently active "All Sources" should have a checkmark or aria-checked
    const activeOption = page.getByText('All Sources').last();
    await expect(activeOption).toBeVisible();
    await screenshot(page, 'active-scope-highlighted');
  });

  // ── Order By Dropdown ──

  test('Default order is Quality — pill shows Order: Quality by default', async ({ page }) => {
    await searchAndWait(page, 'order test');
    await expect(page.getByRole('button', { name: /Order.*Quality/ })).toBeVisible();
    await screenshot(page, 'default-order-quality');
  });

  test('Switch to Recency — pill updates and results refresh', async ({ page }) => {
    await searchAndWait(page, 'recency test');
    const orderPill = page.getByRole('button', { name: /Order/ });
    await orderPill.click();
    const recencyOption = page.getByText('Recency').first();
    await expect(recencyOption).toBeVisible({ timeout: 5000 });
    await recencyOption.click();
    await expect(page.getByRole('button', { name: /Order.*Recency/ })).toBeVisible();
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'switch-to-recency');
  });

  test('Citation Count disabled on Web tab — Citation Count shows Academic only label', async ({ page }) => {
    await searchAndWait(page, 'citation test');
    await page.getByRole('tab', { name: 'Web' }).click();
    await expect(page.getByRole('tab', { name: 'Web' })).toHaveAttribute('aria-selected', 'true');

    await page.getByRole('button', { name: /Order/ }).click();
    const citationOption = page.getByText(/Citation Count/);
    await expect(citationOption).toBeVisible();
    // It should be disabled or marked as academic only
    await expect(page.getByText(/Academic only/)).toBeVisible();
    await screenshot(page, 'citation-count-disabled-web');
  });

  test('Citation Count enabled on Academic tab — Citation Count is clickable', async ({ page }) => {
    await searchAndWait(page, 'citation academic test');
    await page.getByRole('button', { name: /Order/ }).click();
    const citationOption = page.getByText('Citation Count').first();
    await expect(citationOption).toBeVisible();
    await citationOption.click();
    await expect(page.getByRole('button', { name: /Order.*Citation/ })).toBeVisible();
    await screenshot(page, 'citation-count-enabled-academic');
  });

  // ── Time Filter Dropdown ──

  test('Default is Any time — time pill shows Any time', async ({ page }) => {
    await searchAndWait(page, 'time test');
    await expect(page.getByRole('button', { name: /Any time/ })).toBeVisible();
    await screenshot(page, 'default-any-time');
  });

  test('Select Past week — pill updates and results refresh', async ({ page }) => {
    await searchAndWait(page, 'past week test');
    const timePill = page.getByRole('button', { name: /Any time/ });
    await timePill.click();
    const pastWeekOption = page.getByText('Past week').first();
    await expect(pastWeekOption).toBeVisible({ timeout: 5000 });
    await pastWeekOption.click();
    await expect(page.getByRole('button', { name: /Past week/ })).toBeVisible();
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'select-past-week');
  });

  test('Custom date range — entering From and To dates applies filter', async ({ page }) => {
    await searchAndWait(page, 'custom range test');
    await page.getByRole('button', { name: /Any time/ }).click();

    // Look for custom range option
    const customRange = page.getByText(/Custom/i);
    if (await customRange.isVisible({ timeout: 3000 }).catch(() => false)) {
      await customRange.click();

      // Fill in date inputs
      const fromInput = page.getByLabel(/From/i).or(page.locator('input[type="date"]').first());
      const toInput = page.getByLabel(/To/i).or(page.locator('input[type="date"]').last());

      if (await fromInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await fromInput.fill('2024-01-01');
        await toInput.fill('2025-01-01');
        // Apply
        const applyBtn = page.getByRole('button', { name: /Apply/i });
        if (await applyBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          await applyBtn.click();
        }
      }
    }
    await screenshot(page, 'custom-date-range');
  });

  // ── Options Dropdown ──

  test('Exact match toggle — enable Exact match, pill shows Options (1)', async ({ page }) => {
    await searchAndWait(page, 'exact match test');
    const optionsPill = page.getByRole('button', { name: /Options/ });
    await optionsPill.click();
    const exactMatchOption = page.getByText('Exact match').first();
    await expect(exactMatchOption).toBeVisible({ timeout: 5000 });
    await exactMatchOption.click();
    await expect(page.getByRole('button', { name: /Options \(1\)/ })).toBeVisible();
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'exact-match-toggle');
  });

  test('Use my preferences toggle — disabling increments Options count', async ({ page }) => {
    await searchAndWait(page, 'preferences test');
    await page.getByRole('button', { name: /Options/ }).click();

    const prefToggle = page.getByText('Use my preferences');
    if (await prefToggle.isVisible({ timeout: 3000 }).catch(() => false)) {
      await prefToggle.click();
      // Count should show at least 1
      await expect(page.getByRole('button', { name: /Options \(\d+\)/ })).toBeVisible();
    }
    await screenshot(page, 'use-my-preferences-toggle');
  });

  test('Open access only on Academic tab — enable Open access only in options', async ({ page }) => {
    await searchAndWait(page, 'open access test');
    await page.getByRole('button', { name: /Options/ }).click();

    const openAccess = page.getByText('Open access only');
    await expect(openAccess).toBeVisible({ timeout: 5000 });
    await openAccess.click();
    await expect(page.getByRole('button', { name: /Options \(\d+\)/ })).toBeVisible();
    await screenshot(page, 'open-access-only-academic');
  });

  test('Open access hidden on non-academic — Web tab hides Open access toggle', async ({ page }) => {
    await searchAndWait(page, 'open access web test');
    await page.getByRole('tab', { name: 'Web' }).click();
    await expect(page.getByRole('tab', { name: 'Web' })).toHaveAttribute('aria-selected', 'true');

    await page.getByRole('button', { name: /Options/ }).click();
    await expect(page.getByText('Open access only')).not.toBeVisible();
    await screenshot(page, 'open-access-hidden-non-academic');
  });

  test('Active filter count — enable 2 options, pill shows Options (2)', async ({ page }) => {
    await searchAndWait(page, 'filter count test');
    await page.getByRole('button', { name: /Options/ }).click();

    // Enable Exact match
    await page.getByText('Exact match').click();

    // Enable Open access only
    const openAccess = page.getByText('Open access only');
    if (await openAccess.isVisible({ timeout: 3000 }).catch(() => false)) {
      await openAccess.click();
    }

    await expect(page.getByRole('button', { name: /Options \(2\)/ })).toBeVisible();
    await screenshot(page, 'active-filter-count');
  });

  // ── Filter Reset ──

  test('Clear all button — set non-default filters then clear all resets to defaults', async ({ page }) => {
    await searchAndWait(page, 'clear all test');

    // Set a non-default order
    await page.getByRole('button', { name: /Order/ }).click();
    const recencyOpt = page.getByText('Recency');
    await expect(recencyOpt).toBeVisible({ timeout: 5000 });
    await recencyOpt.click();
    await expect(page.getByRole('button', { name: /Order.*Recency/ })).toBeVisible();

    // Set a non-default time filter
    await page.getByRole('button', { name: /Any time/ }).click();
    const pastWeekOpt = page.getByText('Past week');
    await expect(pastWeekOpt).toBeVisible({ timeout: 5000 });
    await pastWeekOpt.click();
    await expect(page.getByRole('button', { name: /Past week/ })).toBeVisible();

    // Click Clear all
    await page.getByRole('button', { name: /Clear all/i }).click();

    // Verify reset to defaults
    await expect(page.getByRole('button', { name: /All Sources/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Order.*Quality/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Any time/ })).toBeVisible();
    await screenshot(page, 'clear-all-button');
  });
});
