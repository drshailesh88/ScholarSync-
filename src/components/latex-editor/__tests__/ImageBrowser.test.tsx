// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ImageBrowser } from "../image-browser";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt || "image"} />,
}));

describe("ImageBrowser", () => {
  let container: HTMLDivElement;
  let root: Root;
  const onInsertImage = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    onInsertImage.mockReset();
    Object.defineProperty(globalThis, "navigator", {
      value: { clipboard: { writeText: vi.fn() } },
      configurable: true,
    });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders empty state after loading", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({ ok: true, json: async () => ({ images: [] }) } as Response);

    await act(async () => {
      root.render(<ImageBrowser projectId="p1" onInsertImage={onInsertImage} />);
    });

    await act(async () => {
      (container.querySelector("div.flex.flex-col.h-full") as HTMLDivElement)?.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    });

    expect(container.textContent).toContain("Drag & drop images here");
  });

  it("renders loaded images list state", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        images: [
          {
            id: "1",
            filename: "figure-one.png",
            storageKey: "k1",
            sizeBytes: 1200,
            contentType: "image/png",
            url: "https://example.com/figure-one.png",
          },
        ],
      }),
    } as Response);

    await act(async () => {
      root.render(<ImageBrowser projectId="p1" onInsertImage={onInsertImage} />);
    });

    await act(async () => {
      (container.querySelector("div.flex.flex-col.h-full") as HTMLDivElement)?.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
      await Promise.resolve();
    });

    expect(container.textContent).toContain("figure-one.png");
    expect(container.textContent).toContain("Click to insert");
  });

  it("shows validation error for invalid file type", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({ ok: true, json: async () => ({ images: [] }) } as Response);

    await act(async () => {
      root.render(<ImageBrowser projectId="p1" onInsertImage={onInsertImage} />);
    });

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const badFile = new File(["x"], "notes.txt", { type: "text/plain" });

    await act(async () => {
      Object.defineProperty(input, "files", { value: [badFile], configurable: true });
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(container.textContent).toContain("Invalid file type");
  });
});
