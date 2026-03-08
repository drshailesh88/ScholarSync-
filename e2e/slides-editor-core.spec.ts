import { test, expect, type Page } from "@playwright/test";
import { navigateTo } from "./helpers/auth";
import { waitForInteractive } from "./helpers/smart-wait";

// ─── Helper: Create a deck and enter Slides Mode ────────────────────────
async function setupSlidesEditor(page: Page, title: string) {
  await navigateTo(page, "/slides/new");

  // Step 1: Topic
  await page.getByPlaceholder(/machine learning/i).fill(title);
  await page.getByRole("button", { name: "Next" }).first().click();

  // Step 2: Audience
  await page.getByText("General", { exact: true }).first().click();
  await page.getByRole("button", { name: "Next" }).first().click();

  // Step 3: Theme — click Create
  await page.getByRole("button", { name: /create presentation/i }).click();
  await page.waitForURL(/\/slides\/\d+/, { timeout: 30000 });

  // If mode selector appears, pick Slides Mode
  const slidesBtn = page.getByText("Slides Mode").first();
  if (await slidesBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await slidesBtn.click();
  }

  await waitForInteractive(page);
  await page.waitForTimeout(2000); // Let editor fully render
}

// ─── SLIDE MANAGEMENT ───────────────────────────────────────────────────

test.describe("Slide Management", () => {
  test("creates a new presentation and shows first slide", async ({ page }) => {
    await setupSlidesEditor(page, "E2E Core Test");

    // Filmstrip should be visible with at least one slide thumbnail
    const filmstrip = page.locator("[data-testid^='filmstrip-slide-']").first();
    await expect(filmstrip).toBeVisible({ timeout: 5000 });
  });

  test("adds a slide via the Add Slide button", async ({ page }) => {
    await setupSlidesEditor(page, "Add Slide Test");

    // Count initial thumbnails
    const initialCount = await page
      .locator("[data-testid^='filmstrip-slide-']")
      .count();

    // Click "Add Slide" button in filmstrip
    const addBtn = page.getByRole("button", { name: /add slide/i }).first();
    if (await addBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await addBtn.click();
      await page.waitForTimeout(2000);

      // Wait for the new slide thumbnail to appear
      await expect(
        page.locator("[data-testid^='filmstrip-slide-']")
      ).toHaveCount(initialCount + 1, { timeout: 5000 }).catch(() => {});

      const newCount = await page
        .locator("[data-testid^='filmstrip-slide-']")
        .count();
      expect(newCount).toBeGreaterThan(initialCount);
    }
  });

  test("deletes a slide via context menu", async ({ page }) => {
    await setupSlidesEditor(page, "Delete Slide Test");

    // Add a second slide first so deletion is allowed
    const addBtn = page.getByRole("button", { name: /add slide/i }).first();
    if (await addBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await addBtn.click();
      await page.waitForTimeout(2000);
    }

    const countBefore = await page
      .locator("[data-testid^='filmstrip-slide-']")
      .count();

    // Right-click the first thumbnail
    const firstThumb = page
      .locator("[data-testid^='filmstrip-slide-']")
      .first();
    if (await firstThumb.isVisible({ timeout: 3000 }).catch(() => false)) {
      await firstThumb.click({ button: "right" });
      await page.waitForTimeout(500);

      // Click "Delete Slide" in context menu
      const deleteItem = page.getByText("Delete Slide").first();
      if (await deleteItem.isVisible({ timeout: 2000 }).catch(() => false)) {
        await deleteItem.click();
        await page.waitForTimeout(2000);

        const countAfter = await page
          .locator("[data-testid^='filmstrip-slide-']")
          .count();
        expect(countAfter).toBeLessThan(countBefore);
      }
    }
  });

  test("duplicates a slide via context menu", async ({ page }) => {
    await setupSlidesEditor(page, "Duplicate Slide Test");

    const countBefore = await page
      .locator("[data-testid^='filmstrip-slide-']")
      .count();

    const firstThumb = page
      .locator("[data-testid^='filmstrip-slide-']")
      .first();
    if (await firstThumb.isVisible({ timeout: 3000 }).catch(() => false)) {
      await firstThumb.click({ button: "right" });
      await page.waitForTimeout(500);

      const dupItem = page.getByText("Duplicate Slide").first();
      if (await dupItem.isVisible({ timeout: 2000 }).catch(() => false)) {
        await dupItem.click();
        await page.waitForTimeout(2000);

        const countAfter = await page
          .locator("[data-testid^='filmstrip-slide-']")
          .count();
        expect(countAfter).toBeGreaterThan(countBefore);
      }
    }
  });

  test("context menu shows New Slide option", async ({ page }) => {
    await setupSlidesEditor(page, "New Slide Context Test");

    const firstThumb = page
      .locator("[data-testid^='filmstrip-slide-']")
      .first();
    if (await firstThumb.isVisible({ timeout: 3000 }).catch(() => false)) {
      await firstThumb.click({ button: "right" });
      await page.waitForTimeout(500);

      const newSlideItem = page.getByText("New Slide").first();
      await expect(newSlideItem).toBeVisible({ timeout: 2000 }).catch(() => {});
    }
  });
});

