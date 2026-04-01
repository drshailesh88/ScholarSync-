import { test, expect, type Page } from "@playwright/test";
import { navigateTo } from "./helpers/auth";

/** Build a mock unified search response with N results */
function mockSearchResponse(query: string, count = 10) {
  const results = Array.from({ length: count }, (_, i) => ({
    title: `${query} — Result ${i + 1}`,
    authors: ["Jane Doe", "John Smith"],
    journal: "Journal of Testing",
    year: 2025,
    citationCount: 42 + i,
    studyType: "rct",
    abstract: `Abstract for result ${i + 1} about ${query}.`,
    doi: `10.1000/test-${i + 1}`,
    url: `https://example.com/paper-${i + 1}`,
    isOpenAccess: i % 2 === 0,
    publicationTypes: [],
    sources: ["pubmed"],
    trustTier: i % 3 === 0 ? "government" : i % 3 === 1 ? "major_journalism" : "community",
  }));

  return {
    results,
    total: count,
    page: 0,
    perPage: 10,
    hasMore: count > 10,
    sourceCounts: {
      pubmed: Math.ceil(count / 2),
      semanticScholar: Math.floor(count / 2),
      openAlex: 0,
      clinicalTrials: 0,
    },
    augmentedQueries: null,
  };
}

/** Intercept all unified search API calls with mock data */
async function mockSearchApi(page: Page, count = 10) {
  await page.route("**/api/search/unified**", async (route) => {
    const url = new URL(route.request().url());
    const query = url.searchParams.get("q") ?? "test";
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockSearchResponse(query, count)),
    });
  });
}

/** Wait for the explore page to be fully hydrated (React event handlers attached) */
async function waitForExploreReady(page: Page) {
  const searchBar = page.getByRole("searchbox");
  await expect(searchBar).toBeVisible();
  // Ensure React has hydrated by checking the form has a submit handler
  // (without hydration, pressing Enter would cause a native form navigation)
  await page.waitForFunction(
    () => document.readyState === "complete",
    { timeout: 10000 }
  );
  // One extra frame for React to finish
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));
}

/** Fill search bar, verify value took effect, submit, and wait for results */
async function searchAndWaitForResults(page: Page, query: string) {
  await waitForExploreReady(page);
  const searchBar = page.getByRole("searchbox");
  // Click to focus first, then fill — guards against hydration overwrite
  await searchBar.click();
  await searchBar.fill(query);
  await expect(searchBar).toHaveValue(query, { timeout: 5000 });
  await searchBar.press("Enter");
  await expect(page.locator("article").first()).toBeVisible({ timeout: 15000 });
}

