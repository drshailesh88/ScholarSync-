import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = path.join(process.cwd(), 'qa/artifacts/explore/spec-010');

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:3000';

async function setupAuth(page: Page) {
  const url = new URL(baseUrl);
  await page.context().addCookies([
    { name: '__playwright', value: 'true', domain: url.hostname, path: '/' },
    { name: '__playwright_user', value: 'dev_user_001', domain: url.hostname, path: '/' },
  ]);
}

async function mockScopesApi(page: Page, scopes: Record<string, unknown>[] = []) {
  await page.route('**/api/explore/scopes**', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(scopes.length > 0 ? scopes : [
          { id: 1, name: 'Medical Sources', includeDomains: ['nih.gov', 'who.int'], excludeDomains: [], includeKeywords: ['clinical'], excludeKeywords: [], isActive: true },
          { id: 2, name: 'News Only', includeDomains: ['reuters.com', 'bbc.co.uk'], excludeDomains: [], includeKeywords: [], excludeKeywords: [], isActive: false },
        ]),
      });
    } else if (route.request().method() === 'POST') {
      const body = JSON.parse(route.request().postData() ?? '{}');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: Date.now(), ...body, isActive: true }),
      });
    } else if (route.request().method() === 'DELETE') {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
    } else if (route.request().method() === 'PATCH' || route.request().method() === 'PUT') {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
    }
  });
}

async function screenshot(page: Page, name: string) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, `${name}.png`), fullPage: true });
}

