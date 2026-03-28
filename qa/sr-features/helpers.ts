import { type Page, expect } from "@playwright/test";

export const BASE = "/systematic-review";

export async function authAndGo(page: Page, path: string) {
  await page.context().addCookies([
    { name: "__playwright", value: "true", domain: "127.0.0.1", path: "/" },
    { name: "__playwright_user", value: "dev_user_001", domain: "127.0.0.1", path: "/" },
  ]);
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).toBeVisible();
}

export async function goToHub(page: Page) {
  await authAndGo(page, BASE);
  await page.waitForLoadState("networkidle");
}

export async function goToProject(page: Page, projectId = "1") {
  await authAndGo(page, `${BASE}/${projectId}`);
  await page.waitForLoadState("networkidle");
}

// Tab to phase mapping — only one phase is expanded at a time
const TAB_PHASE: Record<string, string> = {
  "Protocol": "Setup",
  "PROSPERO": "Setup",
  "Search Strategy": "Search",
  "Import Papers": "Search",
  "Snowballing": "Search",
  "AI Screening": "Screen",
  "PRISMA Flow": "Screen",
  "Risk of Bias": "Assess",
  "Data Extraction": "Assess",
  "Meta-Analysis": "Analyze",
  "Network MA": "Analyze",
  "GRADE": "Analyze",
  "Evidence Gap Map": "Analyze",
  "CERQual": "Analyze",
  "Manuscript": "Report",
  "Export": "Report",
  "Audit Trail": "Report",
  "Living Review": "Report",
};

/**
 * Expand a specific phase in the PhaseNavigation sidebar.
 * Only one phase can be expanded at a time.
 */
export async function expandPhase(page: Page, phaseName: string) {
  const phaseBtn = page.locator("nav[aria-label='Review phases'] button").filter({
    hasText: new RegExp(`^${phaseName}$`, "i"),
  }).first();
  if (await phaseBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    const expanded = await phaseBtn.getAttribute("aria-expanded");
    if (expanded !== "true") {
      await phaseBtn.click();
      await page.waitForTimeout(300);
    }
  }
}

/**
 * Expand ALL phases by clicking each one. Note: PhaseNavigation
 * may only keep one expanded at a time, so use expandPhase + switchTab
 * for specific tab navigation instead.
 */
export async function expandAllPhases(page: Page) {
  const phases = ["Setup", "Search", "Screen", "Assess", "Analyze", "Report"];
  for (const phase of phases) {
    await expandPhase(page, phase);
  }
}

/**
 * Navigate to a specific tab by expanding its parent phase first.
 */
export async function switchTab(page: Page, tabLabel: string) {
  const phase = TAB_PHASE[tabLabel];
  if (phase) {
    await expandPhase(page, phase);
  }
  const tabButton = page.locator("nav[aria-label='Review phases'] button").filter({
    hasText: new RegExp(`^${tabLabel}$`, "i"),
  }).first();
  if (await tabButton.isVisible({ timeout: 3000 }).catch(() => false)) {
    await tabButton.click();
    await page.waitForTimeout(500);
  }
}

export async function noRuntimeError(page: Page) {
  await expect(page.locator("body")).not.toContainText("Application error");
  await expect(page.locator("body")).not.toContainText("Unhandled Runtime Error");
}

/**
 * Create a test project if needed and return its ID.
 * Uses the API directly to avoid UI dependencies.
 */
export async function ensureTestProject(page: Page): Promise<string> {
  const response = await page.request.get("/api/systematic-review/projects");
  if (response.ok()) {
    const data = await response.json();
    const projects = Array.isArray(data) ? data : data.projects ?? [];
    if (projects.length > 0) {
      return String(projects[0].id);
    }
  }

  // Create a test project
  const createResp = await page.request.post("/api/systematic-review/config", {
    data: { title: "SR Feature Test Project" },
  });
  if (createResp.ok()) {
    const result = await createResp.json();
    return String(result.project?.id ?? result.id ?? "1");
  }
  return "1";
}
