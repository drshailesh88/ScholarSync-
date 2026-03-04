/**
 * Playwright Auth Setup
 * Sets up authentication for Playwright tests using dev bypass.
 *
 * In development mode, we use a special cookie/header to bypass Clerk auth
 * and rely on the server-side DEV_USER_ID fallback.
 */

import { test as setup } from '@playwright/test';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page, context }) => {
  console.log('[Setup] Starting authentication via dev bypass...');

  // Set cookie to signal Playwright test mode to middleware
  // This MUST be done before navigating
  await context.addCookies([
    {
      name: '__playwright',
      value: 'true',
      domain: 'localhost',
      path: '/',
    },
  ]);

  // Navigate to a protected route
  await page.goto('/dashboard');
  await page.waitForLoadState('domcontentloaded');

  // Wait a bit for any redirects to settle
  await page.waitForTimeout(2000);

  // Check current URL
  const url = page.url();
  console.log('[Setup] Current URL:', url);

  // If we're on sign-in, the bypass didn't work
  if (url.includes('sign-in')) {
    // Take a screenshot for debugging
    await page.screenshot({ path: 'test-results/auth-bypass-failed.png' });

    throw new Error(
      `Auth bypass failed - redirected to sign-in. URL: ${url}\n` +
      'Make sure:\n' +
      '1. Dev server is running (npm run dev)\n' +
      '2. NODE_ENV=development\n' +
      '3. Middleware has the Playwright bypass code'
    );
  }

  // Now that we're on a valid page, force light theme for screenshots
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    try {
      localStorage.setItem('theme', 'light');
    } catch {
      // localStorage might not be available on some pages
    }
  });

  // Save the state (cookies + localStorage)
  await context.storageState({ path: authFile });

  console.log('[Setup] Authentication bypass complete, state saved to', authFile);
});
