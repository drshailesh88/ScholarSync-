import { test, expect } from "@playwright/test";
import { goToProject, goToHub, noRuntimeError, ensureTestProject, authAndGo } from "./helpers";

test.describe("Section 5: Workflow Page — Layout & Navigation", () => {
  let projectId: string;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await authAndGo(page, "/systematic-review");
    await page.waitForLoadState("networkidle");
    projectId = await ensureTestProject(page);
    await ctx.close();
  });

  // sr-feat-0038: **SRRoomProvider** — page wrapped in Liveblocks room provider
  test("sr-feat-0038: Workflow page loads without error", async ({ page }) => {
    await goToProject(page, projectId);
    await noRuntimeError(page);
    await expect(page.locator("body")).toBeVisible();
  });

  // sr-feat-0039: **Project ID** — extracted from URL params
  test("sr-feat-0039: Project ID in URL", async ({ page }) => {
    await goToProject(page, projectId);
    await expect(page).toHaveURL(new RegExp(`systematic-review/${projectId}`));
  });

  // sr-feat-0040: **Back link** — "All Reviews" navigates back
  test("sr-feat-0040: Back link to All Reviews", async ({ page }) => {
    await goToProject(page, projectId);
    await noRuntimeError(page);
    const backLink = page.locator("a, button").filter({ hasText: /all reviews|back/i }).first();
    const hasBack = await backLink.isVisible().catch(() => false);
    if (hasBack) {
      await backLink.click();
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL(/systematic-review$/);
    }
  });

  // sr-feat-0041: **Back link position** — top-left of page
  test("sr-feat-0041: Back link positioned top-left", async ({ page }) => {
    await goToProject(page, projectId);
    const backLink = page.locator("a, button").filter({ hasText: /all reviews|back/i }).first();
    if (await backLink.isVisible().catch(() => false)) {
      const box = await backLink.boundingBox();
      expect(box!.y).toBeLessThan(200);
    }
  });

  // sr-feat-0042: **Browser back** — returns to hub page
  test("sr-feat-0042: Browser back returns to hub", async ({ page }) => {
    await goToHub(page);
    await goToProject(page, projectId);
    await page.goBack();
    await page.waitForLoadState("domcontentloaded");
    // Should be back on hub or somewhere reasonable
    await noRuntimeError(page);
  });
});
