import { test, expect, type Page } from "@playwright/test";
import { navigateTo } from "../helpers/auth";

const CONTEXT_INPUT = 'textarea[placeholder*="Optional: Add any additional context"]';
const GENERATE_BUTTON = 'button:has-text("Generate Protocol")';
const PROSPERO_INPUT = 'input[placeholder*="CRD42024"]';
const SAVE_ID_BUTTON = 'button:has-text("Save ID")';

const protocolPayload = {
  protocol: {
    title: "Metformin vs Sulfonylureas",
    generatedAt: "2026-03-17T00:00:00.000Z",
    sections: [
      {
        id: "background",
        title: "Background",
        content: "Mocked protocol content",
        guidance: "Why this matters",
      },
    ],
  },
};

async function stubWorkflowBootstrap(page: Page) {
  await page.route("**/api/systematic-review/config?projectId=1", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        project: {
          id: 1,
          title: "Metformin vs Sulfonylureas",
          status: "planning",
          createdAt: "2026-03-17T00:00:00.000Z",
        },
        config: {
          id: 1,
          projectId: 1,
          pico: null,
          searchStrategy: null,
          searchDatabases: ["pubmed"],
          protocolRegistration: null,
          reviewStage: "search_strategy",
          settings: {},
        },
      }),
    });
  });

  await page.route("**/api/systematic-review/projects", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        projects: [
          {
            id: 1,
            title: "Metformin vs Sulfonylureas",
            reviewStage: "search_strategy",
            paperCount: 12,
            screeningProgress: 33,
          },
        ],
      }),
    });
  });
}

test.describe("systematic review protocol form", () => {
  test.beforeEach(async ({ page }) => {
    await stubWorkflowBootstrap(page);
    await navigateTo(page, "/systematic-review/1");
    await page.getByRole("button", { name: "Protocol", exact: true }).click();
    await expect(page.locator(CONTEXT_INPUT)).toBeVisible();
  });

  test("submits successfully and supports keyboard focus order", async ({ page }) => {
    await page.route("**/api/systematic-review/protocol", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(protocolPayload),
      });
    });

    await page.locator(CONTEXT_INPUT).focus();
    await page.keyboard.press("Tab");
    await expect(page.locator(GENERATE_BUTTON)).toBeFocused();

    await page.locator(CONTEXT_INPUT).fill("Baseline context for the protocol.");
    await page.locator(GENERATE_BUTTON).press("Enter");

    await expect(page.getByText("Background")).toBeVisible();
    await expect(page.getByText("Mocked protocol content")).toBeVisible();
  });

  test("prevents double-submit while generation is in flight", async ({ page }) => {
    let generateRequests = 0;

    await page.route("**/api/systematic-review/protocol", async (route) => {
      generateRequests += 1;
      await new Promise((resolve) => setTimeout(resolve, 250));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(protocolPayload),
      });
    });

    await page.locator(CONTEXT_INPUT).fill("Delayed request context");
    await page.locator(GENERATE_BUTTON).dblclick();

    await expect(page.getByText("Background")).toBeVisible();
    expect(generateRequests).toBe(1);
  });

  test("shows 400 field errors and 500 generic errors", async ({ page }) => {
    await page.route("**/api/systematic-review/protocol", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ error: "Invalid input" }),
      });
    });

    await page.locator(CONTEXT_INPUT).fill("x".repeat(5001));
    await page.locator(GENERATE_BUTTON).click();
    await expect(page.getByText("Invalid input")).toBeVisible();

    await page.unroute("**/api/systematic-review/protocol");
    await page.route("**/api/systematic-review/protocol", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Failed to generate protocol" }),
      });
    });

    await page.locator(GENERATE_BUTTON).click();
    await expect(page.getByText("Failed to generate protocol")).toBeVisible();
  });

  test("preserves max-length, special-character, and unicode values for generation and PROSPERO save", async ({
    page,
  }) => {
    const capturedBodies: Array<Record<string, unknown>> = [];
    const maxContext = "a".repeat(5000);
    const specialContext = `<script>alert("x")</script>'"\\🧪`;
    const prosperoId = "CRD42024RTLاختبار42";

    await page.route("**/api/systematic-review/protocol", async (route) => {
      if (route.request().method() === "POST") {
        capturedBodies.push(route.request().postDataJSON() as Record<string, unknown>);
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(protocolPayload),
        });
        return;
      }

      capturedBodies.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator(CONTEXT_INPUT).fill(maxContext);
    await page.locator(GENERATE_BUTTON).click();
    await expect(page.getByText("Background")).toBeVisible();

    await page.locator(PROSPERO_INPUT).fill(prosperoId);
    await page.locator(SAVE_ID_BUTTON).click();
    await expect(page.getByText("Saved")).toBeVisible();

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Protocol", exact: true }).click();

    await page.locator(CONTEXT_INPUT).fill(specialContext);
    await page.locator(GENERATE_BUTTON).click();

    expect(capturedBodies[0]?.additionalContext).toBe(maxContext);
    expect(capturedBodies[1]?.prosperoId).toBe(prosperoId);
    expect(capturedBodies.at(-1)?.additionalContext).toBe(specialContext);
  });

  test("requires a PROSPERO ID before allowing save", async ({ page }) => {
    await expect(page.locator(SAVE_ID_BUTTON)).toBeDisabled();
    await page.locator(PROSPERO_INPUT).fill("CRD42024000001");
    await expect(page.locator(SAVE_ID_BUTTON)).toBeEnabled();
  });
});
