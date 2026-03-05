import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table as DocxTable,
  TableRow as DocxTableRow,
  TableCell as DocxTableCell,
  WidthType,
  BorderStyle,
  convertInchesToTwip,
  type IBorderOptions,
} from "docx";
import type { JSONContent } from "@tiptap/core";
import type { FormattedBibliographyEntry, Reference } from "@/types/citation";

interface ExportOptions {
  title?: string;
  doubleSpaced?: boolean;
  includePageNumbers?: boolean;
  references?: Map<string, Reference>;
  referenceNumberMap?: Map<string, number>;
  bibliographyEntries?: FormattedBibliographyEntry[];
}

const HEADING_LEVEL_MAP: Record<number, (typeof HeadingLevel)[keyof typeof HeadingLevel]> = {
  1: HeadingLevel.HEADING_1,
  2: HeadingLevel.HEADING_2,
  3: HeadingLevel.HEADING_3,
  4: HeadingLevel.HEADING_4,
};

const noBorder: IBorderOptions = {
  style: BorderStyle.NONE,
  size: 0,
  color: "FFFFFF",
};

const solidBorder: IBorderOptions = {
  style: BorderStyle.SINGLE,
  size: 3,
  color: "000000",
};

interface CollectedCitation {
  referenceIds: string[];
  displayText: string;
}

/**
 * Convert Tiptap JSON content to a DOCX buffer.
 */
export async function tiptapToDocx(
  content: JSONContent,
  options: ExportOptions = {}
): Promise<Uint8Array> {
  const { doubleSpaced = true } = options;

  // Array to collect footnotes during conversion
  const collectedFootnotes: Array<{ number: number; text: string }> = [];
  const collectedCitations: CollectedCitation[] = [];

  const children = convertNodes(
    content.content || [],
    doubleSpaced,
    collectedFootnotes,
    options.referenceNumberMap,
    collectedCitations
  );

  // Add footnotes section at the end if any footnotes exist
  if (collectedFootnotes.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "Notes",
            bold: true,
            size: 24,
            font: "Times New Roman",
          }),
        ],
        spacing: { before: 400 },
        border: { top: solidBorder },
      })
    );

    for (const fn of collectedFootnotes) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${fn.number}. `,
              superScript: true,
              font: "Times New Roman",
              size: 20,
            }),
            new TextRun({
              text: fn.text,
              font: "Times New Roman",
              size: 20,
            }),
          ],
          spacing: { after: 100 },
        })
      );
    }
  }

  if (options.bibliographyEntries && options.bibliographyEntries.length > 0) {
    children.push(
      new Paragraph({
        children: [],
        spacing: { before: 400 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "References",
            bold: true,
            size: 24 * 2,
            font: "Times New Roman",
          }),
        ],
        spacing: { after: 200 },
      })
    );

    const sortedEntries = [...options.bibliographyEntries].sort((a, b) => {
      const aNum = options.referenceNumberMap?.get(a.id) ?? Number.MAX_SAFE_INTEGER;
      const bNum = options.referenceNumberMap?.get(b.id) ?? Number.MAX_SAFE_INTEGER;
      return aNum - bNum;
    });

    for (const [idx, entry] of sortedEntries.entries()) {
      const entryNumber = options.referenceNumberMap?.get(entry.id) ?? idx + 1;
      const plainText = entry.text || entry.html?.replace(/<[^>]+>/g, "") || "";
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${entryNumber}. `,
              font: "Times New Roman",
              size: 22,
            }),
            new TextRun({
              text: plainText,
              font: "Times New Roman",
              size: 22,
            }),
          ],
          spacing: { after: 80 },
          indent: { left: 360, hanging: 360 },
        })
      );
    }
  }

  const doc = new Document({
    styles: {
      default: {
        heading1: {
          run: { size: 28 * 2, bold: true, font: "Times New Roman" },
          paragraph: {
            spacing: { after: 200, before: 400 },
          },
        },
        heading2: {
          run: { size: 24 * 2, bold: true, font: "Times New Roman" },
          paragraph: {
            spacing: { after: 160, before: 360 },
          },
        },
        heading3: {
          run: { size: 20 * 2, bold: true, font: "Times New Roman" },
          paragraph: {
            spacing: { after: 120, before: 280 },
          },
        },
        heading4: {
          run: {
            size: 16 * 2,
            bold: true,
            italics: true,
            font: "Times New Roman",
          },
          paragraph: {
            spacing: { after: 100, before: 200 },
          },
        },
        document: {
          run: { size: 12 * 2, font: "Times New Roman" },
          paragraph: {
            spacing: {
              line: doubleSpaced ? 480 : 276,
              after: doubleSpaced ? 0 : 120,
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: convertInchesToTwip(8.5),
              height: convertInchesToTwip(11),
            },
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
            },
          },
        },
        children,
      },
    ],
  });

  return Packer.toBuffer(doc) as Promise<Uint8Array>;
}

