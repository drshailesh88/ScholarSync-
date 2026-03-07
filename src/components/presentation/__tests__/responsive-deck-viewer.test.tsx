// @vitest-environment jsdom

import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import {
  ResponsiveDeckViewer,
  detectSwipeDirection,
} from "../responsive-deck-viewer";
import {
  computeScaleFactor,
  SLIDE_REF_WIDTH,
  SLIDE_REF_HEIGHT,
} from "@/components/slides/shared/slide-renderer-v2";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock("@/components/slides/shared/slide-renderer-v2", async () => {
  const actual = await vi.importActual<
    typeof import("@/components/slides/shared/slide-renderer-v2")
  >("@/components/slides/shared/slide-renderer-v2");

  return {
    ...actual,
    SlideRendererV2: ({
      title,
      slideNumber,
    }: {
      title?: string | null;
      slideNumber?: number;
    }) => (
      <div data-testid="mock-slide">
        <span data-testid="slide-title">{title ?? "Untitled"}</span>
        <span data-testid="slide-number">{slideNumber}</span>
      </div>
    ),
  };
});

let mockViewport: {
  width: number;
  height: number;
  breakpoint: "mobile" | "tablet" | "desktop";
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  minTouchTarget: number;
} = {
  width: 1200,
  height: 800,
  breakpoint: "desktop",
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  minTouchTarget: 24,
};

vi.mock("@/hooks/use-media-query", () => ({
  useMediaQuery: () => mockViewport,
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  motion: {
    div: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [k: string]: unknown;
    }) => <div {...filterMotionProps(props)}>{children}</div>,
  },
}));

function filterMotionProps(
  props: Record<string, unknown>
): Record<string, unknown> {
  const filtered: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(props)) {
    if (
      [
        "variants",
        "initial",
        "animate",
        "exit",
        "custom",
        "transition",
        "layoutId",
      ].includes(key)
    )
      continue;
    filtered[key] = val;
  }
  return filtered;
}

vi.mock("@phosphor-icons/react", () => ({
  ArrowLeft: () => <span>ArrowLeft</span>,
  ArrowRight: () => <span>ArrowRight</span>,
  ArrowsOutSimple: () => <span>Expand</span>,
  ArrowsInSimple: () => <span>Collapse</span>,
  ShareNetwork: () => <span>Share</span>,
}));

// Mock ResizeObserver
class MockResizeObserver {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe() {
    // Fire immediately with a mock entry
    this.callback(
      [
        {
          contentRect: { width: 800, height: 450 },
        } as unknown as ResizeObserverEntry,
      ],
      this as unknown as ResizeObserver
    );
  }
  unobserve() {}
  disconnect() {}
}

(globalThis as Record<string, unknown>).ResizeObserver = MockResizeObserver;

// ---------------------------------------------------------------------------
// Test data
// ---------------------------------------------------------------------------

function makeSlides(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    sortOrder: i,
    layout: "title_content",
    title: `Slide ${i + 1}`,
    subtitle: null,
    contentBlocks: [],
    speakerNotes: null,
  }));
}

const defaultProps = {
  title: "Test Deck",
  slides: makeSlides(5),
  theme: "modern",
  themeConfig: null,
};

// ---------------------------------------------------------------------------
// Unit tests: computeScaleFactor
// ---------------------------------------------------------------------------

describe("computeScaleFactor", () => {
  it("computes correct scale for 375px viewport (mobile)", () => {
    const scale = computeScaleFactor(375);
    expect(scale).toBeCloseTo(375 / SLIDE_REF_WIDTH, 5);
    // 375 / 960 ≈ 0.390625
    expect(scale).toBeCloseTo(0.390625, 5);
  });

  it("computes correct scale for 1920px viewport", () => {
    const scale = computeScaleFactor(1920);
    expect(scale).toBe(2);
  });

  it("computes scale = 1 at reference width", () => {
    expect(computeScaleFactor(SLIDE_REF_WIDTH)).toBe(1);
  });

  it("returns 1 for zero or negative container width", () => {
    expect(computeScaleFactor(0)).toBe(1);
    expect(computeScaleFactor(-100)).toBe(1);
  });

  it("returns 1 for zero reference width", () => {
    expect(computeScaleFactor(500, 0)).toBe(1);
  });

  it("uses custom reference width", () => {
    expect(computeScaleFactor(400, 800)).toBe(0.5);
  });
});

// ---------------------------------------------------------------------------
// Unit tests: detectSwipeDirection
// ---------------------------------------------------------------------------

