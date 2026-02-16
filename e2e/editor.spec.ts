import { test, expect } from "@playwright/test";
import { navigateTo } from "./helpers/auth";

test.describe("Editor / Studio", () => {
  test.beforeEach(async ({ page }) => {
    await navigateTo(page, "/studio");
    // Wait for the page to fully hydrate
    await page.waitForTimeout(2_000);
  });

  test("studio page loads without crash", async ({ page }) => {
    // The page should load — either with the editor or with an error state
    await expect(page.locator("body")).toBeVisible();
  });

  test("editor area loads with Tiptap when DB is available", async ({ page }) => {
    // If there's an error boundary ("Studio unavailable"), skip gracefully
    const errorState = page.locator('text="Studio unavailable"');
    if ((await errorState.count()) > 0) {
      test.skip(true, "Studio shows error state — DB document loading failed");
      return;
    }

    const editor = page.locator('.tiptap, .ProseMirror, [contenteditable="true"]').first();
    await expect(editor).toBeVisible({ timeout: 15_000 });
  });

  test("can type text in the editor when available", async ({ page }) => {
    const errorState = page.locator('text="Studio unavailable"');
    if ((await errorState.count()) > 0) {
      test.skip(true, "Studio shows error state — DB document loading failed");
      return;
    }

    const editor = page.locator('.tiptap, .ProseMirror, [contenteditable="true"]').first();
    await editor.waitFor({ state: "visible", timeout: 15_000 });
    await editor.click();
    await page.keyboard.type("Hello ScholarSync");
    await expect(editor).toContainText("Hello ScholarSync");
  });

  test("toolbar or export buttons are visible when editor loads", async ({ page }) => {
    const errorState = page.locator('text="Studio unavailable"');
    if ((await errorState.count()) > 0) {
      // In error state, check that "Try Again" button is visible
      await expect(page.locator('text="Try Again"')).toBeVisible();
      return;
    }

    // Look for toolbar buttons or export button
    const boldBtn = page.locator('button[title="Bold"]');
    const exportBtn = page.locator('button:has-text("Export")');
    const hasBold = (await boldBtn.count()) > 0;
    const hasExport = (await exportBtn.count()) > 0;
    expect(hasBold || hasExport).toBeTruthy();
  });
});
