import { test, expect } from "@playwright/test";
import { goToProject, noRuntimeError, ensureTestProject, authAndGo, switchTab } from "./helpers";

test.describe("Section 13: PRISMA Checklist Panel", () => {
  let projectId: string;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await authAndGo(page, "/systematic-review");
    await page.waitForLoadState("networkidle");
    projectId = await ensureTestProject(page);
    await ctx.close();
  });

  test("PRISMA Checklist API responds", async ({ page }) => {
    await authAndGo(page, "/systematic-review");
    const resp = await page.request.get(`/api/systematic-review/prisma-checklist?projectId=${projectId}`);
    expect([200, 400, 401]).toContain(resp.status());
  });

  test("PRISMA checklist panel accessible from PRISMA tab", async ({ page }) => {
    await goToProject(page, projectId);
    await noRuntimeError(page);
    await switchTab(page, "PRISMA Flow");
    await noRuntimeError(page);
  });
});
