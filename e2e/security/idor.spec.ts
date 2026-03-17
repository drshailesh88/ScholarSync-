import { test, expect } from "@playwright/test";
import { addPlaywrightAuth } from "../helpers/auth";

function absoluteUrl(route: string) {
  return new URL(route, process.env.BASE_URL ?? "http://127.0.0.1:3000").toString();
}

test.describe("IDOR protection", () => {
  test("systematic review resources cannot be fetched across Playwright test users", async ({
    browser,
  }) => {
    const ownerContext = await browser.newContext();
    const attackerContext = await browser.newContext();

    await addPlaywrightAuth(ownerContext, { userId: "dev_user_001" });
    await addPlaywrightAuth(attackerContext, { userId: "dev_user_002" });

    try {
      const createResponse = await ownerContext.request.fetch(
        absoluteUrl("/api/systematic-review/config"),
        {
          method: "POST",
          data: {
            title: "Playwright IDOR review",
            researchQuestion: "Can user B access user A review data?",
          },
          headers: {
            "content-type": "application/json",
          },
          failOnStatusCode: false,
        }
      );

      expect(createResponse.status()).toBe(201);

      const created = await createResponse.json();
      const projectId = created.project.id as number;

      const configResponse = await attackerContext.request.fetch(
        absoluteUrl(`/api/systematic-review/config?projectId=${projectId}`),
        {
          method: "GET",
          failOnStatusCode: false,
        }
      );
      const protocolResponse = await attackerContext.request.fetch(
        absoluteUrl("/api/systematic-review/protocol"),
        {
          method: "POST",
          data: {
            projectId,
          },
          headers: {
            "content-type": "application/json",
          },
          failOnStatusCode: false,
        }
      );

      expect([403, 404]).toContain(configResponse.status());
      expect([403, 404]).toContain(protocolResponse.status());
    } finally {
      await ownerContext.close();
      await attackerContext.close();
    }
  });
});
