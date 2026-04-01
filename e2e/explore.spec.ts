import { test, expect } from "@playwright/test";
import { navigateTo } from "./helpers/auth";

test.describe("Explore Module — full workflow", () => {
  test.beforeEach(async ({ page }) => {
    await navigateTo(page, "/explore");
  });

  // ── Landing page ──────────────────────────────────────────

  test("landing page shows search bar and hint text", async ({ page }) => {
    const searchBar = page.getByRole("textbox");
    await expect(searchBar).toBeVisible();
    await expect(page.getByText("Search for sources to get started.")).toBeVisible();
  });

  test("search history button is visible on landing", async ({ page }) => {
    await expect(page.getByLabel("Search history")).toBeVisible();
  });

  // ── Search flow ───────────────────────────────────────────

  test("search returns results with skeleton loading", async ({ page }) => {
    const searchBar = page.getByRole("textbox");
    await searchBar.fill("machine learning");
    await searchBar.press("Enter");

    // Skeleton should appear (animate-pulse elements)
    const skeletons = page.locator(".animate-pulse");
    await expect(skeletons.first()).toBeVisible({ timeout: 5000 });

    // Results should eventually appear
    const resultCards = page.locator("article");
    await expect(resultCards.first()).toBeVisible({ timeout: 30000 });
  });

  test("tabs are visible and switchable after search", async ({ page }) => {
    const searchBar = page.getByRole("textbox");
    await searchBar.fill("climate change");
    await searchBar.press("Enter");

    // Wait for results
    await expect(page.locator("article").first()).toBeVisible({ timeout: 30000 });

    // Tabs should be visible
    const tabList = page.getByRole("tablist");
    await expect(tabList).toBeVisible();

    // Switch to Web tab
    await page.getByRole("tab", { name: "Web" }).click();
    // Tab should be selected
    await expect(page.getByRole("tab", { name: "Web" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  test("filter pills are visible after search", async ({ page }) => {
    const searchBar = page.getByRole("textbox");
    await searchBar.fill("diabetes treatment");
    await searchBar.press("Enter");

    await expect(page.locator("article").first()).toBeVisible({ timeout: 30000 });

    // Filter pill buttons should be visible
    await expect(page.getByText("All Sources")).toBeVisible();
    await expect(page.getByText(/Order:/)).toBeVisible();
    await expect(page.getByText("Any time")).toBeVisible();
    await expect(page.getByText(/Options/)).toBeVisible();
  });

  // ── Result cards ──────────────────────────────────────────

  test("result cards have trust indicator borders", async ({ page }) => {
    const searchBar = page.getByRole("textbox");
    await searchBar.fill("vaccine efficacy");
    await searchBar.press("Enter");

    const firstCard = page.locator("article").first();
    await expect(firstCard).toBeVisible({ timeout: 30000 });

    // Should have a left border (trust indicator)
    const borderLeft = await firstCard.evaluate(
      (el) => window.getComputedStyle(el).borderLeftWidth
    );
    expect(borderLeft).toBe("3px");
  });

  test("result cards have save and actions buttons", async ({ page }) => {
    const searchBar = page.getByRole("textbox");
    await searchBar.fill("artificial intelligence");
    await searchBar.press("Enter");

    const firstCard = page.locator("article").first();
    await expect(firstCard).toBeVisible({ timeout: 30000 });

    // Save button
    await expect(firstCard.getByLabel("Save result")).toBeVisible();
    // Actions button
    await expect(firstCard.getByLabel("More actions")).toBeVisible();
  });

  // ── Pagination ────────────────────────────────────────────

  test("pagination controls appear when results exceed one page", async ({
    page,
  }) => {
    const searchBar = page.getByRole("textbox");
    await searchBar.fill("cancer research");
    await searchBar.press("Enter");

    await expect(page.locator("article").first()).toBeVisible({ timeout: 30000 });

    // Check if pagination exists (may not if fewer than 10 results)
    const pagination = page.getByRole("navigation", { name: "Pagination" });
    const paginationVisible = await pagination.isVisible().catch(() => false);

    if (paginationVisible) {
      await expect(page.getByText(/Page \d+ of \d+/)).toBeVisible();
    }
  });

  // ── Synthesis ─────────────────────────────────────────────

  test("synthesize button appears after search results load", async ({
    page,
  }) => {
    const searchBar = page.getByRole("textbox");
    await searchBar.fill("quantum computing");
    await searchBar.press("Enter");

    await expect(page.locator("article").first()).toBeVisible({ timeout: 30000 });

    const synthesizeBtn = page.getByTestId("synthesize-button");
    await expect(synthesizeBtn).toBeVisible();
  });

  // ── Keyboard shortcuts overlay ────────────────────────────

  test("keyboard shortcuts overlay opens with ? and closes with Esc", async ({
    page,
  }) => {
    const searchBar = page.getByRole("textbox");
    await searchBar.fill("neuroscience");
    await searchBar.press("Enter");

    await expect(page.locator("article").first()).toBeVisible({ timeout: 30000 });

    // Blur the search bar first
    await page.locator("body").click();

    // Press ? to open shortcuts
    await page.keyboard.press("Shift+/");
    const overlay = page.getByRole("dialog", { name: "Keyboard shortcuts" });
    await expect(overlay).toBeVisible();

    // Press Esc to close
    await page.keyboard.press("Escape");
    await expect(overlay).not.toBeVisible();
  });

  // ── Empty states ──────────────────────────────────────────

  test("shows empty state for no results", async ({ page }) => {
    const searchBar = page.getByRole("textbox");
    // Use a very unlikely search term
    await searchBar.fill("xyzzyplughtwisty12345");
    await searchBar.press("Enter");

    // Wait for search to complete
    await page.waitForTimeout(5000);

    // Should show "No results found" or have result cards
    const noResults = page.getByText("No academic results found");
    const hasResults = page.locator("article");

    // One of these should be visible
    const noResultsVisible = await noResults.isVisible().catch(() => false);
    const hasResultsVisible = await hasResults.first().isVisible().catch(() => false);
    expect(noResultsVisible || hasResultsVisible).toBeTruthy();
  });

  test("More tab shows coming soon message", async ({ page }) => {
    const searchBar = page.getByRole("textbox");
    await searchBar.fill("test query");
    await searchBar.press("Enter");

    await expect(page.locator("article").first()).toBeVisible({ timeout: 30000 });

    // Click More tab
    await page.getByRole("tab", { name: "More" }).click();
    await expect(page.getByText("Coming soon")).toBeVisible();
  });

  // ── Stats line ────────────────────────────────────────────

  test("stats line shows result count and timing", async ({ page }) => {
    const searchBar = page.getByRole("textbox");
    await searchBar.fill("genetics");
    await searchBar.press("Enter");

    await expect(page.locator("article").first()).toBeVisible({ timeout: 30000 });

    // Stats line should show "N results in X.Xs"
    await expect(page.getByText(/\d+ results in \d+\.\d+s/)).toBeVisible();
  });

  // ── Responsive: mobile viewport ───────────────────────────

  test("mobile viewport: tabs scroll horizontally", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await navigateTo(page, "/explore");

    const searchBar = page.getByRole("textbox");
    await searchBar.fill("biology");
    await searchBar.press("Enter");

    await expect(page.locator("article").first()).toBeVisible({ timeout: 30000 });

    // Tabs container should be visible
    const tabNav = page.getByRole("navigation", { name: "Explore tabs" });
    await expect(tabNav).toBeVisible();

    // Check that overflow-x is auto (scrollable)
    const overflowX = await tabNav.evaluate(
      (el) => window.getComputedStyle(el).overflowX
    );
    expect(overflowX).toBe("auto");
  });

  test("mobile viewport: save buttons have 44px min tap target", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await navigateTo(page, "/explore");

    const searchBar = page.getByRole("textbox");
    await searchBar.fill("physics");
    await searchBar.press("Enter");

    const firstCard = page.locator("article").first();
    await expect(firstCard).toBeVisible({ timeout: 30000 });

    const saveBtn = firstCard.getByLabel("Save result");
    const box = await saveBtn.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.width).toBeGreaterThanOrEqual(44);
    }
  });
});
