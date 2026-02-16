import { describe, it, expect } from "vitest";
import { GET } from "../route";

describe("GET /api/health", () => {
  it("returns status ok", async () => {
    const res = await GET();
    const body = await res.json();
    expect(body.status).toBe("ok");
  });

  it("includes a valid ISO timestamp", async () => {
    const res = await GET();
    const body = await res.json();
    expect(body.timestamp).toBeDefined();
    expect(new Date(body.timestamp).toISOString()).toBe(body.timestamp);
  });

  it("includes uptime as a number", async () => {
    const res = await GET();
    const body = await res.json();
    expect(typeof body.uptime).toBe("number");
    expect(body.uptime).toBeGreaterThan(0);
  });
});
