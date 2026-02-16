import { describe, it, expect, vi, beforeEach } from "vitest";
import { createCircuitBreaker } from "../circuit-breaker";

describe("createCircuitBreaker", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  it("starts in closed state", () => {
    const cb = createCircuitBreaker({ service: "test" });
    expect(cb.state).toBe("closed");
    expect(cb.canRequest()).toBe(true);
  });

  it("stays closed after failures below threshold", () => {
    const cb = createCircuitBreaker({ service: "test", failureThreshold: 3 });
    cb.onFailure();
    cb.onFailure();
    expect(cb.state).toBe("closed");
    expect(cb.canRequest()).toBe(true);
  });

  it("opens after reaching failure threshold", () => {
    const cb = createCircuitBreaker({ service: "test", failureThreshold: 3 });
    cb.onFailure();
    cb.onFailure();
    cb.onFailure();
    expect(cb.state).toBe("open");
    expect(cb.canRequest()).toBe(false);
  });

  it("resets failures on success", () => {
    const cb = createCircuitBreaker({ service: "test", failureThreshold: 3 });
    cb.onFailure();
    cb.onFailure();
    cb.onSuccess();
    expect(cb.state).toBe("closed");
    cb.onFailure();
    cb.onFailure();
    expect(cb.state).toBe("closed");
  });

  it("transitions to half-open after reset timeout", () => {
    const cb = createCircuitBreaker({ service: "test", failureThreshold: 2, resetTimeout: 100 });
    cb.onFailure();
    cb.onFailure();
    expect(cb.state).toBe("open");

    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 200);
    expect(cb.canRequest()).toBe(true);
    expect(cb.state).toBe("half-open");
  });

  it("closes from half-open on success", () => {
    const cb = createCircuitBreaker({ service: "test", failureThreshold: 2, resetTimeout: 100 });
    cb.onFailure();
    cb.onFailure();

    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 200);
    cb.canRequest();
    cb.onSuccess();
    expect(cb.state).toBe("closed");
  });

  it("re-opens from half-open on failure", () => {
    const cb = createCircuitBreaker({ service: "test", failureThreshold: 2, resetTimeout: 100 });
    cb.onFailure();
    cb.onFailure();

    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 200);
    cb.canRequest();
    cb.onFailure();
    expect(cb.state).toBe("open");
  });

  it("uses default threshold of 5", () => {
    const cb = createCircuitBreaker({ service: "test" });
    for (let i = 0; i < 4; i++) cb.onFailure();
    expect(cb.state).toBe("closed");
    cb.onFailure();
    expect(cb.state).toBe("open");
  });

  it("blocks requests when open and timeout not elapsed", () => {
    const cb = createCircuitBreaker({ service: "test", failureThreshold: 1, resetTimeout: 60000 });
    cb.onFailure();
    expect(cb.canRequest()).toBe(false);
  });
});
