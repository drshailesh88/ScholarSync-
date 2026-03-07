// @vitest-environment jsdom

import { act } from "react";
import type { ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import type { SlideMaster } from "@/types/presentation";
import { SlideRendererV2 } from "../slide-renderer-v2";

function render(ui: ReactNode) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);

  act(() => {
    root.render(ui);
  });

  return {
    host,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
    },
  };
}

afterEach(() => {
  document.body.innerHTML = "";
});

beforeAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
});

describe("SlideRendererV2 slide master integration", () => {
  it("renders fixed master blocks on linked slides", () => {
    const master: SlideMaster = {
      id: "master-fixed",
      name: "Fixed",
      layout: "blank",
      fixedBlocks: [
        {
          type: "text",
          data: { text: "Fixed Brand Mark", style: "caption" },
          position: { x: 2, y: 2, width: 30, height: 10 },
        },
      ],
      placeholders: [],
    };

    const { host, cleanup } = render(
      <SlideRendererV2
        title="Slide"
        layout="title_content"
        contentBlocks={[]}
        master={master}
      />
    );

    expect(host.textContent).toContain("Fixed Brand Mark");
    cleanup();
  });

  it("renders placeholder prompt text", () => {
    const master: SlideMaster = {
      id: "master-placeholders",
      name: "Placeholders",
      layout: "blank",
      fixedBlocks: [],
      placeholders: [
        {
          id: "ph-content",
          label: "Content",
          position: { x: 10, y: 20, width: 80, height: 20 },
          defaultType: "text",
        },
      ],
    };

    const { host, cleanup } = render(
      <SlideRendererV2
        layout="blank"
        contentBlocks={[]}
        master={master}
        showMasterPlaceholders
      />
    );

    expect(host.textContent).toContain("Click to add text");
    cleanup();
  });
});