function convertNodes(
  nodes: JSONContent[],
  doubleSpaced: boolean,
  collectedFootnotes: Array<{ number: number; text: string }> = [],
  referenceNumberMap?: Map<string, number>,
  collectedCitations: CollectedCitation[] = []
): (Paragraph | DocxTable)[] {
  const result: (Paragraph | DocxTable)[] = [];

  for (const node of nodes) {
    const converted = convertNode(
      node,
      doubleSpaced,
      collectedFootnotes,
      referenceNumberMap,
      collectedCitations
    );
    if (converted) {
      if (Array.isArray(converted)) {
        result.push(...converted);
      } else {
        result.push(converted);
      }
    }
  }

  return result;
}

function convertNode(
  node: JSONContent,
  doubleSpaced: boolean,
  collectedFootnotes: Array<{ number: number; text: string }> = [],
  referenceNumberMap?: Map<string, number>,
  collectedCitations: CollectedCitation[] = []
): Paragraph | DocxTable | (Paragraph | DocxTable)[] | null {
  switch (node.type) {
    case "paragraph":
      return createParagraph(
        node,
        doubleSpaced,
        collectedFootnotes,
        referenceNumberMap,
        collectedCitations
      );

    case "heading":
      return createHeading(
        node,
        collectedFootnotes,
        referenceNumberMap,
        collectedCitations
      );

    case "bulletList":
      return createList(
        node,
        false,
        doubleSpaced,
        collectedFootnotes,
        referenceNumberMap,
        collectedCitations
      );

    case "orderedList":
      return createList(
        node,
        true,
        doubleSpaced,
        collectedFootnotes,
        referenceNumberMap,
        collectedCitations
      );

    case "taskList":
      return createTaskList(
        node,
        doubleSpaced,
        collectedFootnotes,
        referenceNumberMap,
        collectedCitations
      );

    case "blockquote":
      return createBlockquote(
        node,
        doubleSpaced,
        collectedFootnotes,
        referenceNumberMap,
        collectedCitations
      );

    case "codeBlock":
      return createCodeBlock(node);

    case "horizontalRule":
      return new Paragraph({
        border: {
          bottom: solidBorder,
        },
        spacing: { before: 200, after: 200 },
      });

    case "table":
      return createTable(
        node,
        collectedFootnotes,
        referenceNumberMap,
        collectedCitations
      );

    case "image":
      return new Paragraph({
        children: [
          new TextRun({
            text: `[Image: ${node.attrs?.alt || node.attrs?.src || "image"}]`,
            italics: true,
            color: "666666",
          }),
        ],
      });

    case "footnote":
      return null;

    case "bibliography":
      return null;

    default:
      return null;
  }
}

function createParagraph(
  node: JSONContent,
  doubleSpaced: boolean,
  collectedFootnotes: Array<{ number: number; text: string }> = [],
  referenceNumberMap?: Map<string, number>,
  collectedCitations: CollectedCitation[] = []
): Paragraph {
  const runs = extractTextRuns(
    node.content || [],
    collectedFootnotes,
    referenceNumberMap,
    collectedCitations
  );
  const alignment = getAlignment(node.attrs?.textAlign);

  return new Paragraph({
    children: runs,
    alignment,
    spacing: {
      line: doubleSpaced ? 480 : 276,
      after: doubleSpaced ? 0 : 120,
    },
  });
}

function createHeading(
  node: JSONContent,
  collectedFootnotes: Array<{ number: number; text: string }> = [],
  referenceNumberMap?: Map<string, number>,
  collectedCitations: CollectedCitation[] = []
): Paragraph {
  const level = (node.attrs?.level as number) || 2;
  const runs = extractTextRuns(
    node.content || [],
    collectedFootnotes,
    referenceNumberMap,
    collectedCitations
  );
  const headingLevel = HEADING_LEVEL_MAP[level] || HeadingLevel.HEADING_2;

  return new Paragraph({
    children: runs,
    heading: headingLevel,
  });
}

