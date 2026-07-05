import { test, expect } from "@playwright/test";

/**
 * Systematic Review — 9-screen funnel (the anti-frankenstein redesign).
 *
 * Replaces the legacy 15-tab pipeline journey. Runs with the v2 modules flag
 * on (NEXT_PUBLIC_ENABLE_V2_MODULES=true); the module is medicine-only and
 * hidden in the default search-only build.
 */

const REVIEW = "http://localhost:3000/systematic-review/sglt2-hf";

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    { name: "__playwright", value: "true", domain: "localhost", path: "/" },
  ]);
});

test.describe("Systematic Review funnel", () => {
  test("review summary shows the funnel spine and live counts", async ({
    page,
  }) => {
    await page.goto(REVIEW);
    await expect(page.locator("body")).not.toContainText("Application error");
    await expect(page.getByText("Review Summary").first()).toBeVisible();
    await expect(page.locator(".sr-module")).toBeVisible();
    // The nine funnel stages are present in the rail.
    for (const label of [
      "Import",
      "Title & abstract",
      "Resolve conflicts",
      "Full-text review",
      "Risk of bias",
      "Data extraction",
      "PRISMA",
      "Report",
      "Export",
    ]) {
      await expect(page.locator(".rail").getByText(label).first()).toBeVisible();
    }
  });

  test("title & abstract screening offers the No/Maybe/Yes vote triad", async ({
    page,
  }) => {
    await page.goto(`${REVIEW}/screening`);
    await expect(page.locator("body")).not.toContainText("Application error");
    await expect(page.locator(".vote.no")).toBeVisible();
    await expect(page.locator(".vote.maybe")).toBeVisible();
    await expect(page.locator(".vote.yes")).toBeVisible();
    // The AI suggestion is ringed but not selected.
    await expect(page.locator(".vote.suggested")).toBeVisible();
    await expect(page.locator(".vote.sel")).toHaveCount(0);
  });

  test("full-text review blocks Exclude until a reason is chosen", async ({
    page,
  }) => {
    await page.goto(`${REVIEW}/full-text`);
    await expect(page.locator("body")).not.toContainText("Application error");
    const exclude = page.locator(".vote.no");
    await expect(exclude).toBeVisible();
    await expect(exclude).toBeDisabled();
  });

  test("PRISMA flow renders auto-generated counts", async ({ page }) => {
    await page.goto(`${REVIEW}/prisma`);
    await expect(page.locator("body")).not.toContainText("Application error");
    await expect(page.getByText("PRISMA 2020 flow diagram")).toBeVisible();
    await expect(page.locator(".pbox").first()).toContainText("412");
    await expect(page.locator(".pbox.inc")).toContainText("12");
  });
});
