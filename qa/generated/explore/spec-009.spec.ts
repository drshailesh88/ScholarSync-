import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = path.join(process.cwd(), 'qa/artifacts/explore/spec-009');

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
    const pageParam = parseInt(url.searchParams.get('page') ?? '0', 10);
    const pageSize = Math.min(count - pageParam * 10, 10);
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        results: Array.from({ length: Math.max(pageSize, 0) }, (_, i) => ({
          title: `${query} — Page ${pageParam + 1} Result ${i + 1}`,
          authors: ['Jane Doe', 'John Smith'],
          journal: 'Journal of Testing',
          year: 2025,
          citationCount: 42 + i,
          studyType: 'rct',
          abstract: `Abstract for page ${pageParam + 1} result ${i + 1} about ${query}.`,
          doi: `10.1000/test-p${pageParam}-${i + 1}`,
          url: `https://example.com/paper-p${pageParam}-${i + 1}`,
          isOpenAccess: i % 2 === 0,
          publicationTypes: [],
          sources: ['pubmed'],
          trustTier: i % 3 === 0 ? 'government' : 'major_journalism',
        })),
        total: count,
        page: pageParam,
        perPage: 10,
        hasMore: (pageParam + 1) * 10 < count,
        sourceCounts: { pubmed: count },
        augmentedQueries: null,
      }),
    });
  });
}

