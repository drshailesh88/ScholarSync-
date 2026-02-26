/**
 * Lightweight markdown → Tiptap JSON converter.
 *
 * Handles the subset of markdown that our deep-research synthesis produces:
 * headings, paragraphs, bold, italic, links, bullet/ordered lists, blockquotes,
 * horizontal rules, and citation markers like [5], [5,12], [5-8].
 */

interface TiptapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  text?: string;
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>;
}

export interface SourceReference {
  doi?: string;
  pmid?: string;
  title?: string;
}

/**
 * Convert a markdown string to Tiptap JSONContent.
 * @param markdown  The markdown source
 * @param sources   Optional array of source references (index = citation number - 1).
 *                  Used to generate DOI/PubMed hyperlinks for [N] citation markers.
 */
export function markdownToTiptap(
  markdown: string,
  sources?: SourceReference[],
): TiptapNode {
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
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = Math.min(headingMatch[1].length, 6);
      nodes.push({
        type: "heading",
        attrs: { level },
        content: parseInline(headingMatch[2], sources),
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
            content: parseInline(quoteLines.join(" "), sources),
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
          content: [{ type: "paragraph", content: parseInline(itemText, sources) }],
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
          content: [{ type: "paragraph", content: parseInline(itemText, sources) }],
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
      const inlineContent = parseInline(text, sources);
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
 * Build a URL for a source reference (DOI preferred, then PubMed).
 */
function sourceUrl(src: SourceReference | undefined): string | null {
  if (!src) return null;
  if (src.doi) return `https://doi.org/${src.doi}`;
  if (src.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${src.pmid}`;
  return null;
}

/**
 * Expand a citation group like "5,8-10" into [5, 8, 9, 10].
 */
function expandCitationNums(inner: string): number[] {
  const nums: number[] = [];
  for (const seg of inner.split(/[,;]\s*/)) {
    const rangeMatch = seg.match(/^(\d+)\s*[-\u2013\u2014]\s*(\d+)$/);
    if (rangeMatch) {
      const a = parseInt(rangeMatch[1], 10);
      const b = parseInt(rangeMatch[2], 10);
      for (let n = a; n <= b; n++) nums.push(n);
    } else {
      const n = parseInt(seg, 10);
      if (!isNaN(n)) nums.push(n);
    }
  }
  return nums;
}

/**
 * Parse inline markdown (bold, italic, links, code, citations) into Tiptap
 * text nodes with marks.
 */
function parseInline(text: string, sources?: SourceReference[]): TiptapNode[] {
  const nodes: TiptapNode[] = [];

  // Combined regex — order matters:
  //   groups 1-2:  **bold**
  //   groups 3-4:  *italic*
  //   groups 5-6:  `code`
  //   groups 7-9:  [text](url)  — markdown link
  //   groups 10-11: [N] or [N,M,K]  — citation markers
  const pattern =
    /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[([^\]]+)\]\(([^)]+)\))|(\[([\d,;\s\-\u2013\u2014]+)\])/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    // Plain text before the match
    if (match.index > lastIndex) {
      nodes.push({ type: "text", text: text.slice(lastIndex, match.index) });
    }

    if (match[1]) {
      // **bold**
      nodes.push({ type: "text", text: match[2], marks: [{ type: "bold" }] });
    } else if (match[3]) {
      // *italic*
      nodes.push({ type: "text", text: match[4], marks: [{ type: "italic" }] });
    } else if (match[5]) {
      // `code`
      nodes.push({ type: "text", text: match[6], marks: [{ type: "code" }] });
    } else if (match[7]) {
      // [text](url)
      nodes.push({
        type: "text",
        text: match[8],
        marks: [{ type: "link", attrs: { href: match[9], target: "_blank" } }],
      });
    } else if (match[10]) {
      // Citation marker: [N], [N,M,K], [N-M]
      const nums = expandCitationNums(match[11]);
      for (const num of nums) {
        const src = sources ? sources[num - 1] : undefined;
        const url = sourceUrl(src);

        if (url) {
          nodes.push({
            type: "text",
            text: `[${num}]`,
            marks: [{ type: "link", attrs: { href: url, target: "_blank" } }],
          });
        } else {
          nodes.push({ type: "text", text: `[${num}]`, marks: [{ type: "bold" }] });
        }
      }
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text after last match
  if (lastIndex < text.length) {
    nodes.push({ type: "text", text: text.slice(lastIndex) });
  }

  return nodes;
}
