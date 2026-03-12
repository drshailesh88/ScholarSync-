// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { CitationNode } from "../citation-node";

describe("CitationNode keyboard shortcuts", () => {
  it("dispatches the shared insert-citation editor action on Mod-Shift-C", () => {
    const config = CitationNode.config as any;
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");
    const shortcuts = config.addKeyboardShortcuts.call({});
    const handled = shortcuts["Mod-Shift-c"]();

    expect(handled).toBe(true);
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "scholarsync:editor-action",
        detail: { action: "insert-citation" },
      })
    );
  });
});

describe("CitationNode HTML serialization", () => {
  it("parses the citation span selector and JSON-backed attributes", () => {
    const config = CitationNode.config as any;
    const rules = config.parseHTML.call({});
    const attrs = config.addAttributes.call({});
    const element = document.createElement("span");

    element.setAttribute("data-reference-ids", '["ref-1","ref-2"]');
    element.setAttribute("data-overrides", '{"prefix":"see"}');

    expect(rules).toEqual([{ tag: 'span[data-type="citation"]' }]);
    expect(attrs.referenceIds.parseHTML(element)).toEqual(["ref-1", "ref-2"]);
    expect(attrs.overrides.parseHTML(element)).toEqual({ prefix: "see" });
  });

  it("falls back safely on invalid JSON and omits null overrides on render", () => {
    const config = CitationNode.config as any;
    const attrs = config.addAttributes.call({});
    const element = document.createElement("span");
    const render = config.renderHTML.call(
      {},
      {
      HTMLAttributes: {
        "data-reference-ids": '["ref-1"]',
      },
      }
    );

    element.setAttribute("data-reference-ids", "not json");
    element.setAttribute("data-overrides", "{");

    expect(attrs.referenceIds.parseHTML(element)).toEqual([]);
    expect(attrs.overrides.parseHTML(element)).toBeNull();
    expect(attrs.overrides.renderHTML({ overrides: null })).toEqual({});
    expect(render).toEqual([
      "span",
      expect.objectContaining({
        "data-type": "citation",
        "data-reference-ids": '["ref-1"]',
      }),
      0,
    ]);
  });
});
