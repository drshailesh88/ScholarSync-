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

async function screenshot(page: Page, name: string) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, `${name}.png`), fullPage: true });
}

/**
 * Helper: seed a domain preference by calling the server action via the page's JS context.
 * This works because the page is a "use client" component that imports server actions.
 * We use page.evaluate() to dynamically import and call the server action.
 */
async function _seedDomainPreference(page: Page, domain: string, level: string) {
  // Navigate to sources page first to ensure the app context is loaded
  await page.evaluate(
    async ({ domain, level }) => {
      const resp = await fetch('/api/explore/preferences/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, level }),
      });
      // If the seed endpoint doesn't exist, silently fail — tests will adapt
      return resp.ok;
    },
    { domain, level }
  );
}

/**
 * Helper: wait for the sources page to finish loading (past the "Loading preferences..." state).
 */
async function waitForPageLoaded(page: Page) {
  // Wait for either the preference list or the empty state to appear
  await expect(
    page.getByTestId('domain-preference-row').first()
      .or(page.getByText('No domain preferences yet'))
      .or(page.getByText(/\d+\s*\/\s*1,000/))
  ).toBeVisible({ timeout: 15000 });
}

/**
 * Helper: check if the page has any domain preferences loaded.
 */
async function hasPreferences(page: Page): Promise<boolean> {
  return page.getByTestId('domain-preference-row').first().isVisible({ timeout: 2000 }).catch(() => false);
}

