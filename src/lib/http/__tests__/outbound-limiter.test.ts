import { describe, it, expect } from "vitest";
import { refillTokens, createOutboundLimiter } from "../outbound-limiter";

describe("refillTokens", () => {
  it("adds rate*elapsed tokens, capped at burst", () => {
    // 5 rps, 1s elapsed → +5 tokens, but capped at burst 10
    expect(refillTokens(3, 0, 1000, 5, 10)).toBe(8);
    expect(refillTokens(8, 0, 1000, 5, 10)).toBe(10); // capped
    expect(refillTokens(0, 0, 200, 5, 10)).toBeCloseTo(1, 5); // 0.2s * 5 = 1
  });
  it("never exceeds burst and never goes below input on zero elapsed", () => {
    expect(refillTokens(2, 1000, 1000, 5, 10)).toBe(2);
  });
});

describe("createOutboundLimiter", () => {
  it("serves an initial burst immediately, then depletes", async () => {
    const t = 0;
    const lim = createOutboundLimiter({ service: "X", requestsPerSecond: 5, burst: 3, now: () => t });
    expect(lim.available()).toBe(3);
    await lim.acquire();
    await lim.acquire();
    await lim.acquire();
    expect(lim.available()).toBeLessThan(1); // burst consumed at t=0
  });

  it("refills over time per the rate", async () => {
    let t = 0;
    const lim = createOutboundLimiter({ service: "X", requestsPerSecond: 10, burst: 2, now: () => t });
    await lim.acquire();
    await lim.acquire();
    expect(lim.available()).toBeLessThan(1);
    t = 1000; // 1s later at 10 rps → +10, capped at burst 2
    expect(lim.available()).toBe(2);
  });

  it("paces a real burst of acquires (wall-clock spacing)", async () => {
    // 50 rps, burst 1 → after the first, each acquire waits ~20ms.
    const lim = createOutboundLimiter({ service: "X", requestsPerSecond: 50, burst: 1 });
    const start = Date.now();
    await lim.acquire();
    await lim.acquire();
    await lim.acquire();
    expect(Date.now() - start).toBeGreaterThanOrEqual(20); // at least one pacing gap
  });
});
