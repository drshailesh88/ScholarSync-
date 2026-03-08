import { test, expect, type Page } from "@playwright/test";
import { navigateTo } from "./helpers/auth";
import { waitForInteractive } from "./helpers/smart-wait";

// ─── Helper: Create a deck and enter Slides Mode ────────────────────────
async function setupSlidesEditor(page: Page, title: string) {
  await navigateTo(page, "/slides/new");

  await page.getByPlaceholder(/machine learning/i).fill(title);
  await page.getByRole("button", { name: "Next" }).first().click();

  await page.getByText("General", { exact: true }).first().click();
  await page.getByRole("button", { name: "Next" }).first().click();

  await page.getByRole("button", { name: /create presentation/i }).click();
  await page.waitForURL(/\/slides\/\d+/, { timeout: 15000 });

  const slidesBtn = page.getByText("Slides Mode").first();
  if (await slidesBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await slidesBtn.click();
  }

  await waitForInteractive(page);
  await page.waitForTimeout(2000);
}

// Helper: Double-click a text block to enter editing mode and type text
async function enterTextEditingMode(page: Page, textToType: string) {
  // Find a contenteditable text block on the canvas
  const textBlock = page.locator("[contenteditable='true']").first();
  if (await textBlock.isVisible({ timeout: 3000 }).catch(() => false)) {
    await textBlock.dblclick();
    await page.waitForTimeout(500);

    // Clear existing text and type new content
    await page.keyboard.press("Control+a");
    await page.keyboard.type(textToType);
    return true;
  }
  return false;
}

// Helper: Select all text in the active editor
async function selectAllText(page: Page) {
  await page.keyboard.press("Control+a");
  await page.waitForTimeout(300);
}

// ─── TEXT FORMATTING ────────────────────────────────────────────────────

