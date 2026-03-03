/**
 * RALPH Browser Test: Internal Medicine - MBBS Student - Onboarding
 * Persona: P0 - MBBS Student | Task: T0 - ONBOARDING
 * Target: 9.0+ (frictionless, no errors, clear guidance)
 */

import { test, expect } from '@playwright/test';

const SLUG = 'internal-medicine';
const TASK = 't0';
const PERSONA = 'p0';

test.describe.serial('Internal Medicine - MBBS Student - Onboarding', () => {
  test('complete onboarding flow', async ({ page }) => {
    // Navigate and wait for page to be ready
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Allow React hydration

    // Take screenshot for debugging
    await page.screenshot({ path: `e2e/ralph-browser/${SLUG}/screenshots/${TASK}-${PERSONA}-step0.png` });

    // Step 0: Welcome - fill name and institution
    const inputs = page.locator('input:visible');
    await inputs.first().fill('Rahul Kumar');
    await inputs.nth(1).fill('MAMC New Delhi');

    // Click Continue
    await page.locator('button:visible:has-text("Continue")').first().click();
    await page.waitForTimeout(1000);

    // Step 1: Select specialty
    await page.locator('button:visible:has-text("Internal Medicine")').click();
    await page.locator('button:visible:has-text("Continue")').click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `e2e/ralph-browser/${SLUG}/screenshots/${TASK}-${PERSONA}-step1.png` });

    // Step 2: Select goals
    await page.locator('button:visible:has-text("Write Research Papers")').click();
    await page.locator('button:visible:has-text("Search Literature")').click();
    await page.locator('button:visible:has-text("Check Plagiarism")').click();
    await page.locator('button:visible:has-text("Create Presentations")').click();
    await page.locator('button:visible:has-text("Continue")').click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `e2e/ralph-browser/${SLUG}/screenshots/${TASK}-${PERSONA}-step2.png` });

    // Step 3: Complete
    await page.locator('button:visible:has-text("Start Using")').click();

    // Verify redirect to dashboard
    await page.waitForURL('**/dashboard**', { timeout: 15000 });
    await page.screenshot({ path: `e2e/ralph-browser/${SLUG}/screenshots/${TASK}-${PERSONA}-complete.png` });

    expect(page.url()).toContain('dashboard');
  });

  test('has progress indicator', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check for progress bars
    const progressBars = page.locator('div[class*="h-1"][class*="rounded"]');
    const count = await progressBars.count();
    expect(count).toBeGreaterThan(0);
  });

  test('shows welcome message', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const welcome = page.locator('text=/Welcome/i');
    await expect(welcome.first()).toBeVisible({ timeout: 5000 });
  });
});
