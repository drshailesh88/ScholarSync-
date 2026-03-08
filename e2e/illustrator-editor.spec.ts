import { expect, test, type Locator, type Page } from "@playwright/test";
import { navigateTo } from "./helpers/auth";

type CanvasDebugWindow = Window & {
  __SCHOLARSYNC_ILLUSTRATOR_CANVAS__?: {
    getObjects: () => Array<{
      type?: string;
      left?: number;
      top?: number;
      fill?: unknown;
      get?: (key: string) => unknown;
      isGrid?: boolean;
    }>;
    selectObjectsByIndexes?: (indexes: number[]) => number;
    clearSelection?: () => void;
  } | null;
};

function attachConsoleGuards(page: Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  return async () => {
    expect(errors, errors.join("\n")).toEqual([]);
  };
}

async function waitForIllustratorCanvas(page: Page) {
  await expect(page.getByTestId("illustrator-canvas")).toBeVisible({ timeout: 15_000 });
  await expect
    .poll(async () => {
      return page.evaluate(() => {
        return Boolean((window as CanvasDebugWindow).__SCHOLARSYNC_ILLUSTRATOR_CANVAS__);
      });
    }, { timeout: 15_000 })
    .toBe(true);
}

async function getCanvasBox(page: Page) {
  const box = await page.getByTestId("illustrator-canvas").boundingBox();
  expect(box).not.toBeNull();
  return box!;
}

async function drawOnCanvas(
  page: Page,
  start: { x: number; y: number },
  end: { x: number; y: number }
) {
  const box = await getCanvasBox(page);
  await page.mouse.move(box.x + start.x, box.y + start.y);
  await page.mouse.down();
  await page.mouse.move(box.x + end.x, box.y + end.y, { steps: 8 });
  await page.mouse.up();
}

async function clickCanvas(page: Page, point: { x: number; y: number }, modifiers?: Array<"Shift">) {
  const box = await getCanvasBox(page);
  for (const modifier of modifiers ?? []) {
    await page.keyboard.down(modifier);
  }

  await page.mouse.click(box.x + point.x, box.y + point.y);

  for (const modifier of [...(modifiers ?? [])].reverse()) {
    await page.keyboard.up(modifier);
  }
}

async function setReactInputValue(locator: Locator, value: string) {
  await locator.evaluate((element, nextValue) => {
    const input = element as HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    )?.set;

    input.focus();
    setter?.call(input, nextValue);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.blur();
  }, value);
}

async function selectCanvasObjects(page: Page, indexes: number[]) {
  await expect
    .poll(async () => {
      return page.evaluate((targetIndexes) => {
        const canvas = (window as CanvasDebugWindow).__SCHOLARSYNC_ILLUSTRATOR_CANVAS__;
        return canvas?.selectObjectsByIndexes?.(targetIndexes) ?? 0;
      }, indexes);
    })
    .toBe(indexes.length);
}

async function getObjectSummaries(page: Page) {
  return page.evaluate(() => {
    const canvas = (window as CanvasDebugWindow).__SCHOLARSYNC_ILLUSTRATOR_CANVAS__;
    if (!canvas) {
      return [];
    }

    return canvas
      .getObjects()
      .filter((object) => !object.isGrid && object.get?.("data-type") !== "connector")
      .map((object) => ({
        type: object.type ?? "",
        left: Math.round(object.left ?? 0),
        top: Math.round(object.top ?? 0),
        hasGradient: Boolean(
          object.fill &&
            typeof object.fill === "object" &&
            "colorStops" in (object.fill as Record<string, unknown>)
        ),
      }));
  });
}

async function getCanvasObjectCount(page: Page) {
  return page.evaluate(() => {
    const canvas = (window as CanvasDebugWindow).__SCHOLARSYNC_ILLUSTRATOR_CANVAS__;
    if (!canvas) {
      return 0;
    }

    return canvas
      .getObjects()
      .filter((object) => !object.isGrid && object.get?.("data-type") !== "connector").length;
  });
}

async function openPropertiesTab(page: Page): Promise<Locator> {
  const tab = page.getByRole("tab", { name: "Properties" });
  await expect(tab).toBeVisible();
  if ((await tab.getAttribute("aria-selected")) !== "true") {
    await tab.click();
  }
  const panel = page.getByRole("tabpanel", { name: "Properties" });
  await expect(panel.getByTestId("transform-x-input")).toBeVisible();
  return panel;
}

async function waitForObjectCount(page: Page, count: number) {
  await expect
    .poll(async () => {
      return getCanvasObjectCount(page);
    })
    .toBe(count);
}