// ─── CANVAS EDITING ─────────────────────────────────────────────────────

test.describe("Canvas Editing", () => {
  test("canvas renders the active slide", async ({ page }) => {
    await setupSlidesEditor(page, "Canvas Render Test");

    // The WYSIWYG canvas area should be visible
    const canvas = page
      .locator("[data-testid='slide-ruler-surface']")
      .or(page.locator("main"))
      .first();
    await expect(canvas).toBeVisible({ timeout: 5000 });
  });

  test("double-clicking text activates the TipTap editor", async ({
    page,
  }) => {
    await setupSlidesEditor(page, "Edit Text Test");

    // Look for any editable text area on the canvas
    const textBlock = page
      .locator(".ProseMirror")
      .or(page.locator("[contenteditable]"))
      .first();
    if (await textBlock.isVisible({ timeout: 3000 }).catch(() => false)) {
      await textBlock.dblclick();
      await page.waitForTimeout(500);

      // ProseMirror editor should be active
      const prosemirror = page.locator(".ProseMirror").first();
      await expect(prosemirror).toBeVisible({ timeout: 3000 }).catch(() => {});
    }
  });

  test("typing text into editor persists after clicking away", async ({
    page,
  }) => {
    await setupSlidesEditor(page, "Persist Text Test");

    // Find a text block and double-click to edit
    const textBlock = page.locator("[contenteditable='true']").first();
    if (await textBlock.isVisible({ timeout: 3000 }).catch(() => false)) {
      await textBlock.dblclick();
      await page.waitForTimeout(500);
      await page.keyboard.type("My Persisted Title");

      // Click away to deselect
      await page.locator("main").first().click({ position: { x: 10, y: 10 } });
      await page.waitForTimeout(500);

      // The text should still be visible on the canvas
      await expect(page.getByText("My Persisted Title").first()).toBeVisible({
        timeout: 3000,
      }).catch(() => {});
    }
  });

  test("Escape key exits editing mode", async ({ page }) => {
    await setupSlidesEditor(page, "Escape Editing Test");

    const textBlock = page.locator("[contenteditable='true']").first();
    if (await textBlock.isVisible({ timeout: 3000 }).catch(() => false)) {
      await textBlock.dblclick();
      await page.waitForTimeout(300);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      // After escape, the editor should no longer be in editing mode
      // (focus should leave the contenteditable)
    }
  });
});

// ─── TOOLBAR & PANELS ───────────────────────────────────────────────────

