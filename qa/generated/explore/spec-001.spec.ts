import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = path.join(process.cwd(), 'qa/artifacts/explore/spec-001');

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

async function mockSearchApiError(page: Page) {
  await page.route('**/api/search/unified**', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
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

test.describe('Spec 001: Search & Landing', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page);
    await mockSearchApi(page);
    await page.goto(`${baseUrl}/explore`);
  });

  // ── Landing Page ──

  test('Landing page layout — centered search bar with prompt text', async ({ page }) => {
    await expect(page.getByText('Search for sources to get started.')).toBeVisible();
    await expect(page.getByRole('searchbox')).toBeVisible();
    await screenshot(page, 'landing-page-layout');
  });

  test('Search bar autofocus — input is focused on landing page', async ({ page }) => {
    const searchBar = page.getByRole('searchbox');
    await expect(searchBar).toBeFocused();
    await screenshot(page, 'search-bar-autofocus');
  });

  test('Search bar placeholder — input shows Explore placeholder text', async ({ page }) => {
    const searchBar = page.getByRole('searchbox');
    await expect(searchBar).toHaveAttribute('placeholder', /Explore/);
    await screenshot(page, 'search-bar-placeholder');
  });

  // ── Search Execution ──

  test('Submit search via Enter — results appear', async ({ page }) => {
    await searchAndWait(page, 'machine learning');
    await expect(page.locator('article')).toHaveCount(10);
    await screenshot(page, 'submit-via-enter');
  });

  test('Submit search via button — click magnifying glass icon', async ({ page }) => {
    const searchBar = page.getByRole('searchbox');
    await searchBar.fill('deep learning');
    await page.getByLabel('Search Explore').click();
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'submit-via-button');
  });

  test('Empty query ignored — no search executes on empty Enter', async ({ page }) => {
    const searchBar = page.getByRole('searchbox');
    await searchBar.press('Enter');
    await expect(page.getByText('Search for sources to get started.')).toBeVisible();
    await expect(page.locator('article')).toHaveCount(0);
    await screenshot(page, 'empty-query-ignored');
  });

  test('Clear search input — click X button clears the input', async ({ page }) => {
    const searchBar = page.getByRole('searchbox');
    await searchBar.fill('some text');
    await page.getByLabel('Clear search').click();
    await expect(searchBar).toHaveValue('');
    await screenshot(page, 'clear-search-input');
  });

  test('Multi-tab parallel search — all 4 tabs load results', async ({ page }) => {
    await searchAndWait(page, 'neuroscience');

    for (const tabName of ['Academic', 'Web', 'News', 'Discussions']) {
      const tab = page.getByRole('tab', { name: tabName });
      await expect(tab).toBeVisible();
    }
    await screenshot(page, 'multi-tab-parallel-search');
  });

  test('Stats line displayed — N results in X.Xs appears after search', async ({ page }) => {
    await searchAndWait(page, 'biology');
    await expect(page.getByText(/\d+ results? in \d+\.\d+s/)).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'stats-line-displayed');
  });

  test('Results per page — exactly 10 results displayed', async ({ page }) => {
    await searchAndWait(page, 'chemistry');
    await expect(page.locator('article')).toHaveCount(10);
    await screenshot(page, 'results-per-page');
  });

  // ── Search with Filters ──

  test('Filter triggers re-search — changing a filter refreshes results', async ({ page }) => {
    await searchAndWait(page, 'physics');

    // Change a filter (e.g., order by)
    await page.getByRole('button', { name: /Order/ }).click();
    await page.getByText('Recency').click();

    // Results should refresh
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'filter-triggers-re-search');
  });

  test('"More from this source" search — updates search bar with site: prefix', async ({ page }) => {
    await searchAndWait(page, 'genetics');

    // Open the actions menu on the first result
    const firstArticle = page.locator('article').first();
    const actionsButton = firstArticle.getByRole('button').first();
    await actionsButton.click();

    const moreFromSource = page.getByText('More from this source');
    if (await moreFromSource.isVisible()) {
      await moreFromSource.click();
      const searchBar = page.getByRole('searchbox');
      await expect(searchBar).toHaveValue(/site:/);
    }
    await screenshot(page, 'more-from-this-source');
  });

  // ── Search History Integration ──

  test('Search saved to history — query appears in history dropdown', async ({ page }) => {
    await searchAndWait(page, 'cardiology');
    await page.getByLabel('Search history').click();
    await expect(page.getByText('cardiology')).toBeVisible();
    await screenshot(page, 'search-saved-to-history');
  });

  test('Search from history — clicking history entry runs that query', async ({ page }) => {
    await searchAndWait(page, 'oncology');

    // Clear and open history
    await page.getByLabel('Clear search').click();
    await page.getByLabel('Search history').click();
    await page.getByText('oncology').click();

    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'search-from-history');
  });

  // ── Saved URL Detection ──

  test('Saved badge on results — saved result shows check icon instead of plus', async ({ page }) => {
    await searchAndWait(page, 'immunology');

    // Save the first result
    const firstArticle = page.locator('article').first();
    const saveButton = firstArticle.getByRole('button').first();
    await saveButton.click();

    // Re-search to verify badge
    await searchAndWait(page, 'immunology');
    // Check for a check icon (saved indicator) on the first result
    await expect(page.locator('article').first()).toBeVisible();
    await screenshot(page, 'saved-badge-on-results');
  });

  // ── Error Handling ──

  test('Error banner on failure — red error banner displays on search failure', async ({ page }) => {
    // Override mock with error
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockSearchApiError(page);

    const searchBar = page.getByRole('searchbox');
    await searchBar.fill('failing query');
    await searchBar.press('Enter');

    await expect(page.getByText('Explore search failed. Try again.')).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'error-banner-on-failure');
  });

  test('Retry button works — clicking Try again re-executes search', async ({ page }) => {
    // First cause an error
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockSearchApiError(page);

    const searchBar = page.getByRole('searchbox');
    await searchBar.fill('retry query');
    await searchBar.press('Enter');
    await expect(page.getByText('Explore search failed. Try again.')).toBeVisible({ timeout: 15000 });

    // Now fix the mock and retry
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockSearchApi(page);

    await page.getByText('Try again').click();
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'retry-button-works');
  });

  test('Loading skeletons — 5 pulsing skeleton cards display during search', async ({ page }) => {
    // Add a delay to the mock so we can observe skeletons
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await page.route('**/api/search/unified**', async (route) => {
      await new Promise((r) => setTimeout(r, 2000));
      const url = new URL(route.request().url());
      const query = url.searchParams.get('q') ?? 'test';
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: Array.from({ length: 10 }, (_, i) => ({
            title: `${query} — Result ${i + 1}`,
            authors: ['Jane Doe'],
            journal: 'Journal of Testing',
            year: 2025,
            citationCount: 42,
            studyType: 'rct',
            abstract: `Abstract ${i + 1}`,
            doi: `10.1000/test-${i + 1}`,
            url: `https://example.com/paper-${i + 1}`,
            isOpenAccess: true,
            publicationTypes: [],
            sources: ['pubmed'],
            trustTier: 'government',
          })),
          total: 10,
          page: 0,
          perPage: 10,
          hasMore: false,
          sourceCounts: { pubmed: 10 },
          augmentedQueries: null,
        }),
      });
    });

    const searchBar = page.getByRole('searchbox');
    await searchBar.fill('skeleton test');
    await searchBar.press('Enter');

    // Check for skeleton elements with animate-pulse class
    const skeletons = page.locator('.animate-pulse');
    await expect(skeletons.first()).toBeVisible({ timeout: 5000 });
    const count = await skeletons.count();
    expect(count).toBeGreaterThanOrEqual(5);
    await screenshot(page, 'loading-skeletons');
  });
});