test.describe('Spec 010: Scopes Management Page', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page);
    await mockScopesApi(page);
    await page.goto(`${baseUrl}/explore/scopes`);
  });

  // ── Page Layout ──

  test('Page title -- shows "Manage Scopes" heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Manage Scopes' })).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'page-title');
  });

  test('Back to Explore link -- arrow button navigates to /explore', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /explore/i }).filter({ has: page.locator('svg') });
    await expect(backLink).toBeVisible({ timeout: 15000 });
    await backLink.click();
    await expect(page).toHaveURL(/\/explore$/);
    await screenshot(page, 'back-to-explore');
  });

  test('Scope count display -- header shows "N / 20" count', async ({ page }) => {
    await expect(page.getByText(/\d+\s*\/\s*20/)).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'scope-count-display');
  });

  test('Description text -- shows scopes explanation', async ({ page }) => {
    await expect(page.getByText(/Scopes let you narrow search results/)).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'description-text');
  });

  // ── Create Scope ──

  test('New Scope button -- click "New Scope", verify form appears', async ({ page }) => {
    const newScopeButton = page.getByRole('button', { name: /New Scope/i });
    await expect(newScopeButton).toBeVisible({ timeout: 15000 });
    await newScopeButton.click();
    await expect(page.getByRole('button', { name: /Create Scope/i })).toBeVisible();
    await screenshot(page, 'new-scope-button');
  });

  test('Name input (required) -- scope name field is required, max 100 chars', async ({ page }) => {
    await page.getByRole('button', { name: /New Scope/i }).click();
    const nameInput = page.getByLabel(/name/i).first();
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveAttribute('required', '');
    await expect(nameInput).toHaveAttribute('maxlength', '100');
    await screenshot(page, 'name-input-required');
  });

  test('Include domains field -- comma-separated domain input with placeholder', async ({ page }) => {
    await page.getByRole('button', { name: /New Scope/i }).click();
    const includeDomainsInput = page.getByPlaceholder('nih.gov, gov.uk');
    await expect(includeDomainsInput).toBeVisible();
    await screenshot(page, 'include-domains-field');
  });

  test('Exclude domains field -- comma-separated exclude domain input', async ({ page }) => {
    await page.getByRole('button', { name: /New Scope/i }).click();
    const excludeDomainsInput = page.getByLabel(/exclude.*domain/i);
    await expect(excludeDomainsInput).toBeVisible();
    await screenshot(page, 'exclude-domains-field');
  });

  test('Include keywords field -- comma-separated keyword input', async ({ page }) => {
    await page.getByRole('button', { name: /New Scope/i }).click();
    const includeKeywordsInput = page.getByLabel(/include.*keyword/i);
    await expect(includeKeywordsInput).toBeVisible();
    await screenshot(page, 'include-keywords-field');
  });

  test('Exclude keywords field -- comma-separated exclude keyword input', async ({ page }) => {
    await page.getByRole('button', { name: /New Scope/i }).click();
    const excludeKeywordsInput = page.getByLabel(/exclude.*keyword/i);
    await expect(excludeKeywordsInput).toBeVisible();
    await screenshot(page, 'exclude-keywords-field');
  });

  test('Create saves scope -- fill form and submit, verify scope appears in list', async ({ page }) => {
    await page.getByRole('button', { name: /New Scope/i }).click();

    const nameInput = page.getByLabel(/name/i).first();
    await nameInput.fill('Test Scope');

    const includeDomainsInput = page.getByPlaceholder('nih.gov, gov.uk');
    await includeDomainsInput.fill('example.com, test.org');

    await page.getByRole('button', { name: /Create Scope/i }).click();

    await expect(page.getByText('Test Scope')).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'create-saves-scope');
  });

  test('Cancel hides form -- click Cancel, verify form disappears', async ({ page }) => {
    await page.getByRole('button', { name: /New Scope/i }).click();
    await expect(page.getByRole('button', { name: /Create Scope/i })).toBeVisible();

    await page.getByRole('button', { name: /Cancel/i }).click();
    await expect(page.getByRole('button', { name: /Create Scope/i })).not.toBeVisible();
    await screenshot(page, 'cancel-hides-form');
  });

  test('Validation error display -- submit with invalid data, verify error message shows', async ({ page }) => {
    await page.getByRole('button', { name: /New Scope/i }).click();

    // Submit without filling required name field
    await page.getByRole('button', { name: /Create Scope/i }).click();

    // Expect a validation error or the browser's native required-field message
    const nameInput = page.getByLabel(/name/i).first();
    const validationMessage = await nameInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).toBeTruthy();
    await screenshot(page, 'validation-error-display');
  });

  // ── Manage Existing Scopes ──

  test('Edit scope -- click pencil icon, verify edit form opens with populated fields', async ({ page }) => {
    await expect(page.getByText('Medical Sources')).toBeVisible({ timeout: 15000 });

    const editButton = page.getByRole('button', { name: /edit/i }).first();
    await editButton.click();

    const nameInput = page.getByLabel(/name/i).first();
    await expect(nameInput).toHaveValue('Medical Sources');
    await expect(page.getByRole('button', { name: /Update Scope/i })).toBeVisible();
    await screenshot(page, 'edit-scope');
  });

  test('Delete scope -- click trash icon, verify scope removed from list', async ({ page }) => {
    await expect(page.getByText('News Only')).toBeVisible({ timeout: 15000 });

    const deleteButtons = page.getByRole('button', { name: /delete/i });
    // Click the delete button for the second scope (News Only)
    await deleteButtons.last().click();

    await expect(page.getByText('News Only')).not.toBeVisible({ timeout: 15000 });
    await screenshot(page, 'delete-scope');
  });

  test('Toggle active/inactive -- click Active badge, verify it toggles to Inactive', async ({ page }) => {
    await expect(page.getByText('Medical Sources')).toBeVisible({ timeout: 15000 });

    // Find and click the Active badge for Medical Sources
    const activeBadge = page.getByText('Active').first();
    await activeBadge.click();

    await expect(page.getByText('Inactive').first()).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'toggle-active-inactive');
  });

  test('Max 20 enforcement -- with 20 scopes, "New Scope" button is hidden', async ({ page }) => {
    // Re-mock with 20 scopes
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    const twentyScopes = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Scope ${i + 1}`,
      includeDomains: [`domain${i}.com`],
      excludeDomains: [],
      includeKeywords: [],
      excludeKeywords: [],
      isActive: true,
    }));
    await mockScopesApi(page, twentyScopes);
    await page.goto(`${baseUrl}/explore/scopes`);

    await expect(page.getByText('20 / 20')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: /New Scope/i })).not.toBeVisible();
    await screenshot(page, 'max-20-enforcement');
  });

  // ── Empty State ──

  test('No scopes message -- when no scopes exist, shows empty state text', async ({ page }) => {
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockScopesApi(page, []);
    await page.goto(`${baseUrl}/explore/scopes`);

    await expect(
      page.getByText('No scopes yet. Create one to narrow your searches.')
    ).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'no-scopes-message');
  });
});
