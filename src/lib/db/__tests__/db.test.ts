import { beforeEach, describe, expect, it, vi } from "vitest";

const postgresMock = vi.fn(() => ({ client: true }));
const drizzleMock = vi.fn(() => ({ query: { ok: true } }));

vi.mock("postgres", () => ({ default: postgresMock }));
vi.mock("drizzle-orm/postgres-js", () => ({ drizzle: drizzleMock }));
vi.mock("../schema", () => ({ any: "schema" }));

describe("db proxy", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env.DATABASE_URL = "postgres://local";
  });

  it("lazily initializes once and proxies properties", async () => {
    const mod = await import("../index");
    expect(postgresMock).not.toHaveBeenCalled();
    expect(mod.db.query).toEqual({ ok: true });
    expect(mod.db.query).toEqual({ ok: true });
    expect(postgresMock).toHaveBeenCalledTimes(1);
    expect(drizzleMock).toHaveBeenCalledTimes(1);
  });

  it("throws when no DATABASE_URL is available", async () => {
    delete process.env.DATABASE_URL;
    const mod = await import("../index");
    expect(() => mod.db.query).toThrow("DATABASE_URL is not set and Hyperdrive is not available");
  });
});
