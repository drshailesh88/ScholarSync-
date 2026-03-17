import { test, expect } from "@playwright/test";
import { addPlaywrightAuth } from "../helpers/auth";
import { discoverApiRoutes } from "../helpers/route-discovery";

const mutatingRoutes = discoverApiRoutes().filter((route) =>
  route.methods.some((method) => method === "POST" || method === "PUT")
);

function absoluteUrl(route: string) {
  return new URL(route, process.env.BASE_URL ?? "http://127.0.0.1:3000").toString();
}

const attackCases = [
  { name: "sql-injection", value: `"' OR 1=1 --` },
  { name: "xss", value: `<img src=x onerror=alert(1)>` },
  { name: "nosql-injection", value: `{"$gt":""}` },
  { name: "path-traversal", value: `../../../../etc/passwd` },
  { name: "oversized-payload", value: "A".repeat(120_000) },
] as const;

function buildAttackRequest(
  expectsFormData: boolean,
  attackValue: string
): Record<string, unknown> {
  if (!expectsFormData) {
    return {
      data: {
        title: attackValue,
        content: attackValue,
        query: attackValue,
        text: attackValue,
        prompt: attackValue,
        projectId: 1,
        deckId: 1,
      },
      headers: {
        "content-type": "application/json",
      },
    };
  }

  const formData = new FormData();
  formData.set(
    "file",
    new File(["playwright"], `${attackValue.slice(0, 32)}.txt`, {
      type: "text/plain",
    })
  );
  formData.set(
    "video",
    new File(["playwright"], `${attackValue.slice(0, 32)}.webm`, {
      type: "video/webm",
    })
  );
  formData.set("deckId", "1");
  formData.set("projectId", "1");
  formData.set("title", attackValue);

  return { multipart: formData };
}

test.describe("API injection resistance", () => {
  test.beforeEach(async ({ page }) => {
    await addPlaywrightAuth(page.context());
  });

  for (const attackCase of attackCases) {
    test(`POST/PUT routes do not 500 on ${attackCase.name} probes`, async ({
      page,
    }) => {
      const offenders: string[] = [];

      for (const route of mutatingRoutes) {
        for (const method of route.methods.filter(
          (verb) => verb === "POST" || verb === "PUT"
        )) {
          const response = await page.context().request.fetch(absoluteUrl(route.endpoint), {
            method,
            ...buildAttackRequest(route.expectsFormData, attackCase.value),
            failOnStatusCode: false,
          });

          if (response.status() >= 500) {
            offenders.push(
              `${method} ${route.endpoint} (${attackCase.name}) -> ${response.status()}`
            );
          }

          if (attackCase.name === "xss") {
            const contentType = response.headers()["content-type"] ?? "";
            if (contentType.includes("text/html")) {
              const body = await response.text();
              if (body.includes(attackCase.value) || body.includes("onerror=alert(1)")) {
                offenders.push(`${method} ${route.endpoint} reflected raw XSS payload in HTML`);
              }
            }
          }
        }
      }

      expect(offenders).toEqual([]);
    });
  }
});
