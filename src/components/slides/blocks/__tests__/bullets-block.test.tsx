import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { BulletsBlock } from "../bullets-block";
import type { ThemeConfig } from "@/types/presentation";

const THEME: ThemeConfig = {
  name: "Test Theme",
  primaryColor: "#111111",
  secondaryColor: "#222222",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  accentColor: "#444444",
  fontFamily: "Inter",
  headingFontFamily: "Inter",
};

describe("BulletsBlock nested list rendering", () => {
  it("renders nested ul/ol markup inside bullet items", () => {
    const html = renderToStaticMarkup(
      <BulletsBlock
        data={{
          ordered: false,
          items: [
            "Parent<ul><li>Child<ol><li>Grandchild</li></ol></li></ul>",
          ],
        }}
        theme={THEME}
      />
    );

    expect(html).toContain("<ul");
    expect(html).toContain("<li>Parent<ul><li>Child<ol><li>Grandchild</li></ol></li></ul></li>");
    expect(html).toContain("<ol>");
  });
});
