import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import type { OutlineItem } from "@/stores/editor-store";
import { countWords } from "@/lib/editor/word-counter";

const outlinePluginKey = new PluginKey("outline");

interface OutlinePluginOptions {
  onOutlineUpdate?: (outline: OutlineItem[]) => void;
  debounceMs?: number;
}

/**
 * Build the outline from headings in the document.
 * Also calculates word count per section.
 */
function buildOutline(doc: ProseMirrorNode): OutlineItem[] {
  const items: OutlineItem[] = [];
  const headingPositions: { pos: number; level: number; text: string }[] = [];

  // First pass: collect all heading positions
  doc.descendants((node, pos) => {
    if (node.type.name === "heading") {
      headingPositions.push({
        pos,
        level: node.attrs.level as number,
        text: node.textContent,
      });
    }
  });

  // Second pass: calculate word counts per section
  for (let i = 0; i < headingPositions.length; i++) {
    const current = headingPositions[i];
    const next = headingPositions[i + 1];

    const startPos = current.pos;
    const endPos = next ? next.pos : doc.content.size;

    // Count words in the section content (between this heading and the next)
    let sectionWords = 0;
    doc.nodesBetween(startPos, endPos, (node) => {
      if (node.isTextblock && node.type.name !== "heading") {
        sectionWords += countWords(node.textContent);
      }
    });

    items.push({
      id: `heading-${current.pos}`,
      type: "heading",
      level: current.level,
      text: current.text,
      pos: current.pos,
      wordCount: sectionWords,
    });
  }

  return items;
}

export const OutlinePlugin = Extension.create<OutlinePluginOptions>({
  name: "outlinePlugin",

  addOptions() {
    return {
      onOutlineUpdate: undefined,
      debounceMs: 500,
    };
  },

  addProseMirrorPlugins() {
    const { onOutlineUpdate, debounceMs } = this.options;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    return [
      new Plugin({
        key: outlinePluginKey,
        view: () => ({
          update: (view, prevState) => {
            if (!onOutlineUpdate) return;
            if (view.state.doc.eq(prevState.doc)) return;

            // Check if any heading changed
            let headingChanged = false;
            const oldHeadings: string[] = [];
            const newHeadings: string[] = [];

            prevState.doc.descendants((node) => {
              if (node.type.name === "heading") {
                oldHeadings.push(`${node.attrs.level}:${node.textContent}`);
              }
            });
            view.state.doc.descendants((node) => {
              if (node.type.name === "heading") {
                newHeadings.push(`${node.attrs.level}:${node.textContent}`);
              }
            });

            if (
              oldHeadings.length !== newHeadings.length ||
              oldHeadings.some((h, i) => h !== newHeadings[i])
            ) {
              headingChanged = true;
            }

            // Always update word counts, but debounce
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              const outline = buildOutline(view.state.doc);
              onOutlineUpdate(outline);
            }, headingChanged ? 100 : debounceMs);
          },
          destroy: () => {
            if (debounceTimer) clearTimeout(debounceTimer);
          },
        }),
      }),
    ];
  },
});
