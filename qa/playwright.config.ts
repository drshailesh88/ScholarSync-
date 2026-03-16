import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for QA pipeline tests.
 * Separate from root playwright.config.ts to avoid interference.
 *
 * Key differences:
 * - testDir points to qa/generated/
 * - JSON reporter for machine-readable results
 * - Screenshots on every test (proof artifacts)
 * - Traces always on (evidence for failures)
 * - Longer timeout (features can be complex)
 */
export default defineConfig({
  testDir: "./generated",
  fullyParallel: false, // Sequential within module for state consistency
  forbidOnly: true,
  retries: 0, // Controller handles retries, not Playwright
  workers: 1, // One at a time for deterministic results
  timeout: 60_000,

  reporter: [
    ["json", { outputFile: "./progress/results.json" }],
    ["list"], // Console output for monitoring
  ],

  use: {
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3001",
    trace: "retain-on-failure",
    screenshot: "on", // Always capture screenshots (proof)
    video: "off",
    actionTimeout: 10_000,
    navigationTimeout: 45_000,
  },

  projects: [
    {
      name: "qa-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Dev server — reuse if already running
  webServer: {
    command: "PORT=3001 npm run dev",
    port: 3001,
    reuseExistingServer: true,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
