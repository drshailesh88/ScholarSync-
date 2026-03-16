import { beforeEach, describe, expect, it, vi } from "vitest";
import { PresentationViewTracker } from "../view-tracker";

describe("PresentationViewTracker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("tracks slide timing and flushes via sendBeacon", () => {
    const beacon = vi.fn();
    Object.defineProperty(global.navigator, "sendBeacon", { value: beacon, configurable: true });

    const tracker = new PresentationViewTracker(1, 2, "share");
    tracker.onSlideEnter("s1", 0);
    vi.advanceTimersByTime(1200);
    tracker.onSlideEnter("s2", 1);
    vi.advanceTimersByTime(1200);
    tracker.flush();

    expect(beacon).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(beacon.mock.calls[0][1]);
    expect(payload.slidesViewed).toBe(2);
    expect(payload.completed).toBe(true);

    tracker.destroy();
  });

  it("does not flush short sessions", () => {
    const beacon = vi.fn();
    Object.defineProperty(global.navigator, "sendBeacon", { value: beacon, configurable: true });
    const tracker = new PresentationViewTracker(1, 1);
    tracker.onSlideEnter("s1", 0);
    vi.advanceTimersByTime(1000);
    tracker.flush();
    expect(beacon).not.toHaveBeenCalled();
  });
});
