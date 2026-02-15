import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

/**
 * Count words in a text string.
 */
export function countWords(text: string): number {
  return text
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

/**
 * Count words in a ProseMirror node.
 */
export function countNodeWords(node: ProseMirrorNode): number {
  return countWords(node.textContent);
}

/**
 * Count words per section in a document.
 * Sections are defined by heading nodes. Each section includes content
 * until the next heading of the same or higher level.
 */
export function countSectionWords(
  doc: ProseMirrorNode
): Record<string, number> {
  const sections: { heading: string; pos: number; level: number; words: number }[] = [];
  let currentIdx = -1;

  doc.descendants((node, pos) => {
    if (node.type.name === "heading") {
      const level = node.attrs.level as number;
      const text = node.textContent;

      // Close previous sections that are at the same or lower level
      // (we only count top-level section accumulation)
      sections.push({
        heading: text,
        pos,
        level,
        words: 0,
      });
      currentIdx = sections.length - 1;
      return false; // don't descend into heading
    }

    if (currentIdx >= 0 && node.isTextblock) {
      const words = countWords(node.textContent);
      sections[currentIdx].words += words;
      return false; // don't descend further
    }

    return true; // descend into other nodes
  });

  const result: Record<string, number> = {};
  for (const section of sections) {
    // Use heading text as key, with pos to handle duplicates
    const key = `${section.heading}__${section.pos}`;
    result[key] = section.words;
  }
  return result;
}

/**
 * Get total word count for the document.
 */
export function getDocumentWordCount(doc: ProseMirrorNode): number {
  return countWords(doc.textContent);
}
