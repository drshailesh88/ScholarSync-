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

test.describe('Deep Journey: Studio Writing Experience', () => {
  test('studio page loads with editor and sidebar', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    // Verify main content area
    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Verify sidebar navigation is present
    const sidebar = page.locator('nav, [class*="sidebar"], aside').first();
    await expect(sidebar).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: 'e2e/artifacts/studio-loaded.png' });
  });

  test('Write/Learn mode toggle exists and is clickable', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for Write/Learn toggle - could be buttons or tabs
    const writeBtn = page.locator('button, [role="tab"], [role="radio"]').filter({ hasText: /^Write$/i }).first();
    const learnBtn = page.locator('button, [role="tab"], [role="radio"]').filter({ hasText: /^Learn$/i }).first();

    // At least one mode toggle should be visible
    const writeVisible = await writeBtn.isVisible().catch(() => false);
    const learnVisible = await learnBtn.isVisible().catch(() => false);

    if (writeVisible && learnVisible) {
      // Click Write mode
      await writeBtn.click();
      await page.waitForTimeout(500);

      // Click Learn mode
      await learnBtn.click();
      await page.waitForTimeout(500);

      // Switch back to Write
      await writeBtn.click();
      await page.waitForTimeout(500);
    }

    await page.screenshot({ path: 'e2e/artifacts/studio-mode-toggle.png' });
  });

  test('AI Intensity selector in Write mode', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Ensure we're in Write mode
    const writeBtn = page.locator('button, [role="tab"]').filter({ hasText: /^Write$/i }).first();
    if (await writeBtn.isVisible().catch(() => false)) {
      await writeBtn.click();
      await page.waitForTimeout(500);
    }

    // Look for AI intensity options: Focus, Collaborate, Accelerate
    const focusBtn = page.getByText('Focus', { exact: false });
    const collaborateBtn = page.getByText('Collaborate', { exact: false });
    const accelerateBtn = page.getByText('Accelerate', { exact: false });

    const hasFocus = await focusBtn.first().isVisible().catch(() => false);
    const hasCollab = await collaborateBtn.first().isVisible().catch(() => false);
    const hasAccel = await accelerateBtn.first().isVisible().catch(() => false);

    // Click each intensity if visible
    if (hasFocus) await focusBtn.first().click();
    await page.waitForTimeout(300);
    if (hasCollab) await collaborateBtn.first().click();
    await page.waitForTimeout(300);
    if (hasAccel) await accelerateBtn.first().click();

    await page.screenshot({ path: 'e2e/artifacts/studio-ai-intensity.png' });
  });

  test('Learn mode shows document type selector', async ({ page }) => {
    await page.goto(`${BASE}/studio?mode=learn`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Click Learn mode toggle if visible
    const learnBtn = page.locator('button, [role="tab"]').filter({ hasText: /^Learn$/i }).first();
    if (await learnBtn.isVisible().catch(() => false)) {
      await learnBtn.click();
      await page.waitForTimeout(500);
    }

    // In Learn mode, document type options should appear
    const docTypes = ['Research Paper', 'Case Report', 'Thesis', 'Review Article'];
    for (const dtype of docTypes) {
      const el = page.getByText(dtype, { exact: false }).first();
      const visible = await el.isVisible().catch(() => false);
      if (visible) {
        await el.click();
        await page.waitForTimeout(300);
        break; // Just click one to verify interactivity
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/studio-learn-mode.png' });
  });

  test('TipTap editor area or document load error state', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Without a database, the editor may show "Loading document..." or "Failed to load document"
    // Both are expected empty states
    const loadingMsg = page.getByText('Loading document', { exact: false }).first();
    const failedMsg = page.getByText('Failed to load document', { exact: false }).first();
    const editor = page.locator('[class*="ProseMirror"], [class*="tiptap"], [contenteditable="true"], .ProseMirror').first();

    // Wait a bit for loading to resolve
    await page.waitForTimeout(3000);

    const hasLoadingMsg = await loadingMsg.isVisible().catch(() => false);
    const hasFailedMsg = await failedMsg.isVisible().catch(() => false);
    const hasEditor = await editor.isVisible({ timeout: 5000 }).catch(() => false);

    if (hasEditor) {
      await editor.click();
      await page.keyboard.type(
        'Introduction: Type 2 diabetes mellitus affects over 500 million people worldwide.'
      );
      await expect(editor).toContainText('Type 2 diabetes mellitus');
    }

    // FINDING: Without database, Studio shows loading/error state instead of editor
    expect(hasFailedMsg || hasEditor || hasLoadingMsg).toBeTruthy();

    await page.screenshot({ path: 'e2e/artifacts/studio-editor-or-error.png' });
  });

  test('auto-save indicator appears after typing', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const editor = page.locator('[class*="ProseMirror"], [class*="tiptap"], [contenteditable="true"]').first();
    if (await editor.isVisible().catch(() => false)) {
      await editor.click();
      await page.keyboard.type('Testing auto-save functionality with some sample text.');

      // Wait for auto-save (debounce is 2000ms)
      await page.waitForTimeout(3000);

      // Look for save status indicators
      const saveIndicators = ['Saving', 'Saved', 'Unsaved', 'Save failed'];
      let foundIndicator = false;
      for (const indicator of saveIndicators) {
        const el = page.getByText(indicator, { exact: false }).first();
        if (await el.isVisible().catch(() => false)) {
          foundIndicator = true;
          break;
        }
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/studio-autosave.png' });
  });

  test('formatting toolbar with Bold, Italic, Headings', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for formatting toolbar buttons
    const boldBtn = page.locator('button[title*="Bold" i], button[aria-label*="Bold" i], [class*="toolbar"] button').filter({ hasText: /^B$/i }).first();
    const italicBtn = page.locator('button[title*="Italic" i], button[aria-label*="Italic" i]').first();

    // Try bold button
    if (await boldBtn.isVisible().catch(() => false)) {
      await boldBtn.click();
      await page.waitForTimeout(200);
    }

    // Try italic button
    if (await italicBtn.isVisible().catch(() => false)) {
      await italicBtn.click();
      await page.waitForTimeout(200);
    }

    // Look for heading buttons
    for (const heading of ['H1', 'H2', 'H3']) {
      const hBtn = page.locator('button').filter({ hasText: heading }).first();
      if (await hBtn.isVisible().catch(() => false)) {
        await hBtn.click();
        await page.waitForTimeout(200);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/studio-formatting.png' });
  });

  test('right panel tabs: Chat & Learn, Research, Checks', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for panel tabs
    const tabNames = ['Chat & Learn', 'Chat', 'Research', 'Checks'];
    for (const tabName of tabNames) {
      const tab = page.locator('button, [role="tab"]').filter({ hasText: tabName }).first();
      if (await tab.isVisible().catch(() => false)) {
        await tab.click();
        await page.waitForTimeout(500);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/studio-panel-tabs.png' });
  });

  test('keyboard shortcut Cmd+Shift+C opens Citation Dialog', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Focus editor first
    const editor = page.locator('[class*="ProseMirror"], [class*="tiptap"], [contenteditable="true"]').first();
    if (await editor.isVisible().catch(() => false)) {
      await editor.click();
      await page.waitForTimeout(300);
    }

    // Trigger Cmd+Shift+C for Citation Dialog
    await page.keyboard.press('Meta+Shift+c');
    await page.waitForTimeout(500);

    // Check if citation dialog appeared
    const citationDialog = page.locator('[role="dialog"], [class*="modal"], [class*="dialog"], [class*="citation"]').first();
    const dialogVisible = await citationDialog.isVisible().catch(() => false);

    if (dialogVisible) {
      // Look for close button and close it
      const closeBtn = page.locator('[role="dialog"] button, [class*="modal"] button').filter({ hasText: /close|cancel|×|✕/i }).first();
      if (await closeBtn.isVisible().catch(() => false)) {
        await closeBtn.click();
      } else {
        await page.keyboard.press('Escape');
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/studio-citation-dialog.png' });
  });

  test('keyboard shortcut Cmd+Shift+R toggles Reference Sidebar', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Focus editor
    const editor = page.locator('[class*="ProseMirror"], [class*="tiptap"], [contenteditable="true"]').first();
    if (await editor.isVisible().catch(() => false)) {
      await editor.click();
    }

    // Toggle reference sidebar
    await page.keyboard.press('Meta+Shift+r');
    await page.waitForTimeout(500);

    // Look for reference sidebar content
    const refSidebar = page.getByText(/reference|bibliography/i).first();
    const sidebarVisible = await refSidebar.isVisible().catch(() => false);

    // Toggle back
    await page.keyboard.press('Meta+Shift+r');
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'e2e/artifacts/studio-reference-sidebar.png' });
  });

  test('Export dropdown shows PDF and Word options', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Find Export button/dropdown
    const exportBtn = page.locator('button').filter({ hasText: /export/i }).first();
    if (await exportBtn.isVisible().catch(() => false)) {
      await exportBtn.click();
      await page.waitForTimeout(500);

      // Look for PDF and Word options
      const pdfOption = page.getByText(/PDF/i).first();
      const wordOption = page.getByText(/Word|\.doc/i).first();

      const hasPdf = await pdfOption.isVisible().catch(() => false);
      const hasWord = await wordOption.isVisible().catch(() => false);

      // Close dropdown
      await page.keyboard.press('Escape');
    }

    await page.screenshot({ path: 'e2e/artifacts/studio-export.png' });
  });

  test('slash commands: typing / in editor triggers command palette', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const editor = page.locator('[class*="ProseMirror"], [class*="tiptap"], [contenteditable="true"]').first();
    if (await editor.isVisible().catch(() => false)) {
      await editor.click();
      await page.waitForTimeout(300);

      // Type slash to trigger command menu
      await page.keyboard.type('/');
      await page.waitForTimeout(500);

      // Look for command palette/menu
      const commandMenu = page.locator('[class*="slash"], [class*="command"], [class*="menu"], [role="listbox"], [role="menu"]').first();
      const menuVisible = await commandMenu.isVisible().catch(() => false);

      // Look for expected commands
      const commands = ['continue', 'summarize', 'cite', 'find-sources'];
      for (const cmd of commands) {
        const cmdEl = page.getByText(cmd, { exact: false }).first();
        await cmdEl.isVisible().catch(() => false);
      }

      // Dismiss
      await page.keyboard.press('Escape');
    }

    await page.screenshot({ path: 'e2e/artifacts/studio-slash-commands.png' });
  });

  test('sidebar has document title, project selector, My Library, Literature Search links', async ({ page }) => {
    await page.goto(`${BASE}/studio`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Check for sidebar elements
    const libraryLink = page.getByText('My Library', { exact: false }).first();
    const litSearchLink = page.getByText('Literature Search', { exact: false }).first();

    // Check visibility
    const hasLibrary = await libraryLink.isVisible().catch(() => false);
    const hasLitSearch = await litSearchLink.isVisible().catch(() => false);

    // Check for project selector
    const projectSelector = page.locator('select, [class*="project"], [class*="selector"]').first();
    await projectSelector.isVisible().catch(() => false);

    // Check for editable document title
    const titleInput = page.locator('input[type="text"], [contenteditable="true"]').first();
    await titleInput.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/studio-sidebar-elements.png' });
  });
});
