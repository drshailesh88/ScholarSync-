import { test, expect, type Page } from "@playwright/test";

const AUTH_FALLBACK_TEXT =
  "Configure NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local to enable authentication.";

async function requireClerkForm(page: Page) {
  if (await page.getByText(AUTH_FALLBACK_TEXT).isVisible()) {
    test.skip(true, "Clerk keys are not configured in this environment.");
  }
}

test.describe("auth forms", () => {
  test("sign-in respects required inputs and keyboard navigation when Clerk is available", async ({
    page,
  }) => {
    await page.goto("/sign-in", { waitUntil: "domcontentloaded" });
    await requireClerkForm(page);

    const identifier = page
      .locator('input[name="identifier"], input[type="email"]')
      .first();
    const continueButton = page.getByRole("button", { name: /continue/i }).first();

    await identifier.focus();
    await page.keyboard.press("Tab");
    await expect(continueButton).toBeFocused();

    await continueButton.click();
    await expect(
      page.locator('[aria-invalid="true"], [data-invalid="true"]').first()
    ).toBeVisible();
  });

  test("sign-up accepts special-character and unicode profile data when Clerk is available", async ({
    page,
  }) => {
    await page.goto("/sign-up", { waitUntil: "domcontentloaded" });
    await requireClerkForm(page);

    const firstInput = page.locator("input").first();
    await expect(firstInput).toBeVisible();

    await firstInput.fill(`Ayesha "O'Neil" 🧪`);
    await expect(firstInput).toHaveValue(`Ayesha "O'Neil" 🧪`);
  });
});