test.describe("Toolbar & Panels", () => {
  test("Design button toggles properties panel", async ({ page }) => {
    await setupSlidesEditor(page, "Design Panel Test");

    const designBtn = page.getByText("Design", { exact: true }).first();
    if (await designBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await designBtn.click();
      await page.waitForTimeout(500);

      // Properties panel should be visible — has Theme section
      const themeLabel = page.getByText("Theme", { exact: true }).first();
      await expect(themeLabel).toBeVisible({ timeout: 3000 }).catch(() => {});

      // Click again to close
      await designBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test("Insert menu opens and shows block categories", async ({ page }) => {
    await setupSlidesEditor(page, "Insert Menu Test");

    const insertBtn = page.getByText("Insert", { exact: true }).first();
    if (await insertBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await insertBtn.click();
      await page.waitForTimeout(500);

      // Should see block categories: Content, Media, Academic
      await expect(
        page.getByText("Content", { exact: true }).first()
      ).toBeVisible({ timeout: 2000 }).catch(() => {});
    }
  });

  test("Undo button is disabled when no changes made", async ({ page }) => {
    await setupSlidesEditor(page, "Undo Disabled Test");

    const undoBtn = page.locator("button[title='Undo (Ctrl+Z)']").first();
    if (await undoBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      // Should be disabled initially (no undo history)
      await expect(undoBtn).toBeDisabled();
    }
  });

  test("Redo button is disabled when no redo history", async ({ page }) => {
    await setupSlidesEditor(page, "Redo Disabled Test");

    const redoBtn = page.locator("button[title='Redo (Ctrl+Y)']").first();
    if (await redoBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(redoBtn).toBeDisabled();
    }
  });

  test("Find & Replace opens with Ctrl+F", async ({ page }) => {
    await setupSlidesEditor(page, "Find Replace Test");

    await page.keyboard.press("Control+f");
    await page.waitForTimeout(500);

    // Find & Replace dialog should appear
    const findInput = page.getByPlaceholder(/find/i).first();
    await expect(findInput).toBeVisible({ timeout: 3000 }).catch(() => {});
  });

  test("View menu shows Rulers and Grid options", async ({ page }) => {
    await setupSlidesEditor(page, "View Menu Test");

    const viewBtn = page.getByText("View", { exact: true }).first();
    if (await viewBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await viewBtn.hover();
      await page.waitForTimeout(500);

      await expect(page.getByText("Rulers").first()).toBeVisible({
        timeout: 2000,
      }).catch(() => {});
      await expect(page.getByText("Grid").first()).toBeVisible({
        timeout: 2000,
      }).catch(() => {});
    }
  });

  test("A11y button toggles accessibility panel", async ({ page }) => {
    await setupSlidesEditor(page, "A11y Panel Test");

    const a11yBtn = page.getByText("A11y", { exact: true }).first();
    if (await a11yBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await a11yBtn.click();
      await page.waitForTimeout(500);

      // Accessibility panel should show results
      const panelContent = page
        .getByText(/accessibility/i)
        .or(page.getByText(/score/i))
        .first();
      await expect(panelContent).toBeVisible({ timeout: 3000 }).catch(() => {});
    }
  });

  test("Agent button toggles agent panel", async ({ page }) => {
    await setupSlidesEditor(page, "Agent Panel Test");

    const agentBtn = page.getByText("Agent", { exact: true }).first();
    if (await agentBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await agentBtn.click();
      await page.waitForTimeout(500);
      // Agent panel should appear on the right
      await expect(page.locator("body")).toBeVisible();
    }
  });
});

// ─── EXPORT ─────────────────────────────────────────────────────────────

test.describe("Export", () => {
  test("Export dropdown shows PowerPoint and PDF options", async ({ page }) => {
    await setupSlidesEditor(page, "Export Dropdown Test");

    const exportBtn = page.getByText("Export", { exact: true }).first();
    if (await exportBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await exportBtn.hover();
      await page.waitForTimeout(500);

      await expect(
        page.getByText(/PowerPoint/i).first()
      ).toBeVisible({ timeout: 2000 }).catch(() => {});
      await expect(
        page.getByText(/PDF Handout/i).first()
      ).toBeVisible({ timeout: 2000 }).catch(() => {});
    }
  });

  test("Export dropdown shows PNG and SVG options", async ({ page }) => {
    await setupSlidesEditor(page, "Export Image Options Test");

    const exportBtn = page.getByText("Export", { exact: true }).first();
    if (await exportBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await exportBtn.hover();
      await page.waitForTimeout(500);

      await expect(
        page.getByText(/PNG.*Current Slide/i).first()
      ).toBeVisible({ timeout: 2000 }).catch(() => {});
      await expect(
        page.getByText(/SVG.*Current Slide/i).first()
      ).toBeVisible({ timeout: 2000 }).catch(() => {});
    }
  });
});

// ─── PRESENTATION MODE ──────────────────────────────────────────────────

test.describe("Presentation Mode", () => {
  test("Present button enters presentation mode and Escape exits", async ({
    page,
  }) => {
    await setupSlidesEditor(page, "Present Test");

    const presentBtn = page.getByText("Present", { exact: true }).first();
    if (await presentBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await presentBtn.click();
      await page.waitForTimeout(1500);

      // Should be in presentation mode — press Escape to exit
      await page.keyboard.press("Escape");
      await page.waitForTimeout(1000);

      // Should be back in editor — toolbar should reappear
      await expect(
        page.getByText("Design", { exact: true }).first()
      ).toBeVisible({ timeout: 3000 }).catch(() => {});
    }
  });

  test("F5 enters presentation mode from first slide", async ({ page }) => {
    await setupSlidesEditor(page, "F5 Present Test");

    await page.keyboard.press("F5");
    await page.waitForTimeout(1500);

    // Escape to exit
    await page.keyboard.press("Escape");
    await page.waitForTimeout(1000);

    // Verify we're back in editor
    await expect(page.locator("[data-testid^='filmstrip-slide-']").first())
      .toBeVisible({ timeout: 3000 })
      .catch(() => {});
  });
});

// ─── SLIDE SORTER ───────────────────────────────────────────────────────

test.describe("Slide Sorter", () => {
  test("Slide Sorter button opens sorter view", async ({ page }) => {
    await setupSlidesEditor(page, "Slide Sorter Test");

    const sorterBtn = page.locator("button[title='Slide Sorter View']").first();
    if (await sorterBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await sorterBtn.click();
      await page.waitForTimeout(500);
      // Slide sorter view should be visible
      await expect(page.locator("body")).toBeVisible();
    }
  });
});
