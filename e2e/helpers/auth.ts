import { type Page, expect } from "@playwright/test";

/**
 * Navigate to a page and wait for it to fully load.
 * Assumes DEV_USER_ID is set in .env.local so auth is bypassed.
 */
export async function navigateTo(page: Page, path: string) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  // Wait for Next.js hydration — body should be visible
  await expect(page.locator("body")).toBeVisible();
}
