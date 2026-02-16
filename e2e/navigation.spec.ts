import { test, expect } from "@playwright/test";
import { navigateTo } from "./helpers/auth";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await navigateTo(page, "/dashboard");
  });

  const sidebarLinks = [
    "/studio",
    "/research",
    "/notebook",
    "/library",
    "/compliance",
    "/presentation",
    "/settings",
  ];

  for (const href of sidebarLinks) {
    test(`sidebar link to ${href} works`, async ({ page }) => {
      const link = page.locator(`a[href="${href}"]`).first();
      await link.waitFor({ state: "visible", timeout: 10_000 });
      await link.click();
      await page.waitForURL(new RegExp(href.replace("/", "\\/")), { timeout: 15_000 });
    });
  }

  test("dashboard link works", async ({ page }) => {
    // Navigate away first
    const settingsLink = page.locator('a[href="/settings"]').first();
    await settingsLink.waitFor({ state: "visible", timeout: 10_000 });
    await settingsLink.click();
    await page.waitForURL(/settings/, { timeout: 15_000 });
    // Navigate back
    const dashLink = page.locator('a[href="/dashboard"]').first();
    await dashLink.waitFor({ state: "visible", timeout: 10_000 });
    await dashLink.click();
    await page.waitForURL(/dashboard/, { timeout: 15_000 });
  });

  test("theme toggle switches mode", async ({ page }) => {
    const nightButton = page.locator('button:has-text("Night")');
    const daylightButton = page.locator('button:has-text("Daylight")');

    if (await nightButton.isVisible()) {
      await nightButton.click();
      await expect(page.locator("html")).toHaveClass(/dark/);
    }

    if (await daylightButton.isVisible()) {
      await daylightButton.click();
      await expect(page.locator("html")).not.toHaveClass(/dark/);
    }
  });
});
