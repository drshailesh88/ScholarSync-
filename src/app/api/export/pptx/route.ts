import { NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";
import type { ContentBlock, ThemeConfig } from "@/types/presentation";

interface SlideInput {
  title?: string;
  subtitle?: string;
  content?: string;
  layout?: string;
  contentBlocks?: ContentBlock[];
  speakerNotes?: string;
}

interface ExportRequest {
  title: string;
  slides: SlideInput[];
  themeConfig?: ThemeConfig;
}

function hexNoHash(hex: string): string {
  return (hex || "333333").replace("#", "");
}

export async function POST(req: Request) {
  try {
    const body: ExportRequest = await req.json();

    if (!body.slides || !Array.isArray(body.slides) || body.slides.length === 0) {
      return NextResponse.json(
        { error: "At least one slide is required" },
        { status: 400 }
      );
    }

    const theme = body.themeConfig;
    const primaryColor = hexNoHash(theme?.primaryColor ?? "#1E3A5F");
    const bgColor = hexNoHash(theme?.backgroundColor ?? "#FFFFFF");
    const textColor = hexNoHash(theme?.textColor ?? "#333333");
    const accentColor = hexNoHash(theme?.accentColor ?? "#06B6D4");
    const fontFamily = theme?.fontFamily?.split(",")[0]?.trim() ?? "Arial";
    const headingFont = theme?.headingFontFamily?.split(",")[0]?.trim() ?? fontFamily;

    const pptx = new PptxGenJS();
    pptx.title = body.title || "Presentation";
    pptx.author = "ScholarSync";
    pptx.layout = "LAYOUT_WIDE";

    for (let idx = 0; idx < body.slides.length; idx++) {
      const slideData = body.slides[idx];
      const slide = pptx.addSlide();

      // Background
      slide.background = { fill: bgColor };

      // Speaker notes
      if (slideData.speakerNotes) {
        slide.addNotes(slideData.speakerNotes);
      }

      // Slide number
      slide.addText(`${idx + 1}`, {
        x: 12.2,
        y: 7.0,
        w: 0.5,
        h: 0.3,
        fontSize: 8,
        fontFace: fontFamily,
        color: textColor,
        align: "right",
      });

      const layout = slideData.layout ?? "title_content";
      const blocks = slideData.contentBlocks ?? [];

      switch (layout) {
        case "title_slide":
          renderTitleSlide(slide, slideData, pptx, primaryColor, textColor, fontFamily, headingFont, accentColor);
          break;
        case "section_header":
          renderSectionHeader(slide, slideData, primaryColor, textColor, headingFont, accentColor);
          break;
        case "two_column":
          renderTwoColumn(slide, slideData, blocks, pptx, primaryColor, textColor, fontFamily, headingFont, accentColor);
          break;
        case "chart_slide":
          renderChartSlide(slide, slideData, blocks, pptx, primaryColor, textColor, fontFamily, headingFont, accentColor);
          break;
        case "table_slide":
          renderTableSlide(slide, slideData, blocks, pptx, primaryColor, textColor, fontFamily, headingFont, accentColor);
          break;
        case "quote_slide":
          renderQuoteSlide(slide, slideData, blocks, primaryColor, textColor, fontFamily, headingFont, accentColor);
          break;
        default:
          renderTitleContent(slide, slideData, blocks, pptx, primaryColor, textColor, fontFamily, headingFont, accentColor);
          break;
      }
    }

    const nodeBuffer = (await pptx.write({ outputType: "nodebuffer" })) as Buffer;
    const uint8 = new Uint8Array(nodeBuffer);
    const safeTitle = (body.title || "presentation").replace(/[^a-zA-Z0-9]/g, "_");

    return new Response(uint8, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition": `attachment; filename="${safeTitle}.pptx"`,
        "Content-Length": String(uint8.byteLength),
      },
    });
  } catch (error) {
    console.error("PPTX export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// Layout renderers
// ---------------------------------------------------------------------------

function renderTitleSlide(
  slide: any, data: SlideInput, pptx: PptxGenJS,
  primary: string, text: string, font: string, headingFont: string, accent: string
) {
  // Full accent bar
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: primary } });

  slide.addText(data.title || "Untitled", {
    x: 1.0, y: 2.5, w: 11.0, h: 1.5,
    fontSize: 36, fontFace: headingFont, color: primary, bold: true, align: "center", valign: "middle",
  });

  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 2.0, y: 4.0, w: 9.0, h: 0.8,
      fontSize: 18, fontFace: font, color: text, align: "center",
    });
  }

  slide.addShape(pptx.ShapeType.rect, { x: 5.5, y: 5.0, w: 2.0, h: 0.04, fill: { color: accent } });
}