function createList(
  node: JSONContent,
  ordered: boolean,
  doubleSpaced: boolean,
  collectedFootnotes: Array<{ number: number; text: string }> = [],
  referenceNumberMap?: Map<string, number>,
  collectedCitations: CollectedCitation[] = []
): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const items = node.content || [];

  items.forEach((item, index) => {
    if (item.type === "listItem") {
      const content = item.content || [];
      for (const child of content) {
        if (child.type === "paragraph") {
          const runs = extractTextRuns(
            child.content || [],
            collectedFootnotes,
            referenceNumberMap,
            collectedCitations
          );
          const prefix = ordered ? `${index + 1}. ` : "\u2022 ";
          runs.unshift(new TextRun({ text: prefix }));
          paragraphs.push(
            new Paragraph({
              children: runs,
              indent: { left: convertInchesToTwip(0.5) },
              spacing: {
                line: doubleSpaced ? 480 : 276,
                after: 60,
              },
            })
          );
        }
      }
    }
  });

  return paragraphs;
}

function createTaskList(
  node: JSONContent,
  doubleSpaced: boolean,
  collectedFootnotes: Array<{ number: number; text: string }> = [],
  referenceNumberMap?: Map<string, number>,
  collectedCitations: CollectedCitation[] = []
): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const items = node.content || [];

  for (const item of items) {
    if (item.type === "taskItem") {
      const checked = item.attrs?.checked ? "\u2611" : "\u2610";
      const content = item.content || [];
      for (const child of content) {
        if (child.type === "paragraph") {
          const runs = extractTextRuns(
            child.content || [],
            collectedFootnotes,
            referenceNumberMap,
            collectedCitations
          );
          runs.unshift(new TextRun({ text: `${checked} ` }));
          paragraphs.push(
            new Paragraph({
              children: runs,
              indent: { left: convertInchesToTwip(0.5) },
              spacing: { line: doubleSpaced ? 480 : 276, after: 60 },
            })
          );
        }
      }
    }
  }

  return paragraphs;
}

function createBlockquote(
  node: JSONContent,
  doubleSpaced: boolean,
  collectedFootnotes: Array<{ number: number; text: string }> = [],
  referenceNumberMap?: Map<string, number>,
  collectedCitations: CollectedCitation[] = []
): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const content = node.content || [];

  for (const child of content) {
    if (child.type === "paragraph") {
      const runs = extractTextRuns(
        child.content || [],
        collectedFootnotes,
        referenceNumberMap,
        collectedCitations
      );
      paragraphs.push(
        new Paragraph({
          children: runs,
          indent: {
            left: convertInchesToTwip(0.5),
            right: convertInchesToTwip(0.5),
          },
          spacing: {
            line: doubleSpaced ? 480 : 276,
            after: 60,
          },
          border: {
            left: {
              style: BorderStyle.SINGLE,
              size: 6,
              color: "CCCCCC",
              space: 8,
            },
          },
        })
      );
    }
  }

  return paragraphs;
}

function createCodeBlock(node: JSONContent): Paragraph {
  const text = node.content
    ?.map((child) => child.text || "")
    .join("") || "";

  return new Paragraph({
    children: [
      new TextRun({
        text,
        font: "Courier New",
        size: 10 * 2,
      }),
    ],
    spacing: { before: 100, after: 100 },
    shading: { fill: "F5F5F5" },
  });
}

