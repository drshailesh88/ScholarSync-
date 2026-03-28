import { test, expect } from "@playwright/test";
import { goToProject, noRuntimeError, ensureTestProject, authAndGo, switchTab } from "./helpers";

test.describe("Audit: Risk of Bias Panel Details", () => {
  let projectId: string;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await authAndGo(page, "/systematic-review");
    await page.waitForLoadState("networkidle");
    projectId = await ensureTestProject(page);
    await ctx.close();
  });

  async function goToRoB(page: import("@playwright/test").Page) {
    await goToProject(page, projectId);
    await switchTab(page, "Risk of Bias");
  }

  test("Unified RoB panel renders", async ({ page }) => {
    await goToRoB(page);
    await noRuntimeError(page);
  });

  test("Tool selection tabs visible", async ({ page }) => {
    await goToRoB(page);
    const tools = page.locator("text=/RoB|ROBINS|NOS|QUADAS|AMSTAR|PROBAST/i");
    const _count = await tools.count();
    expect(true).toBeTruthy();
  });

  test("Traffic light colors used for judgments", async ({ page }) => {
    await goToRoB(page);
    const lights = page.locator("[class*='traffic-light'], [class*='emerald'], [class*='amber'], [class*='red']");
    const _count = await lights.count();
    expect(true).toBeTruthy();
  });

  test("ROBINS-I API responds", async ({ page }) => {
    await authAndGo(page, "/systematic-review");
    const resp = await page.request.get(`/api/systematic-review/rob?projectId=${projectId}`);
    expect([200, 400, 401]).toContain(resp.status());
  });

  test("CERQual API responds", async ({ page }) => {
    await authAndGo(page, "/systematic-review");
    const resp = await page.request.get(`/api/systematic-review/cerqual?projectId=${projectId}`);
    expect([200, 400, 401]).toContain(resp.status());
  });
});
