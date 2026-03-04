import { Node, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { FootnoteView } from "./footnote-view";

/**
 * Footnote node extension for Tiptap
 *
 * Renders as a superscript number in the text (e.g., ¹, ², ³)
 * with the full footnote text shown at the bottom of the document
 * or in a tooltip on hover.
 */

export interface FootnoteOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    footnote: {
      insertFootnote: (text: string) => ReturnType;
      removeFootnote: (id: string) => ReturnType;
    };
  }
}

export const Footnote = Node.create<FootnoteOptions>({
  name: "footnote",

  group: "inline",
  inline: true,
  atom: true, // Cannot be edited in place — is a single unit

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-footnote-id"),
        renderHTML: (attrs) => ({ "data-footnote-id": attrs.id }),
      },
      text: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-footnote-text"),
        renderHTML: (attrs) => ({ "data-footnote-text": attrs.text }),
      },
      number: {
        default: 1,
        parseHTML: (el) => parseInt(el.getAttribute("data-footnote-number") || "1", 10),
        renderHTML: (attrs) => ({ "data-footnote-number": attrs.number }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-footnote-id]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "footnote-marker",
        contenteditable: "false",
      }),
      ["sup", {}, HTMLAttributes["data-footnote-number"]?.toString() || "?"],
    ];
  },

  addCommands() {
    return {
      insertFootnote:
        (text: string) =>
        ({ chain, state }) => {
          const id = `fn_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

          // Count existing footnotes to determine number
          let count = 0;
          state.doc.descendants((node) => {
            if (node.type.name === "footnote") count++;
          });

          return chain()
            .insertContent({
              type: this.name,
              attrs: { id, text, number: count + 1 },
            })
            .run();
        },

      removeFootnote:
        (id: string) =>
        ({ tr, state, dispatch }) => {
          let found = false;
          state.doc.descendants((node, pos) => {
            if (node.type.name === "footnote" && node.attrs.id === id) {
              if (dispatch) {
                tr.delete(pos, pos + node.nodeSize);
              }
              found = true;
            }
          });
          return found;
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      // Plugin to auto-renumber footnotes when they change
      new Plugin({
        key: new PluginKey("footnoteNumbering"),
        appendTransaction: (_transactions, _oldState, newState) => {
          const footnotes: Array<{ pos: number; currentNumber: number }> = [];

          newState.doc.descendants((node, pos) => {
            if (node.type.name === "footnote") {
              footnotes.push({ pos, currentNumber: node.attrs.number as number });
            }
          });

          // Check if renumbering is needed
          let needsUpdate = false;
          for (let i = 0; i < footnotes.length; i++) {
            if (footnotes[i].currentNumber !== i + 1) {
              needsUpdate = true;
              break;
            }
          }

          if (!needsUpdate) return null;

          const tr = newState.tr;
          for (let i = 0; i < footnotes.length; i++) {
            const { pos } = footnotes[i];
            const node = newState.doc.nodeAt(pos);
            if (node) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                number: i + 1,
              });
            }
          }

          return tr;
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FootnoteView);
  },
});
