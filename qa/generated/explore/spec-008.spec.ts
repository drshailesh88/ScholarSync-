import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = path.join(process.cwd(), 'qa/artifacts/explore/spec-008');

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

async function mockHistoryApi(page: Page, entries: Array<{id: string, query: string, activeTab: string, createdAt: string}> = []) {
  await page.route('**/api/explore/history**', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(entries.length > 0 ? entries : [
          { id: '1', query: 'previous search', activeTab: 'academic', createdAt: new Date(Date.now() - 300000).toISOString() },
          { id: '2', query: 'another search', activeTab: 'web', createdAt: new Date(Date.now() - 3600000).toISOString() },
        ]),
      });
    } else {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
    }
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

/** Click on body to ensure no input is focused before pressing keys */
async function blurInputs(page: Page) {
  await page.locator('body').click({ position: { x: 0, y: 0 } });
}

test.describe('Spec 008: Search History & Shortcuts Overlay', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page);
    await mockSearchApi(page);
    await mockHistoryApi(page);
    await page.goto(`${baseUrl}/explore`);
  });

  // ── Search History Dropdown ──

  test('Toggle history dropdown — click clock icon, verify dropdown opens with "Recent Searches" header', async ({ page }) => {
    await page.getByLabel('Search history').click();
    await expect(page.getByText('Recent Searches')).toBeVisible({ timeout: 5000 });
    await screenshot(page, 'toggle-history-dropdown');
  });

  test('Close on click outside — open dropdown, click outside, verify it closes', async ({ page }) => {
    await page.getByLabel('Search history').click();
    await expect(page.getByText('Recent Searches')).toBeVisible({ timeout: 5000 });

    // Click outside the dropdown
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await expect(page.getByText('Recent Searches')).not.toBeVisible();
    await screenshot(page, 'close-on-click-outside');
  });

  test('Load last 20 entries — verify dropdown shows up to 20 recent searches', async ({ page }) => {
    // Mock 20 entries
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockSearchApi(page);
    const manyEntries = Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1),
      query: `search query ${i + 1}`,
      activeTab: 'academic',
      createdAt: new Date(Date.now() - i * 60000).toISOString(),
    }));
    await mockHistoryApi(page, manyEntries);

    await page.getByLabel('Search history').click();
    await expect(page.getByText('Recent Searches')).toBeVisible({ timeout: 5000 });

    // Verify entries are shown (at least some of them)
    await expect(page.getByText('search query 1')).toBeVisible();
    await expect(page.getByText('search query 20')).toBeVisible();
    await screenshot(page, 'load-last-20-entries');
  });

  test('Entry shows query text — each entry displays the search query', async ({ page }) => {
    await page.getByLabel('Search history').click();
    await expect(page.getByText('Recent Searches')).toBeVisible({ timeout: 5000 });

    await expect(page.getByText('previous search')).toBeVisible();
    await expect(page.getByText('another search')).toBeVisible();
    await screenshot(page, 'entry-shows-query-text');
  });

  test('Entry shows tab and time — each entry shows tab label and relative time', async ({ page }) => {
    await page.getByLabel('Search history').click();
    await expect(page.getByText('Recent Searches')).toBeVisible({ timeout: 5000 });

    // Check for tab label and relative time (e.g., "Academic . 5m ago")
    await expect(page.getByText(/Academic/)).toBeVisible();
    await expect(page.getByText(/ago/)).toBeVisible();
    await screenshot(page, 'entry-shows-tab-and-time');
  });

  test('Click entry runs search — click a history entry, verify search executes with that query', async ({ page }) => {
    await page.getByLabel('Search history').click();
    await expect(page.getByText('Recent Searches')).toBeVisible({ timeout: 5000 });

    await page.getByText('previous search').click();

    // Verify search executes
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });

    // Verify the search bar contains the query
    const searchBar = page.getByRole('searchbox');
    await expect(searchBar).toHaveValue('previous search');
    await screenshot(page, 'click-entry-runs-search');
  });

  test('Delete single entry — hover entry, click X, verify entry removed from list', async ({ page }) => {
    await page.getByLabel('Search history').click();
    await expect(page.getByText('Recent Searches')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('previous search')).toBeVisible();

    // Click the delete button for "previous search"
    const deleteButton = page.getByLabel('Delete "previous search"');
    await deleteButton.click();

    await expect(page.getByText('previous search')).not.toBeVisible();
    await screenshot(page, 'delete-single-entry');
  });

  test('Clear all history — click "Clear all", verify all entries removed', async ({ page }) => {
    await page.getByLabel('Search history').click();
    await expect(page.getByText('Recent Searches')).toBeVisible({ timeout: 5000 });

    await page.getByText('Clear all').click();

    // After clearing, should show empty state
    await expect(page.getByText('No recent searches')).toBeVisible();
    await screenshot(page, 'clear-all-history');
  });

  test('Empty state — with no history, shows "No recent searches"', async ({ page }) => {
    // Override with empty history
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockSearchApi(page);
    await mockHistoryApi(page, []);

    await page.getByLabel('Search history').click();
    await expect(page.getByText('No recent searches')).toBeVisible({ timeout: 5000 });
    await screenshot(page, 'empty-state');
  });

  test('Loading state — on first open, briefly shows "Loading..."', async ({ page }) => {
    // Override with delayed history response
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockSearchApi(page);
    await page.route('**/api/explore/history**', async (route) => {
      if (route.request().method() === 'GET') {
        await new Promise((r) => setTimeout(r, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            { id: '1', query: 'delayed search', activeTab: 'academic', createdAt: new Date().toISOString() },
          ]),
        });
      } else {
        await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
      }
    });

    await page.getByLabel('Search history').click();
    await expect(page.getByText('Loading...')).toBeVisible({ timeout: 3000 });
    await screenshot(page, 'loading-state');
  });

  // ── Shortcuts Overlay ──

  test('? opens overlay — press ?, verify full-screen keyboard shortcuts overlay appears', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('Shift+/'); // ? = Shift+/
    await expect(page.getByRole('dialog', { name: 'Keyboard shortcuts' })).toBeVisible({ timeout: 5000 });
    await screenshot(page, 'question-mark-opens-overlay');
  });

  test('Overlay shows all shortcuts — verify Navigation, Tabs, Actions, Selection, Other sections present', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('Shift+/');
    const dialog = page.getByRole('dialog', { name: 'Keyboard shortcuts' });
    await expect(dialog).toBeVisible({ timeout: 5000 });

    await expect(dialog.getByText('Navigation')).toBeVisible();
    await expect(dialog.getByText('Tabs')).toBeVisible();
    await expect(dialog.getByText('Actions')).toBeVisible();
    await expect(dialog.getByText('Selection')).toBeVisible();
    await expect(dialog.getByText('Other')).toBeVisible();
    await screenshot(page, 'overlay-shows-all-shortcuts');
  });

  test('Close with Escape — press Escape, verify overlay closes', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('Shift+/');
    await expect(page.getByRole('dialog', { name: 'Keyboard shortcuts' })).toBeVisible({ timeout: 5000 });

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Keyboard shortcuts' })).not.toBeVisible();
    await screenshot(page, 'close-overlay-with-escape');
  });

  test('Close with ? — press ? again, verify overlay closes', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('Shift+/');
    await expect(page.getByRole('dialog', { name: 'Keyboard shortcuts' })).toBeVisible({ timeout: 5000 });

    await page.keyboard.press('Shift+/');
    await expect(page.getByRole('dialog', { name: 'Keyboard shortcuts' })).not.toBeVisible();
    await screenshot(page, 'close-overlay-with-question-mark');
  });
});
