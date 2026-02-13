import { PDFDocument, StandardFonts, rgb, PageSizes } from "pdf-lib";

// Layout constants (in points; 72pt = 1 inch)
const MARGIN = 72; // 1-inch margins
const PAGE_WIDTH = PageSizes.Letter[0]; // 612pt
const PAGE_HEIGHT = PageSizes.Letter[1]; // 792pt
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN; // 468pt
const BOTTOM_MARGIN = MARGIN;
const TOP_Y = PAGE_HEIGHT - MARGIN;

const TITLE_SIZE = 16;
const H2_SIZE = 14;
const H3_SIZE = 12;
const BODY_SIZE = 12;
const LINE_SPACING = 24; // double-spaced
const PARAGRAPH_INDENT = 36; // 0.5in

// ── HTML parser types ──────────────────────────────────────────────

interface TextBlock {
  type: "title" | "h2" | "h3" | "body";
  text: string;
}

// ── Route handler ──────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const { title, content, citations } = (await req.json()) as {
      title?: string;
      content?: string;
      citations?: string[];
    };

    if (!content) {
      return new Response(JSON.stringify({ error: "Content is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const pdfBytes = await generatePDF(
      title || "Untitled Document",
      content,
      citations,
    );

    const safeFilename = (title || "document").replace(/[^a-zA-Z0-9]/g, "_");
    const buffer = Buffer.from(pdfBytes);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename}.pdf"`,
        "Content-Length": String(buffer.length),
      },
    });
  } catch (error) {
    console.error("PDF export error:", error);
    return new Response(JSON.stringify({ error: "Export failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// ── PDF generation ─────────────────────────────────────────────────

async function generatePDF(
  title: string,
  htmlContent: string,
  citations?: string[],
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const fontBoldItalic = await doc.embedFont(
    StandardFonts.TimesRomanBoldItalic,
  );

  // State tracker for the current page and cursor position
  let page = doc.addPage(PageSizes.Letter);
  let y = TOP_Y;

  /** Add a new page and reset the y cursor. */
  function newPage(): void {
    page = doc.addPage(PageSizes.Letter);
    y = TOP_Y;
  }

  /** Ensure there is room for at least `needed` points; paginate if not. */
  function ensureSpace(needed: number): void {
    if (y - needed < BOTTOM_MARGIN) {
      newPage();
    }
  }

  /**
   * Wrap `text` into lines that fit within `maxWidth` using `font` at `size`.
   * Returns an array of strings, each being one wrapped line.
   */
  function wrapText(
    text: string,
    font: typeof fontRegular,
    size: number,
    maxWidth: number,
  ): string[] {
    if (!text.trim()) return [""];

    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(candidate, size);

      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = candidate;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines.length > 0 ? lines : [""];
  }

  /**
   * Draw wrapped lines of text, paginating as needed.
   * `firstLineX` is the x position for the first line (allows indenting).
   * `restLinesX` is the x position for subsequent wrapped lines.
   */
  function drawWrappedText(
    text: string,
    font: typeof fontRegular,
    size: number,
    lineHeight: number,
    firstLineX: number,
    restLinesX: number,
    maxWidthFirstLine: number,
    maxWidthRest: number,
  ): void {
    // Wrap the first line with its own max width (accounts for indent)
    const firstLineWords = text.split(/\s+/);
    const allLines: { text: string; x: number }[] = [];
    let currentLine = "";
    let isFirstLine = true;

    for (const word of firstLineWords) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      const maxW = isFirstLine ? maxWidthFirstLine : maxWidthRest;
      const width = font.widthOfTextAtSize(candidate, size);

      if (width > maxW && currentLine) {
        allLines.push({
          text: currentLine,
          x: isFirstLine ? firstLineX : restLinesX,
        });
        currentLine = word;
        isFirstLine = false;
      } else {
        currentLine = candidate;
      }
    }

    if (currentLine) {
      allLines.push({
        text: currentLine,
        x: isFirstLine ? firstLineX : restLinesX,
      });
    }

    if (allLines.length === 0) {
      allLines.push({ text: "", x: firstLineX });
    }

    for (const line of allLines) {
      ensureSpace(lineHeight);
      page.drawText(line.text, {
        x: line.x,
        y: y - size, // baseline position
        size,
        font,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    }
  }

  // ── Title ────────────────────────────────────────────────────────

  const titleLines = wrapText(title, fontBold, TITLE_SIZE, CONTENT_WIDTH);
  for (const line of titleLines) {
    ensureSpace(LINE_SPACING);
    const titleWidth = fontBold.widthOfTextAtSize(line, TITLE_SIZE);
    const titleX = MARGIN + (CONTENT_WIDTH - titleWidth) / 2;
    page.drawText(line, {
      x: titleX,
      y: y - TITLE_SIZE,
      size: TITLE_SIZE,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    y -= LINE_SPACING;
  }

  // Extra space after title
  y -= LINE_SPACING;

  // ── Parse content into blocks and render ─────────────────────────

  const blocks = parseHTMLToBlocks(htmlContent);

  for (const block of blocks) {
    const text = block.text.trim();
    if (!text) {
      // Empty paragraph: just add spacing
      y -= LINE_SPACING;
      if (y < BOTTOM_MARGIN) newPage();
      continue;
    }

    switch (block.type) {
      case "h2": {
        // Extra space before heading
        y -= LINE_SPACING * 0.5;
        ensureSpace(LINE_SPACING * 2);
        drawWrappedText(
          text,
          fontBold,
          H2_SIZE,
          LINE_SPACING,
          MARGIN,
          MARGIN,
          CONTENT_WIDTH,
          CONTENT_WIDTH,
        );
        break;
      }
      case "h3": {
        y -= LINE_SPACING * 0.5;
        ensureSpace(LINE_SPACING * 2);
        drawWrappedText(
          text,
          fontBoldItalic,
          H3_SIZE,
          LINE_SPACING,
          MARGIN,
          MARGIN,
          CONTENT_WIDTH,
          CONTENT_WIDTH,
        );
        break;
      }
      case "body":
      default: {
        drawWrappedText(
          text,
          fontRegular,
          BODY_SIZE,
          LINE_SPACING,
          MARGIN + PARAGRAPH_INDENT,
          MARGIN,
          CONTENT_WIDTH - PARAGRAPH_INDENT,
          CONTENT_WIDTH,
        );
        break;
      }
    }
  }

  // ── Citations / References ───────────────────────────────────────

  if (citations && citations.length > 0) {
    // Space before references section
    y -= LINE_SPACING;
    ensureSpace(LINE_SPACING * 3);

    // "References" heading, centered
    const referencesLabel = "References";
    const refWidth = fontBold.widthOfTextAtSize(referencesLabel, H2_SIZE);
    const refX = MARGIN + (CONTENT_WIDTH - refWidth) / 2;

    ensureSpace(LINE_SPACING);
    page.drawText(referencesLabel, {
      x: refX,
      y: y - H2_SIZE,
      size: H2_SIZE,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    y -= LINE_SPACING * 1.5;

    // Each citation with hanging indent (first line flush, rest indented)
    const HANGING_INDENT = 36; // 0.5in

    for (const citation of citations) {
      const citationText = stripHTML(citation).trim();
      if (!citationText) continue;

      // Hanging indent: first line at MARGIN, subsequent lines indented
      drawWrappedText(
        citationText,
        fontRegular,
        BODY_SIZE,
        LINE_SPACING,
        MARGIN,
        MARGIN + HANGING_INDENT,
        CONTENT_WIDTH,
        CONTENT_WIDTH - HANGING_INDENT,
      );
    }
  }

  return await doc.save();
}

// ── HTML parsing utilities ─────────────────────────────────────────

/**
 * Parse Tiptap-style HTML content into an ordered list of text blocks
 * with their semantic type (heading level or body paragraph).
 */
function parseHTMLToBlocks(html: string): TextBlock[] {
  const blocks: TextBlock[] = [];

  // Normalize: remove newlines and collapse whitespace between tags
  const normalized = html.replace(/\r?\n/g, " ").replace(/>\s+</g, "><");

  // Match block-level elements: h1, h2, h3, p, div, li, blockquote
  // Also capture bare text nodes between blocks
  const blockPattern =
    /<(h1|h2|h3|p|div|li|blockquote)(?:\s[^>]*)?>[\s\S]*?<\/\1>/gi;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = blockPattern.exec(normalized)) !== null) {
    // Check for any text between the previous block and this one
    if (match.index > lastIndex) {
      const between = normalized.slice(lastIndex, match.index).trim();
      const betweenText = stripHTML(between).trim();
      if (betweenText) {
        blocks.push({ type: "body", text: betweenText });
      }
    }

    const tag = match[1].toLowerCase();
    const innerText = stripHTML(match[0]).trim();

    if (innerText) {
      switch (tag) {
        case "h1":
          // h1 is treated as a title-level block, but in content we render as h2
          blocks.push({ type: "h2", text: innerText });
          break;
        case "h2":
          blocks.push({ type: "h2", text: innerText });
          break;
        case "h3":
          blocks.push({ type: "h3", text: innerText });
          break;
        default:
          blocks.push({ type: "body", text: innerText });
          break;
      }
    }

    lastIndex = match.index + match[0].length;
  }

  // Capture any trailing text after the last block element
  if (lastIndex < normalized.length) {
    const trailing = stripHTML(normalized.slice(lastIndex)).trim();
    if (trailing) {
      blocks.push({ type: "body", text: trailing });
    }
  }

  return blocks;
}

/**
 * Strip all HTML tags from a string, decode common entities,
 * and collapse whitespace.
 */
function stripHTML(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&rsquo;/gi, "\u2019")
    .replace(/&lsquo;/gi, "\u2018")
    .replace(/&rdquo;/gi, "\u201C")
    .replace(/&ldquo;/gi, "\u201D")
    .replace(/&mdash;/gi, "\u2014")
    .replace(/&ndash;/gi, "\u2013")
    .replace(/&hellip;/gi, "\u2026")
    .replace(/&#(\d+);/gi, (_m, code) =>
      String.fromCharCode(parseInt(code, 10)),
    )
    .replace(/\s+/g, " ");
}
