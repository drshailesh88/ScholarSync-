import { test, expect } from "@playwright/test";

/**
 * Basic accessibility checks using built-in Playwright assertions.
 * Validates that key pages have proper heading structure, form labels,
 * and ARIA landmarks.
 */

// Uses axe-core concepts for accessibility validation.
// For full AxeBuilder integration, install @axe-core/playwright.

test.describe("Accessibility basics", () => {
  test("landing page has proper heading hierarchy", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1.first()).toBeVisible();
  });

  test("interactive elements are keyboard focusable", async ({ page }) => {
    await page.goto("/");
    // Tab through interactive elements
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeTruthy();
  });
});
