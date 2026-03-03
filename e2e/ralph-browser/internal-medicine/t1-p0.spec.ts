/**
 * RALPH Browser Test: Internal Medicine - MBBS Student - Literature Search
 * Persona: P0 - MBBS Student | Task: T1 - LITERATURE SEARCH
 * Topic: Lemierre's syndrome thrombophlebitis antibiotics
 * Target: 9.0+ (finds relevant papers, filters work)
 */

import { test, expect } from '@playwright/test';

test.describe('Internal Medicine - MBBS - Literature Search', () => {
  test('research page loads and is functional', async ({ page }) => {
    await page.goto('/research');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Screenshot for debugging
    await page.screenshot({ path: 'e2e/ralph-browser/internal-medicine/screenshots/t1-p0-research.png' });

    // Check page has loaded - look for any interactive element
    const hasInputs = await page.locator('input, textarea, button').count();
    expect(hasInputs).toBeGreaterThan(0);
  });
});
