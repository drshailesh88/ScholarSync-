import { test, expect } from "@playwright/test";
import { navigateTo } from "../helpers/auth";

test.describe("settings account form", () => {
  test.beforeEach(async ({ page }) => {
    await navigateTo(page, "/settings");
    await expect(page.getByText("My Account")).toBeVisible();
  });

  test("supports keyboard tab order across the profile fields", async ({ page }) => {
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "My Account" })).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Plans & Billing" })).toBeFocused();
  });

  test("does not add an empty research-interest chip and adds one on Enter", async ({
    page,
  }) => {
    const chipInput = page.locator('input[placeholder*="Type an interest"]');

    await chipInput.fill("   ");
    await chipInput.press("Enter");
    await expect(
      page.getByText(
        "nothing here yet. Add your research interests below to get started."
      )
    ).toBeVisible();

    await chipInput.fill("🧪 systematic review / اختبار / 中文");
    await chipInput.press("Enter");
    await expect(
      page.getByText("🧪 systematic review / اختبار / 中文")
    ).toBeVisible();
  });

  test("preserves special characters and unicode across editable profile fields", async ({
    page,
  }) => {
    await page.locator('input[placeholder="Dr. Jane Doe"]').fill(
      `Dr. Jane "O'Neil" 🧪`
    );
    await page
      .locator('input[placeholder*="Cardiology"]')
      .fill(`AIIMS <script>alert(1)</script>`);
    await page.locator('input[placeholder*="India"]').fill("الإمارات العربية المتحدة");
    await page
      .locator('textarea[placeholder*="research background"]')
      .fill(`Mixed punctuation ' " \\ and CJK: 研究`);

    await expect(page.locator('input[placeholder="Dr. Jane Doe"]')).toHaveValue(
      `Dr. Jane "O'Neil" 🧪`
    );
    await expect(page.locator('input[placeholder*="Cardiology"]')).toHaveValue(
      `AIIMS <script>alert(1)</script>`
    );
    await expect(page.locator('input[placeholder*="India"]')).toHaveValue(
      "الإمارات العربية المتحدة"
    );
    await expect(
      page.locator('textarea[placeholder*="research background"]')
    ).toHaveValue(`Mixed punctuation ' " \\ and CJK: 研究`);
  });

  test("emits a single save request on double click", async ({ page }) => {
    const saveRequests: string[] = [];

    page.on("request", (request) => {
      if (request.method() === "POST") {
        saveRequests.push(request.url());
      }
    });

    await page.locator('input[placeholder="Dr. Jane Doe"]').fill("Dr. Rahul Sharma");
    await page
      .getByRole("button", { name: "Save Changes" })
      .click({ clickCount: 2, delay: 10 });

    await expect
      .poll(() => saveRequests.length, { timeout: 10_000 })
      .toBeGreaterThanOrEqual(1);

    expect(saveRequests.length).toBe(1);
  });
});
