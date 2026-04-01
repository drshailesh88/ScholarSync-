import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./generated",
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: "json",
  timeout: 60_000,
  use: {
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3000",
    trace: "off",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