function renderSectionHeader(
  slide: any, data: SlideInput,
  primary: string, text: string, headingFont: string, accent: string
) {
  slide.addText(data.title || "", {
    x: 1.0, y: 2.8, w: 11.0, h: 1.2,
    fontSize: 32, fontFace: headingFont, color: primary, bold: true, align: "center", valign: "middle",
  });

  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 2.5, y: 4.0, w: 8.0, h: 0.6,
      fontSize: 16, fontFace: headingFont, color: text, align: "center",
    });
  }
}

function renderTitleContent(
  slide: any, data: SlideInput, blocks: ContentBlock[], pptx: PptxGenJS,
  primary: string, text: string, font: string, headingFont: string, accent: string
) {
  // Title bar
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 1.4, fill: { color: primary } });

  slide.addText(data.title || "Untitled Slide", {
    x: 0.6, y: 0.2, w: "90%", h: 1.0,
    fontSize: 28, fontFace: headingFont, color: "FFFFFF", bold: true, valign: "middle",
  });

  // Content from blocks or fallback to plain content
  const contentText = blocksToText(blocks) || data.content || "";

  slide.addText(contentText, {
    x: 0.6, y: 1.8, w: "90%", h: 5.0,
    fontSize: 16, fontFace: font, color: text, valign: "top", paraSpaceAfter: 8,
  });

  // Bottom accent
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.2, w: "100%", h: 0.05, fill: { color: primary } });
}

function renderTwoColumn(
  slide: any, data: SlideInput, blocks: ContentBlock[], pptx: PptxGenJS,
  primary: string, text: string, font: string, headingFont: string, accent: string
) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 1.4, fill: { color: primary } });

  slide.addText(data.title || "", {
    x: 0.6, y: 0.2, w: "90%", h: 1.0,
    fontSize: 28, fontFace: headingFont, color: "FFFFFF", bold: true, valign: "middle",
  });

  const mid = Math.ceil(blocks.length / 2);
  const leftText = blocksToText(blocks.slice(0, mid));
  const rightText = blocksToText(blocks.slice(mid));

  slide.addText(leftText, {
    x: 0.5, y: 1.8, w: 5.5, h: 5.0,
    fontSize: 14, fontFace: font, color: text, valign: "top", paraSpaceAfter: 6,
  });

  slide.addText(rightText, {
    x: 6.5, y: 1.8, w: 5.5, h: 5.0,
    fontSize: 14, fontFace: font, color: text, valign: "top", paraSpaceAfter: 6,
  });

  // Divider
  slide.addShape(pptx.ShapeType.rect, { x: 6.2, y: 2.0, w: 0.02, h: 4.5, fill: { color: accent } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.2, w: "100%", h: 0.05, fill: { color: primary } });
}

