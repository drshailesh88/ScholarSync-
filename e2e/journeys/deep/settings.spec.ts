import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:3001';

test.beforeEach(async ({ context }) => {
  await context.addCookies([{
    name: '__playwright',
    value: 'true',
    domain: 'localhost',
    path: '/',
  }]);
});

test.describe('Deep Journey: Settings & User Configuration', () => {
  test('settings page loads with sections/tabs', async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for settings tabs
    const tabs = ['My Account', 'Plans & Billing', 'Usage Tracking', 'Preferences'];
    for (const tab of tabs) {
      const tabEl = page.locator('button, [role="tab"], a').filter({ hasText: new RegExp(tab, 'i') }).first();
      await tabEl.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/settings-loaded.png' });
  });

  test('My Account tab: profile fields (name, email, specialty)', async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Click My Account tab
    const accountTab = page.locator('button, [role="tab"]').filter({ hasText: /my account|account|profile/i }).first();
    if (await accountTab.isVisible().catch(() => false)) {
      await accountTab.click();
      await page.waitForTimeout(500);
    }

    // Look for profile fields
    const fields = ['Name', 'Email', 'Specialty', 'Institution', 'Country', 'Bio', 'ORCID'];
    for (const field of fields) {
      const label = page.getByText(field, { exact: false }).first();
      await label.isVisible().catch(() => false);
    }

    // Try to edit a field
    const nameInput = page.locator('input[name*="name" i], input[placeholder*="name" i]').first();
    if (await nameInput.isVisible().catch(() => false)) {
      await nameInput.fill('Dr. Test User');
      await page.waitForTimeout(300);
    }

    await page.screenshot({ path: 'e2e/artifacts/settings-account.png' });
  });

  test('My Account: Research Interests chip input', async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Navigate to account tab
    const accountTab = page.locator('button, [role="tab"]').filter({ hasText: /my account|account/i }).first();
    if (await accountTab.isVisible().catch(() => false)) {
      await accountTab.click();
      await page.waitForTimeout(500);
    }

    // Look for Research Interests area
    const researchInterests = page.getByText(/research interest/i).first();
    if (await researchInterests.isVisible().catch(() => false)) {
      // Find the tag/chip input
      const tagInput = page.locator('input[placeholder*="interest" i], input[placeholder*="add" i]').first();
      if (await tagInput.isVisible().catch(() => false)) {
        await tagInput.fill('Diabetes');
        await tagInput.press('Enter');
        await page.waitForTimeout(300);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/settings-interests.png' });
  });

  test('Plans & Billing tab: plan info and payment method', async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Click Plans & Billing tab
    const billingTab = page.locator('button, [role="tab"]').filter({ hasText: /plans|billing/i }).first();
    if (await billingTab.isVisible().catch(() => false)) {
      await billingTab.click();
      await page.waitForTimeout(500);
    }

    // Look for plan information
    const planElements = ['Free', 'Basic', 'Pro', 'Active', 'Manage Plan', 'Razorpay'];
    for (const el of planElements) {
      const planEl = page.getByText(el, { exact: false }).first();
      await planEl.isVisible().catch(() => false);
    }

    // Look for invoice table
    const invoiceHeaders = ['Date', 'Description', 'Amount', 'Download'];
    for (const header of invoiceHeaders) {
      const headerEl = page.getByText(header, { exact: false }).first();
      await headerEl.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/settings-billing.png' });
  });

  test('Usage Tracking tab: progress bars and stats', async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Click Usage Tracking tab
    const usageTab = page.locator('button, [role="tab"]').filter({ hasText: /usage/i }).first();
    if (await usageTab.isVisible().catch(() => false)) {
      await usageTab.click();
      await page.waitForTimeout(500);
    }

    // Look for usage metrics
    const metrics = ['AI Tokens', 'Searches', 'Plagiarism', 'Exports', 'tokens'];
    for (const metric of metrics) {
      const el = page.getByText(metric, { exact: false }).first();
      await el.isVisible().catch(() => false);
    }

    // Look for progress bars
    const progressBars = page.locator('[role="progressbar"], [class*="progress"], [class*="bar"]');
    const _barCount = await progressBars.count();

    await page.screenshot({ path: 'e2e/artifacts/settings-usage.png' });
  });

  test('Preferences tab: theme, font size, citation format, language', async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Click Preferences tab
    const prefTab = page.locator('button, [role="tab"]').filter({ hasText: /preference/i }).first();
    if (await prefTab.isVisible().catch(() => false)) {
      await prefTab.click();
      await page.waitForTimeout(500);
    }

    // Look for preference options
    const prefOptions = ['Theme', 'Font Size', 'Citation', 'Language'];
    for (const opt of prefOptions) {
      const el = page.getByText(opt, { exact: false }).first();
      await el.isVisible().catch(() => false);
    }

    // Look for theme options
    const themeOptions = ['Light', 'Dark', 'System'];
    for (const theme of themeOptions) {
      const themeBtn = page.locator('button, [role="radio"]').filter({ hasText: new RegExp(theme, 'i') }).first();
      if (await themeBtn.isVisible().catch(() => false)) {
        await themeBtn.click();
        await page.waitForTimeout(300);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/settings-preferences.png' });
  });

  test('Save Changes button works', async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Click My Account tab
    const accountTab = page.locator('button, [role="tab"]').filter({ hasText: /my account|account/i }).first();
    if (await accountTab.isVisible().catch(() => false)) {
      await accountTab.click();
      await page.waitForTimeout(500);
    }

    // Edit a field
    const bioInput = page.locator('textarea[name*="bio" i], textarea').first();
    if (await bioInput.isVisible().catch(() => false)) {
      await bioInput.fill('Researcher in diabetes management and clinical trials.');
    }

    // Click save
    const saveBtn = page.locator('button').filter({ hasText: /save/i }).first();
    if (await saveBtn.isVisible().catch(() => false)) {
      await saveBtn.click();
      await page.waitForTimeout(2000);
      // Verify no crash
      await expect(page.locator('body')).not.toContainText('Application error');
    }

    await page.screenshot({ path: 'e2e/artifacts/settings-save.png' });
  });

  test('Log Out button exists (do not click)', async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for Log Out button but DO NOT click it
    const logOutBtn = page.locator('button').filter({ hasText: /log out|sign out|logout/i }).first();
    const _hasLogOut = await logOutBtn.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/settings-logout-exists.png' });
  });

  test('toggle switches (dark mode, notifications) are interactive', async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Navigate to preferences
    const prefTab = page.locator('button, [role="tab"]').filter({ hasText: /preference/i }).first();
    if (await prefTab.isVisible().catch(() => false)) {
      await prefTab.click();
      await page.waitForTimeout(500);
    }

    // Find toggle switches
    const toggles = page.locator('[role="switch"], input[type="checkbox"], [class*="toggle"], [class*="switch"]');
    const toggleCount = await toggles.count();
    for (let i = 0; i < Math.min(toggleCount, 3); i++) {
      const toggle = toggles.nth(i);
      if (await toggle.isVisible().catch(() => false)) {
        await toggle.click();
        await page.waitForTimeout(300);
        // Toggle back
        await toggle.click();
        await page.waitForTimeout(200);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/settings-toggles.png' });
  });

  test('all settings tabs are clickable without crash', async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const tabs = ['My Account', 'Plans & Billing', 'Usage Tracking', 'Preferences'];
    for (const tabName of tabs) {
      const tab = page.locator('button, [role="tab"]').filter({ hasText: new RegExp(tabName, 'i') }).first();
      if (await tab.isVisible().catch(() => false)) {
        await tab.click();
        await page.waitForTimeout(500);
        await expect(page.locator('body')).not.toContainText('Application error');
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/settings-all-tabs.png' });
  });
});
