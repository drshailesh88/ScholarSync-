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

const exportDocxRequestSchema = z.object({
  title: z.string().max(500, "Title must not exceed 500 characters").optional(),
  content: z.string({ error: "Content is required" }).min(1, "Content must not be empty"),
  citations: z.array(z.string()).optional(),
});

// ---------------------------------------------------------------------------
// Minimal HTML-to-docx-elements parser for Tiptap output
// ---------------------------------------------------------------------------

interface InlineRun {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

/**
 * Parse inline HTML (content inside a block element) into TextRun instances.
 * Handles <strong>, <em>, <b>, <i> and nested combinations.
 */
function parseInlineHtml(html: string): TextRun[] {
  const runs: InlineRun[] = [];

  // We walk through the string tracking bold/italic state via a simple
  // regex-based approach. This is intentionally not a full parser.
  type TagState = { bold: boolean; italic: boolean };
  const stateStack: TagState[] = [{ bold: false, italic: false }];

  const current = (): TagState => stateStack[stateStack.length - 1];

  // Split the html into tokens: tags and text segments
  const tokenRegex = /(<\/?(?:strong|b|em|i|br|span)[^>]*>)|([^<]+)/gi;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(html)) !== null) {
    const tag = match[1];
    const text = match[2];

    if (tag) {
      const lower = tag.toLowerCase();
      if (lower === "<br>" || lower === "<br/>" || lower === "<br />") {
        runs.push({ text: "\n", ...current() });
      } else if (
        lower.startsWith("<strong") ||
        lower.startsWith("<b>") ||
        lower.startsWith("<b ")
      ) {
        stateStack.push({ ...current(), bold: true });
      } else if (lower === "</strong>" || lower === "</b>") {
        if (stateStack.length > 1) stateStack.pop();
      } else if (
        lower.startsWith("<em") ||
        lower.startsWith("<i>") ||
        lower.startsWith("<i ")
      ) {
        stateStack.push({ ...current(), italic: true });
      } else if (lower === "</em>" || lower === "</i>") {
        if (stateStack.length > 1) stateStack.pop();
      }
      // Ignore <span> and other unknown tags
    } else if (text) {
      // Decode common HTML entities
      const decoded = text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ");
      if (decoded) {
        runs.push({ text: decoded, ...current() });
      }
    }
  }

  // If nothing was parsed, return a single empty run so the paragraph exists
  if (runs.length === 0) {
    return [new TextRun({ text: "", font: "Times New Roman", size: 24 })];
  }

  return runs.map(
    (r) =>
      new TextRun({
        text: r.text,
        bold: r.bold || undefined,
        italics: r.italic || undefined,
        font: "Times New Roman",
        size: 24, // 12pt = 24 half-points
      })
  );
}

/**
 * Convert an HTML content string (from Tiptap) into an array of docx Paragraphs.
 */
