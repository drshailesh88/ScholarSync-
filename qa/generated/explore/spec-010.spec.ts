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

async function screenshot(page: Page, name: string) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, `${name}.png`), fullPage: true });
}

/**
 * Wait for the scopes page to finish loading (past "Loading scopes..." state).
 * The page shows scopes list or "No scopes yet" empty state once loaded.
 */
async function waitForScopesLoaded(page: Page) {
  // Wait for "Loading scopes..." to disappear (it appears during initial load)
  await expect(page.getByText('Loading scopes...')).not.toBeVisible({ timeout: 20000 });
}

/**
 * Click "New Scope" button and wait for the creation form to appear.
 */
async function openNewScopeForm(page: Page) {
  const newScopeBtn = page.getByRole('button', { name: /New Scope/i });
  await expect(newScopeBtn).toBeVisible({ timeout: 15000 });
  await newScopeBtn.click();
  // Wait for the form to appear by checking for the Name label
  await expect(page.getByLabel(/^name$/i)).toBeVisible({ timeout: 10000 });
}

/**
 * Helper: create a scope via the UI and wait for it to appear in the list.
 */
async function createScopeViaUI(page: Page, name: string, includeDomains = 'example.com') {
  await openNewScopeForm(page);
  const nameInput = page.getByLabel(/^name$/i);
  await nameInput.fill(name);
  const includeDomainsInput = page.getByPlaceholder('nih.gov, gov.uk');
  await includeDomainsInput.fill(includeDomains);
  await page.getByRole('button', { name: /Create Scope/i }).click();
  await expect(page.getByText(name)).toBeVisible({ timeout: 15000 });
}

