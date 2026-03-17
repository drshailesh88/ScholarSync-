import { test, expect } from "@playwright/test";
import { navigateTo } from "../helpers/auth";

const NEW_PROJECT_BUTTON = 'button:has-text("New Project")';
const CREATE_BUTTON = 'button:has-text("Create Project")';

test.describe("project creation form", () => {
  test.beforeEach(async ({ page }) => {
    await navigateTo(page, "/projects");
    await page.locator(NEW_PROJECT_BUTTON).click();
    await expect(page.getByText("Project Name")).toBeVisible();
  });

  test("requires a name and preserves keyboard tab order", async ({ page }) => {
    const createButton = page.locator(CREATE_BUTTON);

    await expect(createButton).toBeDisabled();

    await page.keyboard.press("Tab");
    await expect(page.locator('input[placeholder*="CRISPR Literature Review"]')).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.locator('select').first()).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.locator('input[placeholder*="The Lancet"]').first()).toBeFocused();
  });

  test("accepts boundary, special-character, and unicode values without client-side corruption", async ({
    page,
  }) => {
    const projectName = `A${"b".repeat(118)}🧪`;
    const targetJournal = `Nature "Reviews" <script> '\\ اختبار 中文`;

    await page.locator('input[placeholder*="CRISPR Literature Review"]').fill(projectName);
    await page.locator('input[placeholder*="The Lancet"]').fill(targetJournal);

    await expect(page.locator('input[placeholder*="CRISPR Literature Review"]')).toHaveValue(projectName);
    await expect(page.locator('input[placeholder*="The Lancet"]')).toHaveValue(targetJournal);
  });

  test("sends at most one create request when submit is double-clicked", async ({
    page,
  }) => {
    const createRequests: string[] = [];

    page.on("request", (request) => {
      if (request.method() === "POST") {
        createRequests.push(request.url());
      }
    });

    await page.locator('input[placeholder*="CRISPR Literature Review"]').fill(
      "Systematic review draft"
    );
    await page.locator(CREATE_BUTTON).click({ clickCount: 2, delay: 10 });

    await expect
      .poll(() => createRequests.length, { timeout: 10_000 })
      .toBeGreaterThanOrEqual(1);

    expect(createRequests.length).toBe(1);
  });

  test("submits on Enter from the project name field", async ({ page }) => {
    const requests: string[] = [];

    page.on("request", (request) => {
      if (request.method() === "POST") {
        requests.push(request.url());
      }
    });

    await page.locator('input[placeholder*="CRISPR Literature Review"]').fill(
      "Enter key project"
    );
    await page
      .locator('input[placeholder*="CRISPR Literature Review"]')
      .press("Enter");

    await expect
      .poll(() => requests.length, { timeout: 10_000 })
      .toBeGreaterThanOrEqual(1);
  });
});
