/**
 * Lightweight markdown → Tiptap JSON converter.
 *
 * Handles the subset of markdown that our deep-research synthesis produces:
 * headings, paragraphs, bold, italic, links, bullet/ordered lists, blockquotes, and horizontal rules.
 * Tables and code blocks are rendered as plain text paragraphs to keep things simple.
 */

interface TiptapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  text?: string;
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>;
}

/**
 * Convert a markdown string to Tiptap JSONContent.
 */
export function markdownToTiptap(markdown: string): TiptapNode {
  const lines = markdown.split("\n");
  const nodes: TiptapNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    // Empty line → skip (paragraph breaks are implicit)
    if (trimmed === "") {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^-{3,}$/.test(trimmed) || /^\*{3,}$/.test(trimmed)) {
      nodes.push({ type: "horizontalRule" });
      i++;
      continue;
    }

    // Heading
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      nodes.push({
        type: "heading",
        attrs: { level },
        content: parseInline(headingMatch[2]),
      });
      i++;
      continue;
    }

    // Blockquote (collect consecutive > lines)
    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trimEnd().startsWith("> ")) {
        quoteLines.push(lines[i].trimEnd().replace(/^>\s?/, ""));
        i++;
      }
      nodes.push({
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: parseInline(quoteLines.join(" ")),
          },
        ],
      });
      continue;
    }

    // Unordered list (- or *)
    if (/^[-*]\s/.test(trimmed)) {
      const items: TiptapNode[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i].trimEnd())) {
        const itemText = lines[i].trimEnd().replace(/^[-*]\s+/, "");
        items.push({
          type: "listItem",
          content: [{ type: "paragraph", content: parseInline(itemText) }],
        });
        i++;
      }
      nodes.push({ type: "bulletList", content: items });
      continue;
    }

    // Ordered list (1. 2. etc.)
    if (/^\d+\.\s/.test(trimmed)) {
      const items: TiptapNode[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimEnd())) {
        const itemText = lines[i].trimEnd().replace(/^\d+\.\s+/, "");
        items.push({
          type: "listItem",
          content: [{ type: "paragraph", content: parseInline(itemText) }],
        });
        i++;
      }
      nodes.push({ type: "orderedList", content: items });
      continue;
    }

    // Default: paragraph (collect consecutive non-special lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trimEnd() !== "" &&
      !lines[i].trimEnd().startsWith("#") &&
      !lines[i].trimEnd().startsWith("> ") &&
      !/^[-*]\s/.test(lines[i].trimEnd()) &&
      !/^\d+\.\s/.test(lines[i].trimEnd()) &&
      !/^-{3,}$/.test(lines[i].trimEnd()) &&
      !/^\*{3,}$/.test(lines[i].trimEnd())
    ) {
      paraLines.push(lines[i].trimEnd());
      i++;
    }

    if (paraLines.length > 0) {
      const text = paraLines.join(" ");
      const inlineContent = parseInline(text);
      if (inlineContent.length > 0) {
        nodes.push({ type: "paragraph", content: inlineContent });
      }
    }
  }

  // Ensure we have at least one node
  if (nodes.length === 0) {
    nodes.push({ type: "paragraph" });
  }

  return { type: "doc", content: nodes };
}

/**
 * Parse inline markdown (bold, italic, links, code) into Tiptap text nodes with marks.
 */
function parseInline(text: string): TiptapNode[] {
  const nodes: TiptapNode[] = [];

  // Regex to match: **bold**, *italic*, `code`, [text](url)
  const pattern = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[([^\]]+)\]\(([^)]+)\))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      nodes.push({ type: "text", text: text.slice(lastIndex, match.index) });
    }

    if (match[1]) {
      // **bold**
      nodes.push({
        type: "text",
        text: match[2],
        marks: [{ type: "bold" }],
      });
    } else if (match[3]) {
      // *italic*
      nodes.push({
        type: "text",
        text: match[4],
        marks: [{ type: "italic" }],
      });
    } else if (match[5]) {
      // `code`
      nodes.push({
        type: "text",
        text: match[6],
        marks: [{ type: "code" }],
      });
    } else if (match[7]) {
      // [text](url)
      nodes.push({
        type: "text",
        text: match[8],
        marks: [{ type: "link", attrs: { href: match[9], target: "_blank" } }],
      });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    nodes.push({ type: "text", text: text.slice(lastIndex) });
  }

  return nodes;
}