async function mockSaveApi(page: Page) {
  await page.route('**/api/library/save**', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
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

/** Scoped pagination nav helper to avoid strict mode violations */
function paginationNav(page: Page) {
  return page.getByRole('navigation', { name: 'Pagination' });
}

test.describe('Spec 009: Pagination & Toasts', () => {
  // ── Pagination ──

  test.describe('Pagination', () => {
    test.beforeEach(async ({ page }) => {
      await setupAuth(page);
      // 25 total results = 3 pages
      await mockSearchApi(page, 25);
      await page.goto(`${baseUrl}/explore`);
    });

    test('Pagination visible when >10 results — Previous/Next buttons and page counter appear', async ({ page }) => {
      await searchAndWait(page);

      const nav = paginationNav(page);
      await expect(nav).toBeVisible({ timeout: 5000 });
      await expect(nav.getByRole('button', { name: 'Previous' })).toBeVisible();
      await expect(nav.getByRole('button', { name: 'Next' })).toBeVisible();
      await expect(nav.getByText(/Page \d+ of \d+/)).toBeVisible();
      await screenshot(page, 'pagination-visible');
    });

    test('Pagination hidden when <=10 results — no pagination shown', async ({ page }) => {
      await page.unrouteAll({ behavior: 'ignoreErrors' });
      await mockSearchApi(page, 5);

      await searchAndWait(page);

      await expect(paginationNav(page)).not.toBeVisible();
      await screenshot(page, 'pagination-hidden');
    });

    test('Next page loads results — click Next, verify page 2 results display', async ({ page }) => {
      await searchAndWait(page);

      await paginationNav(page).getByRole('button', { name: 'Next' }).click();
      await expect(page.getByText(/Page 2 Result/).first()).toBeVisible({ timeout: 15000 });
      await expect(paginationNav(page).getByText(/Page 2 of/)).toBeVisible();
      await screenshot(page, 'next-page-loads-results');
    });

    test('Previous page returns — on page 2, click Previous, verify page 1 results display', async ({ page }) => {
      await searchAndWait(page);

      await paginationNav(page).getByRole('button', { name: 'Next' }).click();
      await expect(paginationNav(page).getByText(/Page 2/)).toBeVisible({ timeout: 15000 });

      await paginationNav(page).getByRole('button', { name: 'Previous' }).click();
      await expect(page.getByText(/Page 1 Result/).first()).toBeVisible({ timeout: 15000 });
      await screenshot(page, 'previous-page-returns');
    });

    test('Page counter updates — shows "Page 1 of N", updates on navigation', async ({ page }) => {
      await searchAndWait(page);

      const nav = paginationNav(page);
      await expect(nav.getByText('Page 1 of 3')).toBeVisible();

      await nav.getByRole('button', { name: 'Next' }).click();
      await expect(nav.getByText('Page 2 of 3')).toBeVisible({ timeout: 15000 });

      await nav.getByRole('button', { name: 'Next' }).click();
      await expect(nav.getByText('Page 3 of 3')).toBeVisible({ timeout: 15000 });
      await screenshot(page, 'page-counter-updates');
    });

    test('Previous disabled on page 1 — first page, Previous button is disabled', async ({ page }) => {
      await searchAndWait(page);

      await expect(paginationNav(page).getByRole('button', { name: 'Previous' })).toBeDisabled();
      await screenshot(page, 'previous-disabled-on-page-1');
    });

    test('Next disabled on last page — last page, Next button is disabled', async ({ page }) => {
      await searchAndWait(page);

      const nav = paginationNav(page);
      await nav.getByRole('button', { name: 'Next' }).click();
      await expect(nav.getByText(/Page 2/)).toBeVisible({ timeout: 15000 });
      await nav.getByRole('button', { name: 'Next' }).click();
      await expect(nav.getByText(/Page 3/)).toBeVisible({ timeout: 15000 });

      await expect(nav.getByRole('button', { name: 'Next' })).toBeDisabled();
      await screenshot(page, 'next-disabled-on-last-page');
    });

    test('Page caching — navigate to page 2, back to page 1, verify no re-fetch (cached)', async ({ page }) => {
      await searchAndWait(page);

      const nav = paginationNav(page);
      await nav.getByRole('button', { name: 'Next' }).click();
      await expect(nav.getByText(/Page 2/)).toBeVisible({ timeout: 15000 });

      // Track API calls from this point
      let fetchCount = 0;
      page.on('request', (req) => {
        if (req.url().includes('/api/search/unified')) fetchCount++;
      });

      // Go back to page 1 (should be cached)
      await nav.getByRole('button', { name: 'Previous' }).click();
      await expect(nav.getByText(/Page 1/)).toBeVisible({ timeout: 15000 });

      expect(fetchCount).toBe(0);
      await screenshot(page, 'page-caching');
    });

    test('Buttons disabled during load — while paginating, both buttons are disabled', async ({ page }) => {
      await searchAndWait(page);

      // Override with slow response to observe disabled state
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
              title: `${query} — Slow Result ${i + 1}`,
              authors: ['Jane Doe'],
              journal: 'Journal of Testing',
              year: 2025,
              citationCount: 42,
              studyType: 'rct',
              abstract: `Abstract ${i + 1}`,
              doi: `10.1000/slow-${i + 1}`,
              url: `https://example.com/slow-${i + 1}`,
              isOpenAccess: true,
              publicationTypes: [],
              sources: ['pubmed'],
              trustTier: 'government',
            })),
            total: 25,
            page: 1,
            perPage: 10,
            hasMore: true,
            sourceCounts: { pubmed: 25 },
            augmentedQueries: null,
          }),
        });
      });

      const nav = paginationNav(page);
      await nav.getByRole('button', { name: 'Next' }).click();

      // During loading, both buttons should be disabled
      await expect(nav.getByRole('button', { name: 'Previous' })).toBeDisabled({ timeout: 5000 });
      await expect(nav.getByRole('button', { name: 'Next' })).toBeDisabled();
      await screenshot(page, 'buttons-disabled-during-load');
    });
  });

  // ── Toast Notifications ──

  test.describe('Toast Notifications', () => {
    test.beforeEach(async ({ page }) => {
      await setupAuth(page);
      await mockSearchApi(page);
      await mockSaveApi(page);
      await page.goto(`${baseUrl}/explore`);
    });

    test('Success toast — after saving, green check toast appears at bottom center', async ({ page }) => {
      await searchAndWait(page);

      // Click first article to defocus search, then save
      await page.locator('article').first().click();
      await page.keyboard.press('j');
      await page.keyboard.press('s');

      const toast = page.getByRole('alert').first();
      await expect(toast).toBeVisible({ timeout: 5000 });
      await screenshot(page, 'success-toast');
    });

    test('Info toast — "Already in Library" shows info icon toast', async ({ page }) => {
      await page.unrouteAll({ behavior: 'ignoreErrors' });
      await mockSearchApi(page);
      await page.route('**/api/library/save**', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, alreadySaved: true }),
        });
      });

      await searchAndWait(page);

      await page.locator('article').first().click();
      await page.keyboard.press('j');
      await page.keyboard.press('s');

      const toast = page.getByRole('alert').first();
      await expect(toast).toBeVisible({ timeout: 5000 });
      await expect(toast).toContainText(/Already in/i);
      await screenshot(page, 'info-toast');
    });

    test('Auto-dismiss — toast fades out automatically after ~2 seconds', async ({ page }) => {
      await searchAndWait(page);

      await page.locator('article').first().click();
      await page.keyboard.press('j');
      await page.keyboard.press('s');

      const toast = page.getByRole('alert').first();
      await expect(toast).toBeVisible({ timeout: 5000 });

      // Wait for auto-dismiss (~2s dismiss + 150ms fade + buffer)
      await expect(toast).not.toBeVisible({ timeout: 8000 });
      await screenshot(page, 'auto-dismiss');
    });
  });
});
