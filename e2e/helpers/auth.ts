import { type BrowserContext, type Page, expect } from "@playwright/test";

export const PLAYWRIGHT_AUTH_COOKIE = "__playwright";
export const PLAYWRIGHT_USER_COOKIE = "__playwright_user";
export const DEFAULT_PLAYWRIGHT_USER_ID = "dev_user_001";

type AuthOptions = {
  userId?: string;
};

function getCookieDomain() {
  const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";
  return new URL(baseUrl).hostname;
}

export async function addPlaywrightAuth(
  context: BrowserContext,
  options: AuthOptions = {}
) {
  await context.addCookies([
    {
      name: PLAYWRIGHT_AUTH_COOKIE,
      value: "true",
      domain: getCookieDomain(),
      path: "/",
    },
    {
      name: PLAYWRIGHT_USER_COOKIE,
      value: options.userId ?? DEFAULT_PLAYWRIGHT_USER_ID,
      domain: getCookieDomain(),
      path: "/",
    },
  ]);
}

export async function clearPlaywrightAuth(context: BrowserContext) {
  await context.clearCookies();
}

/**
 * Navigate to a page and wait for it to fully load.
 * Adds the explicit Playwright auth cookies used by the dev auth bypass.
 */
export async function navigateTo(
  page: Page,
  path: string,
  options: AuthOptions = {}
) {
  await addPlaywrightAuth(page.context(), options);
  await page.goto(path, { waitUntil: "domcontentloaded" });
  // Wait for Next.js hydration — body should be visible
  await expect(page.locator("body")).toBeVisible();
}
