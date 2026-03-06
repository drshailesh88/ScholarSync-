// @vitest-environment jsdom

import { act } from "react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { PresenterMode } from "../presenter-mode";
import type { ContentBlock } from "@/types/presentation";

vi.mock("@/components/slides/shared/slide-renderer-v2", () => ({
  SlideRendererV2: ({
    title,
    showSlideNumber,
    slideNumber,
    contentBlocks = [],
    hideUnrevealedAnimated,
    revealOrder = Number.MAX_SAFE_INTEGER,
  }: {
    title?: string;
    showSlideNumber?: boolean;
    slideNumber?: number;
    contentBlocks?: ContentBlock[];
    hideUnrevealedAnimated?: boolean;
    revealOrder?: number;
  }) => {
    const visibleBlocks = contentBlocks.filter((block) => {
      if (!hideUnrevealedAnimated) return true;
      if (!block.animation || block.animation.type === "none") return true;
      const order = Math.max(1, Math.floor(block.animation.order));
      return order <= revealOrder;
    });

    return (
      <div data-testid="mock-slide-renderer">
        <span>{title ?? "Untitled"}</span>
        {showSlideNumber ? <span data-testid="mock-slide-number">{slideNumber}</span> : null}
        <span data-testid="mock-visible-block-count">Visible:{visibleBlocks.length}</span>
      </div>
    );
  },
}));

class MockBroadcastChannel {
  name: string;
  onmessage: ((event: MessageEvent) => void) | null = null;
  postMessage = vi.fn();
  close = vi.fn();

  constructor(name: string) {
    this.name = name;
  }
}

interface PresenterSlide {
  id: number;
  title: string;
  subtitle: string;
  layout: string;
  contentBlocks: ContentBlock[];
  speakerNotes: string;
  hidden?: boolean;
}

function makeSlides(): PresenterSlide[] {
  return [
    {
      id: 1,
      title: "Slide 1",
      subtitle: "",
      layout: "title_content",
      contentBlocks: [],
      speakerNotes: "**Bold** *Italic*\n\n- First item\n- Second item\n\n[Example](https://example.com)",
    },
    {
      id: 2,
      title: "Slide 2",
      subtitle: "",
      layout: "title_content",
      contentBlocks: [],
      speakerNotes: "Notes for slide 2",
    },
    {
      id: 3,
      title: "Slide 3",
      subtitle: "",
      layout: "title_content",
      contentBlocks: [],
      speakerNotes: "Notes for slide 3",
    },
  ];
}

function makeSlidesWithAnimations(): PresenterSlide[] {
  return [
    {
      id: 1,
      title: "Animated Slide",
      subtitle: "",
      layout: "title_content",
      contentBlocks: [
        {
          type: "text",
          data: { text: "Always Visible", style: "body" },
        },
        {
          type: "text",
          data: { text: "Order 1", style: "body" },
          animation: { type: "fadeIn", delay: 0, duration: 0.2, order: 1 },
        },
        {
          type: "text",
          data: { text: "Order 2", style: "body" },
          animation: { type: "slideUp", delay: 0, duration: 0.2, order: 2 },
        },
      ],
      speakerNotes: "Animation notes",
    },
    {
      id: 2,
      title: "Next Slide",
      subtitle: "",
      layout: "title_content",
      contentBlocks: [],
      speakerNotes: "Done",
    },
  ];
}

function dispatchKey(key: string) {
  act(() => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key,
        bubbles: true,
        cancelable: true,
      })
    );
  });
}

function renderPresenter(slides: PresenterSlide[], onExit = vi.fn()) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);

  act(() => {
    root.render(
      <PresenterMode
        slides={slides}
        themeKey="modern"
        onExit={onExit}
      />
    );
  });

  return {
    onExit,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
    },
  };
}

beforeAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
});

beforeEach(() => {
  vi.stubGlobal("BroadcastChannel", MockBroadcastChannel);
  vi.stubGlobal("open", vi.fn());
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  document.body.innerHTML = "";
});

