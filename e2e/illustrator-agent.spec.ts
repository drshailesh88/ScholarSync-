import { expect, test, type Page } from "@playwright/test";
import { navigateTo } from "./helpers/auth";

const FLOWCHART_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="240" viewBox="0 0 480 240">
    <rect x="40" y="40" width="140" height="56" rx="12" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
    <text x="110" y="74" text-anchor="middle" font-family="Arial" font-size="18">Start</text>
    <rect x="260" y="40" width="180" height="56" rx="12" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
    <text x="350" y="74" text-anchor="middle" font-family="Arial" font-size="18">Review papers</text>
    <path d="M180 68H260" stroke="#334155" stroke-width="3" marker-end="url(#arrow)" />
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
      </marker>
    </defs>
  </svg>
`;

const CONSORT_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
    <rect x="220" y="30" width="200" height="52" rx="12" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
    <text x="320" y="62" text-anchor="middle" font-family="Arial" font-size="18">Assessed for eligibility</text>
    <rect x="90" y="150" width="180" height="52" rx="12" fill="#e0f2fe" stroke="#0369a1" stroke-width="2"/>
    <text x="180" y="182" text-anchor="middle" font-family="Arial" font-size="18">Allocated to intervention</text>
    <rect x="370" y="150" width="180" height="52" rx="12" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
    <text x="460" y="182" text-anchor="middle" font-family="Arial" font-size="18">Allocated to control</text>
    <path d="M320 82V130" stroke="#334155" stroke-width="3"/>
    <path d="M320 130H180V150" stroke="#334155" stroke-width="3"/>
    <path d="M320 130H460V150" stroke="#334155" stroke-width="3"/>
  </svg>
`;

const FOLLOW_UP_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="680" height="420" viewBox="0 0 680 420">
    <rect x="220" y="30" width="200" height="52" rx="12" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
    <text x="320" y="62" text-anchor="middle" font-family="Arial" font-size="18">Assessed for eligibility</text>
    <rect x="90" y="150" width="180" height="52" rx="12" fill="#e0f2fe" stroke="#0369a1" stroke-width="2"/>
    <text x="180" y="182" text-anchor="middle" font-family="Arial" font-size="18">Allocated to intervention</text>
    <rect x="370" y="150" width="180" height="52" rx="12" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
    <text x="460" y="182" text-anchor="middle" font-family="Arial" font-size="18">Allocated to control</text>
    <rect x="250" y="290" width="180" height="52" rx="12" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
    <text x="340" y="322" text-anchor="middle" font-family="Arial" font-size="18">Follow-up complete</text>
    <path d="M320 82V130" stroke="#334155" stroke-width="3"/>
    <path d="M320 130H180V150" stroke="#334155" stroke-width="3"/>
    <path d="M320 130H460V150" stroke="#334155" stroke-width="3"/>
    <path d="M340 202V290" stroke="#334155" stroke-width="3"/>
  </svg>
`;

type CanvasDebugWindow = Window & {
  __SCHOLARSYNC_ILLUSTRATOR_CANVAS__?: {
    getObjects: () => Array<{ isGrid?: boolean; get?: (key: string) => unknown }>;
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

async function mockIllustrationGeneration(page: Page) {
  await page.route("**/api/illustration/generate", async (route) => {
    const body = route.request().postDataJSON() as { prompt?: string };
    const prompt = body.prompt?.toLowerCase() ?? "";

    const illustration =
      prompt.includes("consort")
        ? CONSORT_SVG
        : prompt.includes("follow-up")
          ? FOLLOW_UP_SVG
          : FLOWCHART_SVG;

    await new Promise((resolve) => setTimeout(resolve, 250));

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        illustration: {
          content: illustration,
          backend: "mock-svg",
          format: "svg",
          caption: "Mock illustration ready.",
          vectorized: true,
          pathCount: 6,
        },
      }),
    });
  });
}

async function resetAgentStorage(page: Page) {
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

async function getIllustratorObjectCount(page: Page) {
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

test.describe("Illustrator Agent", () => {
  test.beforeEach(async ({ page }) => {
    await resetAgentStorage(page);
    await mockIllustrationGeneration(page);
  });

  test("generates a flowchart, shows loading state, and exports from agent mode", async ({
    page,
  }) => {
    const assertNoConsoleErrors = attachConsoleGuards(page);

    await navigateTo(page, "/illustrate/agent");
    await expect(page.getByLabel("Agent prompt input")).toBeVisible();

    await page.getByLabel("Agent prompt input").fill("draw a flowchart");
    await page.getByRole("button", { name: "Send prompt" }).click();

    await expect(page.getByText("Generating diagram...")).toBeVisible();
    await expect(page.getByText("Mock illustration ready.")).toBeVisible();
    await expect(page.getByText("Start").first()).toBeVisible();

    await page.getByRole("button", { name: "Open export options" }).click();
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Export PNG" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename().toLowerCase()).toContain(".png");

    await assertNoConsoleErrors();
  });

  test("handles CONSORT generation, SVG export, follow-up update, and edit handoff to editor", async ({
    page,
  }) => {
    const assertNoConsoleErrors = attachConsoleGuards(page);

    await navigateTo(page, "/illustrate/agent");
    await expect(page.getByLabel("Agent prompt input")).toBeVisible();

    await page.getByLabel("Agent prompt input").fill("Create a CONSORT diagram");
    await page.getByRole("button", { name: "Send prompt" }).click();

    await expect(page.getByText("Generating diagram...")).toBeVisible();
    await expect(page.getByText("Mock illustration ready.")).toBeVisible();

    await page.getByRole("button", { name: "Open export options" }).click();
    const svgDownloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Export SVG" }).click();
    const svgDownload = await svgDownloadPromise;
    expect(svgDownload.suggestedFilename().toLowerCase()).toContain(".svg");

    await page.getByLabel("Agent prompt input").fill("Add a box for follow-up");
    await page.getByRole("button", { name: "Send prompt" }).click();
    await expect(page.getByText("Follow-up complete").first()).toBeVisible();

    await page.getByRole("button", { name: "Edit diagram in editor" }).nth(1).click();
    await page.waitForURL(/\/illustrate\/editor\?import=agent/);
    await expect(page.getByTestId("illustrator-canvas")).toBeVisible();

    await expect
      .poll(async () => {
        return getIllustratorObjectCount(page);
      })
      .toBeGreaterThan(0);

    await page
      .getByRole("toolbar", { name: "Drawing tools" })
      .getByLabel("Select", { exact: true })
      .click();
    const box = await page.getByTestId("illustrator-canvas").boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);

    await page.getByRole("tab", { name: "Properties" }).click();
    await expect(page.getByTestId("transform-x-input")).toBeVisible();

    await assertNoConsoleErrors();
  });
});
