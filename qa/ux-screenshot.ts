/**
 * UX Screenshot Utility
 *
 * Captures screenshots of ScholarSync's editor for UX comparison.
 *
 * Usage:
 *   UX_ZONE=1 UX_PHASE=before npx playwright test qa/ux-screenshot.ts
 *   UX_ZONE=1 UX_PHASE=after npx playwright test qa/ux-screenshot.ts
 */

import { test } from '@playwright/test';
import { mkdirSync } from 'fs';

const ZONE = process.env.UX_ZONE || '1';
const PHASE = process.env.UX_PHASE || 'before';
const OUTPUT = `qa/artifacts/ux-current/zone-${ZONE}/${PHASE}`;

test.beforeAll(() => {
  mkdirSync(OUTPUT, { recursive: true });
});

test.describe(`UX Zone ${ZONE} — ${PHASE}`, () => {

  // === ZONE 1: Typography ===
  test('full editor with content', async ({ page }) => {
    await page.goto('/editor/demo', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${OUTPUT}/editor-full.png`, fullPage: true });
  });

  test('editor content area only', async ({ page }) => {
    await page.goto('/editor/demo', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const content = page.locator('.ProseMirror').first();
    if (await content.isVisible()) {
      await content.screenshot({ path: `${OUTPUT}/editor-content.png` });
    }
  });

  // === ZONE 2: Canvas ===
  test('empty editor state', async ({ page }) => {
    await page.goto('/studio', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${OUTPUT}/editor-empty.png` });
  });

  // === ZONE 3: Toolbar ===
  test('top bar / toolbar', async ({ page }) => {
    await page.goto('/editor/demo', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const toolbar = page.locator('[data-testid="top-bar"], [data-testid="toolbar"], header').first();
    if (await toolbar.isVisible()) {
      await toolbar.screenshot({ path: `${OUTPUT}/toolbar.png` });
    }
  });

  // === ZONE 5: Left Panel ===
  test('sidebar full view', async ({ page }) => {
    await page.goto('/studio', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${OUTPUT}/sidebar-full.png` });
  });

  // === ZONE 6: Right Panel ===
  test('workbench view', async ({ page }) => {
    await page.goto('/studio', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${OUTPUT}/workbench-full.png` });
  });

  // === ZONE 7: Theme ===
  test('light mode full page', async ({ page }) => {
    await page.goto('/editor/demo', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${OUTPUT}/light-mode.png`, fullPage: true });
  });

  test('dark mode full page', async ({ page }) => {
    await page.goto('/editor/demo', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    // Try to toggle dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUTPUT}/dark-mode.png`, fullPage: true });
  });
});