describe("PresenterMode", () => {
  it("renders speaker notes markdown for the current slide", () => {
    const { cleanup } = renderPresenter(makeSlides());

    const notes = document.querySelector('[data-testid="presenter-notes"]');
    expect(notes).not.toBeNull();

    const strong = notes?.querySelector("strong");
    const em = notes?.querySelector("em");
    const listItems = notes?.querySelectorAll("li");
    const link = notes?.querySelector('a[href="https://example.com"]');

    expect(strong?.textContent).toContain("Bold");
    expect(em?.textContent).toContain("Italic");
    expect(listItems?.length).toBe(2);
    expect(link?.textContent).toContain("Example");

    cleanup();
  });

  it("shows the correct next slide preview and updates on navigation", () => {
    const { cleanup } = renderPresenter(makeSlides());

    const preview = document.querySelector('[data-testid="next-slide-preview"]');
    expect(preview?.textContent).toContain("Slide 2");

    dispatchKey("ArrowRight");
    expect(preview?.textContent).toContain("Slide 3");

    cleanup();
  });

  it("starts and advances timer when presentation opens", () => {
    vi.useFakeTimers();
    const { cleanup } = renderPresenter(makeSlides());

    const timer = document.querySelector('[data-testid="presenter-timer"]');
    expect(timer?.textContent).toBe("00:00");

    act(() => {
      vi.advanceTimersByTime(2200);
    });

    expect(timer?.textContent).toBe("00:02");

    cleanup();
  });

  it("supports keyboard next/previous and escape exit", () => {
    const onExit = vi.fn();
    const { cleanup } = renderPresenter(makeSlides(), onExit);

    const counter = document.querySelector('[data-testid="slide-counter"]');
    expect(counter?.textContent).toContain("1");

    dispatchKey("ArrowRight");
    expect(counter?.textContent).toContain("2");

    dispatchKey("Backspace");
    expect(counter?.textContent).toContain("1");

    dispatchKey("Escape");
    expect(onExit).toHaveBeenCalledTimes(1);

    cleanup();
  });

  it("advances reveal orders before moving to the next slide", () => {
    const { cleanup } = renderPresenter(makeSlidesWithAnimations());

    const getCurrentPanel = () => document.querySelector('[data-testid="current-slide-panel"]');
    const getProgress = () => document.querySelector('[data-testid="presenter-animation-progress"]');
    const getCounter = () => document.querySelector('[data-testid="slide-counter"]');

    expect(getCurrentPanel()?.textContent).toContain("Visible:1");
    expect(getProgress()?.textContent).toContain("Click 1 of 2");
    expect(getCounter()?.textContent).toContain("1");

    act(() => {
      getCurrentPanel()?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(getCurrentPanel()?.textContent).toContain("Visible:2");
    expect(getProgress()?.textContent).toContain("Click 2 of 2");

    dispatchKey(" ");
    expect(getCurrentPanel()?.textContent).toContain("Visible:3");
    expect(getProgress()?.textContent).toContain("Next click advances slide");

    dispatchKey("ArrowRight");
    expect(getCounter()?.textContent).toContain("2");

    cleanup();
  });

  it("toggles black screen with B key", () => {
    const { cleanup } = renderPresenter(makeSlides());

    expect(document.querySelector('[data-testid="presenter-black-screen"]')).toBeNull();

    dispatchKey("b");
    expect(document.querySelector('[data-testid="presenter-black-screen"]')).not.toBeNull();

    dispatchKey("b");
    expect(document.querySelector('[data-testid="presenter-black-screen"]')).toBeNull();

    cleanup();
  });

  it("skips hidden slides during navigation", () => {
    const slides = makeSlides();
    slides[1].hidden = true;

    const { cleanup } = renderPresenter(slides);

    const currentPanel = document.querySelector('[data-testid="current-slide-panel"]');
    const counter = document.querySelector('[data-testid="slide-counter"]');
    const notes = document.querySelector('[data-testid="presenter-notes"]');

    expect(currentPanel?.textContent).toContain("Slide 1");
    expect(counter?.textContent).toContain("1");
    expect(counter?.textContent).toContain("2");

    dispatchKey("ArrowRight");

    expect(notes?.textContent).toContain("Notes for slide 3");
    expect(notes?.textContent).not.toContain("Notes for slide 2");
    expect(counter?.textContent).toContain("2");
    expect(counter?.textContent).toContain("2");

    cleanup();
  });
});
