import { Page } from '@playwright/test';

/**
 * Authenticate Playwright via Clerk.
 *
 * Two methods:
 * 1. Clerk Testing Token (recommended for CI) - set CLERK_TESTING_TOKEN env var
 * 2. UI Sign-in (fallback) - uses TEST_USER_EMAIL and TEST_USER_PASSWORD
 *
 * @see https://clerk.com/docs/testing/overview
 */
export async function authenticateAsTestUser(page: Page) {
  const testingToken = process.env.CLERK_TESTING_TOKEN;

  // Option A: Clerk Testing Token (fastest, recommended)
  if (testingToken) {
    console.log('[Auth] Using Clerk testing token');
    await page.context().addCookies([
      {
        name: '__clerk_db_jwt',
        value: testingToken,
        domain: 'localhost',
        path: '/',
      },
    ]);
    return;
  }

  // Option B: Sign in via UI (slower but works without testing tokens)
  console.log('[Auth] Signing in via UI...');
  await page.goto('/sign-in');
  await page.waitForLoadState('domcontentloaded');

  // Fill in email
  const emailInput = page.locator('input[name="identifier"], input[type="email"], input[placeholder*="email" i]').first();
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.fill(process.env.TEST_USER_EMAIL ?? 'test@scholarsync.dev');

  // Click continue
  const continueBtn = page.locator('button:has-text("Continue")').first();
  await continueBtn.click();
  await page.waitForTimeout(1000);

  // Fill in password
  const passwordInput = page.locator('input[name="password"], input[type="password"]').first();
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
  await passwordInput.fill(process.env.TEST_USER_PASSWORD ?? 'TestPassword123!');

  // Submit
  await page.locator('button:has-text("Continue")').first().click();

  // Wait for redirect (proves auth worked)
  await page.waitForURL(/(?:dashboard|onboarding|studio)/, { timeout: 20000 });
  console.log('[Auth] Successfully authenticated');
}

/**
 * Force light theme for readable screenshots.
 * The app uses next-themes with defaultTheme="dark", so we need to override it.
 *
 * Must be called AFTER navigating to a page with a valid origin.
 */
export async function forceLightTheme(page: Page) {
  // Check if we're on a valid page first
  const url = page.url();
  if (url.startsWith('about:') || url.startsWith('data:')) {
    return; // Can't set theme on internal pages
  }

  try {
    await page.evaluate(() => {
      // Remove dark class and add light
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');

      // Also set in localStorage for next-themes (may fail on some pages)
      try {
        localStorage.setItem('theme', 'light');
      } catch {
        // localStorage might not be available
      }
    });
  } catch {
    // Page might not be ready or on a restricted origin
  }
}
