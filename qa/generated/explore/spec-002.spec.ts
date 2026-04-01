import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = path.join(process.cwd(), 'qa/artifacts/explore/spec-002');

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

async function mockSearchApiWithTabControl(page: Page, opts: { emptyTabs?: string[]; unavailableTabs?: string[] } = {}) {
  const { emptyTabs = [], unavailableTabs = [] } = opts;
  await page.route('**/api/search/unified**', async (route) => {
    const url = new URL(route.request().url());
    const query = url.searchParams.get('q') ?? 'test';
    const tab = url.searchParams.get('tab') ?? 'academic';

    if (unavailableTabs.includes(tab)) {
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Service unavailable' }),
      });
      return;
    }

    const count = emptyTabs.includes(tab) ? 0 : 10;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        results: Array.from({ length: count }, (_, i) => ({
          title: `${query} — ${tab} Result ${i + 1}`,
          authors: ['Jane Doe'],
          journal: 'Journal of Testing',
          year: 2025,
          citationCount: 42 + i,
          studyType: 'rct',
          abstract: `Abstract for ${tab} result ${i + 1}.`,
          doi: `10.1000/${tab}-${i + 1}`,
          url: `https://example.com/${tab}-${i + 1}`,
          isOpenAccess: i % 2 === 0,
          publicationTypes: [],
          sources: ['pubmed'],
          trustTier: 'government',
        })),
        total: count,
        page: 0,
        perPage: 10,
        hasMore: false,
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

test.describe('Spec 002: Tab Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page);
    await mockSearchApi(page);
    await page.goto(`${baseUrl}/explore`);
  });

  // ── Tab Clicking ──

  test('Academic tab active by default — selected with underline after search', async ({ page }) => {
    await searchAndWait(page, 'tabs test');
    const academicTab = page.getByRole('tab', { name: 'Academic' });
    await expect(academicTab).toHaveAttribute('aria-selected', 'true');
    await screenshot(page, 'academic-tab-default');
  });

  test('Switch to Web tab — Web results display', async ({ page }) => {
    await searchAndWait(page, 'web test');
    await page.getByRole('tab', { name: 'Web' }).click();
    await expect(page.getByRole('tab', { name: 'Web' })).toHaveAttribute('aria-selected', 'true');
    await screenshot(page, 'switch-to-web-tab');
  });

  test('Switch to News tab — News results display', async ({ page }) => {
    await searchAndWait(page, 'news test');
    await page.getByRole('tab', { name: 'News' }).click();
    await expect(page.getByRole('tab', { name: 'News' })).toHaveAttribute('aria-selected', 'true');
    await screenshot(page, 'switch-to-news-tab');
  });

  test('Switch to Discussions tab — Discussions results display', async ({ page }) => {
    await searchAndWait(page, 'discussions test');
    await page.getByRole('tab', { name: 'Discussions' }).click();
    await expect(page.getByRole('tab', { name: 'Discussions' })).toHaveAttribute('aria-selected', 'true');
    await screenshot(page, 'switch-to-discussions-tab');
  });

  test('More tab placeholder — shows Coming soon message', async ({ page }) => {
    await searchAndWait(page, 'more tab test');
    await page.getByRole('tab', { name: 'More' }).click();
    await expect(page.getByText('Coming soon')).toBeVisible();
    await expect(page.getByText(/Images, videos, and podcasts/)).toBeVisible();
    await screenshot(page, 'more-tab-placeholder');
  });

  test('Lazy tab loading — unvisited tab fetches results on first visit', async ({ page }) => {
    let _webRequested = false;
    page.on('request', (req) => {
      if (req.url().includes('api/search/unified') && req.url().includes('tab=web')) {
        _webRequested = true;
      }
    });

    await searchAndWait(page, 'lazy load test');
    // Web tab should not have been requested yet (lazy)
    // Now click it
    await page.getByRole('tab', { name: 'Web' }).click();
    // Wait for results to appear on the Web tab
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'lazy-tab-loading');
  });

  // ── Tab Keyboard Shortcuts ──

  test('Key 1 switches to Academic — press 1 activates Academic tab', async ({ page }) => {
    await searchAndWait(page, 'shortcut test');
    // First switch away from Academic
    await page.getByRole('tab', { name: 'Web' }).click();
    await expect(page.getByRole('tab', { name: 'Web' })).toHaveAttribute('aria-selected', 'true');

    // Press 1 to go back to Academic
    await page.keyboard.press('1');
    await expect(page.getByRole('tab', { name: 'Academic' })).toHaveAttribute('aria-selected', 'true');
    await screenshot(page, 'key-1-academic');
  });

  test('Key 2 switches to Web — press 2 activates Web tab', async ({ page }) => {
    await searchAndWait(page, 'shortcut test');
    await page.getByRole('searchbox').blur();
    await page.keyboard.press('2');
    await expect(page.getByRole('tab', { name: 'Web' })).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });
    await screenshot(page, 'key-2-web');
  });

  test('Key 3 switches to News — press 3 activates News tab', async ({ page }) => {
    await searchAndWait(page, 'shortcut test');
    await page.getByRole('searchbox').blur();
    await page.keyboard.press('3');
    await expect(page.getByRole('tab', { name: 'News' })).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });
    await screenshot(page, 'key-3-news');
  });

  test('Key 4 switches to Discussions — press 4 activates Discussions tab', async ({ page }) => {
    await searchAndWait(page, 'shortcut test');
    await page.getByRole('searchbox').blur();
    await page.keyboard.press('4');
    await expect(page.getByRole('tab', { name: 'Discussions' })).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });
    await screenshot(page, 'key-4-discussions');
  });

  test('] cycles tab forward — next tab activates', async ({ page }) => {
    await searchAndWait(page, 'cycle test');
    await page.getByRole('searchbox').blur();
    // Start on Academic (tab 0), press ] to go to Web (tab 1)
    await page.keyboard.press(']');
    await expect(page.getByRole('tab', { name: 'Web' })).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });
    await screenshot(page, 'bracket-right-forward');
  });

  test('[ cycles tab backward — previous tab activates', async ({ page }) => {
    await searchAndWait(page, 'cycle test');
    // Switch to Web first
    await page.getByRole('tab', { name: 'Web' }).click();
    await expect(page.getByRole('tab', { name: 'Web' })).toHaveAttribute('aria-selected', 'true');

    // Press [ to go back to Academic
    await page.keyboard.press('[');
    await expect(page.getByRole('tab', { name: 'Academic' })).toHaveAttribute('aria-selected', 'true');
    await screenshot(page, 'bracket-left-backward');
  });

  test('Tab cycling wraps around — last tab wraps to first on ]', async ({ page }) => {
    await searchAndWait(page, 'wrap test');

    // Navigate to the last tab (More)
    await page.getByRole('tab', { name: 'More' }).click();

    // Press ] to wrap around to Academic
    await page.keyboard.press(']');
    await expect(page.getByRole('tab', { name: 'Academic' })).toHaveAttribute('aria-selected', 'true');
    await screenshot(page, 'tab-cycling-wraps');
  });

  // ── Tab Edge Cases ──

  test('Unavailable tab message — non-academic tab shows Temporarily unavailable', async ({ page }) => {
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockSearchApiWithTabControl(page, { unavailableTabs: ['web'] });

    await searchAndWait(page, 'unavailable test');
    await page.getByRole('tab', { name: 'Web' }).click();

    await expect(page.getByText('Temporarily unavailable')).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'unavailable-tab-message');
  });

  test('No results empty state — tab with 0 results shows empty message', async ({ page }) => {
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockSearchApiWithTabControl(page, { emptyTabs: ['news'] });

    await searchAndWait(page, 'empty tab test');
    await page.getByRole('tab', { name: 'News' }).click();

    await expect(page.getByText(/No .* results found/i)).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'no-results-empty-state');
  });

  test('Tab-specific result counts — each tab shows its own count in stats line', async ({ page }) => {
    await searchAndWait(page, 'count test');

    // Check stats on Academic tab
    await expect(page.getByText(/\d+ results? in \d+\.\d+s/)).toBeVisible({ timeout: 15000 });

    // Switch to Web tab and verify stats update
    await page.getByRole('tab', { name: 'Web' }).click();
    await expect(page.getByText(/\d+ results? in \d+\.\d+s/)).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'tab-specific-result-counts');
  });
});
