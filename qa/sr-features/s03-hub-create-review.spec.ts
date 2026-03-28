import { test, expect } from "@playwright/test";
import { goToHub, noRuntimeError } from "./helpers";

test.describe("Section 3: Hub Page — Create New Review", () => {
  test.beforeEach(async ({ page }) => {
    await goToHub(page);
  });

  // sr-feat-0013: **Button label** — "New Review"
  test("sr-feat-0013: New Review button visible", async ({ page }) => {
    await noRuntimeError(page);
    const btn = page.locator("button").filter({ hasText: /new review/i }).first();
    await expect(btn).toBeVisible();
  });

  // sr-feat-0014: **Icon** — Plus icon displayed in button
  test("sr-feat-0014: Plus icon in New Review button", async ({ page }) => {
    const btn = page.locator("button").filter({ hasText: /new review/i }).first();
    await expect(btn).toBeVisible();
    const svg = btn.locator("svg");
    await expect(svg).toBeVisible();
  });

  // sr-feat-0015: **Click action** — toggles visibility of create form
  test("sr-feat-0015: Clicking New Review toggles create form", async ({ page }) => {
    const btn = page.locator("button").filter({ hasText: /new review/i }).first();
    await btn.click();
    // Form should appear with title input
    const input = page.locator("input[type='text'], input[placeholder*='e.g.'], input[placeholder*='Metformin']").first();
    await expect(input).toBeVisible({ timeout: 5000 });
  });

  // sr-feat-0017: **Title input** — text input for review title
  test("sr-feat-0017: Title input in create form", async ({ page }) => {
    const btn = page.locator("button").filter({ hasText: /new review/i }).first();
    await btn.click();
    const input = page.locator("input").first();
    await expect(input).toBeVisible();
    await input.fill("Test Review Title");
    await expect(input).toHaveValue("Test Review Title");
  });

  // sr-feat-0018: **Placeholder** — example review title
  test("sr-feat-0018: Placeholder text in title input", async ({ page }) => {
    const btn = page.locator("button").filter({ hasText: /new review/i }).first();
    await btn.click();
    const input = page.locator("input[placeholder]").first();
    await expect(input).toBeVisible();
    const placeholder = await input.getAttribute("placeholder");
    expect(placeholder).toBeTruthy();
  });

  // sr-feat-0019: **Create Review button** — submits the form (two-step: Next → Type Select)
  test("sr-feat-0019: Next button exists in create form", async ({ page }) => {
    const btn = page.locator("button").filter({ hasText: /new review/i }).first();
    await btn.click();
    // Two-step flow: first step has "Next" button
    const nextBtn = page.locator("button").filter({ hasText: /next/i }).first();
    await expect(nextBtn).toBeVisible();
  });

  // sr-feat-0021: **Cancel button** — hides the create form
  test("sr-feat-0021: Cancel button hides form", async ({ page }) => {
    const openBtn = page.locator("button").filter({ hasText: /new review/i }).first();
    await openBtn.click();
    const cancelBtn = page.locator("button").filter({ hasText: /cancel/i }).first();
    await expect(cancelBtn).toBeVisible();
    await cancelBtn.click();
    // Form should be hidden
    const input = page.locator("input[placeholder]").first();
    await expect(input).toBeHidden({ timeout: 3000 });
  });

  // sr-feat-0022: **Validation** — empty title cannot be submitted
  test("sr-feat-0022: Empty title validation — Next disabled when empty", async ({ page }) => {
    const openBtn = page.locator("button").filter({ hasText: /new review/i }).first();
    await openBtn.click();
    // Next button should be disabled when input is empty
    const nextBtn = page.locator("button").filter({ hasText: /next/i }).first();
    await expect(nextBtn).toBeVisible();
    await expect(nextBtn).toBeDisabled();
  });

  // sr-feat-0025: **API call** — POST /api/systematic-review/config via type selection
  test("sr-feat-0025: Create flow reaches type selection step", async ({ page }) => {
    const openBtn = page.locator("button").filter({ hasText: /new review/i }).first();
    await openBtn.click();
    const input = page.locator("input").first();
    await input.fill("E2E Test Review " + Date.now());

    const nextBtn = page.locator("button").filter({ hasText: /next/i }).first();
    await nextBtn.click();

    // Should advance to type selection step
    await page.waitForTimeout(1000);
    // Look for review type options
    const typeOption = page.locator("text=/RCT|Intervention|Cohort|Diagnostic|Qualitative|Scoping/i").first();
    await expect(typeOption).toBeVisible({ timeout: 5000 });
  });
});
