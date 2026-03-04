/**
 * Diagnostic test to understand what Playwright sees
 */

import { test } from '@playwright/test';

test('diagnostic - check onboarding page', async ({ page, context }) => {
  // Collect console messages
  const consoleMessages: string[] = [];
  page.on('console', msg => {
    consoleMessages.push(`${msg.type()}: ${msg.text()}`);
  });

  // Collect page errors
  const errors: string[] = [];
  page.on('pageerror', error => {
    errors.push(error.message);
  });

  // Check cookies
  const cookies = await context.cookies();
  console.log('Cookies:', JSON.stringify(cookies, null, 2));

  // Navigate to onboarding
  const response = await page.goto('/onboarding');
  console.log('Response status:', response?.status());
  console.log('Response URL:', response?.url());
  console.log('Page URL:', page.url());

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Wait for React to hydrate - check for actual content
  console.log('Waiting for React hydration...');
  await page.waitForFunction(() => {
    const h1s = document.querySelectorAll('h1');
    const inputs = document.querySelectorAll('input');
    return h1s.length > 0 || inputs.length > 0;
  }, { timeout: 30000 }).catch(e => console.log('Hydration wait failed:', e.message));

  // Additional wait for content
  await page.waitForTimeout(5000);

  // Get page title
  const title = await page.title();
  console.log('Page title:', title);

  // Get page content (first 1000 chars)
  const content = await page.content();
  console.log('Page content (first 1000 chars):', content.substring(0, 1000));

  // Take screenshot
  await page.screenshot({ path: 'e2e/ralph-browser/internal-medicine/screenshots/diagnostic.png', fullPage: true });

  // Check for specific elements
  const h1Count = await page.locator('h1').count();
  console.log('H1 count:', h1Count);

  const inputCount = await page.locator('input').count();
  console.log('Input count:', inputCount);

  const buttonCount = await page.locator('button').count();
  console.log('Button count:', buttonCount);

  // List all h1 elements
  const h1Texts = await page.locator('h1').allTextContents();
  console.log('H1 texts:', h1Texts);

  // Print console messages
  console.log('\n=== Console Messages ===');
  consoleMessages.forEach(msg => console.log(msg));

  // Print errors
  console.log('\n=== Page Errors ===');
  errors.forEach(err => console.log(err));
});
