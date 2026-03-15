// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { Footnote } from "../footnote-node";

describe("Footnote node HTML serialization", () => {
  it("parses the expected span selector and data attributes", () => {
    const config = Footnote.config as any;
    const rules = config.parseHTML.call({});
    const attrs = config.addAttributes.call({});
    const element = document.createElement("span");

    element.setAttribute("data-footnote-id", "fn-1");
    element.setAttribute("data-footnote-text", "Body text");
    element.setAttribute("data-footnote-number", "3");

    expect(rules).toEqual([{ tag: "span[data-footnote-id]" }]);
    expect(attrs.id.parseHTML(element)).toBe("fn-1");
    expect(attrs.text.parseHTML(element)).toBe("Body text");
    expect(attrs.number.parseHTML(element)).toBe(3);
  });

  it("defaults missing footnote number to 1 and renders the non-editable marker span", () => {
    const config = Footnote.config as any;
    const attrs = config.addAttributes.call({});
    const render = config.renderHTML.call(
      { options: { HTMLAttributes: {} } },
      {
        HTMLAttributes: {
          "data-footnote-id": "fn-2",
          "data-footnote-text": "Another note",
          "data-footnote-number": 4,
        },
      }
    );
    const emptyElement = document.createElement("span");

    expect(attrs.number.parseHTML(emptyElement)).toBe(1);
    expect(render).toEqual([
      "span",
      expect.objectContaining({
        class: "footnote-marker",
        contenteditable: "false",
        "data-footnote-id": "fn-2",
        "data-footnote-text": "Another note",
        "data-footnote-number": 4,
      }),
      ["sup", {}, "4"],
    ]);
  });
});
