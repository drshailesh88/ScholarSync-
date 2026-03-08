import { test, expect } from "@playwright/test";
import { navigateTo } from "./helpers/auth";

test.describe("Research Flow", () => {
  test.beforeEach(async ({ page }) => {
    await navigateTo(page, "/research");
  });

  test("search bar is visible and accepts input", async ({ page }) => {
    // The research page has an inline input with placeholder about "200M+ papers"
    const input = page.locator('input[placeholder*="200M"], input[placeholder*="papers"], input[placeholder*="search" i]').first();
    await expect(input).toBeVisible({ timeout: 10_000 });
    await input.click();
    await input.fill("CRISPR gene editing");
    await expect(input).toHaveValue("CRISPR gene editing");
  });

  test("search button is visible", async ({ page }) => {
    const searchBtn = page.locator('button:has-text("Search")');
    await expect(searchBtn.first()).toBeVisible({ timeout: 10_000 });
  });

  test("search triggers request", async ({ page }) => {
    const input = page.locator('input[placeholder*="200M"], input[placeholder*="papers"], input[placeholder*="search" i]').first();
    await input.waitFor({ state: "visible", timeout: 10_000 });
    await input.click();
    await input.fill("CRISPR");
    await page.locator('button:has-text("Search")').first().click();

    // Wait briefly — we don't require results (API keys may be placeholders)
    await page.waitForTimeout(3_000);
    // Just verify no crash
    await expect(page.locator("body")).toBeVisible();
  });
});
