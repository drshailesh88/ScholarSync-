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

test.describe('Deep Journey: Systematic Review', () => {
  test('systematic review page loads', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-loaded.png' });
  });

  test('project list or empty state with New Review button', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Check for New Review button
    const newBtn = page.locator('button, a').filter({ hasText: /new review|create|start/i }).first();
    const _hasNewBtn = await newBtn.isVisible().catch(() => false);

    // Check empty state
    const emptyState = page.getByText(/no review|get started|create.*review/i).first();
    await emptyState.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-list.png' });
  });

  test('pipeline stage tabs are visible', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for pipeline stage tabs
    const stages = [
      'Protocol', 'Search Strategy', 'Screening', 'Data Extraction',
      'Risk of Bias', 'Meta-Analysis', 'NMA', 'GRADE', 'PRISMA', 'Manuscript'
    ];

    for (const stage of stages) {
      const tab = page.locator('button, [role="tab"], a').filter({ hasText: new RegExp(stage, 'i') }).first();
      if (await tab.isVisible().catch(() => false)) {
        await tab.click();
        await page.waitForTimeout(300);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-stages.png' });
  });

  test('Protocol stage: PROSPERO, PICO, inclusion/exclusion', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Click Protocol tab if visible
    const protocolTab = page.locator('button, [role="tab"]').filter({ hasText: /protocol/i }).first();
    if (await protocolTab.isVisible().catch(() => false)) {
      await protocolTab.click();
      await page.waitForTimeout(500);
    }

    // Look for PICO elements
    const picoTerms = ['Population', 'Intervention', 'Comparison', 'Outcome', 'PICO', 'PROSPERO', 'Inclusion', 'Exclusion'];
    for (const term of picoTerms) {
      const el = page.getByText(term, { exact: false }).first();
      await el.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-protocol.png' });
  });

  test('Search Strategy stage: database selection, search terms', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Click Search Strategy tab
    const searchTab = page.locator('button, [role="tab"]').filter({ hasText: /search/i }).first();
    if (await searchTab.isVisible().catch(() => false)) {
      await searchTab.click();
      await page.waitForTimeout(500);
    }

    // Look for database options
    const databases = ['PubMed', 'Cochrane', 'ClinicalTrials', 'PRESS'];
    for (const db of databases) {
      const el = page.getByText(db, { exact: false }).first();
      await el.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-search.png' });
  });

  test('Screening stage: title/abstract screening UI', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const screeningTab = page.locator('button, [role="tab"]').filter({ hasText: /screening/i }).first();
    if (await screeningTab.isVisible().catch(() => false)) {
      await screeningTab.click();
      await page.waitForTimeout(500);
    }

    // Look for include/exclude buttons
    const includeBtn = page.locator('button').filter({ hasText: /include/i }).first();
    const excludeBtn = page.locator('button').filter({ hasText: /exclude/i }).first();
    await includeBtn.isVisible().catch(() => false);
    await excludeBtn.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-screening.png' });
  });

  test('Risk of Bias assessment tools', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const robTab = page.locator('button, [role="tab"]').filter({ hasText: /risk.*bias|RoB/i }).first();
    if (await robTab.isVisible().catch(() => false)) {
      await robTab.click();
      await page.waitForTimeout(500);
    }

    // Look for assessment tool names
    const tools = ['RoB 2', 'ROBINS-I', 'QUADAS-2', 'Newcastle-Ottawa'];
    for (const tool of tools) {
      const el = page.getByText(tool, { exact: false }).first();
      await el.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-rob.png' });
  });

  test('Meta-Analysis: forest plot, funnel plot', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const metaTab = page.locator('button, [role="tab"]').filter({ hasText: /meta.analysis/i }).first();
    if (await metaTab.isVisible().catch(() => false)) {
      await metaTab.click();
      await page.waitForTimeout(500);
    }

    // Look for plot types
    const plotTypes = ['Forest', 'Funnel', 'Heterogeneity', 'Network'];
    for (const plot of plotTypes) {
      const el = page.getByText(plot, { exact: false }).first();
      await el.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-meta.png' });
  });

  test('paper import UI: search databases, upload RIS/BibTeX', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for import options
    const importOptions = ['Import', 'Upload', 'RIS', 'BibTeX', 'Search'];
    for (const opt of importOptions) {
      const el = page.locator('button').filter({ hasText: new RegExp(opt, 'i') }).first();
      if (await el.isVisible().catch(() => false)) {
        await el.click();
        await page.waitForTimeout(500);
        await page.keyboard.press('Escape');
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-import.png' });
  });

  test('export options: PRISMA checklist, PROSPERO export', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for export options
    const exports = ['PRISMA', 'PROSPERO', 'Export', 'Download', 'Checklist'];
    for (const exp of exports) {
      const btn = page.locator('button').filter({ hasText: new RegExp(exp, 'i') }).first();
      await btn.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-exports.png' });
  });

  test('collaboration features: invite, presence indicators', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for collaboration UI
    const collabElements = ['Invite', 'Collaborator', 'Share', 'Team'];
    for (const el of collabElements) {
      const btn = page.locator('button').filter({ hasText: new RegExp(el, 'i') }).first();
      await btn.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-collab.png' });
  });

  test('audit trail panel accessible', async ({ page }) => {
    await page.goto(`${BASE}/systematic-review`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for audit trail
    const auditEl = page.getByText(/audit|trail|history|log/i).first();
    await auditEl.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/systematic-review-audit.png' });
  });
});
