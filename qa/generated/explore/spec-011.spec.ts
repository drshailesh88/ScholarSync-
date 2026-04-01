import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = path.join(process.cwd(), 'qa/artifacts/explore/spec-011');

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:3000';

async function setupAuth(page: Page) {
  const url = new URL(baseUrl);
  await page.context().addCookies([
    { name: '__playwright', value: 'true', domain: url.hostname, path: '/' },
    { name: '__playwright_user', value: 'dev_user_001', domain: url.hostname, path: '/' },
  ]);
}

async function mockSourcesApi(page: Page, preferences: Record<string, unknown>[] = []) {
  await page.route('**/api/explore/preferences**', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(preferences.length > 0 ? preferences : [
          { domain: 'nih.gov', level: 'prefer' },
          { domain: 'nature.com', level: 'higher' },
          { domain: 'blogspot.com', level: 'lower' },
          { domain: 'spam-site.com', level: 'mute' },
        ]),
      });
    } else if (route.request().method() === 'DELETE') {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
    } else {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
    }
  });
}

async function screenshot(page: Page, name: string) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, `${name}.png`), fullPage: true });
}

test.describe('Spec 011: Sources Management Page', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page);
    await mockSourcesApi(page);
    await page.goto(`${baseUrl}/explore/sources`);
  });

  // ── Page Layout ──

  test('Page title -- shows "My Sources" heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'My Sources' })).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'page-title');
  });

  test('Back to Explore link -- arrow button navigates to /explore', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /explore/i }).filter({ has: page.locator('svg') });
    await expect(backLink).toBeVisible({ timeout: 15000 });
    await backLink.click();
    await expect(page).toHaveURL(/\/explore$/);
    await screenshot(page, 'back-to-explore');
  });

  test('Preference count display -- header shows "N / 1,000" count', async ({ page }) => {
    await expect(page.getByText(/\d+\s*\/\s*1,000/)).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'preference-count-display');
  });

  test('Description text -- shows explanation about domain ranking', async ({ page }) => {
    await expect(page.getByText(/domain/i).filter({ hasText: /rank/i }).or(
      page.getByText(/domain ranking/i)
    ).or(
      page.locator('p').filter({ hasText: /domain/i })
    ).first()).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'description-text');
  });

  // ── Filter Controls ──

  test('Filter by domain text -- type in search box, verify list filters to matching domains', async ({ page }) => {
    await expect(page.getByText('nih.gov')).toBeVisible({ timeout: 15000 });

    const filterInput = page.getByPlaceholder('Filter domains...');
    await filterInput.fill('nih');

    await expect(page.getByText('nih.gov')).toBeVisible();
    await expect(page.getByText('nature.com')).not.toBeVisible();
    await screenshot(page, 'filter-by-domain-text');
  });

  test('Filter by level (All) -- click "All" pill, verify all preferences shown', async ({ page }) => {
    await expect(page.getByText('nih.gov')).toBeVisible({ timeout: 15000 });

    const allPill = page.getByRole('button', { name: /^All/i }).or(
      page.locator('button').filter({ hasText: /^All/ })
    ).first();
    await allPill.click();

    await expect(page.getByText('nih.gov')).toBeVisible();
    await expect(page.getByText('nature.com')).toBeVisible();
    await expect(page.getByText('blogspot.com')).toBeVisible();
    await expect(page.getByText('spam-site.com')).toBeVisible();
    await screenshot(page, 'filter-by-level-all');
  });

  test('Filter by Preferred -- click "Preferred" pill, verify only preferred domains shown', async ({ page }) => {
    await expect(page.getByText('nih.gov')).toBeVisible({ timeout: 15000 });

    const preferredPill = page.getByRole('button', { name: /Preferred/i }).first();
    await preferredPill.click();

    await expect(page.getByText('nih.gov')).toBeVisible();
    await expect(page.getByText('spam-site.com')).not.toBeVisible();
    await screenshot(page, 'filter-by-preferred');
  });

  test('Filter by Muted -- click "Muted" pill, verify only muted domains shown', async ({ page }) => {
    await expect(page.getByText('nih.gov')).toBeVisible({ timeout: 15000 });

    const mutedPill = page.getByRole('button', { name: /Muted/i }).first();
    await mutedPill.click();

    await expect(page.getByText('spam-site.com')).toBeVisible();
    await expect(page.getByText('nih.gov')).not.toBeVisible();
    await screenshot(page, 'filter-by-muted');
  });

  test('Level count badges -- each filter pill shows count', async ({ page }) => {
    await expect(page.getByText('nih.gov')).toBeVisible({ timeout: 15000 });

    // Verify at least one pill shows a count in parentheses
    await expect(page.getByRole('button', { name: /\(\d+\)/ }).first()).toBeVisible();
    await screenshot(page, 'level-count-badges');
  });

  // ── Manage Preferences ──

  test('Change preference level -- use dropdown on a row, change level, verify update', async ({ page }) => {
    await expect(page.getByText('nature.com')).toBeVisible({ timeout: 15000 });

    const dropdown = page.locator('select[aria-label="Preference level for nature.com"]').or(
      page.locator('[data-testid="domain-preference-row"]').filter({ hasText: 'nature.com' }).locator('select')
    ).first();
    await dropdown.selectOption('lower');

    await expect(dropdown).toHaveValue('lower');
    await screenshot(page, 'change-preference-level');
  });

  test('Remove preference -- click trash icon on a row, verify domain removed from list', async ({ page }) => {
    await expect(page.getByText('blogspot.com')).toBeVisible({ timeout: 15000 });

    const removeButton = page.getByRole('button', { name: /Remove preference for blogspot.com/i }).or(
      page.locator('[data-testid="domain-preference-row"]').filter({ hasText: 'blogspot.com' }).getByRole('button')
    ).first();
    await removeButton.click();

    await expect(page.getByText('blogspot.com')).not.toBeVisible({ timeout: 15000 });
    await screenshot(page, 'remove-preference');
  });

  // ── Empty States ──

  test('No preferences message -- when empty, shows empty state text', async ({ page }) => {
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockSourcesApi(page, []);
    await page.goto(`${baseUrl}/explore/sources`);

    await expect(
      page.getByText('No domain preferences yet. Use the shield icon')
    ).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'no-preferences-message');
  });

  test('No filter matches -- set filter that matches nothing, shows "No matches for your filter."', async ({ page }) => {
    await expect(page.getByText('nih.gov')).toBeVisible({ timeout: 15000 });

    const filterInput = page.getByPlaceholder('Filter domains...');
    await filterInput.fill('zzzznonexistent');

    await expect(page.getByText('No matches for your filter.')).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'no-filter-matches');
  });
});
