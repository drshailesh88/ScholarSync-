/**
 * /api/systematic-review/manuscript-export
 *
 * POST — Export a systematic review manuscript draft as a DOCX file.
 *        Accepts the review title and per-section content (markdown),
 *        generates an academically-formatted Word document, and returns
 *        it as a downloadable binary.
 */

import { NextResponse } from "next/server";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageNumber,
  Footer,
  Header,
} from "docx";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { verifyProjectAccess } from "@/lib/systematic-review/collaboration";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const manuscriptExportSchema = z.object({
  projectId: z.number().int().positive(),
  title: z.string().max(500),
  sections: z.record(z.string(), z.string()),
  format: z.enum(["docx"]).default("docx"),
});

// ---------------------------------------------------------------------------
// Minimal markdown-to-docx-elements parser
// ---------------------------------------------------------------------------

interface InlineSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

function parseInlineMarkdown(line: string): TextRun[] {
  const segments: InlineSegment[] = [];
  const tokenRegex = /(\*{3}(.+?)\*{3}|\*{2}(.+?)\*{2}|\*(.+?)\*)|([^*]+)/g;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match[1]) {
      if (match[2] !== undefined) {
        segments.push({ text: match[2], bold: true, italic: true });
      } else if (match[3] !== undefined) {
        segments.push({ text: match[3], bold: true });
      } else if (match[4] !== undefined) {
        segments.push({ text: match[4], italic: true });
      }
    } else if (match[5] !== undefined) {
      if (match[5]) segments.push({ text: match[5] });
    }
  }

  if (segments.length === 0) {
    return [new TextRun({ text: "", font: "Times New Roman", size: 24 })];
  }

  return segments.map(
    (seg) =>
      new TextRun({
        text: seg.text,
        bold: seg.bold || undefined,
        italics: seg.italic || undefined,
        font: "Times New Roman",
        size: 24,
      })
  );
}

function markdownToDocxParagraphs(markdown: string): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const lines = markdown.split("\n");

  for (const raw of lines) {
    const line = raw.trimEnd();

    const h3Match = line.match(/^###\s+(.+)$/);
    const h2Match = line.match(/^##\s+(.+)$/);
    const h1Match = line.match(/^#\s+(.+)$/);

    if (h3Match) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineMarkdown(h3Match[1]),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 240, after: 120, line: 480 },
        })
      );
    } else if (h2Match) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineMarkdown(h2Match[1]),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 360, after: 180, line: 480 },
        })
      );
    } else if (h1Match) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineMarkdown(h1Match[1]),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 480, after: 240, line: 480 },
        })
      );
    } else if (line.trim() === "") {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "", font: "Times New Roman", size: 24 })],
          spacing: { after: 60, line: 480 },
        })
      );
    } else {
      paragraphs.push(
        new Paragraph({
          children: parseInlineMarkdown(line),
          spacing: { after: 200, line: 480 },
        })
      );
    }
  }

  return paragraphs;
}

// ---------------------------------------------------------------------------
// Section ordering & display labels
// ---------------------------------------------------------------------------

const SECTION_ORDER = [
  "abstract",
  "introduction",
  "methods",
  "results",
  "discussion",
] as const;

const SECTION_LABELS: Record<string, string> = {
  abstract: "Abstract",
  introduction: "Introduction",
  methods: "Methods",
  results: "Results",
  discussion: "Discussion",
};

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // Authentication
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Rate limiting
    const rateLimitResponse = await checkRateLimit(
      userId,
      "export",
      RATE_LIMITS.export
    );
    if (rateLimitResponse) return rateLimitResponse;

    // Validate request body
    const rawBody = await req.json();
    const parseResult = manuscriptExportSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, title, sections } = parseResult.data;

    // Verify project access (owner or collaborator)
    const access = await verifyProjectAccess(projectId, userId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    if (Object.keys(sections).length === 0) {
      return NextResponse.json(
        { error: "At least one section is required" },
        { status: 400 }
      );
    }

    // ------------------------------------------------------------------
    // Build the DOCX document
    // ------------------------------------------------------------------

    const docTitle = title || "Systematic Review Manuscript Draft";
    const exportDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const titlePageParagraphs: Paragraph[] = [
      new Paragraph({
        children: [
          new TextRun({
            text: docTitle,
            bold: true,
            font: "Times New Roman",
            size: 32,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 360, line: 480 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Systematic Review Manuscript Draft",
            italics: true,
            font: "Times New Roman",
            size: 24,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 120, line: 480 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Generated by ScholarSync",
            font: "Times New Roman",
            size: 22,
            color: "666666",
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 120, line: 480 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: exportDate,
            font: "Times New Roman",
            size: 22,
            color: "666666",
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 120, line: 480 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text:
              "AI-assisted draft — review and edit all content before submission. " +
              "[PLACEHOLDER] markers indicate areas requiring manual input.",
            italics: true,
            font: "Times New Roman",
            size: 20,
            color: "888888",
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 480, line: 480 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "", font: "Times New Roman", size: 24 })],
        spacing: { after: 720, line: 480 },
        border: {
          bottom: { style: "single", size: 6, color: "CCCCCC", space: 1 },
        },
      }),
    ];

    const bodyParagraphs: Paragraph[] = [];

    const knownSections = SECTION_ORDER.filter((k) => sections[k]);
    const extraSections = Object.keys(sections).filter(
      (k) => !SECTION_ORDER.includes(k as (typeof SECTION_ORDER)[number])
    );
    const orderedKeys = [...knownSections, ...extraSections];

    for (const key of orderedKeys) {
      const content = sections[key];
      if (!content) continue;

      const label =
        SECTION_LABELS[key] ??
        key.charAt(0).toUpperCase() + key.slice(1);

      bodyParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: label,
              font: "Times New Roman",
              size: 28,
              bold: true,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 480, after: 240, line: 480 },
        })
      );

      bodyParagraphs.push(...markdownToDocxParagraphs(content));
    }

    // References placeholder
    bodyParagraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "References",
            font: "Times New Roman",
            size: 28,
            bold: true,
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 480, after: 240, line: 480 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "[PLACEHOLDER: Insert references here in the required citation style.]",
            italics: true,
            font: "Times New Roman",
            size: 24,
            color: "888888",
          }),
        ],
        spacing: { after: 200, line: 480 },
      })
    );

    // ------------------------------------------------------------------
    // Assemble the Document
    // ------------------------------------------------------------------

    const doc = new Document({
      styles: {
        default: {
          document: {
            run: {
              font: "Times New Roman",
              size: 24,
            },
            paragraph: {
              spacing: { line: 480 },
            },
          },
        },
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: docTitle,
                      font: "Times New Roman",
                      size: 18,
                      italics: true,
                      color: "666666",
                    }),
                  ],
                  alignment: AlignmentType.RIGHT,
                }),
              ],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      children: [PageNumber.CURRENT],
                      font: "Times New Roman",
                      size: 18,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
          },
          children: [...titlePageParagraphs, ...bodyParagraphs],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const uint8 = new Uint8Array(buffer);

    const safeFilename =
      docTitle.replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, "_") ||
      "manuscript-draft";

    log.info("Manuscript DOCX exported", {
      projectId,
      userId,
      sections: orderedKeys,
      bytes: uint8.byteLength,
    });

    return new Response(uint8, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${safeFilename}.docx"`,
      },
    });
  } catch (error) {
    log.error("Manuscript DOCX export error", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