describe("detectSwipeDirection", () => {
  it("detects left swipe", () => {
    // dx=-80, dy=10, dt=200ms
    expect(detectSwipeDirection(-80, 10, 200)).toBe("left");
  });

  it("detects right swipe", () => {
    expect(detectSwipeDirection(80, 10, 200)).toBe("right");
  });

  it("detects tap", () => {
    // Small movement, short duration
    expect(detectSwipeDirection(3, 2, 100)).toBe("tap");
  });

  it("returns null for slow swipe (exceeds max time)", () => {
    expect(detectSwipeDirection(-80, 10, 600)).toBeNull();
  });

  it("returns null for diagonal movement", () => {
    // dx=60, dy=60 — not predominantly horizontal
    expect(detectSwipeDirection(60, 60, 200)).toBeNull();
  });

  it("returns null for short swipe (below threshold)", () => {
    expect(detectSwipeDirection(-30, 5, 200)).toBeNull();
  });

  it("returns null for vertical scroll", () => {
    expect(detectSwipeDirection(10, -100, 200)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Component tests
// ---------------------------------------------------------------------------

describe("ResponsiveDeckViewer", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    // Reset to desktop
    mockViewport = {
      width: 1200,
      height: 800,
      breakpoint: "desktop",
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      minTouchTarget: 24,
    };
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders the first slide", () => {
    act(() => {
      root.render(<ResponsiveDeckViewer {...defaultProps} />);
    });

    const slideTitle = container.querySelector(
      '[data-testid="slide-title"]'
    );
    expect(slideTitle?.textContent).toBe("Slide 1");
  });

  it("shows slide counter", () => {
    act(() => {
      root.render(<ResponsiveDeckViewer {...defaultProps} />);
    });

    const counter = container.querySelector('[data-testid="slide-counter"]');
    expect(counter?.textContent).toBe("1 / 5");
  });

  it("shows no slides message when slides array is empty", () => {
    act(() => {
      root.render(
        <ResponsiveDeckViewer {...defaultProps} slides={[]} />
      );
    });

    expect(container.textContent).toContain("no slides");
  });

  describe("desktop layout", () => {
    it("shows prev/next arrows", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      const prevBtn = container.querySelector(
        '[aria-label="Previous slide"]'
      );
      const nextBtn = container.querySelector('[aria-label="Next slide"]');
      expect(prevBtn).toBeTruthy();
      expect(nextBtn).toBeTruthy();
    });

    it("does not show navigation dots", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      const dots = container.querySelector('[data-testid="navigation-dots"]');
      expect(dots).toBeNull();
    });

    it("shows ScholarSync branding", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      expect(container.textContent).toContain("ScholarSync");
    });
  });

  describe("mobile layout", () => {
    beforeEach(() => {
      mockViewport = {
        width: 375,
        height: 667,
        breakpoint: "mobile",
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        minTouchTarget: 44,
      };
    });

    it("shows navigation dots", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      const dots = container.querySelector(
        '[data-testid="navigation-dots"]'
      );
      expect(dots).toBeTruthy();
    });

    it("navigation dots count matches slide count", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      const dots = container.querySelectorAll(
        '[data-testid="navigation-dots"] button'
      );
      expect(dots.length).toBe(5);
    });

    it("hides prev/next arrows", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      const prevBtn = container.querySelector(
        '[aria-label="Previous slide"]'
      );
      const nextBtn = container.querySelector('[aria-label="Next slide"]');
      expect(prevBtn).toBeNull();
      expect(nextBtn).toBeNull();
    });

    it("shows share and fullscreen buttons", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      const shareBtn = container.querySelector(
        '[aria-label="Share presentation"]'
      );
      const fsBtn = container.querySelector(
        '[aria-label="Enter fullscreen"]'
      );
      expect(shareBtn).toBeTruthy();
      expect(fsBtn).toBeTruthy();
    });

    it("hides ScholarSync branding", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      const toolbar = container.querySelector('[data-testid="toolbar"]');
      expect(toolbar?.textContent).not.toContain("ScholarSync");
    });
  });

  describe("tablet layout", () => {
    beforeEach(() => {
      mockViewport = {
        width: 900,
        height: 600,
        breakpoint: "tablet",
        isMobile: false,
        isTablet: true,
        isDesktop: false,
        minTouchTarget: 32,
      };
    });

    it("shows navigation dots", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      const dots = container.querySelector(
        '[data-testid="navigation-dots"]'
      );
      expect(dots).toBeTruthy();
    });

    it("shows prev/next arrows (tablet has them)", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      const prevBtn = container.querySelector(
        '[aria-label="Previous slide"]'
      );
      expect(prevBtn).toBeTruthy();
    });
  });

  describe("keyboard navigation", () => {
    it("navigates to next slide on ArrowRight", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "ArrowRight" })
        );
      });

      const counter = container.querySelector(
        '[data-testid="slide-counter"]'
      );
      expect(counter?.textContent).toBe("2 / 5");
    });

    it("navigates to previous slide on ArrowLeft", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      // Go to slide 2 first
      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "ArrowRight" })
        );
      });

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "ArrowLeft" })
        );
      });

      const counter = container.querySelector(
        '[data-testid="slide-counter"]'
      );
      expect(counter?.textContent).toBe("1 / 5");
    });
  });

  describe("scale factor in DOM", () => {
    it("applies transform scale to slide container", () => {
      act(() => {
        root.render(<ResponsiveDeckViewer {...defaultProps} />);
      });

      // ResizeObserver mock fires with width=800, so scale=800/960
      const slideContainer = container.querySelector(
        '[data-testid="slide-container"]'
      );
      expect(slideContainer).toBeTruthy();
      // The container height should be set to SLIDE_REF_HEIGHT * scale
      const expectedScale = 800 / SLIDE_REF_WIDTH;
      const expectedHeight = SLIDE_REF_HEIGHT * expectedScale;
      expect(slideContainer?.getAttribute("style")).toContain(
        `height: ${expectedHeight}px`
      );
    });
  });
});
