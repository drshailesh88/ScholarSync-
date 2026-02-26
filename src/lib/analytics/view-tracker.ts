/**
 * PresentationViewTracker — lightweight client-side tracker for public share views.
 * Records per-slide timing data and flushes via sendBeacon on page unload.
 */

interface SlideTiming {
  slideId: string;
  slideIndex: number;
  enterTime: number;
  exitTime: number | null;
  durationMs: number;
}

interface TrackViewPayload {
  deckId: number;
  shareToken?: string;
  slideTimings: SlideTiming[];
  totalDurationMs: number;
  slidesViewed: number;
  totalSlides: number;
  completed: boolean;
  userAgent: string;
}

export class PresentationViewTracker {
  private slideTimings: SlideTiming[] = [];
  private currentSlideId: string | null = null;
  private currentSlideIndex: number = 0;
  private currentSlideEnter: number = 0;
  private sessionStart: number = Date.now();
  private totalSlideCount: number = 0;
  private visitedSlides = new Set<string>();
  private flushed = false;

  private deckId: number;
  private shareToken?: string;

  constructor(deckId: number, totalSlides: number, shareToken?: string) {
    this.deckId = deckId;
    this.totalSlideCount = totalSlides;
    this.shareToken = shareToken;

    // Register flush handlers
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", this.handleUnload);
      document.addEventListener("visibilitychange", this.handleVisibility);
    }
  }

  onSlideEnter(slideId: string, slideIndex: number): void {
    // Exit previous slide if any
    if (this.currentSlideId) {
      this.onSlideExit();
    }

    this.currentSlideId = slideId;
    this.currentSlideIndex = slideIndex;
    this.currentSlideEnter = Date.now();
    this.visitedSlides.add(slideId);
  }

  onSlideExit(): void {
    if (!this.currentSlideId) return;

    const now = Date.now();
    const durationMs = now - this.currentSlideEnter;

    this.slideTimings.push({
      slideId: this.currentSlideId,
      slideIndex: this.currentSlideIndex,
      enterTime: this.currentSlideEnter,
      exitTime: now,
      durationMs,
    });

    this.currentSlideId = null;
  }

  private getData(): TrackViewPayload {
    // Exit current slide if still active
    if (this.currentSlideId) {
      this.onSlideExit();
    }

    const totalDurationMs = Date.now() - this.sessionStart;
    const completed = this.visitedSlides.size >= this.totalSlideCount;

    return {
      deckId: this.deckId,
      shareToken: this.shareToken,
      slideTimings: this.slideTimings,
      totalDurationMs,
      slidesViewed: this.visitedSlides.size,
      totalSlides: this.totalSlideCount,
      completed,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };
  }

  flush(): void {
    if (this.flushed) return;
    this.flushed = true;

    const data = this.getData();

    // Only track if the viewer spent at least 2 seconds
    if (data.totalDurationMs < 2000) return;

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/analytics/track-view",
        JSON.stringify(data)
      );
    } else if (typeof fetch !== "undefined") {
      // Fallback for older browsers
      fetch("/api/analytics/track-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(() => {
        // Silently fail - analytics should never break the user experience
      });
    }
  }

  private handleUnload = (): void => {
    this.flush();
  };

  private handleVisibility = (): void => {
    if (document.visibilityState === "hidden") {
      this.flush();
    }
  };

  destroy(): void {
    this.flush();
    if (typeof window !== "undefined") {
      window.removeEventListener("beforeunload", this.handleUnload);
      document.removeEventListener("visibilitychange", this.handleVisibility);
    }
  }
}
