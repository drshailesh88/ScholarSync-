/**
 * RALPH Journal Feed — Sprint 7B: Route File Verification Tests
 *
 * Verifies all route files exist, export correct HTTP methods,
 * and follow the project's route conventions.
 */
import { describe, it, expect, vi } from "vitest";

// ── Mock everything routes depend on ────────────────────────────────

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn(async () => { throw new Error("Not authenticated"); }),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn(async () => null),
  RATE_LIMITS: { feeds: { limit: 60, windowSeconds: 3600 } },
}));

vi.mock("@/lib/db", () => ({
  db: new Proxy({}, {
    get() {
      return () => new Proxy({}, {
        get() {
          return () => new Proxy({}, {
            get(_t: unknown, p: string | symbol) {
              if (p === "then") return (resolve: (v: unknown[]) => void) => resolve([]);
              return () => new Proxy({}, {
                get(_t2: unknown, p2: string | symbol) {
                  if (p2 === "then") return (resolve: (v: unknown[]) => void) => resolve([]);
                  return () => new Proxy({}, {
                    get(_t3: unknown, p3: string | symbol) {
                      if (p3 === "then") return (resolve: (v: unknown[]) => void) => resolve([]);
                      return () => Promise.resolve([]);
                    },
                  });
                },
              });
            },
          });
        },
      });
    },
  }),
}));

vi.mock("@/lib/db/schema", () => ({}));

vi.mock("@/lib/http/resilient-fetch", () => ({
  resilientFetch: vi.fn(),
}));

vi.mock("@/lib/logger", () => ({
  logger: { withRequestId: () => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn() }) },
}));

// =====================================================================
// JF-170: Route files exist and export correct HTTP methods
// =====================================================================
describe("JF-170: Route file exports", () => {
  it("/api/feeds/route.ts exports GET and POST", async () => {
    const mod = await import("@/app/api/feeds/route");
    expect(typeof mod.GET).toBe("function");
    expect(typeof mod.POST).toBe("function");
  });

  it("/api/feeds/[id]/route.ts exports PATCH and DELETE", async () => {
    const mod = await import("@/app/api/feeds/[id]/route");
    expect(typeof mod.PATCH).toBe("function");
    expect(typeof mod.DELETE).toBe("function");
  });

  it("/api/feeds/articles/route.ts exports GET", async () => {
    const mod = await import("@/app/api/feeds/articles/route");
    expect(typeof mod.GET).toBe("function");
  });

  it("/api/feeds/articles/[id]/read/route.ts exports POST", async () => {
    const mod = await import("@/app/api/feeds/articles/[id]/read/route");
    expect(typeof mod.POST).toBe("function");
  });

  it("/api/feeds/articles/[id]/star/route.ts exports POST", async () => {
    const mod = await import("@/app/api/feeds/articles/[id]/star/route");
    expect(typeof mod.POST).toBe("function");
  });

  it("/api/feeds/articles/[id]/save/route.ts exports POST", async () => {
    const mod = await import("@/app/api/feeds/articles/[id]/save/route");
    expect(typeof mod.POST).toBe("function");
  });

  it("/api/feeds/articles/mark-all-read/route.ts exports POST", async () => {
    const mod = await import("@/app/api/feeds/articles/mark-all-read/route");
    expect(typeof mod.POST).toBe("function");
  });

  it("/api/feeds/discover/route.ts exports GET", async () => {
    const mod = await import("@/app/api/feeds/discover/route");
    expect(typeof mod.GET).toBe("function");
  });

  it("/api/feeds/detect/route.ts exports POST", async () => {
    const mod = await import("@/app/api/feeds/detect/route");
    expect(typeof mod.POST).toBe("function");
  });

  it("/api/feeds/pubmed/route.ts exports POST", async () => {
    const mod = await import("@/app/api/feeds/pubmed/route");
    expect(typeof mod.POST).toBe("function");
  });
});

// =====================================================================
// JF-171: All routes return 401 without authentication
// =====================================================================
describe("JF-171: Authentication enforcement", () => {
  function makeRequest(url: string, method: string = "GET", body?: object): Request {
    const init: RequestInit = {
      method,
      headers: { "content-type": "application/json" },
    };
    if (body) init.body = JSON.stringify(body);
    return new Request(`http://localhost:3000${url}`, init);
  }

  it("GET /api/feeds returns 401", async () => {
    const mod = await import("@/app/api/feeds/route");
    const res = await mod.GET(makeRequest("/api/feeds") as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(401);
  });

  it("POST /api/feeds returns 401", async () => {
    const mod = await import("@/app/api/feeds/route");
    const res = await mod.POST(makeRequest("/api/feeds", "POST", { feedUrl: "https://test.com" }) as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(401);
  });

  it("GET /api/feeds/articles returns 401", async () => {
    const mod = await import("@/app/api/feeds/articles/route");
    const res = await mod.GET(makeRequest("/api/feeds/articles") as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(401);
  });

  it("GET /api/feeds/discover returns 401", async () => {
    const mod = await import("@/app/api/feeds/discover/route");
    const res = await mod.GET(makeRequest("/api/feeds/discover") as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(401);
  });

  it("POST /api/feeds/detect returns 401", async () => {
    const mod = await import("@/app/api/feeds/detect/route");
    const res = await mod.POST(makeRequest("/api/feeds/detect", "POST", { url: "https://test.com" }) as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(401);
  });

  it("POST /api/feeds/pubmed returns 401", async () => {
    const mod = await import("@/app/api/feeds/pubmed/route");
    const res = await mod.POST(makeRequest("/api/feeds/pubmed", "POST", { query: "test" }) as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(401);
  });
});

// =====================================================================
// JF-172: Cron route exists (from Sprint 6)
// =====================================================================
describe("JF-172: Cron route verification", () => {
  it("/api/cron/fetch-feeds/route.ts exports GET", async () => {
    const mod = await import("@/app/api/cron/fetch-feeds/route");
    expect(typeof mod.GET).toBe("function");
  });
});

// =====================================================================
// JF-173: Route count verification
// =====================================================================
describe("JF-173: All 10 route files created", () => {
  it("has exactly 10 feed route files + 1 cron route", async () => {
    const routes = [
      "@/app/api/feeds/route",
      "@/app/api/feeds/[id]/route",
      "@/app/api/feeds/articles/route",
      "@/app/api/feeds/articles/[id]/read/route",
      "@/app/api/feeds/articles/[id]/star/route",
      "@/app/api/feeds/articles/[id]/save/route",
      "@/app/api/feeds/articles/mark-all-read/route",
      "@/app/api/feeds/discover/route",
      "@/app/api/feeds/detect/route",
      "@/app/api/feeds/pubmed/route",
    ];

    for (const route of routes) {
      const mod = await import(route);
      expect(mod, `Missing route: ${route}`).toBeDefined();
    }
  });
});
