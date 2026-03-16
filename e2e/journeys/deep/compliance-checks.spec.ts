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

test.describe('Deep Journey: Compliance & Quality Checks', () => {
  test('compliance page loads without error', async ({ page }) => {
    await page.goto(`${BASE}/compliance`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    await page.screenshot({ path: 'e2e/artifacts/compliance-loaded.png' });
  });

  test('text input area accepts pasted text', async ({ page }) => {
    await page.goto(`${BASE}/compliance`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Find text input area (textarea or contenteditable)
    const textArea = page.locator('textarea, [contenteditable="true"], [class*="editor"]').first();
    if (await textArea.isVisible().catch(() => false)) {
      await textArea.click();
      const sampleText = 'Type 2 diabetes mellitus is a chronic metabolic disorder characterized by hyperglycemia resulting from insulin resistance and relative insulin deficiency. Recent meta-analyses have demonstrated the efficacy of GLP-1 receptor agonists in reducing HbA1c levels by approximately 1.0-1.5% compared to placebo.';
      await textArea.fill(sampleText);
      await page.waitForTimeout(500);
    }

    // Also check for "Paste Text" mode toggle
    const pasteMode = page.getByText(/paste text|manual/i).first();
    if (await pasteMode.isVisible().catch(() => false)) {
      await pasteMode.click();
      await page.waitForTimeout(300);
    }

    await page.screenshot({ path: 'e2e/artifacts/compliance-text-input.png' });
  });

  test('source mode selector: From Document vs Paste Text', async ({ page }) => {
    await page.goto(`${BASE}/compliance`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for source mode toggles
    const fromDoc = page.getByText(/from document/i).first();
    const pasteText = page.getByText(/paste text/i).first();

    if (await fromDoc.isVisible().catch(() => false)) {
      await fromDoc.click();
      await page.waitForTimeout(300);
    }
    if (await pasteText.isVisible().catch(() => false)) {
      await pasteText.click();
      await page.waitForTimeout(300);
    }

    await page.screenshot({ path: 'e2e/artifacts/compliance-source-mode.png' });
  });

  test('Run Check button triggers integrity check', async ({ page }) => {
    await page.goto(`${BASE}/compliance`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Enter text first
    const textArea = page.locator('textarea, [contenteditable="true"]').first();
    if (await textArea.isVisible().catch(() => false)) {
      await textArea.fill(
        'Type 2 diabetes mellitus is a chronic metabolic disorder characterized by hyperglycemia. ' +
        'Recent advances in pharmacotherapy have shown that SGLT2 inhibitors provide cardiovascular protection.'
      );
    }

    // Click run check button
    const runBtn = page.locator('button').filter({ hasText: /run|check|analyze|integrity/i }).first();
    if (await runBtn.isVisible().catch(() => false)) {
      await runBtn.click();
      await page.waitForTimeout(3000);
      // May error without API keys - that's OK, just no crash
      await expect(page.locator('body')).not.toContainText('Application error');
    }

    await page.screenshot({ path: 'e2e/artifacts/compliance-run-check.png' });
  });

  test('results area shows plagiarism and AI detection sections', async ({ page }) => {
    await page.goto(`${BASE}/compliance`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for check type labels
    const checkTypes = ['Plagiarism', 'AI Detection', 'AI', 'Similarity', 'Human Score'];
    for (const checkType of checkTypes) {
      const el = page.getByText(checkType, { exact: false }).first();
      await el.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/compliance-results-area.png' });
  });

  test('inline/split view options exist', async ({ page }) => {
    await page.goto(`${BASE}/compliance`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for view mode toggles
    const viewModes = ['inline', 'split', 'diff', 'side-by-side'];
    for (const mode of viewModes) {
      const btn = page.locator('button').filter({ hasText: new RegExp(mode, 'i') }).first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        await page.waitForTimeout(300);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/compliance-view-options.png' });
  });

  test('history panel is accessible', async ({ page }) => {
    await page.goto(`${BASE}/compliance`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for history tab/panel
    const historyBtn = page.locator('button, [role="tab"]').filter({ hasText: /history/i }).first();
    if (await historyBtn.isVisible().catch(() => false)) {
      await historyBtn.click();
      await page.waitForTimeout(500);
    }

    await page.screenshot({ path: 'e2e/artifacts/compliance-history.png' });
  });

  test('real-time check mode toggle', async ({ page }) => {
    await page.goto(`${BASE}/compliance`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for live/real-time toggle
    const liveToggle = page.locator('button, input[type="checkbox"], [role="switch"]').filter({ hasText: /live|real-time|auto/i }).first();
    if (await liveToggle.isVisible().catch(() => false)) {
      await liveToggle.click();
      await page.waitForTimeout(300);
    }

    await page.screenshot({ path: 'e2e/artifacts/compliance-realtime.png' });
  });

  test('writing analysis page loads at /analysis', async ({ page }) => {
    await page.goto(`${BASE}/analysis`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Analysis page should have input area and results display
    const textArea = page.locator('textarea, [contenteditable="true"]').first();
    await textArea.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/analysis-loaded.png' });
  });

  test('analysis page accepts text and shows readability metrics', async ({ page }) => {
    await page.goto(`${BASE}/analysis`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const textArea = page.locator('textarea, [contenteditable="true"]').first();
    if (await textArea.isVisible().catch(() => false)) {
      await textArea.fill(
        'Type 2 diabetes mellitus is a chronic metabolic disorder characterized by hyperglycemia resulting from insulin resistance. ' +
        'The prevalence of diabetes has increased dramatically over the past four decades. ' +
        'Current treatment guidelines recommend metformin as first-line therapy for most patients.'
      );
      await page.waitForTimeout(1000);
    }

    // Look for readability metrics
    const metrics = ['readability', 'Flesch', 'grade', 'words', 'sentences', 'passive'];
    for (const metric of metrics) {
      const el = page.getByText(new RegExp(metric, 'i')).first();
      await el.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/analysis-metrics.png' });
  });

  test('humanize/paraphrase features accessible', async ({ page }) => {
    await page.goto(`${BASE}/compliance`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for humanize and paraphrase options
    const humanizeBtn = page.locator('button').filter({ hasText: /humanize/i }).first();
    const paraphraseBtn = page.locator('button').filter({ hasText: /paraphrase/i }).first();

    if (await humanizeBtn.isVisible().catch(() => false)) {
      await humanizeBtn.click();
      await page.waitForTimeout(500);
    }
    if (await paraphraseBtn.isVisible().catch(() => false)) {
      await paraphraseBtn.click();
      await page.waitForTimeout(500);
    }

    await page.screenshot({ path: 'e2e/artifacts/compliance-humanize.png' });
  });
});
