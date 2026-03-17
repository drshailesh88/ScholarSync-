import { test, expect } from "@playwright/test";
import { navigateTo } from "../helpers/auth";

const SEARCH_INPUT = 'input[placeholder*="Search 200M+"]';
const SEARCH_BUTTON = 'button:has-text("Search")';

function searchResponse(title: string) {
  return {
    results: [
      {
        title,
        authors: ["Ada Lovelace", "Alan Turing"],
        journal: "Playwright Medicine",
        year: 2025,
        citationCount: 12,
        studyType: "rct",
        abstract: "Runtime-mocked result",
        doi: "10.1000/playwright",
        isOpenAccess: true,
        publicationTypes: [],
        sources: ["pubmed"],
      },
    ],
    total: 1,
    page: 0,
    perPage: 20,
    hasMore: false,
    sourceCounts: {
      pubmed: 1,
      semanticScholar: 0,
      openAlex: 0,
      clinicalTrials: 0,
    },
    augmentedQueries: null,
  };
}

test.describe("research search form", () => {
  test.beforeEach(async ({ page }) => {
    await navigateTo(page, "/research");
  });

  test("supports valid submissions, Enter submit, and keyboard tab order", async ({
    page,
  }) => {
    await page.route("**/api/search/unified**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(searchResponse("SGLT2 outcome trial")),
      });
    });

    await page.locator(SEARCH_INPUT).focus();
    await expect(page.locator(SEARCH_INPUT)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.locator(SEARCH_BUTTON)).toBeFocused();

    await page.locator(SEARCH_INPUT).fill("SGLT2 inhibitors cardiovascular outcomes");
    await page.locator(SEARCH_INPUT).press("Enter");

    await expect(page.getByText("SGLT2 outcome trial")).toBeVisible();
  });

  test("blocks empty submission requests and prevents double submit while loading", async ({
    page,
  }) => {
    let requestCount = 0;

    await page.route("**/api/search/unified**", async (route) => {
      requestCount += 1;
      await new Promise((resolve) => setTimeout(resolve, 250));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(searchResponse("Delayed search result")),
      });
    });

    await page.locator(SEARCH_BUTTON).click();
    await expect.poll(() => requestCount).toBe(0);

    await page.locator(SEARCH_INPUT).fill("oncology biomarkers");
    await page.locator(SEARCH_BUTTON).dblclick();

    await expect(page.getByText("Delayed search result")).toBeVisible();
    await expect.poll(() => requestCount).toBe(1);
  });

  test("surfaces server 400 and 500 responses while keeping focus on the query input", async ({
    page,
  }) => {
    await page.locator(SEARCH_INPUT).fill("x".repeat(501));

    await page.route("**/api/search/unified**", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Query parameter 'q' must not exceed 500 characters",
        }),
      });
    });

    await page.locator(SEARCH_BUTTON).click();
    await expect(
      page.getByText("Query parameter 'q' must not exceed 500 characters")
    ).toBeVisible();

    await page.unroute("**/api/search/unified**");
    await page.route("**/api/search/unified**", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal server error" }),
      });
    });

    await page.locator(SEARCH_BUTTON).click();
    await expect(page.getByText("Internal server error")).toBeVisible();
  });

  test("preserves boundary, special-character, and unicode inputs over the wire", async ({
    page,
  }) => {
    const exactBoundary = "a".repeat(500);
    const specialChars = `<script>alert("x")</script>'"\\`;
    const unicodeValue = "🧪 اختبار بحث 疫苗";
    const observedQueries: string[] = [];

    await page.route("**/api/search/unified**", async (route) => {
      const url = new URL(route.request().url());
      observedQueries.push(url.searchParams.get("q") ?? "");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(searchResponse("Encoded query result")),
      });
    });

    for (const value of [exactBoundary, specialChars, unicodeValue]) {
      await page.locator(SEARCH_INPUT).fill(value);
      await page.locator(SEARCH_BUTTON).click();
      await expect(page.getByText("Encoded query result")).toBeVisible();
    }

    expect(observedQueries).toEqual([exactBoundary, specialChars, unicodeValue]);
  });
});
