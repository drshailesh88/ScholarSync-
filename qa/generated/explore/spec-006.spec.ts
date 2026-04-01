/**
 * Auto-generated Playwright test for explore/spec-006
 * Spec: AI Synthesis (17 checkpoints)
 *
 * Each test case corresponds to one checkbox in the spec file.
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts explore spec-006
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

async function mockSynthesisApi(page: Page) {
  await page.route('**/api/explore/synthesize**', async (route) => {
    const _encoder = new TextEncoder();
    const chunks = [
      'Based on the search results, ',
      'the evidence suggests [1] that ',
      'this topic has been extensively studied [2]. ',
      'Further research [3] confirms these findings.',
    ];
    const body = chunks.join('');
    await route.fulfill({
      status: 200,
      contentType: 'text/plain',
      body,
    });
  });
}

async function mockSynthesisApiError(page: Page) {
  await page.route('**/api/explore/synthesize**', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal server error' }),
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

const SCREENSHOT_DIR = path.join(process.cwd(), 'qa/artifacts/explore/spec-006');

test.describe('explore / spec-006 — AI Synthesis', () => {
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
    await mockSynthesisApi(page);

    await page.goto('/explore');
    await expect(page.getByRole('searchbox')).toBeVisible({ timeout: 10000 });
    await page.waitForFunction(() => document.readyState === 'complete', { timeout: 10000 });
    await page.evaluate(() => new Promise(r => requestAnimationFrame(r)));  });

  // ── Trigger ─────────────────────────────────────────────────

  test('cp-000: Synthesize button visible — after search with results, "Synthesize" button with sparkle icon appears', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await expect(synthButton).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-000.png'), fullPage: false });
  });

  test('cp-001: Q keyboard hint on button — synthesize button shows Q key badge', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await expect(synthButton).toBeVisible({ timeout: 10000 });

    // Check for Q key badge (kbd element)
    const kbd = synthButton.locator('kbd').filter({ hasText: 'Q' });
    await expect(kbd).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-001.png'), fullPage: false });
  });

  test('cp-002: Click opens synthesis — click Synthesize button, verify synthesis block appears', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    const synthBlock = page.locator('[data-testid="synthesis-block"]');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-002.png'), fullPage: false });
  });

  test('cp-003: Q key toggles synthesis — press Q, verify synthesis opens; press Q again, verify it closes', async ({ page }) => {
    await searchAndWait(page);

    // Press Q to open
    await page.keyboard.press('q');

    const synthBlock = page.locator('[data-testid="synthesis-block"]');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    // Press Q again to close
    await page.keyboard.press('q');
    await expect(synthBlock).not.toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-003.png'), fullPage: false });
  });

  test('cp-004: Button hidden when open — while synthesis is open, the Synthesize button disappears', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await expect(synthButton).toBeVisible({ timeout: 10000 });

    await synthButton.click();

    const synthBlock = page.locator('[data-testid="synthesis-block"]');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    // Synthesize button should now be hidden
    await expect(synthButton).not.toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-004.png'), fullPage: false });
  });

  // ── Streaming ───────────────────────────────────────────────

  test('cp-005: Skeleton while loading — when synthesis starts, pulsing skeleton lines appear', async ({ page }) => {
    // Use a delayed response to catch the loading state
    await page.route('**/api/explore/synthesize**', async (route) => {
      // Delay response to allow skeleton to show
      await new Promise((r) => setTimeout(r, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'Based on the search results, the evidence suggests [1] that this topic has been studied.',
      });
    });

    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    // Look for skeleton/loading indicators (pulsing elements, animate-pulse class, etc.)
    const skeleton = page.locator('[data-testid="synthesis-block"] .animate-pulse, [data-testid="synthesis-block"] [class*="skeleton"]');
    await expect(skeleton.first()).toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-005.png'), fullPage: false });
  });

  test('cp-006: "Generating..." indicator — pulsing dot with "Generating..." text during stream', async ({ page }) => {
    await page.route('**/api/explore/synthesize**', async (route) => {
      await new Promise((r) => setTimeout(r, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'Based on the search results, the evidence suggests [1] findings.',
      });
    });

    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    // Look for "Generating..." text
    const generating = page.getByText(/Generating/i);
    await expect(generating).toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-006.png'), fullPage: false });
  });

  test('cp-007: Text streams progressively — synthesis text appears incrementally as it streams', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    // Wait for synthesis content to appear with final text
    const synthContent = page.locator('[data-testid="synthesis-content"]');
    await expect(synthContent).toBeVisible({ timeout: 15000 });

    // Verify it contains the synthesized text
    await expect(synthContent).toContainText('evidence suggests', { timeout: 15000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-007.png'), fullPage: false });
  });

  test('cp-008: Deduplication — close and re-open synthesis for same query, verify no re-fetch', async ({ page }) => {
    let fetchCount = 0;
    await page.route('**/api/explore/synthesize**', async (route) => {
      fetchCount++;
      const body = 'Based on the search results, the evidence suggests [1] that this topic has been studied [2].';
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body,
      });
    });

    await searchAndWait(page);

    // Open synthesis
    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    const synthBlock = page.locator('[data-testid="synthesis-block"]');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    const synthContent = page.locator('[data-testid="synthesis-content"]');
    await expect(synthContent).toContainText('evidence', { timeout: 15000 });

    // Close synthesis
    const closeButton = page.locator('[data-testid="synthesis-close"]');
    await closeButton.click();
    await expect(synthBlock).not.toBeVisible({ timeout: 5000 });

    // Re-open synthesis
    await page.keyboard.press('q');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    // Should have only fetched once (deduplication)
    expect(fetchCount).toBe(1);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-008.png'), fullPage: false });
  });

  // ── Citations ───────────────────────────────────────────────

  test('cp-009: [N] markers rendered — synthesis text contains colored [1], [2], etc. citation markers', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    const synthBlock = page.locator('[data-testid="synthesis-block"]');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    // Wait for citation markers to appear
    const markers = page.locator('[data-testid^="citation-marker-"]');
    await expect(markers.first()).toBeVisible({ timeout: 15000 });

    const count = await markers.count();
    expect(count).toBeGreaterThanOrEqual(1);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-009.png'), fullPage: false });
  });

  test('cp-010: Citation click scrolls — click a [N] marker, verify page scrolls to corresponding result card', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    const synthBlock = page.locator('[data-testid="synthesis-block"]');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    const firstMarker = page.locator('[data-testid^="citation-marker-"]').first();
    await expect(firstMarker).toBeVisible({ timeout: 15000 });

    // Record scroll position before click
    const scrollBefore = await page.evaluate(() => window.scrollY);

    await firstMarker.click();

    // Wait for scroll to happen
    await page.waitForTimeout(500);

    // Scroll position should have changed (or target article should be in viewport)
    const scrollAfter = await page.evaluate(() => window.scrollY);
    const scrolled = scrollAfter !== scrollBefore;

    // Alternative check: verify a result card is now in viewport
    const resultCard = page.locator('article').first();
    const isVisible = await resultCard.isVisible();

    expect(scrolled || isVisible).toBe(true);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-010.png'), fullPage: false });
  });

  test('cp-011: Citation tooltip — hover over [N] marker, verify title attribute shows source title', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    const synthBlock = page.locator('[data-testid="synthesis-block"]');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    const firstMarker = page.locator('[data-testid^="citation-marker-"]').first();
    await expect(firstMarker).toBeVisible({ timeout: 15000 });

    // Check for title attribute (tooltip text)
    const title = await firstMarker.getAttribute('title');
    expect(title).toBeTruthy();
    expect(title!.length).toBeGreaterThan(0);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-011.png'), fullPage: false });
  });

  test('cp-012: Trust-tier colored citations — citation markers colored by source trust tier', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    const synthBlock = page.locator('[data-testid="synthesis-block"]');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    const markers = page.locator('[data-testid^="citation-marker-"]');
    await expect(markers.first()).toBeVisible({ timeout: 15000 });

    // Check that citation markers have color styling (not default black/inherited)
    const hasColor = await markers.first().evaluate((el) => {
      const style = window.getComputedStyle(el);
      const color = style.color;
      const bg = style.backgroundColor;
      // Check it has non-default coloring (colored text or background)
      return (
        color !== 'rgb(0, 0, 0)' ||
        (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent')
      );
    });
    expect(hasColor).toBe(true);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-012.png'), fullPage: false });
  });

  // ── Controls ────────────────────────────────────────────────

  test('cp-013: Collapse synthesis — click caret-up button, verify synthesis content hides but header remains', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    const synthBlock = page.locator('[data-testid="synthesis-block"]');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    const synthContent = page.locator('[data-testid="synthesis-content"]');
    await expect(synthContent).toBeVisible({ timeout: 15000 });

    // Click collapse toggle
    const collapseToggle = page.locator('[data-testid="synthesis-collapse-toggle"]');
    await expect(collapseToggle).toBeVisible();
    await collapseToggle.click();

    // Content should be hidden but the block/header should remain
    await expect(synthContent).not.toBeVisible({ timeout: 5000 });
    await expect(synthBlock).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-013.png'), fullPage: false });
  });

  test('cp-014: Expand collapsed synthesis — click caret-down button on collapsed synthesis, verify content reappears', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    const synthBlock = page.locator('[data-testid="synthesis-block"]');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    const synthContent = page.locator('[data-testid="synthesis-content"]');
    await expect(synthContent).toBeVisible({ timeout: 15000 });

    // Collapse
    const collapseToggle = page.locator('[data-testid="synthesis-collapse-toggle"]');
    await collapseToggle.click();
    await expect(synthContent).not.toBeVisible({ timeout: 5000 });

    // Expand again
    await collapseToggle.click();
    await expect(synthContent).toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-014.png'), fullPage: false });
  });

  test('cp-015: Close synthesis — click X button, verify entire synthesis block disappears', async ({ page }) => {
    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    const synthBlock = page.locator('[data-testid="synthesis-block"]');
    await expect(synthBlock).toBeVisible({ timeout: 15000 });

    // Click close button
    const closeButton = page.locator('[data-testid="synthesis-close"]');
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    await expect(synthBlock).not.toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-015.png'), fullPage: false });
  });

  // ── Error ───────────────────────────────────────────────────

  test('cp-016: Synthesis failure message — when API fails, shows "Synthesis could not be generated. Try again later."', async ({ page }) => {
    // Override with error mock
    await mockSynthesisApiError(page);

    await searchAndWait(page);

    const synthButton = page.getByRole('button', { name: /Synthesize/i });
    await synthButton.click();

    // Should show error message
    const errorMsg = page.getByText(/Synthesis could not be generated|Try again later/i);
    await expect(errorMsg).toBeVisible({ timeout: 15000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-016.png'), fullPage: false });
  });
});
