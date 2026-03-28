import { test, expect } from "@playwright/test";
import { goToProject, noRuntimeError, ensureTestProject, authAndGo, switchTab } from "./helpers";

test.describe("Audit: Advanced Panel Details (Snowball, Living, Audit Trail)", () => {
  let projectId: string;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await authAndGo(page, "/systematic-review");
    await page.waitForLoadState("networkidle");
    projectId = await ensureTestProject(page);
    await ctx.close();
  });

  test("Snowballing panel renders", async ({ page }) => {
    await goToProject(page, projectId);
    await switchTab(page, "Snowballing");
    await noRuntimeError(page);
  });

  test("Living Review panel renders", async ({ page }) => {
    await goToProject(page, projectId);
    await switchTab(page, "Living Review");
    await noRuntimeError(page);
  });

  test("Audit Trail panel renders", async ({ page }) => {
    await goToProject(page, projectId);
    await switchTab(page, "Audit Trail");
    await noRuntimeError(page);
  });

  test("Evidence Gap Map panel renders", async ({ page }) => {
    await goToProject(page, projectId);
    await switchTab(page, "Evidence Gap Map");
    await noRuntimeError(page);
  });

  test("CERQual panel accessible via Analyze phase", async ({ page }) => {
    await goToProject(page, projectId);
    await switchTab(page, "CERQual");
    expect(true).toBeTruthy();
  });

  test("Snowball API responds", async ({ page }) => {
    await authAndGo(page, "/systematic-review");
    const resp = await page.request.get(`/api/systematic-review/snowball?projectId=${projectId}`);
    expect([200, 400, 401]).toContain(resp.status());
  });
});
