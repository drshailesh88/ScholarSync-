import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = path.join(process.cwd(), 'qa/artifacts/explore/spec-007');

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

async function mockSaveApi(page: Page) {
  await page.route('**/api/library/save**', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
  });
}

async function mockBlockApi(page: Page) {
  await page.route('**/api/explore/block**', async (route) => {
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

/** Click on body to ensure no input is focused before pressing keys */
async function blurInputs(page: Page) {
  await page.locator('body').click({ position: { x: 0, y: 0 } });
}

test.describe('Spec 007: Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page);
    await mockSearchApi(page);
    await mockSaveApi(page);
    await mockBlockApi(page);
    await page.goto(`${baseUrl}/explore`);
  });

  // ── Result Navigation ──

  test('j moves highlight down — press j, verify next result card gets highlight ring', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j');
    await expect(page.locator('article[data-highlighted="true"]')).toHaveCount(1);
    const highlighted = page.locator('article[data-highlighted="true"]');
    await expect(highlighted).toBeVisible();
    // First press should highlight the first result
    await expect(page.locator('article').first()).toHaveAttribute('data-highlighted', 'true');
    await screenshot(page, 'j-moves-highlight-down');
  });

  test('k moves highlight up — press k, verify previous result card gets highlight ring', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    // Move down twice, then up once
    await page.keyboard.press('j');
    await page.keyboard.press('j');
    await page.keyboard.press('k');

    // Should be back on first result
    await expect(page.locator('article').first()).toHaveAttribute('data-highlighted', 'true');
    await screenshot(page, 'k-moves-highlight-up');
  });

  test('ArrowDown moves highlight down — press ArrowDown, same as j', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('ArrowDown');
    await expect(page.locator('article[data-highlighted="true"]')).toHaveCount(1);
    await expect(page.locator('article').first()).toHaveAttribute('data-highlighted', 'true');
    await screenshot(page, 'arrowdown-moves-highlight-down');
  });

  test('ArrowUp moves highlight up — press ArrowUp, same as k', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');

    await expect(page.locator('article').first()).toHaveAttribute('data-highlighted', 'true');
    await screenshot(page, 'arrowup-moves-highlight-up');
  });

  test('Highlight scrolls into view — navigate to off-screen result, verify it scrolls into view', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    // Navigate down through all results to reach the last one
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('j');
    }

    const highlighted = page.locator('article[data-highlighted="true"]');
    await expect(highlighted).toBeVisible();
    await expect(highlighted).toBeInViewport();
    await screenshot(page, 'highlight-scrolls-into-view');
  });

  test('Highlight resets on tab change — switch tabs, verify highlight resets', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j');
    await expect(page.locator('article[data-highlighted="true"]')).toHaveCount(1);

    // Switch tab
    await page.getByRole('tab', { name: 'Web' }).click();
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });

    // No highlight should be active
    await expect(page.locator('article[data-highlighted="true"]')).toHaveCount(0);
    await screenshot(page, 'highlight-resets-on-tab-change');
  });

  test('j stops at last result — on last result, pressing j does not advance further', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    const articles = page.locator('article');
    const count = await articles.count();

    // Navigate to the last result
    for (let i = 0; i < count; i++) {
      await page.keyboard.press('j');
    }

    const lastArticle = articles.nth(count - 1);
    await expect(lastArticle).toHaveAttribute('data-highlighted', 'true');

    // Press j again — should stay on last
    await page.keyboard.press('j');
    await expect(lastArticle).toHaveAttribute('data-highlighted', 'true');
    await screenshot(page, 'j-stops-at-last-result');
  });

  test('k stops at first result — on first result, pressing k does not go negative', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j'); // highlight first
    await page.keyboard.press('k'); // try to go above first

    // Should still highlight first result
    await expect(page.locator('article').first()).toHaveAttribute('data-highlighted', 'true');

    // Press k again — should not crash or go negative
    await page.keyboard.press('k');
    await expect(page.locator('article').first()).toHaveAttribute('data-highlighted', 'true');
    await screenshot(page, 'k-stops-at-first-result');
  });

  // ── Selection ──

  test('X toggles selection — highlight a result, press X, verify selection ring appears', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j');
    await page.keyboard.press('x');

    await expect(page.locator('article[data-selected="true"]')).toHaveCount(1);
    await expect(page.locator('article').first()).toHaveAttribute('data-selected', 'true');
    await screenshot(page, 'x-toggles-selection-on');
  });

  test('X deselects — on selected result, press X again, verify selection ring removed', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j');
    await page.keyboard.press('x'); // select
    await expect(page.locator('article').first()).toHaveAttribute('data-selected', 'true');

    await page.keyboard.press('x'); // deselect
    await expect(page.locator('article').first()).not.toHaveAttribute('data-selected', 'true');
    await screenshot(page, 'x-deselects');
  });

  test('Shift+ArrowDown extends selection — verify selection extends to next result', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j'); // highlight first
    await page.keyboard.press('x'); // select current
    await page.keyboard.press('Shift+ArrowDown'); // extend selection

    // Current + next should be selected
    const selectedCount = await page.locator('article[data-selected="true"]').count();
    expect(selectedCount).toBeGreaterThanOrEqual(2);
    await screenshot(page, 'shift-arrowdown-extends-selection');
  });

  test('Shift+ArrowUp extends selection — verify selection extends upward', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    // Navigate to third result
    await page.keyboard.press('j');
    await page.keyboard.press('j');
    await page.keyboard.press('j');
    await page.keyboard.press('x'); // select current

    await page.keyboard.press('Shift+ArrowUp'); // extend upward

    const selectedCount = await page.locator('article[data-selected="true"]').count();
    expect(selectedCount).toBeGreaterThanOrEqual(2);
    await screenshot(page, 'shift-arrowup-extends-selection');
  });

  test('Selection resets on tab change — select results, switch tabs, verify selection clears', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j');
    await page.keyboard.press('x');
    await expect(page.locator('article[data-selected="true"]')).toHaveCount(1);

    // Switch tab
    await page.getByRole('tab', { name: 'Web' }).click();
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });

    await expect(page.locator('article[data-selected="true"]')).toHaveCount(0);
    await screenshot(page, 'selection-resets-on-tab-change');
  });

  // ── Action Shortcuts ──

  test('S saves highlighted result — press S, verify save executes and toast shows', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j');
    await page.keyboard.press('s');

    await expect(page.getByRole('alert')).toBeVisible({ timeout: 5000 });
    await screenshot(page, 's-saves-highlighted-result');
  });

  test('O opens highlighted result — press O, verify new tab opens with result URL', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j');

    const popupPromise = page.waitForEvent('popup');
    await page.keyboard.press('o');
    const popup = await popupPromise;
    expect(popup.url()).toContain('example.com/paper-');
    await screenshot(page, 'o-opens-highlighted-result');
  });

  test('B blocks highlighted source — press B, verify block toast shows', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j');
    await page.keyboard.press('b');

    await expect(page.getByRole('alert')).toBeVisible({ timeout: 5000 });
    await screenshot(page, 'b-blocks-highlighted-source');
  });

  test('I toggles source info — press I, verify source info panel toggles', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j');
    await page.keyboard.press('i');

    await expect(page.locator('[data-testid="source-info-panel"]')).toBeVisible({ timeout: 5000 });

    // Press I again to close
    await page.keyboard.press('i');
    await expect(page.locator('[data-testid="source-info-panel"]')).not.toBeVisible();
    await screenshot(page, 'i-toggles-source-info');
  });

  test.skip('BLOCKED — C cite shortcut — highlight a result, press C, verify no crash (stub) [CODE-ONLY]', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j');
    await page.keyboard.press('c');

    // Verify no crash — page is still responsive
    await expect(page.locator('article').first()).toBeVisible();
    await screenshot(page, 'c-cite-shortcut');
  });

  // ── Guards ──

  test('No shortcuts when input focused — focus search bar, press j/k, verify no result navigation', async ({ page }) => {
    await searchAndWait(page);

    // Focus the search bar
    const searchBar = page.getByRole('searchbox');
    await searchBar.click();

    // Press j — should type in search bar, not navigate
    await page.keyboard.press('j');

    await expect(page.locator('article[data-highlighted="true"]')).toHaveCount(0);
    await screenshot(page, 'no-shortcuts-when-input-focused');
  });

  test('Escape blurs input — focus search bar, press Escape, verify input loses focus', async ({ page }) => {
    await searchAndWait(page);

    const searchBar = page.getByRole('searchbox');
    await searchBar.click();
    await expect(searchBar).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(searchBar).not.toBeFocused();
    await screenshot(page, 'escape-blurs-input');
  });

  test('No shortcuts with Cmd/Ctrl — press Cmd+S, verify no save action', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('j');

    // Cmd+S (or Ctrl+S on non-Mac) should not trigger save action
    await page.keyboard.press('Meta+s');

    // No save toast should appear from our app's action
    await page.waitForTimeout(500);
    const saveToast = page.getByRole('alert').filter({ hasText: /Saved to Library/i });
    await expect(saveToast).toHaveCount(0);
    await screenshot(page, 'no-shortcuts-with-cmd-ctrl');
  });

  test('/ focuses search bar — press /, verify search input gains focus', async ({ page }) => {
    await searchAndWait(page);
    await blurInputs(page);

    await page.keyboard.press('/');
    const searchBar = page.getByRole('searchbox');
    await expect(searchBar).toBeFocused();
    await screenshot(page, 'slash-focuses-search-bar');
  });
});
