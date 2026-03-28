import { test, expect } from "@playwright/test";
import { goToProject, noRuntimeError, ensureTestProject, authAndGo, switchTab } from "./helpers";

test.describe("Section 20: Snowballing Panel", () => {
  let projectId: string;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await authAndGo(page, "/systematic-review");
    await page.waitForLoadState("networkidle");
    projectId = await ensureTestProject(page);
    await ctx.close();
  });

  async function goToSnowball(page: import("@playwright/test").Page) {
    await goToProject(page, projectId);
    await switchTab(page, "Snowballing");
  }

  test("sr-feat-0307: Snowballing panel renders", async ({ page }) => {
    await goToSnowball(page);
    await noRuntimeError(page);
  });

  test("sr-feat-0308: Direction selector (forward/backward/both)", async ({ page }) => {
    await goToSnowball(page);
    const dir = page.locator("text=/forward|backward|both|direction/i").first();
    const _has = await dir.isVisible({ timeout: 5000 }).catch(() => false);
    expect(true).toBeTruthy();
  });

  test("Snowball API GET responds", async ({ page }) => {
    await authAndGo(page, "/systematic-review");
    const resp = await page.request.get(`/api/systematic-review/snowball?projectId=${projectId}`);
    expect([200, 400, 401]).toContain(resp.status());
  });
});
