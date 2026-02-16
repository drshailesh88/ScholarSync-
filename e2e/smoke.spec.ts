import { test, expect } from "@playwright/test";
import { navigateTo } from "./helpers/auth";

test.describe("Smoke Tests — every page loads", () => {
  test("landing page loads and has title", async ({ page }) => {
    await navigateTo(page, "/");
    await expect(page).toHaveTitle(/ScholarSync/i);
  });

  test("dashboard loads", async ({ page }) => {
    await navigateTo(page, "/dashboard");
    await expect(page.locator("body")).toContainText(/dashboard|good\s(morning|afternoon|evening)/i);
  });

  const pages = [
    "/projects",
    "/library",
    "/research",
    "/studio",
    "/notebook",
    "/analysis",
    "/compliance",
    "/presentation",
    "/settings",
  ];

  for (const path of pages) {
    test(`${path} page loads`, async ({ page }) => {
      await navigateTo(page, path);
      await expect(page.locator("body")).toBeVisible();
    });
  }
});