test.describe('Spec 011: Sources Management Page', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page);
    // No API mocking — sources page uses server actions, not HTTP endpoints.
    // The __playwright cookie authenticates as dev_user_001 on the server side.
    await page.goto(`${baseUrl}/explore/sources`, { waitUntil: 'domcontentloaded' });
  });

  // ── Page Layout ──

  test('Page title -- shows "My Sources" heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'My Sources' })).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'page-title');
  });

  test('Back to Explore link -- arrow button navigates to /explore', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'My Sources' })).toBeVisible({ timeout: 15000 });
    // The back link is an <a href="/explore"> in main content (not the sidebar nav link)
    const backLink = page.locator('main a[href="/explore"]');
    await expect(backLink).toBeVisible({ timeout: 15000 });
    await backLink.click();
    await expect(page).toHaveURL(/\/explore$/, { timeout: 15000 });
    await screenshot(page, 'back-to-explore');
  });

  test('Preference count display -- header shows "N / 1,000" count', async ({ page }) => {
    await expect(page.getByText(/\d+\s*\/\s*1,000/)).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'preference-count-display');
  });

  test('Description text -- shows explanation about domain ranking', async ({ page }) => {
    await expect(page.getByText(/Manage how domains are ranked/i).or(
      page.locator('p').filter({ hasText: /domain/i }).first()
    )).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'description-text');
  });

  // ── Filter Controls ──

  test('Filter by domain text -- type in search box, verify list filters to matching domains', async ({ page }) => {
    await waitForPageLoaded(page);

    // This test requires existing domain preferences in the database.
    // If none exist, skip gracefully.
    const hasPref = await hasPreferences(page);
    if (!hasPref) {
      test.skip(true, 'BLOCKED: No domain preferences in dev database to filter');
      return;
    }

    // Get the text of the first preference row to use as filter
    const firstDomain = await page.getByTestId('domain-preference-row').first().locator('span').first().textContent();
    if (!firstDomain) {
      test.skip(true, 'BLOCKED: Could not read domain text from preference row');
      return;
    }

    const filterInput = page.getByPlaceholder('Filter domains...');
    // Use a substring of the first domain to filter
    const filterText = firstDomain.slice(0, 3);
    await filterInput.fill(filterText);

    // The first domain should still be visible since we filtered by its substring
    await expect(page.getByText(firstDomain).first()).toBeVisible();
    await screenshot(page, 'filter-by-domain-text');
  });

  test('Filter by level (All) -- click "All" pill, verify preferences shown', async ({ page }) => {
    await waitForPageLoaded(page);

    const hasPref = await hasPreferences(page);
    if (!hasPref) {
      test.skip(true, 'BLOCKED: No domain preferences in dev database');
      return;
    }

    const allPill = page.getByRole('button', { name: /^All/i }).or(
      page.locator('button').filter({ hasText: /^All/ })
    ).first();
    await allPill.click();

    // At least one preference row should be visible
    await expect(page.getByTestId('domain-preference-row').first()).toBeVisible();
    await screenshot(page, 'filter-by-level-all');
  });

  test('Filter by Preferred -- click "Preferred" pill, verify filter changes', async ({ page }) => {
    await waitForPageLoaded(page);

    const hasPref = await hasPreferences(page);
    if (!hasPref) {
      test.skip(true, 'BLOCKED: No domain preferences in dev database');
      return;
    }

    const preferredPill = page.getByRole('button', { name: /Preferred/i }).first();
    await preferredPill.click();

    // After clicking Preferred, either preferred items show or empty filter message shows
    await expect(
      page.getByTestId('domain-preference-row').first()
        .or(page.getByText('No matches for your filter.'))
    ).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'filter-by-preferred');
  });

  test('Filter by Muted -- click "Muted" pill, verify filter changes', async ({ page }) => {
    await waitForPageLoaded(page);

    const hasPref = await hasPreferences(page);
    if (!hasPref) {
      test.skip(true, 'BLOCKED: No domain preferences in dev database');
      return;
    }

    const mutedPill = page.getByRole('button', { name: /Muted/i }).first();
    await mutedPill.click();

    // After clicking Muted, either muted items show or empty filter message shows
    await expect(
      page.getByTestId('domain-preference-row').first()
        .or(page.getByText('No matches for your filter.'))
    ).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'filter-by-muted');
  });

  test('Level count badges -- each filter pill shows count', async ({ page }) => {
    await waitForPageLoaded(page);

    // Verify at least one pill shows a count in parentheses
    // The "All" pill always shows a count even if it's (0)
    await expect(page.getByRole('button', { name: /\(\d+\)/ }).first()).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'level-count-badges');
  });

  // ── Manage Preferences ──

  test('Change preference level -- use dropdown on a row, verify value changes', async ({ page }) => {
    await waitForPageLoaded(page);

    const hasPref = await hasPreferences(page);
    if (!hasPref) {
      test.skip(true, 'BLOCKED: No domain preferences in dev database to modify');
      return;
    }

    // Find the first preference row's select dropdown
    const firstRow = page.getByTestId('domain-preference-row').first();
    const dropdown = firstRow.locator('select');
    const currentValue = await dropdown.inputValue();

    // Pick a different level to switch to
    const newLevel = currentValue === 'lower' ? 'higher' : 'lower';
    await dropdown.selectOption(newLevel);

    // Verify the dropdown updated (server action runs and page reloads data)
    await expect(dropdown).toHaveValue(newLevel, { timeout: 15000 });
    await screenshot(page, 'change-preference-level');

    // Restore original value
    await dropdown.selectOption(currentValue);
  });

  test('Remove preference -- click trash icon, verify domain removed from list', async ({ page }) => {
    await waitForPageLoaded(page);

    const hasPref = await hasPreferences(page);
    if (!hasPref) {
      test.skip(true, 'BLOCKED: No domain preferences in dev database to remove');
      return;
    }

    // Get the domain text before removal
    const firstRow = page.getByTestId('domain-preference-row').first();
    const domainText = await firstRow.locator('span').first().textContent();

    // Click the remove button (trash icon) on the first row
    const removeBtn = firstRow.getByRole('button');
    await removeBtn.click();

    // Verify the domain is no longer visible (or at least the row count decreased)
    if (domainText) {
      await expect(page.getByText(domainText).first()).not.toBeVisible({ timeout: 15000 });
    }
    await screenshot(page, 'remove-preference');
  });

  // ── Empty States ──

  // BLOCKED: Cannot guarantee empty state without wiping all domain preferences from the database.
  // The sources page loads data via server actions; page.route() cannot mock them.
  test.skip('No preferences message -- when empty, shows empty state text', async () => {
    // BLOCKED: Cannot force empty state; server actions bypass Playwright mocking.
  });

  test('No filter matches -- set filter that matches nothing, shows "No matches for your filter."', async ({ page }) => {
    await waitForPageLoaded(page);

    const hasPref = await hasPreferences(page);
    if (!hasPref) {
      // If no preferences exist, the empty state text is shown instead.
      // The "No matches" message only appears when preferences exist but filter excludes all.
      test.skip(true, 'BLOCKED: No domain preferences in dev database; cannot test filter mismatch');
      return;
    }

    const filterInput = page.getByPlaceholder('Filter domains...');
    await filterInput.fill('zzzznonexistent');

    await expect(page.getByText('No matches for your filter.')).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'no-filter-matches');
  });
});
