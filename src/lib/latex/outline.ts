/**
 * Document outline extraction from LaTeX source.
 */

export interface OutlineItem {
  level: number;
  title: string;
  line: number;
}

/**
 * Extract document outline (section/subsection/subsubsection) from LaTeX source.
 */
export function extractOutline(content: string): OutlineItem[] {
  const lines = content.split("\n");
  const outline: OutlineItem[] = [];

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/\\(part|chapter|section|subsection|subsubsection)\*?\{([^}]*)\}/);
    if (match) {
      const levelMap: Record<string, number> = {
        part: -1,
        chapter: 0,
        section: 1,
        subsection: 2,
        subsubsection: 3,
      };
      outline.push({
        level: levelMap[match[1]] ?? 1,
        title: match[2],
        line: i + 1,
      });
    }
  }

  return outline;
}

/**
 * Get a text-based outline representation for AI context.
 */
export function outlineToText(outline: OutlineItem[]): string {
  return outline
    .map((item) => {
      const indent = "  ".repeat(Math.max(0, item.level));
      return `${indent}${item.title}`;
    })
    .join("\n");
}

/**
 * Find the section containing a given line number.
 */
export function findSectionAtLine(outline: OutlineItem[], line: number): OutlineItem | null {
  let current: OutlineItem | null = null;
  for (const item of outline) {
    if (item.line <= line) {
      current = item;
    } else {
      break;
    }
  }
  return current;
}
