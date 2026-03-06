import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { z } from "zod";
import type { ContentBlock } from "@/types/presentation";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

// ---------------------------------------------------------------------------
// Zod validation schema
// ---------------------------------------------------------------------------

const HandoutLayout = z.enum([
  "full_slide",
  "two_up",
  "three_up_notes",
  "six_up",
  "outline",
]);
type HandoutLayout = z.infer<typeof HandoutLayout>;

const exportPresentationPdfSchema = z.object({
  title: z.string().max(500),
  slides: z.array(z.any()).max(100),
  layout: HandoutLayout.default("full_slide"),
  includeSlideNumbers: z.boolean().default(true),
  includeHeader: z.boolean().default(true),
  includeSpeakerNotes: z.boolean().default(true),
  paperSize: z.enum(["letter", "a4"]).default("letter"),
});

interface SlideInput {
  title?: string;
  subtitle?: string;
  layout?: string;
  contentBlocks?: ContentBlock[];
  speakerNotes?: string;
}

interface ExportRequest {
  title: string;
  slides: SlideInput[];
  layout: HandoutLayout;
  includeSlideNumbers: boolean;
  includeHeader: boolean;
  includeSpeakerNotes: boolean;
  paperSize: "letter" | "a4";
}

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
    const rateLimitResponse = await checkRateLimit(userId, "export", RATE_LIMITS.export);
    if (rateLimitResponse) return rateLimitResponse;

    // Validate request body
    const rawBody = await req.json();
    const parseResult = exportPresentationPdfSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const body = parseResult.data as ExportRequest;

    if (!body.slides?.length) {
      return NextResponse.json(
        { error: "At least one slide is required" },
        { status: 400 }
      );
    }

    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const fontItalic = await pdf.embedFont(StandardFonts.HelveticaOblique);
    const fontMono = await pdf.embedFont(StandardFonts.Courier);
    const fonts = { font, fontBold, fontItalic, fontMono };

    const isA4 = body.paperSize === "a4";
    // Letter: 612×792, A4: 595×842
    const letterW = isA4 ? 595 : 612;
    const letterH = isA4 ? 842 : 792;
    const margin = 54;

    const deckTitle = body.title || "Presentation";

    switch (body.layout) {
      case "full_slide":
        renderFullSlide(pdf, body, fonts, letterW, letterH, margin, deckTitle);
        break;
      case "two_up":
        renderTwoUp(pdf, body, fonts, letterW, letterH, margin, deckTitle);
        break;
      case "three_up_notes":
        renderThreeUpNotes(pdf, body, fonts, letterW, letterH, margin, deckTitle);
        break;
      case "six_up":
        renderSixUp(pdf, body, fonts, letterW, letterH, margin, deckTitle);
        break;
      case "outline":
        renderOutline(pdf, body, fonts, letterW, letterH, margin, deckTitle);
        break;
    }

    const pdfBytes = await pdf.save();
    const safeTitle = (body.title || "presentation").replace(/[^a-zA-Z0-9]/g, "_");

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeTitle}_handout.pdf"`,
        "Content-Length": String(pdfBytes.byteLength),
      },
    });
  } catch (error) {
    log.error("PDF handout export error", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PDFPage = any;
type PDFFont = { widthOfTextAtSize: (text: string, size: number) => number };

function drawLines(
  lines: string[],
  page: PDFPage,
  x: number,
  y: number,
  yFloor: number,
  size: number,
  font: PDFFont,
  color: ReturnType<typeof rgb>,
  lineHeight: number,
): number {
  for (const line of lines) {
    if (y < yFloor) break;
    page.drawText(line, { x, y, size, font, color });
    y -= lineHeight;
  }
  return y;
}

function renderBlock(
  block: ContentBlock,
  page: PDFPage,
  font: PDFFont,
  fontBold: PDFFont,
  fontItalic: PDFFont,
  fontMono: PDFFont,
  margin: number,
  contentWidth: number,
  y: number,
  yFloor: number,
): number {
  const dark = rgb(0.2, 0.2, 0.2);
  const muted = rgb(0.4, 0.4, 0.4);
  const subtle = rgb(0.5, 0.5, 0.5);
  const accent = rgb(0.31, 0.27, 0.9);

  switch (block.type) {
    case "text": {
      const lines = wrapText(block.data.text ?? "", font, 10, contentWidth);
      y = drawLines(lines, page, margin, y, yFloor, 10, font, dark, 14);
      y -= 4;
      break;
    }

    case "bullets": {
      const items: string[] = block.data.items ?? [];
      const ordered = block.data.ordered ?? false;
      for (let i = 0; i < items.length; i++) {
        if (y < yFloor) break;
        const prefix = ordered ? `${i + 1}. ` : "\u2022 ";
        const bulletLines = wrapText(`${prefix}${items[i]}`, font, 10, contentWidth - 15);
        y = drawLines(bulletLines, page, margin + 15, y, yFloor, 10, font, dark, 13);
      }
      y -= 4;
      break;
    }

    case "quote": {
      const quoteLines = wrapText(`\u201C${block.data.text}\u201D`, fontItalic, 10, contentWidth - 20);
      y = drawLines(quoteLines, page, margin + 20, y, yFloor, 10, fontItalic, rgb(0.3, 0.3, 0.3), 14);
      if (block.data.attribution) {
        page.drawText(`\u2014 ${block.data.attribution}`, { x: margin + 20, y, size: 9, font, color: subtle });
        y -= 14;
      }
      y -= 4;
      break;
    }

    case "citation": {
      const d = block.data;
      let citText = d.text ?? "";
      if (d.source) citText += ` (${d.source})`;
      if (d.doi) citText += ` DOI: ${d.doi}`;
      const citLines = wrapText(citText, font, 9, contentWidth - 15);
      y = drawLines(citLines, page, margin + 10, y, yFloor, 9, font, muted, 12);
      y -= 3;
      break;
    }

    case "image": {
      // Can't embed images in pdf-lib without fetching bytes; show caption/alt
      const alt = block.data.alt ?? "Image";
      const caption = block.data.caption ?? "";
      page.drawText(`[Image: ${alt}]`, { x: margin, y, size: 9, font: fontItalic, color: subtle });
      y -= 13;
      if (caption) {
        const capLines = wrapText(caption, fontItalic, 8, contentWidth);
        y = drawLines(capLines, page, margin, y, yFloor, 8, fontItalic, subtle, 11);
      }
      y -= 4;
      break;
    }

    case "chart": {
      const d = block.data;
      page.drawText(`[Chart: ${d.title || d.chartType}]`, { x: margin, y, size: 9, font: fontBold, color: accent });
      y -= 13;
      // Render dataset summary
      for (const ds of d.datasets ?? []) {
        if (y < yFloor) break;
        const summary = `${ds.label}: ${ds.data?.slice(0, 6).join(", ")}${(ds.data?.length ?? 0) > 6 ? "..." : ""}`;
        const dsLines = wrapText(summary, font, 8, contentWidth - 10);
        y = drawLines(dsLines, page, margin + 10, y, yFloor, 8, font, muted, 11);
      }
      y -= 4;
      break;
    }

    case "table": {
      const d = block.data;
      const headers = d.headers ?? [];
      const rows = d.rows ?? [];
      // Header row
      if (headers.length > 0) {
        const headerText = headers.join(" | ");
        const hLines = wrapText(headerText, fontBold, 9, contentWidth);
        y = drawLines(hLines, page, margin, y, yFloor, 9, fontBold, dark, 12);
        // Separator
        page.drawLine({ start: { x: margin, y: y + 4 }, end: { x: margin + contentWidth, y: y + 4 }, thickness: 0.5, color: rgb(0.7, 0.7, 0.7) });
        y -= 4;
      }
      // Data rows (limit to 10 for handout)
      for (const row of rows.slice(0, 10)) {
        if (y < yFloor) break;
        const rowText = row.join(" | ");
        const rLines = wrapText(rowText, font, 8, contentWidth);
        y = drawLines(rLines, page, margin, y, yFloor, 8, font, dark, 11);
      }
      if (rows.length > 10) {
        page.drawText(`... ${rows.length - 10} more rows`, { x: margin, y, size: 7, font: fontItalic, color: subtle });
        y -= 10;
      }
      y -= 4;
      break;
    }

    case "math": {
      const d = block.data;
      // Can't render KaTeX in pdf-lib; show raw expression
      const mathLines = wrapText(d.expression ?? "", fontMono, 9, contentWidth - 10);
      y = drawLines(mathLines, page, margin + 5, y, yFloor, 9, fontMono, dark, 12);
      if (d.caption) {
        const capLines = wrapText(d.caption, fontItalic, 8, contentWidth);
        y = drawLines(capLines, page, margin, y, yFloor, 8, fontItalic, subtle, 11);
      }
      y -= 4;
      break;
    }

    case "code": {
      const d = block.data;
      // Draw code in monospace with light background indicator
      page.drawText(`[${d.language ?? "code"}]`, { x: margin, y, size: 7, font: fontBold, color: subtle });
      y -= 10;
      const codeLines = (d.code ?? "").split("\n").slice(0, 15);
      for (const codeLine of codeLines) {
        if (y < yFloor) break;
        const trimmed = codeLine.slice(0, 80); // truncate long lines
        page.drawText(trimmed || " ", { x: margin + 5, y, size: 8, font: fontMono, color: dark });
        y -= 10;
      }
      if ((d.code ?? "").split("\n").length > 15) {
        page.drawText("...", { x: margin + 5, y, size: 8, font: fontMono, color: subtle });
        y -= 10;
      }
      if (d.caption) {
        const capLines = wrapText(d.caption, fontItalic, 8, contentWidth);
        y = drawLines(capLines, page, margin, y, yFloor, 8, fontItalic, subtle, 11);
      }
      y -= 4;
      break;
    }

    case "callout": {
      const d = block.data;
      const typeLabel = (d.type ?? "info").toUpperCase();
      page.drawText(`${typeLabel}: ${d.title ?? ""}`, { x: margin, y, size: 9, font: fontBold, color: accent });
      y -= 13;
      const calloutLines = wrapText(d.text ?? "", font, 9, contentWidth - 10);
      y = drawLines(calloutLines, page, margin + 10, y, yFloor, 9, font, dark, 12);
      y -= 4;
      break;
    }

    case "stat_result": {
      const d = block.data;
      let statText = `${d.label}: ${d.value}`;
      if (d.ci) statText += ` (CI: ${d.ci})`;
      if (d.pValue) statText += ` p=${d.pValue}`;
      const statLines = wrapText(statText, fontBold, 10, contentWidth);
      y = drawLines(statLines, page, margin, y, yFloor, 10, fontBold, dark, 14);
      if (d.interpretation) {
        const interpLines = wrapText(d.interpretation, fontItalic, 9, contentWidth - 10);
        y = drawLines(interpLines, page, margin + 10, y, yFloor, 9, fontItalic, muted, 12);
      }
      y -= 4;
      break;
    }

    case "bibliography": {
      const d = block.data;
      page.drawText("References:", { x: margin, y, size: 9, font: fontBold, color: dark });
      y -= 13;
      for (const entry of (d.entries ?? []).slice(0, 15)) {
        if (y < yFloor) break;
        const refLines = wrapText(entry.formatted ?? "", font, 8, contentWidth - 15);
        y = drawLines(refLines, page, margin + 15, y, yFloor, 8, font, muted, 11);
        y -= 2;
      }
      if ((d.entries?.length ?? 0) > 15) {
        page.drawText(`... ${(d.entries?.length ?? 0) - 15} more references`, { x: margin, y, size: 7, font: fontItalic, color: subtle });
        y -= 10;
      }
      y -= 4;
      break;
    }

    case "timeline": {
      const d = block.data;
      if (d.title) {
        page.drawText(d.title, { x: margin, y, size: 9, font: fontBold, color: dark });
        y -= 13;
      }
      for (const entry of (d.entries ?? []).slice(0, 10)) {
        if (y < yFloor) break;
        const dateStr = entry.date ? `${entry.date}: ` : "";
        const entryText = `${dateStr}${entry.label}`;
        const entryLines = wrapText(entryText, font, 9, contentWidth - 15);
        y = drawLines(entryLines, page, margin + 15, y, yFloor, 9, font, dark, 12);
        if (entry.description) {
          const descLines = wrapText(entry.description, fontItalic, 8, contentWidth - 25);
          y = drawLines(descLines, page, margin + 25, y, yFloor, 8, fontItalic, muted, 11);
        }
        y -= 2;
      }
      y -= 4;
      break;
    }

    case "diagram": {
      const d = block.data;
      page.drawText(`[Diagram: ${d.diagramType ?? "diagram"}]`, { x: margin, y, size: 9, font: fontBold, color: accent });
      y -= 13;
      if (d.caption) {
        const capLines = wrapText(d.caption, fontItalic, 8, contentWidth);
        y = drawLines(capLines, page, margin, y, yFloor, 8, fontItalic, subtle, 11);
      }
      y -= 4;
      break;
    }

    case "divider": {
      y -= 6;
      page.drawLine({
        start: { x: margin + 20, y },
        end: { x: margin + contentWidth - 20, y },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
        dashArray: block.data.style === "dashed" ? [4, 3] : undefined,
      });
      y -= 10;
      break;
    }

    case "toggle": {
      const d = block.data;
      page.drawText(`\u25B6 ${d.title ?? ""}`, { x: margin, y, size: 9, font: fontBold, color: dark });
      y -= 13;
      if (d.content) {
        // Strip HTML tags for plain text rendering
        const plainContent = d.content.replace(/<[^>]*>/g, "");
        const togLines = wrapText(plainContent, font, 8, contentWidth - 15);
        y = drawLines(togLines, page, margin + 15, y, yFloor, 8, font, muted, 11);
      }
      y -= 4;
      break;
    }

    case "embed": {
      const d = block.data;
      const embedLabel = d.embedType ? `${d.embedType}: ` : "";
      page.drawText(`[Embed: ${embedLabel}${d.url ?? "No URL"}]`, { x: margin, y, size: 9, font: fontItalic, color: accent });
      y -= 13;
      if (d.title) {
        page.drawText(d.title, { x: margin, y, size: 8, font, color: muted });
        y -= 11;
      }
      y -= 4;
      break;
    }

    case "nested_card": {
      const d = block.data;
      page.drawText(d.title ?? "Sub-section", { x: margin, y, size: 10, font: fontBold, color: dark });
      y -= 14;
      // Recursively render inner blocks
      for (const innerBlock of (d.contentBlocks ?? []).slice(0, 5)) {
        if (y < yFloor) break;
        y = renderBlock(innerBlock, page, font, fontBold, fontItalic, fontMono, margin + 10, contentWidth - 10, y, yFloor);
      }
      y -= 4;
      break;
    }

    default:
      break;
  }

  return y;
}

function wrapText(
  text: string,
  font: { widthOfTextAtSize: (text: string, size: number) => number },
  fontSize: number,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}
