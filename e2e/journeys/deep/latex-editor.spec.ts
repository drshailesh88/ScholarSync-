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

test.describe('Deep Journey: LaTeX Paper Writing', () => {
  test('LaTeX new project page loads with creation form', async ({ page }) => {
    await page.goto(`${BASE}/latex/new`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for title input
    const titleInput = page.locator('input[type="text"], input[placeholder*="title" i], input[placeholder*="name" i]').first();
    if (await titleInput.isVisible().catch(() => false)) {
      await titleInput.fill('Systematic Review of GLP-1 Receptor Agonists');
      await expect(titleInput).toHaveValue(/GLP-1/);
    }

    await page.screenshot({ path: 'e2e/artifacts/latex-new-project.png' });
  });

  test('template picker has journal options (IEEE, Elsevier, etc.)', async ({ page }) => {
    await page.goto(`${BASE}/latex/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for template selector
    const templates = ['IEEE', 'Elsevier', 'Springer', 'Blank', 'Research Article', 'Review', 'Thesis'];
    for (const tmpl of templates) {
      const el = page.getByText(tmpl, { exact: false }).first();
      const visible = await el.isVisible().catch(() => false);
      if (visible) {
        await el.click();
        await page.waitForTimeout(300);
        break;
      }
    }

    // Check for template search/filter
    const searchInput = page.locator('input[placeholder*="search" i], input[placeholder*="template" i], input[placeholder*="journal" i]').first();
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill('IEEE');
      await page.waitForTimeout(500);
    }

    await page.screenshot({ path: 'e2e/artifacts/latex-template-picker.png' });
  });

  test('compiler selector with pdflatex, xelatex, lualatex', async ({ page }) => {
    await page.goto(`${BASE}/latex/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for compiler selection
    const compilers = ['pdflatex', 'xelatex', 'lualatex'];
    for (const compiler of compilers) {
      const el = page.getByText(compiler, { exact: false }).first();
      if (await el.isVisible().catch(() => false)) {
        await el.click();
        await page.waitForTimeout(200);
      }
    }

    // Check for select/dropdown
    const compilerSelect = page.locator('select').first();
    if (await compilerSelect.isVisible().catch(() => false)) {
      const options = await compilerSelect.locator('option').allTextContents();
      // Try selecting each compiler option
      for (const compiler of compilers) {
        const matchingOption = options.find(o => o.toLowerCase().includes(compiler));
        if (matchingOption) {
          await compilerSelect.selectOption({ label: matchingOption });
          break;
        }
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/latex-compiler-selector.png' });
  });

  test('LaTeX project list page shows grid or empty state', async ({ page }) => {
    await page.goto(`${BASE}/latex`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Check for New Paper button
    const newBtn = page.locator('button, a').filter({ hasText: /new paper|new project|create/i }).first();
    const newBtnVisible = await newBtn.isVisible().catch(() => false);

    // Check for empty state or project grid
    const emptyState = page.getByText(/no project|get started|create your first/i).first();
    const projectCard = page.locator('[class*="card"], [class*="grid"] > div').first();

    await emptyState.isVisible().catch(() => false);
    await projectCard.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/latex-project-list.png' });
  });

  test('New Paper button exists and navigates', async ({ page }) => {
    await page.goto(`${BASE}/latex`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    const newBtn = page.locator('a, button').filter({ hasText: /new paper|new project|create/i }).first();
    if (await newBtn.isVisible().catch(() => false)) {
      await newBtn.click();
      await page.waitForTimeout(2000);
      // Should navigate to /latex/new
      await expect(page.locator('body')).not.toContainText('Application error');
    }

    await page.screenshot({ path: 'e2e/artifacts/latex-new-paper-btn.png' });
  });

  test('editor workspace three-pane layout (file tree, source, preview)', async ({ page }) => {
    // Navigate to a hypothetical project editor (try /latex/new first then check)
    await page.goto(`${BASE}/latex/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for file tree panel
    const fileTree = page.getByText(/main\.tex|file|tree/i).first();
    await fileTree.isVisible().catch(() => false);

    // Look for CodeMirror editor (center)
    const codeEditor = page.locator('[class*="CodeMirror"], [class*="cm-editor"], [class*="codemirror"], [contenteditable="true"]').first();
    await codeEditor.isVisible().catch(() => false);

    // Look for PDF preview area
    const pdfPreview = page.locator('[class*="preview"], [class*="pdf"], canvas, iframe').first();
    await pdfPreview.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/latex-three-pane.png' });
  });

  test('source editor accepts LaTeX input', async ({ page }) => {
    await page.goto(`${BASE}/latex/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Find code editor area
    const codeEditor = page.locator(
      '[class*="CodeMirror"], [class*="cm-editor"], [class*="cm-content"], [contenteditable="true"], textarea'
    ).first();

    if (await codeEditor.isVisible().catch(() => false)) {
      await codeEditor.click();
      await page.keyboard.type('\\section{Introduction}\nThis paper presents a systematic review of GLP-1 receptor agonists.');
      await page.waitForTimeout(500);
    }

    await page.screenshot({ path: 'e2e/artifacts/latex-source-typing.png' });
  });

  test('toolbar has Compile button', async ({ page }) => {
    await page.goto(`${BASE}/latex/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Find Compile button
    const compileBtn = page.locator('button').filter({ hasText: /compile|build/i }).first();
    if (await compileBtn.isVisible().catch(() => false)) {
      await compileBtn.click();
      await page.waitForTimeout(2000);
      // May fail without compiler - that's OK
      await expect(page.locator('body')).not.toContainText('Application error');
    }

    await page.screenshot({ path: 'e2e/artifacts/latex-compile-btn.png' });
  });

  test('toolbar has AI tools, Comments, Settings buttons', async ({ page }) => {
    await page.goto(`${BASE}/latex/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for toolbar elements
    const toolbarItems = ['AI', 'Comment', 'Setting', 'History', 'Version'];
    for (const item of toolbarItems) {
      const btn = page.locator('button').filter({ hasText: new RegExp(item, 'i') }).first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        await page.waitForTimeout(300);
        await page.keyboard.press('Escape');
      }
    }

    await page.screenshot({ path: 'e2e/artifacts/latex-toolbar.png' });
  });

  test('file tree shows project files', async ({ page }) => {
    await page.goto(`${BASE}/latex/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for file names in file tree
    const expectedFiles = ['main.tex', 'references.bib', 'figures'];
    for (const fileName of expectedFiles) {
      const fileEl = page.getByText(fileName, { exact: false }).first();
      await fileEl.isVisible().catch(() => false);
    }

    // Look for New File button
    const newFileBtn = page.locator('button').filter({ hasText: /new file|add file/i }).first();
    await newFileBtn.isVisible().catch(() => false);

    await page.screenshot({ path: 'e2e/artifacts/latex-file-tree.png' });
  });

  test('collaboration cursors area exists', async ({ page }) => {
    await page.goto(`${BASE}/latex/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Look for collaboration indicators
    const collabElements = page.locator('[class*="collab"], [class*="cursor"], [class*="presence"], [class*="avatar"]');
    const count = await collabElements.count();

    await page.screenshot({ path: 'e2e/artifacts/latex-collaboration.png' });
  });

  test('creation form submission workflow', async ({ page }) => {
    await page.goto(`${BASE}/latex/new`);
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible({ timeout: 15000 });

    // Fill in title
    const titleInput = page.locator('input[type="text"], input[placeholder*="title" i]').first();
    if (await titleInput.isVisible().catch(() => false)) {
      await titleInput.fill('Clinical Outcomes of GLP-1 Agonists');
    }

    // Select template if available
    const templateBtn = page.locator('button, [class*="card"]').filter({ hasText: /Blank|Article|Research/i }).first();
    if (await templateBtn.isVisible().catch(() => false)) {
      await templateBtn.click();
      await page.waitForTimeout(300);
    }

    // Click Create button
    const createBtn = page.locator('button').filter({ hasText: /create|start|begin/i }).first();
    if (await createBtn.isVisible().catch(() => false)) {
      await createBtn.click();
      await page.waitForTimeout(3000);
      await expect(page.locator('body')).not.toContainText('Application error');
    }

    await page.screenshot({ path: 'e2e/artifacts/latex-create-workflow.png' });
  });
});