function htmlToDocxParagraphs(html: string): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Normalise whitespace between tags so our regex works more reliably
  const normalized = html.replace(/>\s+</g, "><").trim();

  // Match block-level elements. We process them in document order.
  const blockRegex =
    /<(h[1-3]|p|ul|ol|li|blockquote)(?:\s[^>]*)?>([^]*?)<\/\1>/gi;

  // Track whether we are inside a <ul> or <ol> so nested <li> can be handled.
  // Because our regex is greedy on inner content we also need to handle <ul>
  // containing <li> elements. We use a two-pass approach: first pull out
  // top-level blocks, then for <ul>/<ol> drill into <li>.

  // Instead of the above complex approach, let's do a simpler sequential scan.
  // We will split by top-level block tags.

  const topBlockRegex =
    /<(h1|h2|h3|p|ul|ol|blockquote)(?:\s[^>]*)?>([^]*?)<\/\1>/gi;
  let blockMatch: RegExpExecArray | null;

  let found = false;

  while ((blockMatch = topBlockRegex.exec(normalized)) !== null) {
    found = true;
    const tagName = blockMatch[1].toLowerCase();
    const inner = blockMatch[2];

    switch (tagName) {
      case "h1":
        paragraphs.push(
          new Paragraph({
            children: parseInlineHtml(inner),
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 240, line: 480 },
            alignment: AlignmentType.LEFT,
          })
        );
        break;

      case "h2":
        paragraphs.push(
          new Paragraph({
            children: parseInlineHtml(inner),
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 240, line: 480 },
          })
        );
        break;

      case "h3":
        paragraphs.push(
          new Paragraph({
            children: parseInlineHtml(inner),
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 240, line: 480 },
          })
        );
        break;

      case "p":
        paragraphs.push(
          new Paragraph({
            children: parseInlineHtml(inner),
            spacing: { after: 200, line: 480 },
          })
        );
        break;

      case "ul":
      case "ol": {
        // Extract each <li>
        const liRegex = /<li(?:\s[^>]*)?>([^]*?)<\/li>/gi;
        let liMatch: RegExpExecArray | null;
        while ((liMatch = liRegex.exec(inner)) !== null) {
          paragraphs.push(
            new Paragraph({
              children: parseInlineHtml(liMatch[1]),
              bullet: { level: 0 },
              spacing: { after: 120, line: 480 },
            })
          );
        }
        break;
      }

      case "blockquote":
        paragraphs.push(
          new Paragraph({
            children: parseInlineHtml(inner),
            spacing: { after: 200, line: 480 },
            indent: { left: 720, right: 720 },
          })
        );
        break;
    }
  }

  // Fallback: if no block elements were matched, treat the whole thing as
  // plain text split by newlines.
  if (!found) {
    const stripped = html.replace(/<[^>]*>/g, "");
    const lines = stripped.split(/\n+/).filter((l) => l.trim());
    for (const line of lines) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.trim(),
              font: "Times New Roman",
              size: 24,
            }),
          ],
          spacing: { after: 200, line: 480 },
        })
      );
    }
  }

  return paragraphs;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = exportDocxRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { title, content, citations } = parsed.data;

    const docTitle = title || "Untitled Document";

    // --- Build document sections ---

    // Title paragraph (centered Heading 1)
    const titleParagraph = new Paragraph({
      children: [
        new TextRun({
          text: docTitle,
          bold: true,
          font: "Times New Roman",
          size: 32, // 16pt
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 480, line: 480 },
    });

    // Body content
    const bodyParagraphs = htmlToDocxParagraphs(content);

    // Citations / References section
    const citationParagraphs: Paragraph[] = [];
    if (citations && Array.isArray(citations) && citations.length > 0) {
      // "References" heading
      citationParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "References",
              bold: true,
              font: "Times New Roman",
              size: 28, // 14pt
            }),
          ],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480, after: 240, line: 480 },
        })
      );

      for (const citation of citations as string[]) {
        // Strip any HTML tags from citation strings
        const cleanCitation = citation.replace(/<[^>]*>/g, "");
        citationParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cleanCitation,
                font: "Times New Roman",
                size: 24,
              }),
            ],
            spacing: { after: 120, line: 480 },
            indent: {
              left: 720, // 0.5in hanging indent body
              hanging: 720, // 0.5in hanging
            },
          })
        );
      }
    }

    // --- Assemble the Document ---

    const doc = new Document({
      styles: {
        default: {
          document: {
            run: {
              font: "Times New Roman",
              size: 24, // 12pt
            },
            paragraph: {
              spacing: { line: 480 }, // double spacing
            },
          },
        },
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch
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
                      size: 20, // 10pt for header
                      italics: true,
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
                      size: 20,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
          },
          children: [titleParagraph, ...bodyParagraphs, ...citationParagraphs],
        },
      ],
    });

    // --- Generate the binary buffer ---
    const buffer = await Packer.toBuffer(doc);
    const uint8 = new Uint8Array(buffer);

    const filename = docTitle.replace(/[^a-zA-Z0-9]/g, "_");

    return new Response(uint8, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}.docx"`,
      },
    });
  } catch (error) {
    console.error("DOCX export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
