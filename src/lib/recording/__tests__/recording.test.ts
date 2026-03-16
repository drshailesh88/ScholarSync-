import { describe, expect, it, vi } from "vitest";
import { PresentationRecorder } from "../presentation-recorder";

describe("PresentationRecorder", () => {
  it("tracks markers and elapsed time while recording", () => {
    vi.useFakeTimers();
    const recorder = new PresentationRecorder() as unknown as {
      _state: string;
      startTime: number;
      _totalPausedMs: number;
      _elapsedMs: number;
      markSlideTransition: (idx: number) => void;
      markers: Array<{ slideIndex: number; timestampMs: number }>;
      elapsedMs: number;
    };

    recorder._state = "recording";
    recorder.startTime = Date.now();
    recorder._totalPausedMs = 0;
    vi.advanceTimersByTime(1500);
    recorder.markSlideTransition(2);

    expect(recorder.elapsedMs).toBe(1500);
    expect(recorder.markers[0].slideIndex).toBe(2);
  });

  it("pause/resume are no-ops without mediaRecorder", () => {
    const recorder = new PresentationRecorder();
    expect(() => recorder.pause()).not.toThrow();
    expect(() => recorder.resume()).not.toThrow();
  });

  it("rejects stopRecording when idle", async () => {
    const recorder = new PresentationRecorder();
    await expect(recorder.stopRecording()).rejects.toThrow("No active recording");
  });
});
