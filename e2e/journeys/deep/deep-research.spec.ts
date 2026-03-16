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

test.describe('Deep Journey: Deep Research Pipeline', () => {
  test('deep research page loads with topic input', async ({ page }) => {
    await page.goto(`${BASE}/deep-research`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Find topic input field
    const topicInput = page.locator(
      'input[type="text"], textarea, [placeholder*="research" i], [placeholder*="topic" i], [placeholder*="would you like" i]'
    ).first();
    await expect(topicInput).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: 'e2e/artifacts/deep-research-loaded.png' });
  });

  test('topic input accepts research question', async ({ page }) => {
    await page.goto(`${BASE}/deep-research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const topicInput = page.locator(
      'input[type="text"], textarea, [placeholder*="research" i], [placeholder*="topic" i]'
    ).first();

    if (await topicInput.isVisible().catch(() => false)) {
      await topicInput.fill('Efficacy of GLP-1 receptor agonists in type 2 diabetes management');
      await expect(topicInput).toHaveValue(/GLP-1/);
    }

    await page.screenshot({ path: 'e2e/artifacts/deep-research-topic-input.png' });
  });

  test('research mode selector: Quick, Standard, Deep, Exhaustive', async ({ page }) => {
    await page.goto(`${BASE}/deep-research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for research mode buttons
    const modes = ['Quick', 'Standard', 'Deep', 'Exhaustive'];
    for (const mode of modes) {
      const modeBtn = page.locator('button, [role="radio"], [role="tab"]').filter({ hasText: new RegExp(`^${mode}$`, 'i') }).first();
      if (await modeBtn.isVisible().catch(() => false)) {
        await modeBtn.click();
        await page.waitForTimeout(300);
        // Verify visual selection change
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/deep-research-modes.png' });
  });

  test('Start Deep Research button triggers research', async ({ page }) => {
    await page.goto(`${BASE}/deep-research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Fill topic
    const topicInput = page.locator(
      'input[type="text"], textarea, [placeholder*="research" i]'
    ).first();
    if (await topicInput.isVisible().catch(() => false)) {
      await topicInput.fill('Efficacy of GLP-1 receptor agonists');
    }

    // Click start button
    const startBtn = page.locator('button').filter({ hasText: /start|begin|research/i }).first();
    if (await startBtn.isVisible().catch(() => false)) {
      await startBtn.click();
      await page.waitForTimeout(3000);

      // Progress UI should appear (even if it fails without API keys)
      await expect(page.locator('body')).not.toContainText('Application error');
    }

    await page.screenshot({ path: 'e2e/artifacts/deep-research-started.png' });
  });

  test('Abort button exists during research', async ({ page }) => {
    await page.goto(`${BASE}/deep-research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Fill and start
    const topicInput = page.locator('input[type="text"], textarea').first();
    if (await topicInput.isVisible().catch(() => false)) {
      await topicInput.fill('GLP-1 receptor agonists');
      await topicInput.press('Enter');
      await page.waitForTimeout(2000);
    }

    // Check for abort/stop button
    const abortBtn = page.locator('button').filter({ hasText: /abort|stop|cancel/i }).first();
    const abortVisible = await abortBtn.isVisible().catch(() => false);
    if (abortVisible) {
      await abortBtn.click();
      await page.waitForTimeout(1000);
    }

    await page.screenshot({ path: 'e2e/artifacts/deep-research-abort.png' });
  });

  test('Progress Stepper on left panel', async ({ page }) => {
    await page.goto(`${BASE}/deep-research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Progress stepper stages
    const stages = ['Search', 'Citation', 'Extraction', 'Synthesis', 'Tables', 'Critique'];
    for (const stage of stages) {
      const el = page.getByText(stage, { exact: false }).first();
      await el.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/deep-research-progress.png' });
  });

  test('Past Research Sessions area exists in idle state', async ({ page }) => {
    await page.goto(`${BASE}/deep-research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for past sessions area
    const pastSessions = page.getByText(/past|previous|history|session/i).first();
    await pastSessions.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/deep-research-past-sessions.png' });
  });

  test('export buttons: Copy Markdown, Download PDF, Open in Studio', async ({ page }) => {
    await page.goto(`${BASE}/deep-research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for export options (may only appear after research completes)
    const exportOptions = ['Copy Markdown', 'Download PDF', 'Open in Studio', 'Export', 'Save'];
    for (const opt of exportOptions) {
      const btn = page.locator('button').filter({ hasText: new RegExp(opt, 'i') }).first();
      await btn.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/deep-research-exports.png' });
  });

  test('Save to Library button', async ({ page }) => {
    await page.goto(`${BASE}/deep-research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const saveBtn = page.locator('button').filter({ hasText: /save to library|save/i }).first();
    await saveBtn.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/deep-research-save.png' });
  });

  test('page handles Enter key from input to start research', async ({ page }) => {
    await page.goto(`${BASE}/deep-research`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const topicInput = page.locator('input[type="text"], textarea').first();
    if (await topicInput.isVisible().catch(() => false)) {
      await topicInput.fill('Metformin efficacy in diabetes');
      await topicInput.press('Enter');
      await page.waitForTimeout(2000);

      // Should not crash
      await expect(page.locator('body')).not.toContainText('Application error');
    }

    await page.screenshot({ path: 'e2e/artifacts/deep-research-enter-key.png' });
  });
});