test.describe("Illustrator Editor", () => {
  test("loads editor, draws shapes, edits transforms, aligns objects, and applies gradients", async ({
    page,
  }) => {
    const assertNoConsoleErrors = attachConsoleGuards(page);

    await navigateTo(page, "/illustrate/editor");
    await waitForIllustratorCanvas(page);

    await expect(page.getByRole("toolbar", { name: "Illustration tools" })).toBeVisible();
    await expect(page.getByRole("toolbar", { name: "Drawing tools" })).toBeVisible();

    const drawingToolbar = page.getByRole("toolbar", { name: "Drawing tools" });

    await drawingToolbar.getByRole("button", { name: "Rectangle" }).click();
    await drawOnCanvas(page, { x: 80, y: 80 }, { x: 220, y: 180 });
    await waitForObjectCount(page, 1);

    await drawingToolbar.getByLabel("Select", { exact: true }).click();
    await clickCanvas(page, { x: 150, y: 130 });

    const propertiesPanel = await openPropertiesTab(page);
    await expect(propertiesPanel.getByTestId("transform-y-input")).toBeVisible();
    await expect(propertiesPanel.getByTestId("transform-w-input")).toBeVisible();
    await expect(propertiesPanel.getByTestId("transform-h-input")).toBeVisible();

    const xInput = propertiesPanel.getByTestId("transform-x-input");
    await setReactInputValue(xInput, "100");

    await expect
      .poll(async () => {
        const [first] = await getObjectSummaries(page);
        return first?.left ?? null;
      })
      .toBe(100);

    await drawingToolbar.getByRole("button", { name: "Rectangle" }).click();
    await drawOnCanvas(page, { x: 300, y: 220 }, { x: 430, y: 320 });
    await waitForObjectCount(page, 2);

    await drawingToolbar.getByLabel("Select", { exact: true }).click();
    await selectCanvasObjects(page, [0, 1]);

    await expect(page.getByText(/Selected:\s*2 objects/i)).toBeVisible();
    await page.getByRole("button", { name: "Align Left" }).click();

    await expect
      .poll(async () => {
        const objects = await getObjectSummaries(page);
        return objects.length === 2 && objects[0].left === objects[1].left;
      })
      .toBe(true);

    await selectCanvasObjects(page, [0]);
    const gradientPanel = await openPropertiesTab(page);
    await gradientPanel.getByRole("button", { name: "Linear" }).click();

    await expect
      .poll(async () => {
        const [first] = await getObjectSummaries(page);
        return first?.hasGradient ?? false;
      })
      .toBe(true);

    await assertNoConsoleErrors();
  });

  test("exports PNG and runs Pathfinder Unite with undo", async ({
    page,
  }) => {
    const assertNoConsoleErrors = attachConsoleGuards(page);

    await navigateTo(page, "/illustrate/editor");
    await waitForIllustratorCanvas(page);

    const drawingToolbar = page.getByRole("toolbar", { name: "Drawing tools" });

    await drawingToolbar.getByRole("button", { name: "Rectangle" }).click();
    await drawOnCanvas(page, { x: 90, y: 100 }, { x: 250, y: 220 });

    await drawingToolbar.getByRole("button", { name: "Ellipse" }).click();
    await drawOnCanvas(page, { x: 180, y: 140 }, { x: 330, y: 260 });

    await waitForObjectCount(page, 2);

    await drawingToolbar.getByLabel("Select", { exact: true }).click();
    await selectCanvasObjects(page, [0, 1]);
    const pathfinderPanel = await openPropertiesTab(page);

    await pathfinderPanel.getByRole("button", { name: "Unite" }).click();
    await waitForObjectCount(page, 1);

    await page.getByRole("button", { name: "Undo" }).first().click();
    await waitForObjectCount(page, 2);

    await page.getByText("File", { exact: true }).click();
    await page.getByRole("button", { name: "Export..." }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /^Export$/ }).last().click();
    const download = await downloadPromise;
    expect(download.suggestedFilename().toLowerCase()).toContain(".png");

    await assertNoConsoleErrors();
  });

  test("opens the icon browser, searches heart, and inserts an icon on the canvas", async ({
    page,
  }) => {
    await navigateTo(page, "/illustrate/editor");
    await expect(page.getByTestId("illustrator-canvas")).toBeVisible({ timeout: 15_000 });

    await page.getByRole("tab", { name: "Icons" }).click();
    await page.getByLabel("Search icons").fill("heart");
    await page.getByRole("button", { name: /Icon: .*heart/i }).first().click();
    await expect(page.getByTitle("Insert icon on canvas")).toBeVisible();
    await page.getByTitle("Insert icon on canvas").click();
    await page.waitForTimeout(1_000);
    expect(await getCanvasObjectCount(page)).toBe(1);
  });
});