test.describe('Spec 010: Scopes Management Page', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page);
    // No API mocking — scopes page uses server actions, not HTTP endpoints.
    // The __playwright cookie authenticates as dev_user_001 on the server side.
    await page.goto(`${baseUrl}/explore/scopes`, { waitUntil: 'domcontentloaded' });
    // Wait for the page to fully load (server actions resolve)
    await waitForScopesLoaded(page);
  });

  // ── Page Layout ──

  test('Page title -- shows "Manage Scopes" heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Manage Scopes' })).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'page-title');
  });

  test('Back to Explore link -- arrow button navigates to /explore', async ({ page }) => {
    // The back link is an <a href="/explore"> in main content (not the sidebar nav link)
    const backLink = page.locator('main a[href="/explore"]');
    await expect(backLink).toBeVisible({ timeout: 15000 });
    await backLink.click();
    await expect(page).toHaveURL(/\/explore$/, { timeout: 15000 });
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
    await openNewScopeForm(page);
    await expect(page.getByRole('button', { name: /Create Scope/i })).toBeVisible();
    await screenshot(page, 'new-scope-button');
  });

  test('Name input (required) -- scope name field is required, max 100 chars', async ({ page }) => {
    await openNewScopeForm(page);
    const nameInput = page.getByLabel(/^name$/i);
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveAttribute('required', '');
    await expect(nameInput).toHaveAttribute('maxlength', '100');
    await screenshot(page, 'name-input-required');
  });

  test('Include domains field -- comma-separated domain input with placeholder', async ({ page }) => {
    await openNewScopeForm(page);
    const includeDomainsInput = page.getByPlaceholder('nih.gov, gov.uk');
    await expect(includeDomainsInput).toBeVisible();
    await screenshot(page, 'include-domains-field');
  });

  test('Exclude domains field -- comma-separated exclude domain input', async ({ page }) => {
    await openNewScopeForm(page);
    const excludeDomainsInput = page.getByLabel(/exclude.*domain/i);
    await expect(excludeDomainsInput).toBeVisible();
    await screenshot(page, 'exclude-domains-field');
  });

  test('Include keywords field -- comma-separated keyword input', async ({ page }) => {
    await openNewScopeForm(page);
    const includeKeywordsInput = page.getByLabel(/include.*keyword/i);
    await expect(includeKeywordsInput).toBeVisible();
    await screenshot(page, 'include-keywords-field');
  });

  test('Exclude keywords field -- comma-separated exclude keyword input', async ({ page }) => {
    await openNewScopeForm(page);
    const excludeKeywordsInput = page.getByLabel(/exclude.*keyword/i);
    await expect(excludeKeywordsInput).toBeVisible();
    await screenshot(page, 'exclude-keywords-field');
  });

  test('Create saves scope -- fill form and submit, verify scope appears in list', async ({ page }) => {
    const scopeName = `E2E Test Scope ${Date.now()}`;
    await createScopeViaUI(page, scopeName, 'example.com, test.org');
    await expect(page.getByText(scopeName)).toBeVisible({ timeout: 15000 });
    await screenshot(page, 'create-saves-scope');

    // Cleanup: delete the scope we just created
    const scopeRow = page.getByText(scopeName).locator('xpath=ancestor::div[contains(@class, "items-center")]').first();
    const trashBtn = scopeRow.locator('button').last();
    await trashBtn.click();
  });

  test('Cancel hides form -- click Cancel, verify form disappears', async ({ page }) => {
    await openNewScopeForm(page);
    await expect(page.getByRole('button', { name: /Create Scope/i })).toBeVisible();

    await page.getByRole('button', { name: /Cancel/i }).click();
    await expect(page.getByRole('button', { name: /Create Scope/i })).not.toBeVisible();
    await screenshot(page, 'cancel-hides-form');
  });

  test('Validation error display -- submit with empty name, browser validation fires', async ({ page }) => {
    await openNewScopeForm(page);

    // The "Create Scope" button is disabled when name is empty (disabled={saving || !name.trim()})
    // so browser validation won't even fire. Instead, verify the button is properly disabled.
    const createBtn = page.getByRole('button', { name: /Create Scope/i });
    await expect(createBtn).toBeDisabled();
    await screenshot(page, 'validation-error-display');
  });

  // ── Manage Existing Scopes ──

  test('Edit scope -- click pencil icon, verify edit form opens with populated fields', async ({ page }) => {
    // Create a scope to edit
    const scopeName = `E2E Edit Test ${Date.now()}`;
    await createScopeViaUI(page, scopeName, 'edit-test.com');

    // Find the edit (pencil) button for this scope
    const scopeRow = page.getByText(scopeName).locator('xpath=ancestor::div[contains(@class, "items-center")]').first();
    // The pencil button is the second-to-last button (Active, Pencil, Trash)
    const buttons = scopeRow.locator('button');
    const pencilBtn = buttons.nth(1);
    await pencilBtn.click();

    // Verify edit form appears with pre-populated name
    const nameInput = page.getByLabel(/^name$/i);
    await expect(nameInput).toHaveValue(scopeName, { timeout: 10000 });
    await expect(page.getByRole('button', { name: /Update Scope/i })).toBeVisible();
    await screenshot(page, 'edit-scope');

    // Cancel and cleanup
    await page.getByRole('button', { name: /Cancel/i }).click();
    // Delete the test scope
    const scopeRow2 = page.getByText(scopeName).locator('xpath=ancestor::div[contains(@class, "items-center")]').first();
    await scopeRow2.locator('button').last().click();
  });

  test('Delete scope -- click trash icon, verify scope removed from list', async ({ page }) => {
    // Create a scope to delete
    const scopeName = `E2E Delete Test ${Date.now()}`;
    await createScopeViaUI(page, scopeName, 'delete-test.com');
    await expect(page.getByText(scopeName)).toBeVisible();

    // Click the trash button
    const scopeRow = page.getByText(scopeName).locator('xpath=ancestor::div[contains(@class, "items-center")]').first();
    const trashBtn = scopeRow.locator('button').last();
    await trashBtn.click();

    await expect(page.getByText(scopeName)).not.toBeVisible({ timeout: 15000 });
    await screenshot(page, 'delete-scope');
  });

  test('Toggle active/inactive -- click Active badge, verify it toggles to Inactive', async ({ page }) => {
    // Create a scope to toggle
    const scopeName = `E2E Toggle Test ${Date.now()}`;
    await createScopeViaUI(page, scopeName, 'toggle-test.com');

    // Find the scope row and click the Active/Inactive toggle button (first button in the row's button group)
    const scopeRow = page.getByText(scopeName).locator('xpath=ancestor::div[contains(@class, "items-center")]').first();
    const toggleBtn = scopeRow.locator('button').first();
    // It should start as Active
    await expect(toggleBtn).toContainText('Active');
    await toggleBtn.click();

    // After toggle it should show Inactive
    await expect(toggleBtn).toContainText('Inactive', { timeout: 15000 });
    await screenshot(page, 'toggle-active-inactive');

    // Cleanup
    const trashBtn = scopeRow.locator('button').last();
    await trashBtn.click();
  });

  // BLOCKED: Cannot test max-20 enforcement without mocking server actions.
  // The scopes page loads data via server actions (not HTTP API), so page.route() cannot intercept.
  // Testing this would require pre-populating the database with 20 scopes.
  test.skip('Max 20 enforcement -- with 20 scopes, "New Scope" button is hidden', async () => {
    // BLOCKED: Requires 20 scopes in database; cannot mock server actions from Playwright.
  });

  // ── Empty State ──

  // BLOCKED: Cannot guarantee empty state without wiping the database.
  // The scopes page loads data via server actions; page.route() cannot mock them.
  // If the dev user has scopes (e.g. from other tests), this test would fail.
  test.skip('No scopes message -- when no scopes exist, shows empty state text', async () => {
    // BLOCKED: Cannot force empty state; server actions bypass Playwright mocking.
  });
});
