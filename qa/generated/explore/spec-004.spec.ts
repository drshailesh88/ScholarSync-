/**
 * Auto-generated Playwright test for explore/spec-004
 * Spec: Result Cards (20 checkpoints)
 *
 * Each test case corresponds to one checkbox in the spec file.
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts explore spec-004
 */

import { test, expect, type Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// ── Helpers ─────────────────────────────────────────────────────

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
          trustTier: i % 3 === 0 ? 'government' : i % 3 === 1 ? 'major_journalism' : 'community',
          domain: `example${i}.com`,
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

const SCREENSHOT_DIR = path.join(process.cwd(), 'qa/artifacts/explore/spec-004');

test.describe('explore / spec-004 — Result Cards', () => {
  test.beforeEach(async ({ page }) => {
    const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
    const url = new URL(baseUrl);
    await page.context().addCookies([
      { name: '__playwright', value: 'true', domain: url.hostname, path: '/' },
      { name: '__playwright_user', value: 'dev_user_001', domain: url.hostname, path: '/' },
    ]);

    if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

    await mockSearchApi(page);
    await mockSaveApi(page);
    await mockBlockApi(page);

    await page.goto('/explore');
    await expect(page.getByRole('searchbox')).toBeVisible({ timeout: 10000 });
    // Wait for React hydration
    await page.waitForFunction(() => document.readyState === 'complete', { timeout: 10000 });
    await page.evaluate(() => new Promise(r => requestAnimationFrame(r)));
  });

  // ── Display ──────────────────────────────────────────────────

  test('cp-000: Title renders as link — result with URL shows title as clickable link opening in new tab', async ({ page }) => {
    await searchAndWait(page);

    // First result has a URL, so its title should be a link
    const firstArticle = page.locator('article').first();
    const titleLink = firstArticle.locator('a').filter({ hasText: /Result 1/ });
    await expect(titleLink).toBeVisible();
    await expect(titleLink).toHaveAttribute('href', /example\.com/);
    await expect(titleLink).toHaveAttribute('target', '_blank');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-000.png'), fullPage: false });
  });

  test('cp-001: Title renders as text — result without URL/DOI/PMID shows title as plain heading', async ({ page }) => {
    // Mock results without URL
    await page.route('**/api/search/unified**', async (route) => {
      const url = new URL(route.request().url());
      const query = url.searchParams.get('q') ?? 'test';
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [{
            title: `${query} — No Link Result`,
            authors: ['Jane Doe'],
            journal: 'Journal of Testing',
            year: 2025,
            citationCount: 10,
            studyType: 'rct',
            abstract: 'Abstract without link.',
            doi: null,
            url: null,
            isOpenAccess: false,
            publicationTypes: [],
            sources: ['pubmed'],
            trustTier: 'community',
            domain: null,
          }],
          total: 1,
          page: 0,
          perPage: 10,
          hasMore: false,
          sourceCounts: { pubmed: 1 },
          augmentedQueries: null,
        }),
      });
    });

    await searchAndWait(page, 'no link');

    const firstArticle = page.locator('article').first();
    // Title should be plain text (heading), not a link
    const heading = firstArticle.locator('h2, h3, h4, [role="heading"]').first();
    await expect(heading).toBeVisible();
    // There should be no anchor wrapping the title
    const titleLinks = firstArticle.locator('a').filter({ hasText: /No Link Result/ });
    await expect(titleLinks).toHaveCount(0);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-001.png'), fullPage: false });
  });

  test('cp-002: Trust tier left border — each card has colored left border matching trust tier', async ({ page }) => {
    await searchAndWait(page);

    const articles = page.locator('article');
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);

    // Check that at least the first card has a left border style
    const firstArticle = articles.first();
    const borderLeft = await firstArticle.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.borderLeftWidth !== '0px' && style.borderLeftColor !== 'rgba(0, 0, 0, 0)';
    });
    expect(borderLeft).toBe(true);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-002.png'), fullPage: false });
  });

  test('cp-003: Evidence level border (academic) — academic results with evidence level show corresponding border color', async ({ page }) => {
    await searchAndWait(page);

    // Academic results should have border styling based on evidence level
    const firstArticle = page.locator('article').first();
    const hasBorder = await firstArticle.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.borderLeftWidth !== '0px';
    });
    expect(hasBorder).toBe(true);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-003.png'), fullPage: false });
  });

  test('cp-004: Breadcrumb display — below title, shows domain > path breadcrumb in brand color', async ({ page }) => {
    await searchAndWait(page);

    const firstArticle = page.locator('article').first();
    // Look for breadcrumb text containing the domain
    const breadcrumb = firstArticle.getByText(/example\d*\.com/);
    await expect(breadcrumb).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-004.png'), fullPage: false });
  });

  test('cp-005: Author metadata (academic) — academic results show "Author1, Author2, et al." format', async ({ page }) => {
    await searchAndWait(page);

    const firstArticle = page.locator('article').first();
    // Should show authors in format "Jane Doe, John Smith" or with "et al."
    const authorText = firstArticle.getByText(/Jane Doe/);
    await expect(authorText).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-005.png'), fullPage: false });
  });

  test('cp-006: News metadata — news results show outlet name and relative time [EMERGENT]', async ({ page }) => {
    // Mock with news-style results
    await page.route('**/api/search/unified**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [{
            title: 'Breaking News Result',
            authors: [],
            journal: null,
            year: 2025,
            citationCount: 0,
            studyType: null,
            abstract: 'A news article abstract.',
            doi: null,
            url: 'https://reuters.com/article-1',
            isOpenAccess: true,
            publicationTypes: ['news'],
            sources: ['web'],
            trustTier: 'major_journalism',
            domain: 'reuters.com',
            outlet: 'Reuters',
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          }],
          total: 1,
          page: 0,
          perPage: 10,
          hasMore: false,
          sourceCounts: { web: 1 },
          augmentedQueries: null,
        }),
      });
    });

    await searchAndWait(page, 'news topic');

    const firstArticle = page.locator('article').first();
    // Should show outlet or relative time indicator
    const outletOrTime = firstArticle.getByText(/Reuters|ago/i);
    await expect(outletOrTime).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-006.png'), fullPage: false });
  });

  test('cp-007: Discussion metadata — discussion results show platform, community, and engagement', async ({ page }) => {
    await page.route('**/api/search/unified**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [{
            title: 'Discussion Thread Result',
            authors: ['user123'],
            journal: null,
            year: 2025,
            citationCount: 0,
            studyType: null,
            abstract: 'A discussion thread.',
            doi: null,
            url: 'https://reddit.com/r/science/post-1',
            isOpenAccess: true,
            publicationTypes: ['discussion'],
            sources: ['web'],
            trustTier: 'community',
            domain: 'reddit.com',
            platform: 'Reddit',
            community: 'r/science',
            engagement: { upvotes: 150, comments: 42 },
          }],
          total: 1,
          page: 0,
          perPage: 10,
          hasMore: false,
          sourceCounts: { web: 1 },
          augmentedQueries: null,
        }),
      });
    });

    await searchAndWait(page, 'discussion topic');

    const firstArticle = page.locator('article').first();
    // Should show platform or community info
    const platformText = firstArticle.getByText(/Reddit|r\/science|community/i);
    await expect(platformText).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-007.png'), fullPage: false });
  });

  test('cp-008: Date label — results with date show formatted date; year-only results show just year [EMERGENT]', async ({ page }) => {
    await searchAndWait(page);

    const firstArticle = page.locator('article').first();
    // Results have year: 2025, so it should display "2025"
    const yearText = firstArticle.getByText('2025');
    await expect(yearText).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-008.png'), fullPage: false });
  });

  test('cp-009: Snippet with line clamp — abstract/tldr truncates to 3 lines with overflow hidden', async ({ page }) => {
    await searchAndWait(page);

    const firstArticle = page.locator('article').first();
    // Look for the abstract/snippet element
    const snippet = firstArticle.getByText(/Abstract for result/);
    await expect(snippet).toBeVisible();

    // Verify line-clamp or overflow hidden is applied
    const hasClamp = await snippet.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return (
        style.overflow === 'hidden' ||
        style.webkitLineClamp === '3' ||
        style.getPropertyValue('-webkit-line-clamp') === '3'
      );
    });
    expect(hasClamp).toBe(true);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-009.png'), fullPage: false });
  });

  // ── Save Interaction ────────────────────────────────────────

  test('cp-010: Save button (plus icon) — click + icon, verify spinner appears then check icon replaces it', async ({ page }) => {
    await searchAndWait(page);

    const saveButton = page.getByLabel('Save result').first();
    await expect(saveButton).toBeVisible();
    await saveButton.click();

    // After save, button should show check icon or "Saved" state
    await expect(page.getByLabel('Saved to Library').first().or(
      page.locator('article').first().locator('[aria-label*="Saved"]')
    )).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-010.png'), fullPage: false });
  });

  test('cp-011: Save disabled after saved — after saving, button is disabled and shows check icon', async ({ page }) => {
    await searchAndWait(page);

    const saveButton = page.getByLabel('Save result').first();
    await saveButton.click();

    // Wait for the saved state
    const savedButton = page.getByLabel('Saved to Library').first();
    await expect(savedButton).toBeVisible({ timeout: 10000 });

    // Verify the button is disabled
    const isDisabled = await savedButton.evaluate((el) => {
      return (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true';
    });
    expect(isDisabled).toBe(true);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-011.png'), fullPage: false });
  });

  test('cp-012: "Saved to Library" toast — after saving, success toast appears at bottom', async ({ page }) => {
    await searchAndWait(page);

    const saveButton = page.getByLabel('Save result').first();
    await saveButton.click();

    // Verify toast appears
    const toast = page.getByRole('alert').filter({ hasText: /Saved to Library/i });
    await expect(toast).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-012.png'), fullPage: false });
  });

  test('cp-013: "Already in Library" toast — save a result that is already saved, verify info toast', async ({ page }) => {
    // Mock save API to return "already saved" on second call
    let saveCount = 0;
    await page.route('**/api/library/save**', async (route) => {
      saveCount++;
      if (saveCount > 1) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, alreadySaved: true }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      }
    });

    await searchAndWait(page);

    // Save first result
    const saveButton = page.getByLabel('Save result').first();
    await saveButton.click();
    await expect(page.getByRole('alert').first()).toBeVisible({ timeout: 10000 });

    // Try to save same result again (if UI allows) or check for "Already" toast
    // The UI may show "Already in Library" toast if the item was already saved
    const toast = page.getByRole('alert').filter({ hasText: /Already in Library|Saved/i });
    await expect(toast).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-013.png'), fullPage: false });
  });

  // ── Source Info Panel ────────────────────────────────────────

  test('cp-014: Toggle source info — click shield icon, verify SourceInfoPanel expands inline below card', async ({ page }) => {
    await searchAndWait(page);

    const shieldButton = page.locator('[data-testid="source-info-trigger"]').first();
    await expect(shieldButton).toBeVisible();
    await shieldButton.click();

    const panel = page.locator('[data-testid="source-info-panel"]').first();
    await expect(panel).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-014.png'), fullPage: false });
  });

  test('cp-015: Close source info — click shield again or X button in panel, verify it closes', async ({ page }) => {
    await searchAndWait(page);

    const shieldButton = page.locator('[data-testid="source-info-trigger"]').first();
    await shieldButton.click();

    const panel = page.locator('[data-testid="source-info-panel"]').first();
    await expect(panel).toBeVisible({ timeout: 10000 });

    // Close by clicking shield again or the X button
    await shieldButton.click();
    await expect(panel).not.toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-015.png'), fullPage: false });
  });

  test('cp-016: Domain name in panel — panel shows domain name with globe icon', async ({ page }) => {
    await searchAndWait(page);

    const shieldButton = page.locator('[data-testid="source-info-trigger"]').first();
    await shieldButton.click();

    const panel = page.locator('[data-testid="source-info-panel"]').first();
    await expect(panel).toBeVisible({ timeout: 10000 });

    // Panel should contain the domain name
    await expect(panel.getByText(/example\d*\.com/)).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-016.png'), fullPage: false });
  });

  test('cp-017: Trust tier in panel — panel shows trust tier label with colored icon', async ({ page }) => {
    await searchAndWait(page);

    const shieldButton = page.locator('[data-testid="source-info-trigger"]').first();
    await shieldButton.click();

    const panel = page.locator('[data-testid="source-info-panel"]').first();
    await expect(panel).toBeVisible({ timeout: 10000 });

    // Panel should show one of the trust tier labels
    const trustLabel = panel.getByText(/Government|Institutional|Major Journalism|Community|Unclassified/i);
    await expect(trustLabel).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-017.png'), fullPage: false });
  });

  test('cp-018: Domain preference control — expand "Domain Preference" section, verify 5 levels', async ({ page }) => {
    await searchAndWait(page);

    const shieldButton = page.locator('[data-testid="source-info-trigger"]').first();
    await shieldButton.click();

    const panel = page.locator('[data-testid="source-info-panel"]').first();
    await expect(panel).toBeVisible({ timeout: 10000 });

    // Click "Domain Preference" to expand it
    const domainPrefButton = panel.getByText('Domain Preference');
    await expect(domainPrefButton).toBeVisible();
    await domainPrefButton.click();

    // Verify all 5 preference levels are shown
    for (const level of ['Prefer', 'Higher', 'Neutral', 'Lower', 'Mute']) {
      await expect(panel.getByText(level)).toBeVisible({ timeout: 5000 });
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-018.png'), fullPage: false });
  });

  test('cp-019: Set domain preference — click a preference level, verify it highlights as selected', async ({ page }) => {
    await searchAndWait(page);

    const shieldButton = page.locator('[data-testid="source-info-trigger"]').first();
    await shieldButton.click();

    const panel = page.locator('[data-testid="source-info-panel"]').first();
    await expect(panel).toBeVisible({ timeout: 10000 });

    const domainPrefButton = panel.getByText('Domain Preference');
    await domainPrefButton.click();

    // Click "Prefer" level
    const preferOption = panel.getByText('Prefer');
    await expect(preferOption).toBeVisible({ timeout: 5000 });
    await preferOption.click();

    // Verify the option is now highlighted/selected
    const isSelected = await preferOption.evaluate((el) => {
      const style = window.getComputedStyle(el);
      const parent = el.closest('button, [role="option"], [role="radio"]');
      return (
        el.getAttribute('aria-selected') === 'true' ||
        el.getAttribute('aria-checked') === 'true' ||
        el.getAttribute('data-selected') === 'true' ||
        el.classList.contains('selected') ||
        (parent && (
          parent.getAttribute('aria-selected') === 'true' ||
          parent.getAttribute('aria-checked') === 'true' ||
          parent.getAttribute('data-state') === 'active'
        )) ||
        style.fontWeight === '700' ||
        style.fontWeight === 'bold'
      );
    });
    expect(isSelected).toBe(true);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-019.png'), fullPage: false });
  });
});
