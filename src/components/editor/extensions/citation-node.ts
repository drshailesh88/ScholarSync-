import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { CitationNodeView } from "./citation-node-view";

/**
 * Tiptap extension for inline citation nodes.
 *
 * Each citation node stores an array of referenceIds and renders as an
 * atomic inline chip. The display text (e.g. "[1]" or "(Smith, 2020)")
 * is computed externally by the citation processor and read from the
 * reference store — it is NOT stored in the node attributes.
 */
export const CitationNode = Node.create({
  name: "citation",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      referenceIds: {
        default: [],
        parseHTML: (element) => {
          const raw = element.getAttribute("data-reference-ids");
          if (!raw) return [];
          try {
            return JSON.parse(raw);
          } catch {
            return [];
          }
        },
        renderHTML: (attributes) => ({
          "data-reference-ids": JSON.stringify(attributes.referenceIds),
        }),
      },
      overrides: {
        default: null,
        parseHTML: (element) => {
          const raw = element.getAttribute("data-overrides");
          if (!raw) return null;
          try {
            return JSON.parse(raw);
          } catch {
            return null;
          }
        },
        renderHTML: (attributes) => {
          if (!attributes.overrides) return {};
          return {
            "data-overrides": JSON.stringify(attributes.overrides),
          };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-type="citation"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { "data-type": "citation" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CitationNodeView);
  },

  addCommands() {
    return {
      insertCitation:
        (referenceIds: string[]) =>
        ({ commands }: { commands: any }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { referenceIds },
          });
        },
    } as any;
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-c": () => {
        // Dispatch event to open citation dialog
        window.dispatchEvent(
          new CustomEvent("scholarsync:open-citation-dialog")
        );
        return true;
      },
    };
  },
});