function renderChartSlide(
  slide: any, data: SlideInput, blocks: ContentBlock[], pptx: PptxGenJS,
  primary: string, text: string, font: string, headingFont: string, accent: string
) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 1.4, fill: { color: primary } });

  slide.addText(data.title || "", {
    x: 0.6, y: 0.2, w: "90%", h: 1.0,
    fontSize: 28, fontFace: headingFont, color: "FFFFFF", bold: true, valign: "middle",
  });

  const chartBlock = blocks.find((b) => b.type === "chart");
  if (chartBlock?.type === "chart") {
    const cd = chartBlock.data;
    const chartTypeMap: Record<string, any> = {
      bar: pptx.ChartType.bar,
      line: pptx.ChartType.line,
      pie: pptx.ChartType.pie,
    };

    const chartData = cd.datasets.map((ds) => ({
      name: ds.label,
      labels: cd.labels,
      values: ds.data,
    }));

    try {
      slide.addChart(chartTypeMap[cd.chartType] ?? pptx.ChartType.bar, chartData, {
        x: 1.0, y: 1.8, w: 10.0, h: 5.0,
        showTitle: true,
        title: cd.title,
        titleColor: text,
        titleFontSize: 14,
      });
    } catch {
      // Fallback to text if chart fails
      slide.addText(`Chart: ${cd.title}\n${cd.labels.join(", ")}`, {
        x: 1.0, y: 2.0, w: 10.0, h: 4.5,
        fontSize: 14, fontFace: font, color: text, valign: "top",
      });
    }
  }

  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.2, w: "100%", h: 0.05, fill: { color: primary } });
}

function renderTableSlide(
  slide: any, data: SlideInput, blocks: ContentBlock[], pptx: PptxGenJS,
  primary: string, text: string, font: string, headingFont: string, accent: string
) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 1.4, fill: { color: primary } });

  slide.addText(data.title || "", {
    x: 0.6, y: 0.2, w: "90%", h: 1.0,
    fontSize: 28, fontFace: headingFont, color: "FFFFFF", bold: true, valign: "middle",
  });

  const tableBlock = blocks.find((b) => b.type === "table");
  if (tableBlock?.type === "table") {
    const td = tableBlock.data;
    const tableRows: any[][] = [
      td.headers.map((h) => ({ text: h, options: { bold: true, color: "FFFFFF", fill: { color: primary } } })),
      ...td.rows.map((row) => row.map((cell) => ({ text: cell }))),
    ];

    slide.addTable(tableRows, {
      x: 0.5, y: 1.8, w: 12.0,
      fontSize: 12, fontFace: font, color: text,
      border: { pt: 0.5, color: "CCCCCC" },
      autoPage: false,
    });
  }

  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.2, w: "100%", h: 0.05, fill: { color: primary } });
}

function renderQuoteSlide(
  slide: any, data: SlideInput, blocks: ContentBlock[],
  primary: string, text: string, font: string, headingFont: string, accent: string
) {
  const quoteBlock = blocks.find((b) => b.type === "quote");
  const quoteText = quoteBlock?.type === "quote" ? quoteBlock.data.text : data.title || "";
  const attribution = quoteBlock?.type === "quote" ? quoteBlock.data.attribution : "";

  slide.addText(`\u201C${quoteText}\u201D`, {
    x: 1.5, y: 2.0, w: 10.0, h: 3.0,
    fontSize: 24, fontFace: font, color: text, italic: true, align: "center", valign: "middle",
  });

  if (attribution) {
    slide.addText(`\u2014 ${attribution}`, {
      x: 3.0, y: 5.2, w: 7.0, h: 0.5,
      fontSize: 14, fontFace: font, color: accent, align: "center",
    });
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function blocksToText(blocks: ContentBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "text":
          return b.data.text;
        case "bullets":
          return b.data.items.map((item) => `\u2022 ${item}`).join("\n");
        case "quote":
          return `\u201C${b.data.text}\u201D \u2014 ${b.data.attribution}`;
        case "citation":
          return `${b.data.text} (${b.data.source})`;
        case "chart":
          return `[Chart: ${b.data.title}]`;
        case "table":
          return `[Table: ${b.data.headers.join(" | ")}]`;
        case "image":
          return `[Image: ${b.data.alt}]`;
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}
