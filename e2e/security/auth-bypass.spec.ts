import { test, expect } from "@playwright/test";
import { clearPlaywrightAuth } from "../helpers/auth";
import { discoverApiRoutes, discoverProtectedPages } from "../helpers/route-discovery";

const protectedPages = discoverProtectedPages();
const protectedApiRoutes = discoverApiRoutes().filter((route) => route.requiresAuth);

function absoluteUrl(route: string) {
  return new URL(route, process.env.BASE_URL ?? "http://127.0.0.1:3000").toString();
}

function buildProbeBody(expectsFormData: boolean) {
  if (!expectsFormData) {
    return {
      data: {
        title: "playwright-auth-probe",
        projectId: 1,
      },
      headers: {
        "content-type": "application/json",
      },
    };
  }

  const formData = new FormData();
  formData.set("file", new File(["playwright"], "probe.txt", { type: "text/plain" }));
  formData.set("video", new File(["playwright"], "probe.webm", { type: "video/webm" }));
  formData.set("deckId", "1");
  formData.set("projectId", "1");

  return { multipart: formData };
}

test.describe("auth bypass protection", () => {
  test.skip(
    process.env.PLAYWRIGHT_AUTH_STRICT !== "1",
    "Run with PLAYWRIGHT_AUTH_STRICT=1 so unauthenticated requests do not fall back to the dev user."
  );

  test("every protected page redirects unauthenticated users to /sign-in", async ({
    page,
  }) => {
    const offenders: string[] = [];

    await clearPlaywrightAuth(page.context());

    for (const route of protectedPages) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      if (!page.url().includes("/sign-in")) {
        offenders.push(`${route} -> ${page.url()}`);
      }
    }

    expect(offenders).toEqual([]);
  });

  test("every auth-protected API route rejects unauthenticated access with 401", async ({
    page,
  }) => {
    const offenders: string[] = [];

    await clearPlaywrightAuth(page.context());

    for (const route of protectedApiRoutes) {
      for (const method of route.methods) {
        const response = await page.context().request.fetch(absoluteUrl(route.endpoint), {
          method,
          ...buildProbeBody(route.expectsFormData),
          failOnStatusCode: false,
        });

        if (response.status() !== 401) {
          offenders.push(`${method} ${route.endpoint} -> ${response.status()}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});