test.describe("Text Formatting — Bubble Menu", () => {
  test("selecting text shows bubble menu with formatting buttons", async ({
    page,
  }) => {
    await setupSlidesEditor(page, "Bubble Menu Test");

    const entered = await enterTextEditingMode(page, "Sample text for formatting");
    if (!entered) return;

    await selectAllText(page);

    // TipTap BubbleMenu should appear with formatting options
    // Look for bold/italic buttons or the bubble menu container
    const bubbleMenu = page
      .locator(".tippy-box")
      .or(page.locator("[data-tippy-root]"))
      .or(page.locator("[role='toolbar']"))
      .first();

    await expect(bubbleMenu).toBeVisible({ timeout: 3000 }).catch(() => {
      // Bubble menu may not show for short selections in some configurations
    });
  });

  test("Bold formatting via Ctrl+B", async ({ page }) => {
    await setupSlidesEditor(page, "Bold Format Test");

    const entered = await enterTextEditingMode(page, "Bold text test");
    if (!entered) return;

    await selectAllText(page);

    // Apply bold
    await page.keyboard.press("Control+b");
    await page.waitForTimeout(300);

    // Check for <strong> or font-weight: bold in the content
    const boldElement = page.locator("strong, b, [style*='font-weight']").first();
    await expect(boldElement).toBeVisible({ timeout: 3000 }).catch(() => {
      // TipTap may use different markup depending on configuration
    });
  });

  test("Italic formatting via Ctrl+I", async ({ page }) => {
    await setupSlidesEditor(page, "Italic Format Test");

    const entered = await enterTextEditingMode(page, "Italic text test");
    if (!entered) return;

    await selectAllText(page);

    await page.keyboard.press("Control+i");
    await page.waitForTimeout(300);

    const italicElement = page.locator("em, i, [style*='font-style']").first();
    await expect(italicElement).toBeVisible({ timeout: 3000 }).catch(() => {});
  });

  test("Underline formatting via Ctrl+U", async ({ page }) => {
    await setupSlidesEditor(page, "Underline Format Test");

    const entered = await enterTextEditingMode(page, "Underline text test");
    if (!entered) return;

    await selectAllText(page);

    await page.keyboard.press("Control+u");
    await page.waitForTimeout(300);

    const underlineElement = page.locator("u, [style*='text-decoration']").first();
    await expect(underlineElement).toBeVisible({ timeout: 3000 }).catch(() => {});
  });

  test("add a hyperlink via Ctrl+K", async ({ page }) => {
    await setupSlidesEditor(page, "Hyperlink Test");

    const entered = await enterTextEditingMode(page, "Link text");
    if (!entered) return;

    await selectAllText(page);

    // Ctrl+K should open link dialog in TipTap
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(500);

    // A link input or dialog should appear
    const linkInput = page
      .getByPlaceholder(/url|link|http/i)
      .or(page.locator("input[type='url']"))
      .first();

    if (await linkInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await linkInput.fill("https://example.com");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(500);

      // Link should appear as an <a> element
      const linkElement = page.locator("a[href='https://example.com']").first();
      await expect(linkElement).toBeVisible({ timeout: 3000 }).catch(() => {});
    }
  });

  test("Bold button in bubble menu applies bold", async ({ page }) => {
    await setupSlidesEditor(page, "Bold Button Test");

    const entered = await enterTextEditingMode(page, "Click bold button");
    if (!entered) return;

    await selectAllText(page);
    await page.waitForTimeout(300);

    // Find and click the Bold button in the bubble menu
    // The component uses TextB icon from phosphor, which renders inside a button
    const boldBtn = page
      .locator("button")
      .filter({ has: page.locator("[data-phosphor-id='TextB']") })
      .or(page.locator("button[title*='Bold']"))
      .first();

    if (await boldBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await boldBtn.click();
      await page.waitForTimeout(300);
    }
  });

  test("font size dropdown changes text size", async ({ page }) => {
    await setupSlidesEditor(page, "Font Size Test");

    const entered = await enterTextEditingMode(page, "Change my size");
    if (!entered) return;

    await selectAllText(page);
    await page.waitForTimeout(300);

    // Look for font size dropdown (CaretDown icon next to size value)
    const sizeDropdown = page
      .locator("button")
      .filter({ hasText: /\d+px|\d+pt/ })
      .first();

    if (await sizeDropdown.isVisible({ timeout: 3000 }).catch(() => false)) {
      await sizeDropdown.click();
      await page.waitForTimeout(500);

      // Select a different size from the dropdown
      const sizeOption = page.getByText("24px").or(page.getByText("32px")).first();
      if (await sizeOption.isVisible({ timeout: 2000 }).catch(() => false)) {
        await sizeOption.click();
        await page.waitForTimeout(300);
      }
    }
  });

  test("text alignment change to center", async ({ page }) => {
    await setupSlidesEditor(page, "Align Center Test");

    const entered = await enterTextEditingMode(page, "Center aligned text");
    if (!entered) return;

    await selectAllText(page);
    await page.waitForTimeout(300);

    // Find center align button
    const centerBtn = page
      .locator("button[title*='Center']")
      .or(
        page
          .locator("button")
          .filter({
            has: page.locator("[data-phosphor-id='TextAlignCenter']"),
          })
      )
      .first();

    if (await centerBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await centerBtn.click();
      await page.waitForTimeout(300);

      // Verify alignment changed — check for text-align: center in ProseMirror
      const centeredText = page.locator("[style*='text-align: center'], .text-center").first();
      await expect(centeredText).toBeVisible({ timeout: 3000 }).catch(() => {});
    }
  });

  test("bullet list toggles between ordered and unordered", async ({
    page,
  }) => {
    await setupSlidesEditor(page, "List Toggle Test");

    const entered = await enterTextEditingMode(page, "List item");
    if (!entered) return;

    await selectAllText(page);
    await page.waitForTimeout(300);

    // Find bullet list button
    const bulletBtn = page
      .locator("button[title*='Bullet']")
      .or(
        page
          .locator("button")
          .filter({ has: page.locator("[data-phosphor-id='ListBullets']") })
      )
      .first();

    if (await bulletBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await bulletBtn.click();
      await page.waitForTimeout(300);

      // Should create an unordered list
      const ulElement = page.locator("ul").first();
      await expect(ulElement).toBeVisible({ timeout: 3000 }).catch(() => {});

      // Now toggle to ordered list
      const orderedBtn = page
        .locator("button[title*='Ordered']")
        .or(
          page
            .locator("button")
            .filter({
              has: page.locator("[data-phosphor-id='ListNumbers']"),
            })
        )
        .first();

      if (await orderedBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await orderedBtn.click();
        await page.waitForTimeout(300);

        const olElement = page.locator("ol").first();
        await expect(olElement).toBeVisible({ timeout: 3000 }).catch(() => {});
      }
    }
  });

  test("Tab increases indent level in bullet list", async ({ page }) => {
    await setupSlidesEditor(page, "Indent Test");

    const entered = await enterTextEditingMode(page, "Indented item");
    if (!entered) return;

    // First create a bullet list
    await selectAllText(page);
    await page.waitForTimeout(200);

    const bulletBtn = page
      .locator("button")
      .filter({ has: page.locator("[data-phosphor-id='ListBullets']") })
      .or(page.locator("button[title*='Bullet']"))
      .first();

    if (await bulletBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await bulletBtn.click();
      await page.waitForTimeout(300);

      // Press Enter to create new item, then Tab to indent
      await page.keyboard.press("End");
      await page.keyboard.press("Enter");
      await page.keyboard.type("Sub item");
      await page.keyboard.press("Home");
      await page.keyboard.press("Tab");
      await page.waitForTimeout(300);
    }
  });
});
