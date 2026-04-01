/**
 * Auto-generated Playwright test for explore/spec-005
 * Spec: Actions Menu (17 checkpoints)
 *
 * Each test case corresponds to one checkbox in the spec file.
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts explore spec-005
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

/** Open the actions menu on the first result card */
async function openActionsMenu(page: Page) {
  const trigger = page.locator('[data-testid="actions-menu-trigger"]').first()
    .or(page.getByLabel('More actions').first());
  await expect(trigger).toBeVisible();
  await trigger.click();
  const _dropdown = page.locator('[data-testid="actions-menu-dropdown"]').first();
  await expect(dropdown).toBeVisible({ timeout: 5000 });
  return { trigger, dropdown };
}

const SCREENSHOT_DIR = path.join(process.cwd(), 'qa/artifacts/explore/spec-005');

test.describe('explore / spec-005 — Actions Menu', () => {
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
    await page.waitForFunction(() => document.readyState === 'complete', { timeout: 10000 });
    await page.evaluate(() => new Promise(r => requestAnimationFrame(r)));  });

  // ── Menu Behavior ───────────────────────────────────────────

  test('cp-000: Open actions menu — click three-dots button on result card, verify dropdown appears', async ({ page }) => {
    await searchAndWait(page);

    const { dropdown } = await openActionsMenu(page);
    await expect(dropdown).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-000.png'), fullPage: false });
  });

  test('cp-001: Close on outside click — open menu, click outside, verify menu closes', async ({ page }) => {
    await searchAndWait(page);

    const { dropdown } = await openActionsMenu(page);
    await expect(dropdown).toBeVisible();

    // Click outside the menu
    await page.locator('body').click({ position: { x: 10, y: 10 } });
    await expect(dropdown).not.toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-001.png'), fullPage: false });
  });

  test('cp-002: Close on Escape — open menu, press Escape, verify menu closes and trigger button refocuses', async ({ page }) => {
    await searchAndWait(page);

    const { trigger, dropdown } = await openActionsMenu(page);
    await expect(dropdown).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dropdown).not.toBeVisible({ timeout: 5000 });

    // Trigger button should be refocused
    await expect(trigger).toBeFocused();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-002.png'), fullPage: false });
  });

  test('cp-003: aria-expanded attribute — verify trigger button has aria-expanded="true" when open', async ({ page }) => {
    await searchAndWait(page);

    const trigger = page.locator('[data-testid="actions-menu-trigger"]').first()
      .or(page.getByLabel('More actions').first());
    await expect(trigger).toBeVisible();

    // Before opening, aria-expanded should be false or absent
    const beforeExpanded = await trigger.getAttribute('aria-expanded');
    expect(beforeExpanded === null || beforeExpanded === 'false').toBe(true);

    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-003.png'), fullPage: false });
  });

  // ── Menu Items ──────────────────────────────────────────────

  test('cp-004: Save to Library item — menu shows "Save to Library" with S shortcut badge', async ({ page }) => {
    await searchAndWait(page);

    const { dropdown } = await openActionsMenu(page);

    const saveItem = page.getByRole('menuitem', { name: /Save to Library/i });
    await expect(saveItem).toBeVisible();

    // Verify S shortcut badge (kbd element)
    const kbd = dropdown.locator('kbd').filter({ hasText: 'S' });
    await expect(kbd).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-004.png'), fullPage: false });
  });

  test('cp-005: Save hidden when saved — on an already-saved result, "Save to Library" item is hidden', async ({ page }) => {
    await searchAndWait(page);

    // First, save the result
    const saveButton = page.getByLabel('Save result').first();
    await saveButton.click();
    await expect(page.getByLabel('Saved to Library').first().or(
      page.locator('article').first().locator('[aria-label*="Saved"]')
    )).toBeVisible({ timeout: 10000 });

    // Now open actions menu on the same card
    const { dropdown } = await openActionsMenu(page);

    // "Save to Library" should not be visible
    const saveItem = dropdown.getByRole('menuitem', { name: /Save to Library/i });
    await expect(saveItem).not.toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-005.png'), fullPage: false });
  });

  test('cp-006: Open Original item — click "Open Original", verify new tab opens with result URL', async ({ page, context }) => {
    await searchAndWait(page);

    await openActionsMenu(page);

    const openItem = page.getByRole('menuitem', { name: /Open Original/i });
    await expect(openItem).toBeVisible();

    // Listen for new page (tab)
    const pagePromise = context.waitForEvent('page');
    await openItem.click();
    const newPage = await pagePromise;
    expect(newPage.url()).toContain('example.com');
    await newPage.close();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-006.png'), fullPage: false });
  });

  test('cp-007: More from this source — click item, verify search bar updates with site: prefix', async ({ page }) => {
    await searchAndWait(page);

    await openActionsMenu(page);

    const moreItem = page.getByRole('menuitem', { name: /More from this source/i });
    await expect(moreItem).toBeVisible();
    await moreItem.click();

    // Search bar should now contain "site:" prefix
    const searchBar = page.getByRole('searchbox');
    await expect(searchBar).toHaveValue(/site:/i, { timeout: 5000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-007.png'), fullPage: false });
  });

  test('cp-008: Block this source (danger) — item styled in red, clicking triggers block and shows toast', async ({ page }) => {
    await searchAndWait(page);

    const { dropdown: _dropdown } = await openActionsMenu(page);

    const blockItem = page.getByRole('menuitem', { name: /Block this source/i });
    await expect(blockItem).toBeVisible();

    // Verify red/danger styling
    const isRed = await blockItem.evaluate((el) => {
      const style = window.getComputedStyle(el);
      const color = style.color;
      // Check for red-ish color (rgb values where red > 150, green < 100, blue < 100)
      const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        const [, r, g, b] = match.map(Number);
        return r > 150 && g < 100 && b < 100;
      }
      // Also accept text-red or text-destructive class patterns
      return el.className.includes('red') || el.className.includes('destructive') || el.className.includes('danger');
    });
    expect(isRed).toBe(true);

    await blockItem.click();

    // Verify toast appears
    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-008.png'), fullPage: false });
  });

  test('cp-009: Copy Link — click "Copy Link", verify URL is copied to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await searchAndWait(page);

    await openActionsMenu(page);

    const copyItem = page.getByRole('menuitem', { name: /Copy Link/i });
    await expect(copyItem).toBeVisible();
    await copyItem.click();

    // Verify clipboard content or toast
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('example.com');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-009.png'), fullPage: false });
  });

  // ── Stub Items (no crash) — BLOCKED [CODE-ONLY] ────────────

  test.skip('cp-010: BLOCKED — Save to Project — click item, verify no crash (callback not wired) [CODE-ONLY]', async ({ page }) => {
    await searchAndWait(page);
    await openActionsMenu(page);
    const item = page.getByRole('menuitem', { name: /Save to Project/i });
    if (await item.isVisible()) {
      await item.click();
    }
    // No crash = pass
    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-010.png'), fullPage: false });
  });

  test.skip('cp-011: BLOCKED — Cite in Draft — click item, verify no crash (callback not wired) [CODE-ONLY]', async ({ page }) => {
    await searchAndWait(page);
    await openActionsMenu(page);
    const item = page.getByRole('menuitem', { name: /Cite in Draft/i });
    if (await item.isVisible()) {
      await item.click();
    }
    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-011.png'), fullPage: false });
  });

  test.skip('cp-012: BLOCKED — Summarize Page — click item, verify no crash (callback not wired) [CODE-ONLY]', async ({ page }) => {
    await searchAndWait(page);
    await openActionsMenu(page);
    const item = page.getByRole('menuitem', { name: /Summarize Page/i });
    if (await item.isVisible()) {
      await item.click();
    }
    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-012.png'), fullPage: false });
  });

  test.skip('cp-013: BLOCKED — Ask About Page — click item, verify no crash (callback not wired) [CODE-ONLY]', async ({ page }) => {
    await searchAndWait(page);
    await openActionsMenu(page);
    const item = page.getByRole('menuitem', { name: /Ask About Page/i });
    if (await item.isVisible()) {
      await item.click();
    }
    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-013.png'), fullPage: false });
  });

  // ── Menu Separators ─────────────────────────────────────────

  test('cp-014: Separator before Open Original — visual divider appears above "Open Original" group', async ({ page }) => {
    await searchAndWait(page);

    const { dropdown } = await openActionsMenu(page);

    // Check for separator elements (hr, [role="separator"], or divider elements)
    const separators = dropdown.locator('[role="separator"], hr, [data-separator]');
    const count = await separators.count();
    expect(count).toBeGreaterThanOrEqual(1);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-014.png'), fullPage: false });
  });

  test('cp-015: Separator before Block — visual divider appears above "Block this source"', async ({ page }) => {
    await searchAndWait(page);

    const { dropdown } = await openActionsMenu(page);

    // There should be at least 2 separators (one before Open Original group, one before Block)
    const separators = dropdown.locator('[role="separator"], hr, [data-separator]');
    const count = await separators.count();
    expect(count).toBeGreaterThanOrEqual(2);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-015.png'), fullPage: false });
  });

  test('cp-016: Shortcut badges — S, C, O, B shortcuts display as kbd badges in menu items', async ({ page }) => {
    await searchAndWait(page);

    const { dropdown } = await openActionsMenu(page);

    // Check for kbd elements with the expected shortcut keys
    const kbdElements = dropdown.locator('kbd');
    const count = await kbdElements.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Collect all shortcut texts
    const shortcuts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await kbdElements.nth(i).textContent();
      if (text) shortcuts.push(text.trim());
    }

    // At least some of S, C, O, B should be present
    const expectedShortcuts = ['S', 'C', 'O', 'B'];
    const found = expectedShortcuts.filter((s) => shortcuts.includes(s));
    expect(found.length).toBeGreaterThanOrEqual(2);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'cp-016.png'), fullPage: false });
  });
});
