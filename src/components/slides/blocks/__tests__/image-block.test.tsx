import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ImgHTMLAttributes } from "react";
import type { ThemeConfig } from "@/types/presentation";
import { ImageBlock } from "../image-block";

vi.mock("next/image", () => ({
  default: ({ unoptimized: _unoptimized, ...props }: ImgHTMLAttributes<HTMLImageElement> & { unoptimized?: boolean }) => (
    <img {...props} />
  ),
}));

const THEME: ThemeConfig = {
  name: "Test Theme",
  primaryColor: "#111111",
  secondaryColor: "#222222",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  accentColor: "#444444",
};

describe("ImageBlock", () => {
  it("renders placeholder with upload affordance when URL is missing", () => {
    const html = renderToStaticMarkup(
      <ImageBlock
        data={{ alt: "Test image", suggestion: "Drop an image here" }}
        theme={THEME}
      />
    );

    expect(html).toContain("Drop an image here");
    expect(html).toContain("Upload Image");
  });

  it("renders image when URL is set", () => {
    const html = renderToStaticMarkup(
      <ImageBlock
        data={{ url: "https://example.com/a.png", alt: "Example" }}
        theme={THEME}
      />
    );

    expect(html).toContain("<img");
    expect(html).toContain("https://example.com/a.png");
    expect(html).toContain("object-contain");
  });

  it("applies clip-path style when crop data is present", () => {
    const html = renderToStaticMarkup(
      <ImageBlock
        data={{
          url: "https://example.com/a.png",
          alt: "Example",
          crop: { x: 10, y: 20, width: 50, height: 40 },
        }}
        theme={THEME}
      />
    );

    expect(html).toContain("clip-path:inset(20% 40% 40% 10%)");
  });
});
