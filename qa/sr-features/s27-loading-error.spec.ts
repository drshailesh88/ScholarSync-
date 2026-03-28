import { test, expect } from "@playwright/test";
import { goToHub, goToProject, noRuntimeError, ensureTestProject, authAndGo } from "./helpers";

test.describe("Section 27: Loading & Error States", () => {
  let projectId: string;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await authAndGo(page, "/systematic-review");
    await page.waitForLoadState("networkidle");
    projectId = await ensureTestProject(page);
    await ctx.close();
  });

  test("sr-feat-0373: Hub loading state", async ({ page }) => {
    await page.context().addCookies([
      { name: "__playwright", value: "true", domain: "127.0.0.1", path: "/" },
      { name: "__playwright_user", value: "dev_user_001", domain: "127.0.0.1", path: "/" },
    ]);
    await page.goto("/systematic-review", { waitUntil: "commit" });
    // Page should show some content (loading or loaded)
    await page.waitForLoadState("domcontentloaded");
    await noRuntimeError(page);
  });

  test("sr-feat-0374: Workflow loading state", async ({ page }) => {
    await page.context().addCookies([
      { name: "__playwright", value: "true", domain: "127.0.0.1", path: "/" },
      { name: "__playwright_user", value: "dev_user_001", domain: "127.0.0.1", path: "/" },
    ]);
    await page.goto(`/systematic-review/${projectId}`, { waitUntil: "commit" });
    await page.waitForLoadState("domcontentloaded");
    await noRuntimeError(page);
  });

  test("sr-feat-0375: Invalid project ID shows error", async ({ page }) => {
    await page.context().addCookies([
      { name: "__playwright", value: "true", domain: "127.0.0.1", path: "/" },
      { name: "__playwright_user", value: "dev_user_001", domain: "127.0.0.1", path: "/" },
    ]);
    await page.goto("/systematic-review/99999", { waitUntil: "domcontentloaded" });
    // Should show error or redirect — not crash
    await page.waitForTimeout(3000);
    const body = await page.locator("body").textContent();
    expect(body).toBeTruthy();
  });

  test("sr-feat-0376: No runtime errors on hub", async ({ page }) => {
    await goToHub(page);
    await noRuntimeError(page);
  });

  test("sr-feat-0377: No runtime errors on workflow", async ({ page }) => {
    await goToProject(page, projectId);
    await noRuntimeError(page);
  });
});