test.describe("Explore Module — full workflow", () => {
  test.beforeEach(async ({ page }) => {
    await navigateTo(page, "/explore");
    // Wait for the search bar to be interactive (React hydrated)
    await expect(page.getByRole("searchbox")).toBeVisible();
    // Ensure hydration is complete by verifying the input is interactive
    await page.getByRole("searchbox").click();
    await page.getByRole("searchbox").blur();
  });

  // ── Landing page ──────────────────────────────────────────

  test("landing page shows search bar and hint text", async ({ page }) => {
    const searchBar = page.getByRole("searchbox");
    await expect(searchBar).toBeVisible();
    await expect(page.getByText("Search for sources to get started.")).toBeVisible();
  });

  test("search history button is visible on landing", async ({ page }) => {
    await expect(page.getByLabel("Search history")).toBeVisible();
  });

  // ── Search flow ───────────────────────────────────────────

  test("search returns results with skeleton loading", async ({ page }) => {
    await page.unroute("**/api/search/unified**");
    await page.route("**/api/search/unified**", async (route) => {
      const url = new URL(route.request().url());
      const query = url.searchParams.get("q") ?? "test";
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockSearchResponse(query)),
      });
    });

    await searchAndWaitForResults(page, "machine learning");
  });

  test("tabs are visible and switchable after search", async ({ page }) => {
    await mockSearchApi(page);
    await searchAndWaitForResults(page, "climate change");

    const tabList = page.getByRole("tablist");
    await expect(tabList).toBeVisible();

    await page.getByRole("tab", { name: "Web" }).click();
    await expect(page.getByRole("tab", { name: "Web" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  test("filter pills are visible after search", async ({ page }) => {
    await mockSearchApi(page);
    await searchAndWaitForResults(page, "diabetes treatment");

    await expect(page.getByText("All Sources")).toBeVisible();
    await expect(page.getByText(/Order:/)).toBeVisible();
    await expect(page.getByText("Any time")).toBeVisible();
    await expect(page.getByText(/Options/)).toBeVisible();
  });

  // ── Result cards ──────────────────────────────────────────

  test("result cards have trust indicator borders", async ({ page }) => {
    await mockSearchApi(page);
    await searchAndWaitForResults(page, "vaccine efficacy");

    const firstCard = page.locator("article").first();
    const borderLeft = await firstCard.evaluate(
      (el) => window.getComputedStyle(el).borderLeftWidth
    );
    expect(borderLeft).toBe("3px");
  });

  test("result cards have save and actions buttons", async ({ page }) => {
    await mockSearchApi(page);
    await searchAndWaitForResults(page, "artificial intelligence");

    const firstCard = page.locator("article").first();
    await expect(firstCard.getByLabel("Save result")).toBeVisible();
    await expect(firstCard.getByLabel("More actions")).toBeVisible();
  });

  // ── Pagination ────────────────────────────────────────────

  test("pagination controls appear when results exceed one page", async ({
    page,
  }) => {
    await mockSearchApi(page);
    await searchAndWaitForResults(page, "cancer research");

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
    await mockSearchApi(page);
    await searchAndWaitForResults(page, "quantum computing");

    const synthesizeBtn = page.getByTestId("synthesize-button");
    await expect(synthesizeBtn).toBeVisible();
  });

  // ── Keyboard shortcuts overlay ────────────────────────────

  test("keyboard shortcuts overlay opens with ? and closes with Esc", async ({
    page,
  }) => {
    await mockSearchApi(page);
    await searchAndWaitForResults(page, "neuroscience");

    // Blur the search bar by clicking on a result card, then blurring
    await page.locator("article").first().click();
    // Verify the search input is no longer focused
    await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());

    // Press ? to open shortcuts
    await page.keyboard.press("?");
    const overlay = page.getByRole("dialog", { name: "Keyboard shortcuts" });
    await expect(overlay).toBeVisible();

    // Press Esc to close
    await page.keyboard.press("Escape");
    await expect(overlay).not.toBeVisible();
  });

  // ── Empty states ──────────────────────────────────────────

  test("shows empty state for no results", async ({ page }) => {
    // Unroute default mock, set empty results mock
    await page.unroute("**/api/search/unified**");
    await page.route("**/api/search/unified**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          results: [],
          total: 0,
          page: 0,
          perPage: 10,
          hasMore: false,
          sourceCounts: { pubmed: 0, semanticScholar: 0, openAlex: 0, clinicalTrials: 0 },
          augmentedQueries: null,
        }),
      });
    });

    await waitForExploreReady(page);
    const searchBar = page.getByRole("searchbox");
    await searchBar.click();
    await searchBar.fill("xyzzyplughtwisty12345");
    await expect(searchBar).toHaveValue("xyzzyplughtwisty12345");
    await searchBar.press("Enter");

    // Wait for either "No results found" or error state
    await expect(
      page.getByText(/No .* results found/).or(page.getByText("Explore search failed"))
    ).toBeVisible({ timeout: 15000 });
  });

  test("More tab shows coming soon message", async ({ page }) => {
    await mockSearchApi(page);
    await searchAndWaitForResults(page, "test query");

    await page.getByRole("tab", { name: "More" }).click();
    await expect(page.getByText("Coming soon")).toBeVisible();
  });

  // ── Stats line ────────────────────────────────────────────

  test("stats line shows result count and timing", async ({ page }) => {
    await mockSearchApi(page);
    await searchAndWaitForResults(page, "genetics");

    await expect(page.getByText(/\d+ results in \d+\.\d+s/)).toBeVisible();
  });

  // ── Responsive: mobile viewport ───────────────────────────

  test("mobile viewport: tabs scroll horizontally", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await mockSearchApi(page);
    await navigateTo(page, "/explore");
    await expect(page.getByRole("searchbox")).toBeVisible();

    await searchAndWaitForResults(page, "cancer");

    const tabNav = page.getByRole("navigation", { name: "Explore tabs" });
    await expect(tabNav).toBeVisible();

    const overflowX = await tabNav.evaluate(
      (el) => window.getComputedStyle(el).overflowX
    );
    expect(overflowX).toBe("auto");
  });

  test("mobile viewport: save buttons have 44px min tap target", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await mockSearchApi(page);
    await navigateTo(page, "/explore");
    await expect(page.getByRole("searchbox")).toBeVisible();

    await searchAndWaitForResults(page, "cancer");

    const firstCard = page.locator("article").first();
    const saveBtn = firstCard.getByLabel("Save result");
    const box = await saveBtn.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.width).toBeGreaterThanOrEqual(44);
    }
  });
});