function createTable(
  node: JSONContent,
  collectedFootnotes: Array<{ number: number; text: string }> = [],
  referenceNumberMap?: Map<string, number>,
  collectedCitations: CollectedCitation[] = []
): DocxTable {
  const rows = (node.content || [])
    .filter((row) => row.type === "tableRow")
    .map((row, rowIdx) => {
      const cells = (row.content || [])
        .filter(
          (cell) =>
            cell.type === "tableCell" || cell.type === "tableHeader"
        )
        .map((cell) => {
          const isHeader = cell.type === "tableHeader" || rowIdx === 0;
          const cellContent = (cell.content || [])
            .map((child) => {
              if (child.type === "paragraph") {
                const runs = extractTextRuns(
                  child.content || [],
                  collectedFootnotes,
                  referenceNumberMap,
                  collectedCitations
                );
                if (isHeader) {
                  // Re-create runs as bold for headers
                  const boldRuns = (child.content || []).map((inline) =>
                    createTextRunFromInline(
                      inline,
                      true,
                      collectedFootnotes,
                      referenceNumberMap,
                      collectedCitations
                    )
                  );
                  return new Paragraph({
                    children: boldRuns.length > 0 ? boldRuns : [new TextRun({ text: "" })],
                  });
                }
                return new Paragraph({ children: runs });
              }
              return new Paragraph({});
            });

          return new DocxTableCell({
            children:
              cellContent.length > 0
                ? cellContent
                : [new Paragraph({})],
            width: { size: 0, type: WidthType.AUTO },
            borders: {
              top:
                rowIdx === 0
                  ? solidBorder
                  : isHeader
                  ? solidBorder
                  : noBorder,
              bottom:
                isHeader
                  ? solidBorder
                  : noBorder,
              left: noBorder,
              right: noBorder,
            },
          });
        });

      return new DocxTableRow({ children: cells });
    });

  return new DocxTable({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

/**
 * Create a single TextRun from an inline content node, with optional forced bold.
 */
function createTextRunFromInline(
  node: JSONContent,
  forceBold = false,
  collectedFootnotes: Array<{ number: number; text: string }> = [],
  referenceNumberMap?: Map<string, number>,
  collectedCitations: CollectedCitation[] = []
): TextRun {
  if (node.type === "hardBreak") {
    return new TextRun({ break: 1 });
  }

  if (node.type === "citation") {
    const referenceIds = (node.attrs?.referenceIds as string[]) || [];
    const numbers = referenceIds
      .map((id) => referenceNumberMap?.get(id))
      .filter((n): n is number => n !== undefined)
      .sort((a, b) => a - b);
    const displayText = numbers.length > 0 ? `[${formatCitationNumbers(numbers)}]` : "[?]";

    collectedCitations.push({ referenceIds, displayText });

    return new TextRun({
      text: displayText,
      superScript: true,
      font: "Times New Roman",
      size: 18,
    });
  }

  if (node.type === "footnote") {
    const number = node.attrs?.number as number | undefined;
    const text = node.attrs?.text as string | undefined;

    if (number !== undefined && text) {
      const alreadyCollected = collectedFootnotes.some(
        (footnote) => footnote.number === number
      );
      if (!alreadyCollected) {
        collectedFootnotes.push({ number, text });
      }
    }

    return new TextRun({
      text: String(number ?? "?"),
      superScript: true,
      font: "Times New Roman",
      size: 20,
    });
  }

  // Build mark properties
  let bold = forceBold || false;
  let italics = false;
  let underline: Record<string, never> | undefined;
  let strike = false;
  let font: string | undefined;
  let size: number | undefined;
  let superScript = false;
  let subScript = false;
  let color: string | undefined;

  if (node.marks) {
    for (const mark of node.marks) {
      switch (mark.type) {
        case "bold":
          bold = true;
          break;
        case "italic":
          italics = true;
          break;
        case "underline":
          underline = {};
          break;
        case "strike":
          strike = true;
          break;
        case "code":
          font = "Courier New";
          size = 10 * 2;
          break;
        case "superscript":
          superScript = true;
          break;
        case "subscript":
          subScript = true;
          break;
        case "link":
          color = "0563C1";
          underline = {};
          break;
      }
    }
  }

  return new TextRun({
    text: node.text || "",
    bold,
    italics,
    underline,
    strike,
    font,
    size,
    superScript,
    subScript,
    color,
  });
}

function extractTextRuns(
  content: JSONContent[],
  collectedFootnotes: Array<{ number: number; text: string }> = [],
  referenceNumberMap?: Map<string, number>,
  collectedCitations: CollectedCitation[] = []
): TextRun[] {
  if (content.length === 0) {
    return [new TextRun({ text: "" })];
  }

  return content.map((node) =>
    createTextRunFromInline(
      node,
      false,
      collectedFootnotes,
      referenceNumberMap,
      collectedCitations
    )
  );
}

export function formatCitationNumbers(numbers: number[]): string {
  if (numbers.length === 0) return "?";
  if (numbers.length === 1) return String(numbers[0]);

  const ranges: string[] = [];
  let rangeStart = numbers[0];
  let rangeEnd = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] === rangeEnd + 1) {
      rangeEnd = numbers[i];
    } else {
      ranges.push(
        rangeStart === rangeEnd ? String(rangeStart) : `${rangeStart}-${rangeEnd}`
      );
      rangeStart = numbers[i];
      rangeEnd = numbers[i];
    }
  }

  ranges.push(
    rangeStart === rangeEnd ? String(rangeStart) : `${rangeStart}-${rangeEnd}`
  );

  return ranges.join(",");
}

function getAlignment(
  textAlign?: string
): (typeof AlignmentType)[keyof typeof AlignmentType] | undefined {
  switch (textAlign) {
    case "center":
      return AlignmentType.CENTER;
    case "right":
      return AlignmentType.RIGHT;
    case "justify":
      return AlignmentType.JUSTIFIED;
    case "left":
    default:
      return undefined;
  }
}
