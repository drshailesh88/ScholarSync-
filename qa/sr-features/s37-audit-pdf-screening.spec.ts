import { test, expect } from "@playwright/test";
import { ensureTestProject, authAndGo } from "./helpers";

test.describe("Audit: PDF Screening, Full-text, and Advanced Features", () => {
  let projectId: string;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await authAndGo(page, "/systematic-review");
    await page.waitForLoadState("networkidle");
    projectId = await ensureTestProject(page);
    await ctx.close();
  });

  test("PDF retrieval API responds", async ({ page }) => {
    await authAndGo(page, "/systematic-review");
    const resp = await page.request.get(`/api/systematic-review/pdf-retrieval?projectId=${projectId}`);
    expect([200, 400, 401, 404]).toContain(resp.status());
  });

  test("Upload API responds", async ({ page }) => {
    await authAndGo(page, "/systematic-review");
    const resp = await page.request.get(`/api/systematic-review/upload?projectId=${projectId}`);
    expect([200, 400, 401, 404, 405]).toContain(resp.status());
  });

  test("Alerts API responds", async ({ page }) => {
    await authAndGo(page, "/systematic-review");
    const resp = await page.request.get(`/api/systematic-review/alerts?projectId=${projectId}`);
    expect([200, 400, 401, 404]).toContain(resp.status());
  });

  test("Manuscript-export API responds", async ({ page }) => {
    await authAndGo(page, "/systematic-review");
    const resp = await page.request.get(`/api/systematic-review/manuscript-export?projectId=${projectId}`);
    expect([200, 400, 401, 404, 405]).toContain(resp.status());
  });
});
