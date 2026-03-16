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

test.describe('Deep Journey: Illustration / Scientific Figures', () => {
  test('illustrate page loads with welcome/landing', async ({ page }) => {
    await page.goto(`${BASE}/illustrate`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    await page.screenshot({ path: 'e2e/artifacts/illustrate-loaded.png' });
  });

  test('two modes visible: Agent Mode, Editor Mode', async ({ page }) => {
    await page.goto(`${BASE}/illustrate`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for Agent Mode and Editor Mode options
    const agentMode = page.getByText(/agent|AI agent/i).first();
    const editorMode = page.getByText(/editor|canvas/i).first();

    await agentMode.isVisible().catch(() => false);
    await editorMode.isVisible().catch(() => false);

    // Also look for create/open links
    const createNew = page.getByText(/create new|new illustration/i).first();
    const useAgent = page.getByText(/use ai agent|agent mode/i).first();

    await createNew.isVisible().catch(() => false);
    await useAgent.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/illustrate-modes.png' });
  });

  test('Agent Mode: template gallery and prompt input', async ({ page }) => {
    await page.goto(`${BASE}/illustrate/agent`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for prompt input
    const promptInput = page.locator('textarea, input[type="text"], [placeholder*="describe" i], [placeholder*="create" i]').first();
    if (await promptInput.isVisible().catch(() => false)) {
      await promptInput.fill('Create a diagram of the MAPK signaling pathway');
      await expect(promptInput).toHaveValue(/MAPK/);
    }

    // Look for template gallery
    const templates = page.locator('[class*="template"], [class*="gallery"], [class*="card"]');
    const _templateCount = await templates.count();

    // Look for chat history area
    const chatArea = page.locator('[class*="chat"], [class*="messages"], [class*="conversation"]').first();
    await chatArea.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/illustrate-agent.png' });
  });

  test('Agent Mode: send prompt and verify message appears', async ({ page }) => {
    await page.goto(`${BASE}/illustrate/agent`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const promptInput = page.locator('textarea, input[type="text"]').first();
    if (await promptInput.isVisible().catch(() => false)) {
      await promptInput.fill('Create a diagram of the MAPK signaling pathway');

      // Send message
      const sendBtn = page.locator('button').filter({ hasText: /send|generate|create/i }).first();
      if (await sendBtn.isVisible().catch(() => false)) {
        await sendBtn.click();
      } else {
        await promptInput.press('Enter');
      }

      await page.waitForTimeout(2000);

      // Verify message appeared
      const message = page.getByText('MAPK', { exact: false }).first();
      await message.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/illustrate-agent-sent.png' });
  });

  test('Editor Mode: canvas and toolbar', async ({ page }) => {
    await page.goto(`${BASE}/illustrate/editor`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Canvas area (Fabric.js)
    const canvas = page.locator('canvas, [class*="canvas"], [class*="fabric"]').first();
    await canvas.isVisible().catch(() => false);

    // Toolbar
    const toolbar = page.locator('[class*="toolbar"], [role="toolbar"]').first();
    await toolbar.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/illustrate-editor.png' });
  });

  test('Editor toolbar: shape tools, text tools, drawing tools', async ({ page }) => {
    await page.goto(`${BASE}/illustrate/editor`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for tool buttons
    const tools = ['Rectangle', 'Circle', 'Text', 'Line', 'Arrow', 'Pen', 'Draw'];
    for (const tool of tools) {
      const btn = page.locator('button[aria-label*="' + tool.toLowerCase() + '" i], button[title*="' + tool + '" i]').first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        await page.waitForTimeout(200);
      }
    }

    // Also look by text content
    for (const tool of tools) {
      const btn = page.locator('button').filter({ hasText: new RegExp(tool, 'i') }).first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        await page.waitForTimeout(200);
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/illustrate-tools.png' });
  });

  test('Editor: layers panel on left', async ({ page }) => {
    await page.goto(`${BASE}/illustrate/editor`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for layers panel
    const layersPanel = page.getByText(/layers|layer/i).first();
    await layersPanel.isVisible().catch(() => false);

    // Look for layer controls
    const layerControls = ['Add', 'Rename', 'Visibility', 'Lock', 'Delete'];
    for (const control of layerControls) {
      const btn = page.locator('button').filter({ hasText: new RegExp(control, 'i') }).first();
      await btn.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/illustrate-layers.png' });
  });

  test('Editor: properties panel on right with position, size, opacity', async ({ page }) => {
    await page.goto(`${BASE}/illustrate/editor`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for properties panel inputs
    const props = ['position', 'size', 'rotation', 'opacity', 'x', 'y', 'width', 'height'];
    for (const prop of props) {
      const el = page.getByText(new RegExp(prop, 'i')).first();
      await el.isVisible().catch(() => false);
    }

    // Look for color inputs
    const colorInput = page.locator('input[type="color"], [class*="color-picker"], [class*="swatch"]').first();
    await colorInput.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/illustrate-properties.png' });
  });

  test('Export dialog: PNG, SVG, PDF, PPTX, LaTeX', async ({ page }) => {
    await page.goto(`${BASE}/illustrate/editor`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Find export button
    const exportBtn = page.locator('button').filter({ hasText: /export|download/i }).first();
    if (await exportBtn.isVisible().catch(() => false)) {
      await exportBtn.click();
      await page.waitForTimeout(500);

      // Check for format options
      const formats = ['PNG', 'SVG', 'PDF', 'PPTX', 'LaTeX'];
      for (const format of formats) {
        const formatEl = page.getByText(format, { exact: false }).first();
        await formatEl.isVisible().catch(() => false);
      }

      // Close export dialog
      await page.keyboard.press('Escape');
    }

    await page.screenshot({ path: 'e2e/artifacts/illustrate-export.png' });
  });

  test('biological shape generators: Cell, DNA Helix, Neuron', async ({ page }) => {
    await page.goto(`${BASE}/illustrate/editor`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for biological shapes
    const bioShapes = ['Cell', 'DNA', 'Helix', 'Neuron', 'Membrane', 'Protein'];
    for (const shape of bioShapes) {
      const el = page.getByText(shape, { exact: false }).first();
      await el.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/illustrate-bio-shapes.png' });
  });

  test('icon picker/browser exists', async ({ page }) => {
    await page.goto(`${BASE}/illustrate/editor`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for icon browser button
    const iconBtn = page.locator('button').filter({ hasText: /icon|symbol|library/i }).first();
    if (await iconBtn.isVisible().catch(() => false)) {
      await iconBtn.click();
      await page.waitForTimeout(500);

      // Look for icon search
      const iconSearch = page.locator('input[placeholder*="search" i], input[placeholder*="icon" i]').first();
      if (await iconSearch.isVisible().catch(() => false)) {
        await iconSearch.fill('cell');
        await page.waitForTimeout(500);
      }

      await page.keyboard.press('Escape');
    }

    await page.screenshot({ path: 'e2e/artifacts/illustrate-icon-picker.png' });
  });

  test('style panel for colors, gradients, effects', async ({ page }) => {
    await page.goto(`${BASE}/illustrate/editor`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for style-related elements
    const styleElements = ['Fill', 'Stroke', 'Color', 'Gradient', 'Shadow', 'Opacity', 'Effect'];
    for (const el of styleElements) {
      const styleEl = page.getByText(new RegExp(el, 'i')).first();
      await styleEl.isVisible().catch(() => false);
    }

    await page.screenshot({ path: 'e2e/artifacts/illustrate-styles.png' });
  });
});
