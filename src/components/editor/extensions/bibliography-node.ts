import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { BibliographyView } from "./bibliography-view";

/**
 * Tiptap extension for the auto-bibliography block.
 *
 * This is a non-editable block node that appears at the end of the document
 * and renders all cited references formatted according to the current
 * citation style. It reads formatted entries from the reference store.
 */
export const BibliographyNode = Node.create({
  name: "bibliography",
  group: "block",
  atom: true,
  draggable: false,
  selectable: true,

  parseHTML() {
    return [{ tag: 'div[data-type="bibliography"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { ...HTMLAttributes, "data-type": "bibliography" },
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BibliographyView);
  },

  addCommands() {
    return {
      insertBibliography:
        () =>
        ({ commands, state }: { commands: Record<string, (...args: unknown[]) => boolean>; state: { doc: { descendants: (callback: (node: { type: { name: string } }) => boolean | void) => void; content: { size: number } } } }) => {
          // Check if bibliography already exists in the document
          let exists = false;
          state.doc.descendants((node: { type: { name: string } }) => {
            if (node.type.name === "bibliography") {
              exists = true;
              return false; // stop traversal
            }
          });
          if (exists) return false;

          return (commands as Record<string, (...args: unknown[]) => boolean>).insertContentAt(state.doc.content.size, {
            type: this.name,
          });
        },
    } as Record<string, unknown>;
  },
});
