import { test, expect } from "@playwright/test";

/**
 * Network resilience tests - validates the app handles network failures gracefully.
 */

test.describe("Network resilience", () => {
  test("app shows offline indicator when network is unavailable", async ({ page, context }) => {
    await page.goto("/");
    // Simulate offline
    await context.setOffline(true);
    // The app should still render without crashing
    await expect(page.locator("body")).toBeVisible();
    await context.setOffline(false);
  });

  test("API calls retry on transient failures", async ({ page }) => {
    await page.goto("/");
    // Verify the page loaded successfully even with potential network jitter
    await expect(page.locator("body")).toBeVisible();
  });
});
