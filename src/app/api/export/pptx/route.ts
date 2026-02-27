import { NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";
import { z } from "zod";
import type { ContentBlock, ThemeConfig, InstitutionKit } from "@/types/presentation";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

// ---------------------------------------------------------------------------
// Zod validation schema
// ---------------------------------------------------------------------------

const exportPptxSchema = z.object({
  title: z.string().max(500),
  slides: z.array(z.any()).max(100),
  themeConfig: z.object({}).passthrough().optional(),
  institutionKit: z
    .object({
      name: z.string().optional(),
      logoUrl: z.string().url().optional(),
      logoPosition: z.enum(["top-left", "top-right", "bottom-left", "bottom-right"]).optional(),
      footerText: z.string().optional(),
    })
    .passthrough()
    .optional(),
});

type PptxSlide = ReturnType<PptxGenJS["addSlide"]>;

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
  institutionKit?: Partial<InstitutionKit>;
}

// ---------------------------------------------------------------------------
// Color helpers
// ---------------------------------------------------------------------------

function hexNoHash(hex: string): string {
  return (hex || "333333").replace("#", "");
}

/** Lighten a hex color by a given amount (0-1) */
function lightenColor(hex: string, amount: number): string {
  const c = hex.replace("#", "");
  const r = Math.min(255, Math.round(parseInt(c.slice(0, 2), 16) + (255 - parseInt(c.slice(0, 2), 16)) * amount));
  const g = Math.min(255, Math.round(parseInt(c.slice(2, 4), 16) + (255 - parseInt(c.slice(2, 4), 16)) * amount));
  const b = Math.min(255, Math.round(parseInt(c.slice(4, 6), 16) + (255 - parseInt(c.slice(4, 6), 16)) * amount));
  return [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

/** Darken a hex color by a given amount (0-1) */
function darkenColor(hex: string, amount: number): string {
  const c = hex.replace("#", "");
  const r = Math.max(0, Math.round(parseInt(c.slice(0, 2), 16) * (1 - amount)));
  const g = Math.max(0, Math.round(parseInt(c.slice(2, 4), 16) * (1 - amount)));
  const b = Math.max(0, Math.round(parseInt(c.slice(4, 6), 16) * (1 - amount)));
  return [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

// ---------------------------------------------------------------------------
// Callout type to color mapping
// ---------------------------------------------------------------------------

const CALLOUT_COLORS: Record<string, { bg: string; border: string; icon: string }> = {
  info: { bg: "DBEAFE", border: "3B82F6", icon: "\u2139\uFE0F" },
  warning: { bg: "FEF3C7", border: "F59E0B", icon: "\u26A0\uFE0F" },
  success: { bg: "D1FAE5", border: "10B981", icon: "\u2705" },
  finding: { bg: "EDE9FE", border: "8B5CF6", icon: "\uD83D\uDD2C" },
  limitation: { bg: "FEE2E2", border: "EF4444", icon: "\u26A0" },
  methodology: { bg: "E0F2FE", border: "0284C7", icon: "\uD83D\uDDA5" },
  clinical: { bg: "FCE7F3", border: "EC4899", icon: "\uD83C\uDFE5" },
};

// ---------------------------------------------------------------------------
// Slide Masters
// ---------------------------------------------------------------------------

interface ThemeColors {
  primary: string;
  bg: string;
  text: string;
  accent: string;
  font: string;
  headingFont: string;
  surface: string;
  border: string;
  codeBg: string;
  calloutBg: string;
  gradientFrom: string;
  gradientTo: string;
}

function defineAllMasters(pptx: PptxGenJS, tc: ThemeColors, institution?: Partial<InstitutionKit>) {
  const footerLeft = institution?.name || "ScholarSync";
  const footerCenter = institution?.footerText || "";

  // --- Branded Master (default content slides) ---
  pptx.defineSlideMaster({
    title: "BRANDED",
    background: { fill: tc.bg },
    objects: [
      // Bottom accent line
      { rect: { x: 0, y: 7.2, w: "100%" as unknown as number, h: 0.05, fill: { color: tc.primary } } },
      // Footer: left branding
      {
        text: {
          text: footerLeft,
          options: {
            x: 0.4,
            y: 7.0,
            w: 3.0,
            h: 0.25,
            fontSize: 7,
            fontFace: tc.font,
            color: lightenColor(tc.text, 0.4),
            align: "left",
            valign: "middle",
          },
        },
      },
      // Footer: center institution text
      ...(footerCenter
        ? [
            {
              text: {
                text: footerCenter,
                options: {
                  x: 4.0,
                  y: 7.0,
                  w: 5.0,
                  h: 0.25,
                  fontSize: 7,
                  fontFace: tc.font,
                  color: lightenColor(tc.text, 0.4),
                  align: "center" as const,
                  valign: "middle" as const,
                },
              },
            },
          ]
        : []),
    ],
    slideNumber: {
      x: 12.2,
      y: 7.0,
      w: 0.5,
      h: 0.25,
      fontSize: 8,
      fontFace: tc.font,
      color: tc.text,
      align: "right",
    },
  });

  // --- Title Master ---
  pptx.defineSlideMaster({
    title: "TITLE_MASTER",
    background: { fill: tc.bg },
    objects: [
      // Top accent bar
      { rect: { x: 0, y: 0, w: "100%" as unknown as number, h: 0.08, fill: { color: tc.primary } } },
      // Footer branding
      {
        text: {
          text: footerLeft,
          options: {
            x: 0.4,
            y: 7.0,
            w: 3.0,
            h: 0.25,
            fontSize: 7,
            fontFace: tc.font,
            color: lightenColor(tc.text, 0.4),
            align: "left",
            valign: "middle",
          },
        },
      },
    ],
  });

  // --- Section Master ---
  pptx.defineSlideMaster({
    title: "SECTION_MASTER",
    background: { fill: tc.primary },
    objects: [
      {
        text: {
          text: footerLeft,
          options: {
            x: 0.4,
            y: 7.0,
            w: 3.0,
            h: 0.25,
            fontSize: 7,
            fontFace: tc.font,
            color: lightenColor(tc.primary, 0.6),
            align: "left",
            valign: "middle",
          },
        },
      },
    ],
    slideNumber: {
      x: 12.2,
      y: 7.0,
      w: 0.5,
      h: 0.25,
      fontSize: 8,
      fontFace: tc.font,
      color: lightenColor(tc.primary, 0.6),
      align: "right",
    },
  });

  // --- Content Master (with title bar) ---
  pptx.defineSlideMaster({
    title: "CONTENT_MASTER",
    background: { fill: tc.bg },
    objects: [
      // Title bar
      { rect: { x: 0, y: 0, w: "100%" as unknown as number, h: 1.4, fill: { color: tc.primary } } },
      // Bottom accent
      { rect: { x: 0, y: 7.2, w: "100%" as unknown as number, h: 0.05, fill: { color: tc.primary } } },
      // Footer
      {
        text: {
          text: footerLeft,
          options: {
            x: 0.4,
            y: 7.0,
            w: 3.0,
            h: 0.25,
            fontSize: 7,
            fontFace: tc.font,
            color: lightenColor(tc.text, 0.4),
            align: "left",
            valign: "middle",
          },
        },
      },
    ],
    slideNumber: {
      x: 12.2,
      y: 7.0,
      w: 0.5,
      h: 0.25,
      fontSize: 8,
      fontFace: tc.font,
      color: tc.text,
      align: "right",
    },
  });
}

// ---------------------------------------------------------------------------
// POST Handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // Authentication
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitResponse = await checkRateLimit(userId, "export", RATE_LIMITS.export);
    if (rateLimitResponse) return rateLimitResponse;

    // Validate request body
    const rawBody = await req.json();
    const parseResult = exportPptxSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    const body = parseResult.data as ExportRequest;

    if (!body.slides || !Array.isArray(body.slides) || body.slides.length === 0) {
      return NextResponse.json({ error: "At least one slide is required" }, { status: 400 });
    }

    const theme = body.themeConfig;
    const tc: ThemeColors = {
      primary: hexNoHash(theme?.primaryColor ?? "#1E3A5F"),
      bg: hexNoHash(theme?.backgroundColor ?? "#FFFFFF"),
      text: hexNoHash(theme?.textColor ?? "#333333"),
      accent: hexNoHash(theme?.accentColor ?? "#06B6D4"),
      font: theme?.fontFamily?.split(",")[0]?.trim() ?? "Arial",
      headingFont: theme?.headingFontFamily?.split(",")[0]?.trim() ?? theme?.fontFamily?.split(",")[0]?.trim() ?? "Arial",
      surface: hexNoHash(theme?.surfaceColor ?? "#F8FAFC"),
      border: hexNoHash(theme?.borderColor ?? "#E2E8F0"),
      codeBg: hexNoHash(theme?.codeBackground ?? "#1E1E2E"),
      calloutBg: hexNoHash(theme?.calloutBackground ?? "#F0F9FF"),
      gradientFrom: hexNoHash(theme?.gradientFrom ?? theme?.primaryColor ?? "#1E3A5F"),
      gradientTo: hexNoHash(theme?.gradientTo ?? theme?.accentColor ?? "#06B6D4"),
    };

    const pptx = new PptxGenJS();
    pptx.title = body.title || "Presentation";
    pptx.author = "ScholarSync";
    pptx.layout = "LAYOUT_WIDE";

    // Define slide masters
    defineAllMasters(pptx, tc, body.institutionKit);

    for (let idx = 0; idx < body.slides.length; idx++) {
      const slideData = body.slides[idx];
      const layout = slideData.layout ?? "title_content";
      const blocks = slideData.contentBlocks ?? [];

      // Choose master based on layout
      let masterName: string | undefined;
      switch (layout) {
        case "title_slide":
          masterName = "TITLE_MASTER";
          break;
        case "section_header":
          masterName = "SECTION_MASTER";
          break;
        default:
          masterName = "BRANDED";
          break;
      }

      const slide = pptx.addSlide({ masterName });

      // Speaker notes
      if (slideData.speakerNotes) {
        slide.addNotes(slideData.speakerNotes);
      }

      switch (layout) {
        case "title_slide":
          renderTitleSlide(slide, slideData, pptx, tc, body.institutionKit);
          break;
        case "section_header":
          renderSectionHeader(slide, slideData, pptx, tc);
          break;
        case "two_column":
          renderTwoColumn(slide, slideData, blocks, pptx, tc);
          break;
        case "three_column":
          renderThreeColumn(slide, slideData, blocks, pptx, tc);
          break;
        case "chart_slide":
          renderChartSlide(slide, slideData, blocks, pptx, tc);
          break;
        case "table_slide":
          renderTableSlide(slide, slideData, blocks, pptx, tc);
          break;
        case "quote_slide":
          renderQuoteSlide(slide, slideData, blocks, pptx, tc);
          break;
        case "image_text":
          renderImageText(slide, slideData, blocks, pptx, tc);
          break;
        case "comparison":
          renderComparison(slide, slideData, blocks, pptx, tc);
          break;
        case "bibliography_slide":
          renderBibliographySlide(slide, slideData, blocks, pptx, tc);
          break;
        case "methodology":
          renderMethodologySlide(slide, slideData, blocks, pptx, tc);
          break;
        case "results_summary":
          renderResultsSummary(slide, slideData, blocks, pptx, tc);
          break;
        case "key_findings":
          renderKeyFindings(slide, slideData, blocks, pptx, tc);
          break;
        case "timeline_slide":
          renderTimelineSlide(slide, slideData, blocks, pptx, tc);
          break;
        case "stat_overview":
          renderStatOverview(slide, slideData, blocks, pptx, tc);
          break;
        case "big_number":
          renderBigNumber(slide, slideData, blocks, pptx, tc);
          break;
        case "blank":
          renderBlank(slide, slideData, blocks, pptx, tc);
          break;
        default:
          renderTitleContent(slide, slideData, blocks, pptx, tc);
          break;
      }

      // Render inline content blocks that need special treatment (not handled by blocksToText)
      renderInlineContentBlocks(slide, blocks, pptx, tc);
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
    log.error("PPTX export error", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// Inline Content Block Renderer
// (Handles special block types that need their own visual treatment on any slide)
// ---------------------------------------------------------------------------

function renderInlineContentBlocks(slide: PptxSlide, blocks: ContentBlock[], _pptx: PptxGenJS, tc: ThemeColors) {
  // Collect citations for footnote rendering at bottom of slide
  const citations: { index: number; text: string; source: string; doi?: string }[] = [];
  let citationIdx = 1;

  for (const block of blocks) {
    if (block.type === "citation" && block.data.doi) {
      citations.push({
        index: citationIdx++,
        text: block.data.text,
        source: block.data.source,
        doi: block.data.doi,
      });
    }
  }

  // Render citation footnotes at slide bottom if any citations with DOI exist
  if (citations.length > 0) {
    const footnoteText = citations
      .map((c) => `[${c.index}] ${c.source}${c.doi ? ` DOI: ${c.doi}` : ""}`)
      .join("  |  ");

    slide.addText(footnoteText, {
      x: 0.4,
      y: 6.6,
      w: 12.0,
      h: 0.35,
      fontSize: 7,
      fontFace: tc.font,
      color: lightenColor(tc.text, 0.3),
      valign: "bottom",
    });
  }
}

// ---------------------------------------------------------------------------
// Title bar helper (shared by most layouts)
// ---------------------------------------------------------------------------

function addTitleBar(slide: PptxSlide, title: string, pptx: PptxGenJS, tc: ThemeColors) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: "100%" as unknown as number,
    h: 1.4,
    fill: { color: tc.primary },
  });
  slide.addText(title || "Untitled Slide", {
    x: 0.6,
    y: 0.2,
    w: 11.5,
    h: 1.0,
    fontSize: 28,
    fontFace: tc.headingFont,
    color: "FFFFFF",
    bold: true,
    valign: "middle",
  });
}

function addBottomAccent(slide: PptxSlide, pptx: PptxGenJS, tc: ThemeColors) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 7.2,
    w: "100%" as unknown as number,
    h: 0.05,
    fill: { color: tc.primary },
  });
}

// ---------------------------------------------------------------------------
// Layout renderers
// ---------------------------------------------------------------------------

function renderTitleSlide(
  slide: PptxSlide,
  data: SlideInput,
  pptx: PptxGenJS,
  tc: ThemeColors,
  institution?: Partial<InstitutionKit>
) {
  // Gradient or solid top bar
  if (tc.gradientFrom !== tc.gradientTo) {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%" as unknown as number,
      h: 0.08,
      fill: { color: tc.gradientFrom },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.5,
      y: 0,
      w: 6.83,
      h: 0.08,
      fill: { color: tc.gradientTo },
    });
  } else {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%" as unknown as number,
      h: 0.08,
      fill: { color: tc.primary },
    });
  }

  // Institution logo support
  if (institution?.logoUrl) {
    const logoPos = institution.logoPosition ?? "top-right";
    const logoCoords = {
      "top-left": { x: 0.5, y: 0.3 },
      "top-right": { x: 11.0, y: 0.3 },
      "bottom-left": { x: 0.5, y: 6.2 },
      "bottom-right": { x: 11.0, y: 6.2 },
    };
    const pos = logoCoords[logoPos] ?? logoCoords["top-right"];
    try {
      slide.addImage({
        path: institution.logoUrl,
        x: pos.x,
        y: pos.y,
        w: 1.8,
        h: 0.9,
        sizing: { type: "contain", w: 1.8, h: 0.9 },
      });
    } catch {
      // Logo fetch failed -- skip silently
    }
  }

  slide.addText(data.title || "Untitled", {
    x: 1.0,
    y: 2.2,
    w: 11.0,
    h: 1.5,
    fontSize: 36,
    fontFace: tc.headingFont,
    color: tc.primary,
    bold: true,
    align: "center",
    valign: "middle",
    paraSpaceAfter: 6,
  });

  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 2.0,
      y: 3.8,
      w: 9.0,
      h: 0.8,
      fontSize: 18,
      fontFace: tc.font,
      color: tc.text,
      align: "center",
    });
  }

  // Accent divider line
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.5,
    y: 4.8,
    w: 2.0,
    h: 0.04,
    fill: { color: tc.accent },
  });

  // Institution name if provided
  if (institution?.name) {
    slide.addText(institution.name, {
      x: 2.0,
      y: 5.2,
      w: 9.0,
      h: 0.5,
      fontSize: 14,
      fontFace: tc.font,
      color: lightenColor(tc.text, 0.3),
      align: "center",
    });
  }
}

function renderSectionHeader(slide: PptxSlide, data: SlideInput, _pptx: PptxGenJS, tc: ThemeColors) {
  // Section header uses the primary color as full background via SECTION_MASTER
  slide.addText(data.title || "", {
    x: 1.0,
    y: 2.8,
    w: 11.0,
    h: 1.2,
    fontSize: 32,
    fontFace: tc.headingFont,
    color: "FFFFFF",
    bold: true,
    align: "center",
    valign: "middle",
  });

  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 2.5,
      y: 4.0,
      w: 8.0,
      h: 0.6,
      fontSize: 16,
      fontFace: tc.headingFont,
      color: lightenColor(tc.primary, 0.6),
      align: "center",
    });
  }
}

function renderTitleContent(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "Untitled Slide", pptx, tc);

  // Check if there are rich blocks that need special rendering
  const richTypes = new Set(["callout", "code", "math", "diagram", "stat_result", "divider", "bibliography", "timeline"]);
  const hasRichBlocks = blocks.some((b) => richTypes.has(b.type));

  if (hasRichBlocks) {
    renderMixedBlocks(slide, blocks, 0.6, 1.8, 11.5, 6.6, pptx, tc);
  } else {
    // Simple text rendering for basic blocks
    const contentText = blocksToText(blocks) || data.content || "";

    slide.addText(contentText, {
      x: 0.6,
      y: 1.8,
      w: 11.5,
      h: 4.8,
      fontSize: 14,
      fontFace: tc.font,
      color: tc.text,
      valign: "top",
      paraSpaceAfter: 8,
      lineSpacingMultiple: 1.15,
    });
  }

  addBottomAccent(slide, pptx, tc);
}

function renderTwoColumn(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "", pptx, tc);

  const mid = Math.ceil(blocks.length / 2);
  const leftBlocks = blocks.slice(0, mid);
  const rightBlocks = blocks.slice(mid);

  const richTypes = new Set(["callout", "code", "math", "diagram", "stat_result", "divider", "bibliography", "timeline"]);
  const leftHasRich = leftBlocks.some((b) => richTypes.has(b.type));
  const rightHasRich = rightBlocks.some((b) => richTypes.has(b.type));

  if (leftHasRich) {
    renderMixedBlocks(slide, leftBlocks, 0.5, 1.8, 5.5, 6.6, pptx, tc);
  } else {
    slide.addText(blocksToText(leftBlocks), {
      x: 0.5,
      y: 1.8,
      w: 5.5,
      h: 4.8,
      fontSize: 14,
      fontFace: tc.font,
      color: tc.text,
      valign: "top",
      paraSpaceAfter: 6,
      lineSpacingMultiple: 1.1,
    });
  }

  if (rightHasRich) {
    renderMixedBlocks(slide, rightBlocks, 6.5, 1.8, 5.5, 6.6, pptx, tc);
  } else {
    slide.addText(blocksToText(rightBlocks), {
      x: 6.5,
      y: 1.8,
      w: 5.5,
      h: 4.8,
      fontSize: 14,
      fontFace: tc.font,
      color: tc.text,
      valign: "top",
      paraSpaceAfter: 6,
      lineSpacingMultiple: 1.1,
    });
  }

  // Vertical divider
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.2,
    y: 2.0,
    w: 0.02,
    h: 4.5,
    fill: { color: tc.accent },
  });

  addBottomAccent(slide, pptx, tc);
}

function renderThreeColumn(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "", pptx, tc);

  const third1 = Math.ceil(blocks.length / 3);
  const third2 = Math.ceil((blocks.length * 2) / 3);
  const col1Text = blocksToText(blocks.slice(0, third1));
  const col2Text = blocksToText(blocks.slice(third1, third2));
  const col3Text = blocksToText(blocks.slice(third2));

  const colWidth = 3.6;
  const colY = 1.8;
  const colH = 4.8;
  const colGap = 0.4;

  [
    { text: col1Text, x: 0.5 },
    { text: col2Text, x: 0.5 + colWidth + colGap },
    { text: col3Text, x: 0.5 + (colWidth + colGap) * 2 },
  ].forEach(({ text, x }) => {
    slide.addText(text, {
      x,
      y: colY,
      w: colWidth,
      h: colH,
      fontSize: 12,
      fontFace: tc.font,
      color: tc.text,
      valign: "top",
      paraSpaceAfter: 6,
      lineSpacingMultiple: 1.1,
    });
  });

  // Vertical dividers
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5 + colWidth + colGap / 2 - 0.01,
    y: 2.0,
    w: 0.02,
    h: 4.3,
    fill: { color: tc.border },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5 + (colWidth + colGap) * 2 - colGap / 2 - 0.01,
    y: 2.0,
    w: 0.02,
    h: 4.3,
    fill: { color: tc.border },
  });

  addBottomAccent(slide, pptx, tc);
}

function renderChartSlide(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "", pptx, tc);

  const chartBlock = blocks.find((b) => b.type === "chart");
  if (chartBlock?.type === "chart") {
    const cd = chartBlock.data;

    // Handle forest_plot with custom shapes
    if (cd.chartType === "forest_plot") {
      renderForestPlot(slide, cd, pptx, tc);
      addBottomAccent(slide, pptx, tc);
      return;
    }

    // Handle funnel with custom shapes
    if (cd.chartType === "funnel") {
      renderFunnelChart(slide, cd, pptx, tc);
      addBottomAccent(slide, pptx, tc);
      return;
    }

    const chartTypeMap: Record<string, PptxGenJS.CHART_NAME> = {
      bar: pptx.ChartType.bar,
      line: pptx.ChartType.line,
      pie: pptx.ChartType.pie,
      scatter: pptx.ChartType.scatter,
      area: pptx.ChartType.area,
      radar: pptx.ChartType.radar,
    };

    // Build chart data -- scatter needs special handling
    let chartData: PptxGenJS.OptsChartData[];
    if (cd.chartType === "scatter") {
      chartData = cd.datasets.map((ds, _dsIdx) => ({
        name: ds.label,
        values: ds.data.map((val, i) => ({
          x: cd.labels[i] ? parseFloat(cd.labels[i]) || i : i,
          y: val,
        })),
        color: ds.color ? hexNoHash(ds.color) : undefined,
      })) as unknown as PptxGenJS.OptsChartData[];
    } else {
      chartData = cd.datasets.map((ds) => ({
        name: ds.label,
        labels: cd.labels,
        values: ds.data,
        color: ds.color ? hexNoHash(ds.color) : undefined,
      })) as unknown as PptxGenJS.OptsChartData[];
    }

    try {
      slide.addChart(chartTypeMap[cd.chartType] ?? pptx.ChartType.bar, chartData, {
        x: 1.0,
        y: 1.8,
        w: 10.0,
        h: 4.8,
        showTitle: true,
        title: cd.title,
        titleColor: tc.text,
        titleFontSize: 14,
        showLegend: cd.showLegend !== false,
        legendPos: "b",
        legendFontSize: 10,
        catAxisLabelColor: tc.text,
        catAxisLabelFontSize: 10,
        valAxisLabelColor: tc.text,
        valAxisLabelFontSize: 10,
      });

      // Axis labels
      if (cd.xAxisLabel) {
        slide.addText(cd.xAxisLabel, {
          x: 4.0,
          y: 6.7,
          w: 5.0,
          h: 0.3,
          fontSize: 10,
          fontFace: tc.font,
          color: lightenColor(tc.text, 0.2),
          align: "center",
        });
      }
      if (cd.yAxisLabel) {
        slide.addText(cd.yAxisLabel, {
          x: 0.2,
          y: 3.5,
          w: 0.8,
          h: 2.0,
          fontSize: 10,
          fontFace: tc.font,
          color: lightenColor(tc.text, 0.2),
          align: "center",
          rotate: 270,
        });
      }
    } catch {
      // Fallback to text if chart fails
      slide.addText(`Chart: ${cd.title}\n${cd.labels.join(", ")}`, {
        x: 1.0,
        y: 2.0,
        w: 10.0,
        h: 4.5,
        fontSize: 14,
        fontFace: tc.font,
        color: tc.text,
        valign: "top",
      });
    }
  }

  addBottomAccent(slide, pptx, tc);
}

/** Forest plot rendered with shapes and lines */
function renderForestPlot(
  slide: PptxSlide,
  cd: { title: string; labels: string[]; datasets: { label: string; data: number[]; color?: string }[]; xAxisLabel?: string; yAxisLabel?: string },
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  // Title
  slide.addText(cd.title, {
    x: 1.0,
    y: 1.6,
    w: 11.0,
    h: 0.5,
    fontSize: 16,
    fontFace: tc.headingFont,
    color: tc.text,
    bold: true,
    align: "center",
  });

  const startY = 2.3;
  const labelX = 0.5;
  const labelW = 3.0;
  const plotX = 3.8;
  const plotW = 7.5;
  const plotCenterX = plotX + plotW / 2;
  const maxRows = Math.min(cd.labels.length, 10);
  const rowH = 0.4;
  const plotEndY = startY + maxRows * rowH;

  // Vertical center line (null effect line at x=0 or x=1 depending on context)
  slide.addShape(pptx.ShapeType.rect, {
    x: plotCenterX - 0.005,
    y: startY - 0.1,
    w: 0.01,
    h: plotEndY - startY + 0.2,
    fill: { color: tc.border },
  });

  // "Favors" labels
  slide.addText(cd.xAxisLabel || "Favors Treatment", {
    x: plotX,
    y: plotEndY + 0.1,
    w: plotW / 2 - 0.1,
    h: 0.3,
    fontSize: 8,
    fontFace: tc.font,
    color: lightenColor(tc.text, 0.3),
    align: "center",
  });
  slide.addText(cd.yAxisLabel || "Favors Control", {
    x: plotCenterX + 0.1,
    y: plotEndY + 0.1,
    w: plotW / 2 - 0.1,
    h: 0.3,
    fontSize: 8,
    fontFace: tc.font,
    color: lightenColor(tc.text, 0.3),
    align: "center",
  });

  // Get the main dataset (point estimates) and CI dataset if available
  const estimates = cd.datasets[0]?.data ?? [];
  const ciLower = cd.datasets[1]?.data ?? [];
  const ciUpper = cd.datasets[2]?.data ?? [];

  // Determine scale from data
  const allValues = [...estimates, ...ciLower, ...ciUpper].filter((v) => isFinite(v));
  const dataMin = allValues.length > 0 ? Math.min(...allValues) : -2;
  const dataMax = allValues.length > 0 ? Math.max(...allValues) : 2;
  const range = Math.max(Math.abs(dataMin), Math.abs(dataMax), 1) * 1.2;

  const scaleX = (val: number): number => {
    return plotCenterX + (val / range) * (plotW / 2);
  };

  cd.labels.slice(0, maxRows).forEach((label, i) => {
    const y = startY + i * rowH;
    const estimate = estimates[i] ?? 0;

    // Study label
    slide.addText(label, {
      x: labelX,
      y,
      w: labelW,
      h: rowH,
      fontSize: 9,
      fontFace: tc.font,
      color: tc.text,
      valign: "middle",
      align: "right",
    });

    // CI line if data available
    if (ciLower[i] !== undefined && ciUpper[i] !== undefined) {
      const x1 = scaleX(ciLower[i]);
      const x2 = scaleX(ciUpper[i]);
      slide.addShape(pptx.ShapeType.rect, {
        x: x1,
        y: y + rowH / 2 - 0.01,
        w: Math.max(x2 - x1, 0.02),
        h: 0.02,
        fill: { color: tc.primary },
      });
    }

    // Point estimate diamond
    const px = scaleX(estimate);
    slide.addShape(pptx.ShapeType.rect, {
      x: px - 0.06,
      y: y + rowH / 2 - 0.06,
      w: 0.12,
      h: 0.12,
      fill: { color: tc.primary },
      rotate: 45,
    });
  });

  // Overall effect diamond (last row, larger)
  if (maxRows > 1 && estimates.length > 0) {
    const overallY = plotEndY + 0.05;
    const overallEstimate = estimates[estimates.length - 1] ?? 0;
    const px = scaleX(overallEstimate);

    slide.addText("Overall", {
      x: labelX,
      y: overallY,
      w: labelW,
      h: rowH,
      fontSize: 9,
      fontFace: tc.headingFont,
      color: tc.text,
      bold: true,
      valign: "middle",
      align: "right",
    });

    slide.addShape(pptx.ShapeType.rect, {
      x: px - 0.1,
      y: overallY + rowH / 2 - 0.1,
      w: 0.2,
      h: 0.2,
      fill: { color: tc.accent },
      rotate: 45,
    });
  }
}

/** Funnel chart rendered with trapezoid shapes */
function renderFunnelChart(
  slide: PptxSlide,
  cd: { title: string; labels: string[]; datasets: { label: string; data: number[]; color?: string }[] },
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  slide.addText(cd.title, {
    x: 1.0,
    y: 1.6,
    w: 11.0,
    h: 0.5,
    fontSize: 16,
    fontFace: tc.headingFont,
    color: tc.text,
    bold: true,
    align: "center",
  });

  const values = cd.datasets[0]?.data ?? [];
  const maxVal = Math.max(...values, 1);
  const count = Math.min(cd.labels.length, 8);
  const startY = 2.3;
  const totalH = 4.2;
  const rowH = totalH / count;
  const centerX = 6.665;
  const maxBarW = 8.0;

  cd.labels.slice(0, count).forEach((label, i) => {
    const val = values[i] ?? 0;
    const barW = (val / maxVal) * maxBarW;
    const y = startY + i * rowH;
    const barColor = lightenColor(tc.primary, i * 0.08);

    // Funnel bar (centered)
    slide.addShape(pptx.ShapeType.rect, {
      x: centerX - barW / 2,
      y,
      w: barW,
      h: rowH - 0.05,
      fill: { color: barColor },
      rectRadius: 0.04,
    });

    // Label text
    slide.addText(`${label}: ${val}`, {
      x: centerX - barW / 2,
      y,
      w: barW,
      h: rowH - 0.05,
      fontSize: 11,
      fontFace: tc.font,
      color: "FFFFFF",
      bold: true,
      align: "center",
      valign: "middle",
    });
  });
}

function renderTableSlide(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "", pptx, tc);

  const tableBlock = blocks.find((b) => b.type === "table");
  if (tableBlock?.type === "table") {
    const td = tableBlock.data;
    const altRowColor = lightenColor(tc.surface, 0.2);

    const tableRows: PptxGenJS.TableRow[] = [
      // Header row
      td.headers.map((h) => ({
        text: h,
        options: {
          bold: true,
          color: "FFFFFF",
          fill: { color: tc.primary },
          fontSize: 11,
          fontFace: tc.headingFont,
          valign: "middle" as const,
          align: "center" as const,
          margin: [4, 6, 4, 6] as [number, number, number, number],
        },
      })),
      // Data rows with alternating colors
      ...td.rows.map((row, rowIdx) =>
        row.map((cell) => ({
          text: cell,
          options: {
            fill: { color: rowIdx % 2 === 0 ? tc.bg : altRowColor },
            fontSize: 10,
            fontFace: tc.font,
            color: tc.text,
            valign: "middle" as const,
            margin: [3, 6, 3, 6] as [number, number, number, number],
          },
        }))
      ),
    ];

    slide.addTable(tableRows, {
      x: 0.5,
      y: 1.8,
      w: 12.0,
      fontSize: 10,
      fontFace: tc.font,
      color: tc.text,
      border: { pt: 0.5, color: tc.border },
      autoPage: false,
    });
  }

  addBottomAccent(slide, pptx, tc);
}

function renderQuoteSlide(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  _pptx: PptxGenJS,
  tc: ThemeColors
) {
  const quoteBlock = blocks.find((b) => b.type === "quote");
  const quoteText = quoteBlock?.type === "quote" ? quoteBlock.data.text : data.title || "";
  const attribution = quoteBlock?.type === "quote" ? quoteBlock.data.attribution : "";

  slide.addText(`\u201C${quoteText}\u201D`, {
    x: 1.5,
    y: 2.0,
    w: 10.0,
    h: 3.0,
    fontSize: 24,
    fontFace: tc.font,
    color: tc.text,
    italic: true,
    align: "center",
    valign: "middle",
    lineSpacingMultiple: 1.3,
  });

  if (attribution) {
    slide.addText(`\u2014 ${attribution}`, {
      x: 3.0,
      y: 5.2,
      w: 7.0,
      h: 0.5,
      fontSize: 14,
      fontFace: tc.font,
      color: tc.accent,
      align: "center",
    });
  }
}

function renderImageText(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "", pptx, tc);

  const imageBlock = blocks.find((b) => b.type === "image");
  const textBlocks = blocks.filter((b) => b.type !== "image");
  const contentText = blocksToText(textBlocks) || data.content || "";

  // Left side: image or placeholder
  if (imageBlock?.type === "image" && imageBlock.data.url) {
    try {
      slide.addImage({
        path: imageBlock.data.url,
        x: 0.5,
        y: 1.8,
        w: 5.5,
        h: 4.5,
        sizing: { type: "contain", w: 5.5, h: 4.5 },
      });
    } catch {
      // Image failed, show placeholder
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.5,
        y: 1.8,
        w: 5.5,
        h: 4.5,
        fill: { color: tc.surface },
        rectRadius: 0.06,
      });
      slide.addText(imageBlock.data.alt || imageBlock.data.suggestion || "Image", {
        x: 0.7,
        y: 3.2,
        w: 5.1,
        h: 1.5,
        fontSize: 12,
        fontFace: tc.font,
        color: lightenColor(tc.text, 0.3),
        align: "center",
        valign: "middle",
        italic: true,
      });
    }
  } else if (imageBlock?.type === "image") {
    // Placeholder for suggested image
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 1.8,
      w: 5.5,
      h: 4.5,
      fill: { color: tc.surface },
      rectRadius: 0.06,
    });
    slide.addText(imageBlock.data.suggestion || imageBlock.data.alt || "Image Placeholder", {
      x: 0.7,
      y: 3.2,
      w: 5.1,
      h: 1.5,
      fontSize: 12,
      fontFace: tc.font,
      color: lightenColor(tc.text, 0.3),
      align: "center",
      valign: "middle",
      italic: true,
    });
  }

  // Right side: text
  slide.addText(contentText, {
    x: 6.5,
    y: 1.8,
    w: 5.5,
    h: 4.8,
    fontSize: 14,
    fontFace: tc.font,
    color: tc.text,
    valign: "top",
    paraSpaceAfter: 6,
    lineSpacingMultiple: 1.1,
  });

  // Caption if available
  if (imageBlock?.type === "image" && imageBlock.data.caption) {
    slide.addText(imageBlock.data.caption, {
      x: 0.5,
      y: 6.4,
      w: 5.5,
      h: 0.3,
      fontSize: 8,
      fontFace: tc.font,
      color: lightenColor(tc.text, 0.3),
      italic: true,
      align: "center",
    });
  }

  addBottomAccent(slide, pptx, tc);
}

function renderComparison(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "Comparison", pptx, tc);

  const mid = Math.ceil(blocks.length / 2);
  const leftBlocks = blocks.slice(0, mid);
  const rightBlocks = blocks.slice(mid);

  // Left panel background
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.4,
    y: 1.7,
    w: 5.7,
    h: 5.0,
    fill: { color: tc.surface },
    rectRadius: 0.08,
  });

  // Right panel background
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.5,
    y: 1.7,
    w: 5.7,
    h: 5.0,
    fill: { color: tc.surface },
    rectRadius: 0.08,
  });

  // VS badge in center
  slide.addText("VS", {
    x: 5.9,
    y: 3.6,
    w: 0.8,
    h: 0.8,
    fontSize: 14,
    fontFace: tc.headingFont,
    color: "FFFFFF",
    bold: true,
    align: "center",
    valign: "middle",
    fill: { color: tc.accent },
    rectRadius: 0.4,
  } as PptxGenJS.TextPropsOptions);

  // Left content
  slide.addText(blocksToText(leftBlocks), {
    x: 0.6,
    y: 1.9,
    w: 5.3,
    h: 4.6,
    fontSize: 13,
    fontFace: tc.font,
    color: tc.text,
    valign: "top",
    paraSpaceAfter: 6,
    lineSpacingMultiple: 1.1,
  });

  // Right content
  slide.addText(blocksToText(rightBlocks), {
    x: 6.7,
    y: 1.9,
    w: 5.3,
    h: 4.6,
    fontSize: 13,
    fontFace: tc.font,
    color: tc.text,
    valign: "top",
    paraSpaceAfter: 6,
    lineSpacingMultiple: 1.1,
  });

  addBottomAccent(slide, pptx, tc);
}

function renderBlank(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  // Blank layout: no title bar, just render content blocks freely
  if (blocks.length > 0) {
    const richTypes = new Set(["callout", "code", "math", "diagram", "stat_result", "divider", "bibliography", "timeline"]);
    const hasRichBlocks = blocks.some((b) => richTypes.has(b.type));

    if (hasRichBlocks) {
      renderMixedBlocks(slide, blocks, 0.6, 0.5, 11.5, 6.8, pptx, tc);
    } else {
      const contentText = blocksToText(blocks) || data.content || "";
      slide.addText(contentText, {
        x: 0.6,
        y: 0.5,
        w: 11.5,
        h: 6.5,
        fontSize: 14,
        fontFace: tc.font,
        color: tc.text,
        valign: "top",
        paraSpaceAfter: 8,
        lineSpacingMultiple: 1.15,
      });
    }
  }

  addBottomAccent(slide, pptx, tc);
}

// ---------------------------------------------------------------------------
// New layout renderers
// ---------------------------------------------------------------------------

function renderBibliographySlide(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "References", pptx, tc);

  const bibBlock = blocks.find((b) => b.type === "bibliography");
  if (bibBlock?.type === "bibliography") {
    const entries = bibBlock.data.entries;
    const mid = Math.ceil(entries.length / 2);
    const leftEntries = entries.slice(0, mid);
    const rightEntries = entries.slice(mid);

    const formatEntries = (items: typeof entries) =>
      items.map((e, i) => `[${typeof e.id === "number" ? e.id : i + 1}] ${e.formatted}`).join("\n\n");

    // Left column
    slide.addText(formatEntries(leftEntries), {
      x: 0.4,
      y: 1.7,
      w: 5.8,
      h: 5.0,
      fontSize: 9,
      fontFace: tc.font,
      color: tc.text,
      valign: "top",
      paraSpaceAfter: 4,
      lineSpacingMultiple: 1.1,
    });

    // Right column
    if (rightEntries.length > 0) {
      slide.addText(formatEntries(rightEntries), {
        x: 6.6,
        y: 1.7,
        w: 5.8,
        h: 5.0,
        fontSize: 9,
        fontFace: tc.font,
        color: tc.text,
        valign: "top",
        paraSpaceAfter: 4,
        lineSpacingMultiple: 1.1,
      });

      // Divider
      slide.addShape(pptx.ShapeType.rect, {
        x: 6.35,
        y: 1.9,
        w: 0.02,
        h: 4.5,
        fill: { color: tc.border },
      });
    }
  } else {
    // Fallback: render any citation blocks as bibliography
    const citations = blocks.filter((b) => b.type === "citation");
    if (citations.length > 0) {
      const refText = citations
        .map((c, i) => {
          if (c.type === "citation") {
            const d = c.data;
            const authors = d.authors?.join(", ") ?? "";
            const year = d.year ? ` (${d.year})` : "";
            return `[${i + 1}] ${authors}${year}. ${d.text}. ${d.journal ?? d.source}${d.doi ? `. DOI: ${d.doi}` : ""}`;
          }
          return "";
        })
        .filter(Boolean)
        .join("\n\n");

      slide.addText(refText, {
        x: 0.5,
        y: 1.7,
        w: 12.0,
        h: 5.0,
        fontSize: 9,
        fontFace: tc.font,
        color: tc.text,
        valign: "top",
        paraSpaceAfter: 4,
      });
    }
  }

  addBottomAccent(slide, pptx, tc);
}

function renderMethodologySlide(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "Methodology", pptx, tc);

  // Left 60%: study design description
  const textBlocks = blocks.filter((b) => b.type === "text" || b.type === "bullets");
  const descriptionText = blocksToText(textBlocks) || data.content || "";

  slide.addText(descriptionText, {
    x: 0.5,
    y: 1.8,
    w: 7.0,
    h: 4.8,
    fontSize: 13,
    fontFace: tc.font,
    color: tc.text,
    valign: "top",
    paraSpaceAfter: 6,
    lineSpacingMultiple: 1.15,
  });

  // Right 40%: parameters panel
  const statBlocks = blocks.filter((b) => b.type === "stat_result");
  const calloutBlocks = blocks.filter((b) => b.type === "callout");
  const paramBlocks = [...statBlocks, ...calloutBlocks];

  // Parameters panel background
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.8,
    y: 1.7,
    w: 4.8,
    h: 5.0,
    fill: { color: tc.surface },
    rectRadius: 0.1,
  });

  slide.addText("Parameters", {
    x: 8.0,
    y: 1.8,
    w: 4.4,
    h: 0.5,
    fontSize: 14,
    fontFace: tc.headingFont,
    color: tc.primary,
    bold: true,
  });

  if (paramBlocks.length > 0) {
    let paramY = 2.4;
    for (const block of paramBlocks) {
      if (paramY > 6.2) break;
      if (block.type === "stat_result") {
        slide.addText(block.data.label, {
          x: 8.2,
          y: paramY,
          w: 4.2,
          h: 0.25,
          fontSize: 10,
          fontFace: tc.font,
          color: lightenColor(tc.text, 0.2),
        });
        slide.addText(block.data.value, {
          x: 8.2,
          y: paramY + 0.25,
          w: 4.2,
          h: 0.3,
          fontSize: 14,
          fontFace: tc.headingFont,
          color: tc.primary,
          bold: true,
        });
        paramY += 0.7;
      } else if (block.type === "callout") {
        slide.addText(`${block.data.title ?? block.data.type}: ${block.data.text}`, {
          x: 8.2,
          y: paramY,
          w: 4.2,
          h: 0.4,
          fontSize: 10,
          fontFace: tc.font,
          color: tc.text,
        });
        paramY += 0.5;
      }
    }
  } else {
    // Show content/subtitle as parameter text
    const paramText = data.subtitle || data.content || "";
    if (paramText) {
      slide.addText(paramText, {
        x: 8.2,
        y: 2.4,
        w: 4.2,
        h: 3.8,
        fontSize: 11,
        fontFace: tc.font,
        color: tc.text,
        valign: "top",
        paraSpaceAfter: 4,
      });
    }
  }

  addBottomAccent(slide, pptx, tc);
}

function renderResultsSummary(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "Results Summary", pptx, tc);

  const statBlocks = blocks.filter((b) => b.type === "stat_result");
  if (statBlocks.length > 0) {
    // Grid layout: 2-3 cards across
    const cols = Math.min(statBlocks.length, 3);
    const cardW = 3.5;
    const cardH = 2.0;
    const startX = (13.33 - cols * cardW - (cols - 1) * 0.3) / 2;
    const startY = 2.0;

    statBlocks.slice(0, 6).forEach((block, i) => {
      if (block.type !== "stat_result") return;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + 0.3);
      const y = startY + row * (cardH + 0.3);

      // Card background
      slide.addShape(pptx.ShapeType.rect, {
        x,
        y,
        w: cardW,
        h: cardH,
        fill: { color: tc.surface },
        rectRadius: 0.1,
        shadow: { type: "outer", blur: 3, offset: 1, color: "000000", opacity: 0.1 },
      });

      // Large value
      slide.addText(block.data.value, {
        x,
        y: y + 0.2,
        w: cardW,
        h: 0.7,
        fontSize: 26,
        fontFace: tc.headingFont,
        color: tc.primary,
        bold: true,
        align: "center",
        valign: "middle",
      });

      // Label
      slide.addText(block.data.label, {
        x,
        y: y + 0.9,
        w: cardW,
        h: 0.4,
        fontSize: 11,
        fontFace: tc.font,
        color: tc.text,
        align: "center",
      });

      // CI / p-value
      const subText = [block.data.ci ? `CI: ${block.data.ci}` : "", block.data.pValue ? `p=${block.data.pValue}` : ""]
        .filter(Boolean)
        .join("  ");
      if (subText) {
        slide.addText(subText, {
          x,
          y: y + 1.3,
          w: cardW,
          h: 0.35,
          fontSize: 9,
          fontFace: tc.font,
          color: lightenColor(tc.text, 0.3),
          align: "center",
        });
      }

      // Interpretation if available
      if (block.data.interpretation) {
        slide.addText(block.data.interpretation, {
          x: x + 0.1,
          y: y + 1.6,
          w: cardW - 0.2,
          h: 0.3,
          fontSize: 8,
          fontFace: tc.font,
          color: lightenColor(tc.text, 0.25),
          align: "center",
          italic: true,
        });
      }
    });
  } else {
    // Fallback: render as normal text
    const contentText = blocksToText(blocks) || data.content || "";
    slide.addText(contentText, {
      x: 0.6,
      y: 1.8,
      w: 11.5,
      h: 4.8,
      fontSize: 14,
      fontFace: tc.font,
      color: tc.text,
      valign: "top",
      paraSpaceAfter: 8,
    });
  }

  addBottomAccent(slide, pptx, tc);
}

function renderKeyFindings(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "Key Findings", pptx, tc);

  const calloutBlocks = blocks.filter((b) => b.type === "callout");
  const bulletBlocks = blocks.filter((b) => b.type === "bullets" || b.type === "text");

  // Check for a hero stat block for the big_number portion
  const statBlock = blocks.find((b) => b.type === "stat_result");
  if (statBlock?.type === "stat_result" && calloutBlocks.length === 0) {
    // Big number hero with supporting content
    slide.addText(statBlock.data.value, {
      x: 0.6,
      y: 1.8,
      w: 4.0,
      h: 2.0,
      fontSize: 48,
      fontFace: tc.headingFont,
      color: tc.primary,
      bold: true,
      align: "center",
      valign: "middle",
    });

    slide.addText(statBlock.data.label, {
      x: 0.6,
      y: 3.8,
      w: 4.0,
      h: 0.5,
      fontSize: 14,
      fontFace: tc.font,
      color: tc.text,
      align: "center",
    });

    // Supporting content on the right
    const supportText = blocksToText(blocks.filter((b) => b.type !== "stat_result")) || "";
    if (supportText) {
      slide.addText(supportText, {
        x: 5.0,
        y: 1.8,
        w: 7.0,
        h: 4.8,
        fontSize: 13,
        fontFace: tc.font,
        color: tc.text,
        valign: "top",
        paraSpaceAfter: 6,
        lineSpacingMultiple: 1.1,
      });
    }
  } else if (calloutBlocks.length > 0) {
    let yPos = 1.8;
    calloutBlocks.slice(0, 5).forEach((block, i) => {
      if (block.type !== "callout" || yPos > 6.2) return;
      const colors = CALLOUT_COLORS[block.data.type] ?? CALLOUT_COLORS.info;

      // Callout background
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.6,
        y: yPos,
        w: 11.5,
        h: 0.85,
        fill: { color: colors.bg },
        rectRadius: 0.06,
      });

      // Left accent border
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.6,
        y: yPos,
        w: 0.06,
        h: 0.85,
        fill: { color: colors.border },
      });

      // Number badge
      slide.addText(`${i + 1}`, {
        x: 0.85,
        y: yPos + 0.15,
        w: 0.45,
        h: 0.45,
        fontSize: 14,
        fontFace: tc.headingFont,
        color: "FFFFFF",
        bold: true,
        align: "center",
        valign: "middle",
        fill: { color: colors.border },
        rectRadius: 0.23,
      } as PptxGenJS.TextPropsOptions);

      // Text
      const titlePart = block.data.title ? `${block.data.title}: ` : "";
      slide.addText(`${titlePart}${block.data.text}`, {
        x: 1.5,
        y: yPos + 0.1,
        w: 10.4,
        h: 0.65,
        fontSize: 12,
        fontFace: tc.font,
        color: tc.text,
        valign: "middle",
      });

      yPos += 1.0;
    });
  } else {
    // Fallback: numbered list from bullets or text
    const contentText = blocksToText(bulletBlocks.length > 0 ? bulletBlocks : blocks) || data.content || "";
    const lines = contentText.split("\n").filter(Boolean);
    let yPos = 1.8;
    lines.slice(0, 6).forEach((line, i) => {
      if (yPos > 6.2) return;

      slide.addShape(pptx.ShapeType.rect, {
        x: 0.6,
        y: yPos,
        w: 11.5,
        h: 0.7,
        fill: { color: i % 2 === 0 ? tc.surface : tc.bg },
        rectRadius: 0.05,
      });

      slide.addText(`${i + 1}.  ${line.replace(/^\u2022\s*/, "")}`, {
        x: 0.8,
        y: yPos,
        w: 11.0,
        h: 0.7,
        fontSize: 13,
        fontFace: tc.font,
        color: tc.text,
        valign: "middle",
      });

      yPos += 0.8;
    });
  }

  addBottomAccent(slide, pptx, tc);
}

function renderTimelineSlide(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "Timeline", pptx, tc);

  const timelineBlock = blocks.find((b) => b.type === "timeline");
  if (timelineBlock?.type === "timeline") {
    const entries = timelineBlock.data.entries;
    const count = Math.min(entries.length, 8);
    if (count === 0) {
      addBottomAccent(slide, pptx, tc);
      return;
    }

    const lineY = 3.8;
    const startX = 0.8;
    const endX = 12.2;
    const totalW = endX - startX;

    // Horizontal arrow line
    slide.addShape(pptx.ShapeType.rect, {
      x: startX,
      y: lineY,
      w: totalW,
      h: 0.04,
      fill: { color: tc.primary },
    });

    // Arrow head
    slide.addText("\u25B6", {
      x: endX - 0.2,
      y: lineY - 0.15,
      w: 0.3,
      h: 0.3,
      fontSize: 14,
      color: tc.primary,
      align: "center",
      valign: "middle",
    });

    const spacing = totalW / (count + 1);
    entries.slice(0, count).forEach((entry, i) => {
      const x = startX + spacing * (i + 1);
      const statusColor =
        entry.status === "completed"
          ? "10B981"
          : entry.status === "in_progress"
            ? tc.accent
            : lightenColor(tc.text, 0.3);

      // Milestone dot
      slide.addShape(pptx.ShapeType.ellipse, {
        x: x - 0.15,
        y: lineY - 0.13,
        w: 0.3,
        h: 0.3,
        fill: { color: statusColor },
      });

      // Label above or below (alternating)
      slide.addText(entry.label, {
        x: x - 0.8,
        y: i % 2 === 0 ? lineY - 1.2 : lineY + 0.4,
        w: 1.6,
        h: 0.5,
        fontSize: 10,
        fontFace: tc.headingFont,
        color: tc.text,
        bold: true,
        align: "center",
        valign: "middle",
      });

      // Date/description
      const desc = entry.date || entry.description || "";
      if (desc) {
        slide.addText(desc, {
          x: x - 0.8,
          y: i % 2 === 0 ? lineY - 0.7 : lineY + 0.9,
          w: 1.6,
          h: 0.35,
          fontSize: 8,
          fontFace: tc.font,
          color: lightenColor(tc.text, 0.25),
          align: "center",
        });
      }

      // Connector line from dot to label
      slide.addShape(pptx.ShapeType.rect, {
        x: x - 0.005,
        y: i % 2 === 0 ? lineY - 0.65 : lineY + 0.17,
        w: 0.01,
        h: i % 2 === 0 ? 0.52 : 0.25,
        fill: { color: lightenColor(tc.text, 0.5) },
      });
    });
  } else {
    // Fallback: render as text
    const contentText = blocksToText(blocks) || data.content || "";
    slide.addText(contentText, {
      x: 0.6,
      y: 1.8,
      w: 11.5,
      h: 4.8,
      fontSize: 14,
      fontFace: tc.font,
      color: tc.text,
      valign: "top",
    });
  }

  addBottomAccent(slide, pptx, tc);
}

function renderStatOverview(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  addTitleBar(slide, data.title || "Statistical Overview", pptx, tc);

  const statBlocks = blocks.filter((b) => b.type === "stat_result");
  if (statBlocks.length > 0) {
    const cols = Math.min(statBlocks.length, 4);
    const cardW = 2.7;
    const cardH = 2.5;
    const gap = 0.25;
    const totalGridW = cols * cardW + (cols - 1) * gap;
    const startX = (13.33 - totalGridW) / 2;

    const rows = Math.ceil(statBlocks.length / cols);
    const startY = 1.8;

    statBlocks.slice(0, 8).forEach((block, i) => {
      if (block.type !== "stat_result") return;
      const col = i % cols;
      const row = Math.floor(i / cols);
      if (row >= rows) return;

      const x = startX + col * (cardW + gap);
      const y = startY + row * (cardH + gap);

      // Card
      slide.addShape(pptx.ShapeType.rect, {
        x,
        y,
        w: cardW,
        h: cardH,
        fill: { color: tc.surface },
        rectRadius: 0.08,
        shadow: { type: "outer", blur: 2, offset: 1, color: "000000", opacity: 0.08 },
      });

      // Top accent line on card
      slide.addShape(pptx.ShapeType.rect, {
        x: x + 0.3,
        y,
        w: cardW - 0.6,
        h: 0.04,
        fill: { color: tc.primary },
      });

      // Big number
      slide.addText(block.data.value, {
        x,
        y: y + 0.3,
        w: cardW,
        h: 0.9,
        fontSize: 30,
        fontFace: tc.headingFont,
        color: tc.primary,
        bold: true,
        align: "center",
        valign: "middle",
      });

      // Label
      slide.addText(block.data.label, {
        x: x + 0.15,
        y: y + 1.2,
        w: cardW - 0.3,
        h: 0.45,
        fontSize: 10,
        fontFace: tc.font,
        color: tc.text,
        align: "center",
        valign: "top",
      });

      // CI + p-value
      const meta = [block.data.ci ? `CI: ${block.data.ci}` : "", block.data.pValue ? `p=${block.data.pValue}` : ""]
        .filter(Boolean)
        .join("\n");
      if (meta) {
        slide.addText(meta, {
          x: x + 0.1,
          y: y + 1.7,
          w: cardW - 0.2,
          h: 0.5,
          fontSize: 8,
          fontFace: tc.font,
          color: lightenColor(tc.text, 0.3),
          align: "center",
          valign: "top",
        });
      }
    });
  } else {
    const contentText = blocksToText(blocks) || data.content || "";
    slide.addText(contentText, {
      x: 0.6,
      y: 1.8,
      w: 11.5,
      h: 4.8,
      fontSize: 14,
      fontFace: tc.font,
      color: tc.text,
      valign: "top",
    });
  }

  addBottomAccent(slide, pptx, tc);
}

function renderBigNumber(
  slide: PptxSlide,
  data: SlideInput,
  blocks: ContentBlock[],
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  // Light background -- no title bar, clean centered look
  const statBlock = blocks.find((b) => b.type === "stat_result");
  if (statBlock?.type === "stat_result") {
    // Large centered number
    slide.addText(statBlock.data.value, {
      x: 1.0,
      y: 1.5,
      w: 11.0,
      h: 2.5,
      fontSize: 72,
      fontFace: tc.headingFont,
      color: tc.primary,
      bold: true,
      align: "center",
      valign: "bottom",
    });

    // Label
    slide.addText(statBlock.data.label, {
      x: 2.0,
      y: 4.0,
      w: 9.0,
      h: 0.8,
      fontSize: 22,
      fontFace: tc.font,
      color: tc.text,
      align: "center",
      valign: "top",
    });

    // Context / interpretation
    const contextText = statBlock.data.interpretation || statBlock.data.ci || "";
    if (contextText) {
      slide.addText(contextText, {
        x: 2.5,
        y: 4.9,
        w: 8.0,
        h: 0.6,
        fontSize: 14,
        fontFace: tc.font,
        color: lightenColor(tc.text, 0.25),
        align: "center",
      });
    }

    // p-value badge if available
    if (statBlock.data.pValue) {
      slide.addText(`p = ${statBlock.data.pValue}`, {
        x: 5.0,
        y: 5.5,
        w: 3.0,
        h: 0.4,
        fontSize: 12,
        fontFace: tc.font,
        color: tc.accent,
        align: "center",
        valign: "middle",
        italic: true,
      });
    }
  } else {
    // Fallback: use title as the big number
    slide.addText(data.title || "", {
      x: 1.0,
      y: 1.5,
      w: 11.0,
      h: 2.5,
      fontSize: 64,
      fontFace: tc.headingFont,
      color: tc.primary,
      bold: true,
      align: "center",
      valign: "bottom",
    });

    if (data.subtitle) {
      slide.addText(data.subtitle, {
        x: 2.0,
        y: 4.2,
        w: 9.0,
        h: 0.8,
        fontSize: 20,
        fontFace: tc.font,
        color: tc.text,
        align: "center",
      });
    }

    const contentText = blocksToText(blocks) || data.content || "";
    if (contentText) {
      slide.addText(contentText, {
        x: 2.5,
        y: 5.2,
        w: 8.0,
        h: 0.8,
        fontSize: 14,
        fontFace: tc.font,
        color: lightenColor(tc.text, 0.25),
        align: "center",
      });
    }
  }

  // Subtle accent line
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.0,
    y: 5.8,
    w: 3.0,
    h: 0.04,
    fill: { color: tc.accent },
  });

  addBottomAccent(slide, pptx, tc);
}

// ---------------------------------------------------------------------------
// Mixed block renderer (renders a sequence of different block types vertically)
// ---------------------------------------------------------------------------

function renderMixedBlocks(
  slide: PptxSlide,
  blocks: ContentBlock[],
  contentX: number,
  startY: number,
  contentW: number,
  maxY: number,
  pptx: PptxGenJS,
  tc: ThemeColors
) {
  let yPos = startY;

  for (const block of blocks) {
    if (yPos >= maxY) break;

    switch (block.type) {
      case "callout":
        yPos += renderCalloutBlock(slide, block, contentX, yPos, contentW, tc, pptx);
        break;
      case "code":
        yPos += renderCodeBlock(slide, block, contentX, yPos, contentW, tc, pptx);
        break;
      case "math":
        yPos += renderMathBlock(slide, block, contentX, yPos, contentW, tc, pptx);
        break;
      case "diagram":
        yPos += renderDiagramBlock(slide, block, contentX, yPos, contentW, tc, pptx);
        break;
      case "stat_result":
        yPos += renderStatResultBlock(slide, block, contentX, yPos, contentW, tc, pptx);
        break;
      case "bibliography":
        yPos += renderBibliographyBlock(slide, block, contentX, yPos, contentW, tc, pptx);
        break;
      case "timeline":
        yPos += renderTimelineBlock(slide, block, contentX, yPos, contentW, tc, pptx);
        break;
      case "divider":
        yPos += renderDividerBlock(slide, block, contentX, yPos, contentW, tc, pptx);
        break;
      default: {
        // Text, bullets, quotes, citations, images, charts, tables -- render as text
        const text = blocksToText([block]);
        if (text) {
          const lineCount = text.split("\n").length;
          const blockH = Math.min(Math.max(lineCount * 0.25, 0.4), maxY - yPos);
          slide.addText(text, {
            x: contentX,
            y: yPos,
            w: contentW,
            h: blockH,
            fontSize: 14,
            fontFace: tc.font,
            color: tc.text,
            valign: "top",
            paraSpaceAfter: 6,
            lineSpacingMultiple: 1.15,
          });
          yPos += blockH + 0.1;
        }
        break;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Block-level renderers (for individual content blocks on any slide)
// ---------------------------------------------------------------------------

function renderCalloutBlock(
  slide: PptxSlide,
  block: Extract<ContentBlock, { type: "callout" }>,
  x: number,
  y: number,
  w: number,
  tc: ThemeColors,
  pptx: PptxGenJS
): number {
  const colors = CALLOUT_COLORS[block.data.type] ?? CALLOUT_COLORS.info;
  const h = 0.9;

  // Background box
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w,
    h,
    fill: { color: colors.bg },
    rectRadius: 0.08,
  });

  // Left accent border
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w: 0.05,
    h,
    fill: { color: colors.border },
  });

  // Icon area
  slide.addText(colors.icon, {
    x: x + 0.15,
    y: y + 0.1,
    w: 0.4,
    h: 0.4,
    fontSize: 14,
    align: "center",
    valign: "middle",
  });

  // Title
  if (block.data.title) {
    slide.addText(block.data.title, {
      x: x + 0.6,
      y: y + 0.08,
      w: w - 0.8,
      h: 0.3,
      fontSize: 11,
      fontFace: tc.headingFont,
      color: darkenColor(colors.border, 0.2),
      bold: true,
    });
  }

  // Body text
  slide.addText(block.data.text, {
    x: x + 0.6,
    y: block.data.title ? y + 0.38 : y + 0.15,
    w: w - 0.8,
    h: block.data.title ? 0.42 : 0.6,
    fontSize: 10,
    fontFace: tc.font,
    color: tc.text,
    valign: "top",
  });

  return h + 0.15;
}

function renderStatResultBlock(
  slide: PptxSlide,
  block: Extract<ContentBlock, { type: "stat_result" }>,
  x: number,
  y: number,
  w: number,
  tc: ThemeColors,
  pptx: PptxGenJS
): number {
  const h = 0.9;

  // Card background
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w: Math.min(w, 3.5),
    h,
    fill: { color: tc.surface },
    rectRadius: 0.06,
  });

  // Value
  slide.addText(block.data.value, {
    x: x + 0.15,
    y: y + 0.05,
    w: 1.8,
    h: 0.5,
    fontSize: 22,
    fontFace: tc.headingFont,
    color: tc.primary,
    bold: true,
    valign: "middle",
  });

  // Label
  slide.addText(block.data.label, {
    x: x + 2.0,
    y: y + 0.05,
    w: Math.min(w, 3.5) - 2.2,
    h: 0.35,
    fontSize: 10,
    fontFace: tc.font,
    color: tc.text,
  });

  // CI / p-value
  const metaText = [block.data.ci ? `CI: ${block.data.ci}` : "", block.data.pValue ? `p=${block.data.pValue}` : ""]
    .filter(Boolean)
    .join("  ");
  if (metaText) {
    slide.addText(metaText, {
      x: x + 2.0,
      y: y + 0.45,
      w: Math.min(w, 3.5) - 2.2,
      h: 0.3,
      fontSize: 8,
      fontFace: tc.font,
      color: lightenColor(tc.text, 0.3),
    });
  }

  return h + 0.1;
}

function renderCodeBlock(
  slide: PptxSlide,
  block: Extract<ContentBlock, { type: "code" }>,
  x: number,
  y: number,
  w: number,
  tc: ThemeColors,
  pptx: PptxGenJS
): number {
  const lines = block.data.code.split("\n");
  const h = Math.min(Math.max(lines.length * 0.22, 0.8), 3.5);

  // Dark background
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w,
    h,
    fill: { color: tc.codeBg },
    rectRadius: 0.06,
  });

  // Language label
  if (block.data.language) {
    slide.addText(block.data.language.toUpperCase(), {
      x: x + w - 1.2,
      y: y + 0.05,
      w: 1.0,
      h: 0.25,
      fontSize: 7,
      fontFace: tc.font,
      color: lightenColor(tc.codeBg, 0.5),
      align: "right",
    });
  }

  // Code text (monospace)
  const codeWithNumbers = block.data.showLineNumbers
    ? lines.map((line, i) => `${String(i + 1).padStart(3)} ${line}`).join("\n")
    : block.data.code;

  slide.addText(codeWithNumbers, {
    x: x + 0.2,
    y: y + 0.25,
    w: w - 0.4,
    h: h - 0.35,
    fontSize: 9,
    fontFace: "Courier New",
    color: "E2E8F0",
    valign: "top",
    lineSpacingMultiple: 1.2,
  });

  // Caption
  let totalH = h;
  if (block.data.caption) {
    slide.addText(block.data.caption, {
      x,
      y: y + h + 0.05,
      w,
      h: 0.25,
      fontSize: 8,
      fontFace: tc.font,
      color: lightenColor(tc.text, 0.3),
      italic: true,
      align: "center",
    });
    totalH += 0.3;
  }

  return totalH + 0.1;
}

function renderMathBlock(
  slide: PptxSlide,
  block: Extract<ContentBlock, { type: "math" }>,
  x: number,
  y: number,
  w: number,
  tc: ThemeColors,
  pptx: PptxGenJS
): number {
  const expressionText = block.data.expression;
  const isDisplay = block.data.displayMode;
  const blockH = isDisplay ? 0.8 : 0.5;

  // Math expression background
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w,
    h: blockH,
    fill: { color: tc.surface },
    rectRadius: 0.04,
  });

  // Left accent for math blocks
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w: 0.04,
    h: blockH,
    fill: { color: tc.accent },
  });

  // Render the LaTeX expression as formatted text using Cambria Math font
  // PPTX cannot natively render LaTeX, so we display the expression in a math-style font
  slide.addText(expressionText, {
    x: x + 0.2,
    y: y + 0.05,
    w: w - 0.4,
    h: blockH - 0.1,
    fontSize: isDisplay ? 16 : 12,
    fontFace: "Cambria Math",
    color: tc.text,
    align: "center",
    valign: "middle",
    italic: true,
  });

  let totalH = blockH;
  if (block.data.caption) {
    slide.addText(block.data.caption, {
      x,
      y: y + totalH + 0.02,
      w,
      h: 0.25,
      fontSize: 8,
      fontFace: tc.font,
      color: lightenColor(tc.text, 0.3),
      italic: true,
      align: "center",
    });
    totalH += 0.3;
  }

  return totalH + 0.1;
}

function renderDiagramBlock(
  slide: PptxSlide,
  block: Extract<ContentBlock, { type: "diagram" }>,
  x: number,
  y: number,
  w: number,
  tc: ThemeColors,
  pptx: PptxGenJS
): number {
  const h = 2.5;

  // Background
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w,
    h,
    fill: { color: tc.surface },
    rectRadius: 0.06,
  });

  // Left accent bar
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w: 0.04,
    h,
    fill: { color: tc.primary },
  });

  // Diagram icon and type label
  slide.addText(`[${block.data.diagramType.toUpperCase()} DIAGRAM]`, {
    x: x + 0.2,
    y: y + 0.1,
    w: w - 0.4,
    h: 0.3,
    fontSize: 10,
    fontFace: tc.headingFont,
    color: tc.primary,
    bold: true,
  });

  // Mermaid syntax as preview text (truncated)
  const syntaxPreview = block.data.syntax.length > 500 ? block.data.syntax.slice(0, 500) + "..." : block.data.syntax;
  slide.addText(syntaxPreview, {
    x: x + 0.2,
    y: y + 0.45,
    w: w - 0.4,
    h: h - 0.9,
    fontSize: 8,
    fontFace: "Courier New",
    color: lightenColor(tc.text, 0.2),
    valign: "top",
    lineSpacingMultiple: 1.15,
  });

  // Note
  slide.addText("Diagram best viewed in presenter mode or web viewer", {
    x: x + 0.2,
    y: y + h - 0.35,
    w: w - 0.4,
    h: 0.25,
    fontSize: 7,
    fontFace: tc.font,
    color: lightenColor(tc.text, 0.4),
    italic: true,
    align: "right",
  });

  let totalH = h;
  if (block.data.caption) {
    slide.addText(block.data.caption, {
      x,
      y: y + h + 0.05,
      w,
      h: 0.25,
      fontSize: 8,
      fontFace: tc.font,
      color: lightenColor(tc.text, 0.3),
      italic: true,
      align: "center",
    });
    totalH += 0.3;
  }

  return totalH + 0.1;
}

function renderBibliographyBlock(
  slide: PptxSlide,
  block: Extract<ContentBlock, { type: "bibliography" }>,
  x: number,
  y: number,
  w: number,
  tc: ThemeColors,
  pptx: PptxGenJS
): number {
  const entries = block.data.entries;
  const lineCount = entries.length;
  const h = Math.min(Math.max(lineCount * 0.3, 0.6), 3.0);

  // Background
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w,
    h,
    fill: { color: tc.surface },
    rectRadius: 0.04,
  });

  // Section label
  slide.addText(`References (${block.data.style.toUpperCase()})`, {
    x: x + 0.15,
    y: y + 0.05,
    w: w - 0.3,
    h: 0.25,
    fontSize: 9,
    fontFace: tc.headingFont,
    color: tc.primary,
    bold: true,
  });

  // Entries
  const refText = entries
    .map((e, i) => `[${typeof e.id === "number" ? e.id : i + 1}] ${e.formatted}`)
    .join("\n");

  slide.addText(refText, {
    x: x + 0.15,
    y: y + 0.35,
    w: w - 0.3,
    h: h - 0.45,
    fontSize: 8,
    fontFace: tc.font,
    color: tc.text,
    valign: "top",
    paraSpaceAfter: 3,
    lineSpacingMultiple: 1.1,
  });

  return h + 0.1;
}

function renderTimelineBlock(
  slide: PptxSlide,
  block: Extract<ContentBlock, { type: "timeline" }>,
  x: number,
  y: number,
  w: number,
  tc: ThemeColors,
  pptx: PptxGenJS
): number {
  const entries = block.data.entries;
  const count = Math.min(entries.length, 6);
  if (count === 0) return 0.1;

  const h = 1.8;

  // Title if available
  if (block.data.title) {
    slide.addText(block.data.title, {
      x,
      y,
      w,
      h: 0.3,
      fontSize: 11,
      fontFace: tc.headingFont,
      color: tc.primary,
      bold: true,
    });
  }

  const lineY = y + (block.data.title ? 0.9 : 0.7);
  const _endX = x + w;

  // Horizontal line
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y: lineY,
    w,
    h: 0.03,
    fill: { color: tc.primary },
  });

  const spacing = w / (count + 1);
  entries.slice(0, count).forEach((entry, i) => {
    const dotX = x + spacing * (i + 1);
    const statusColor =
      entry.status === "completed"
        ? "10B981"
        : entry.status === "in_progress"
          ? tc.accent
          : lightenColor(tc.text, 0.3);

    // Dot
    slide.addShape(pptx.ShapeType.ellipse, {
      x: dotX - 0.1,
      y: lineY - 0.08,
      w: 0.2,
      h: 0.2,
      fill: { color: statusColor },
    });

    // Label (alternating above/below)
    slide.addText(entry.label, {
      x: dotX - 0.6,
      y: i % 2 === 0 ? lineY - 0.55 : lineY + 0.2,
      w: 1.2,
      h: 0.35,
      fontSize: 8,
      fontFace: tc.font,
      color: tc.text,
      bold: true,
      align: "center",
    });
  });

  return h + 0.1;
}

function renderDividerBlock(
  slide: PptxSlide,
  block: Extract<ContentBlock, { type: "divider" }>,
  x: number,
  y: number,
  w: number,
  tc: ThemeColors,
  pptx: PptxGenJS
): number {
  const style = block.data.style ?? "solid";

  if (style === "gradient" && tc.gradientFrom !== tc.gradientTo) {
    // Two-tone line for gradient
    slide.addShape(pptx.ShapeType.rect, {
      x,
      y: y + 0.1,
      w: w / 2,
      h: 0.02,
      fill: { color: tc.gradientFrom },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: x + w / 2,
      y: y + 0.1,
      w: w / 2,
      h: 0.02,
      fill: { color: tc.gradientTo },
    });
  } else if (style === "dashed") {
    // Simulate dashed with dots
    const dotCount = Math.floor(w / 0.3);
    for (let i = 0; i < dotCount; i++) {
      slide.addShape(pptx.ShapeType.rect, {
        x: x + i * 0.3,
        y: y + 0.1,
        w: 0.15,
        h: 0.02,
        fill: { color: tc.border },
      });
    }
  } else {
    slide.addShape(pptx.ShapeType.rect, {
      x,
      y: y + 0.1,
      w,
      h: 0.02,
      fill: { color: tc.border },
    });
  }

  return 0.3;
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
        case "bullets": {
          const prefix = b.data.ordered ? (i: number) => `${i + 1}. ` : () => "\u2022 ";
          return b.data.items.map((item, i) => `${prefix(i)}${item}`).join("\n");
        }
        case "quote":
          return `\u201C${b.data.text}\u201D \u2014 ${b.data.attribution}`;
        case "citation": {
          const d = b.data;
          const authors = d.authors?.join(", ") ?? "";
          const year = d.year ? ` (${d.year})` : "";
          const doi = d.doi ? ` DOI: ${d.doi}` : "";
          return `${authors}${year}. ${d.text}. ${d.journal ?? d.source}${doi}`;
        }
        case "chart":
          return `[Chart: ${b.data.title}]`;
        case "table":
          return `[Table: ${b.data.headers.join(" | ")}]`;
        case "image":
          return `[Image: ${b.data.alt}]`;
        case "math":
          return `${b.data.expression}${b.data.caption ? ` \u2014 ${b.data.caption}` : ""}`;
        case "diagram":
          return `[Diagram: ${b.data.diagramType}${b.data.caption ? ` \u2014 ${b.data.caption}` : ""}]`;
        case "code":
          return `[Code: ${b.data.language}]${b.data.caption ? ` ${b.data.caption}` : ""}`;
        case "callout":
          return `${b.data.title ? b.data.title + ": " : ""}${b.data.text}`;
        case "stat_result": {
          const parts = [b.data.value, b.data.label];
          if (b.data.ci) parts.push(`CI: ${b.data.ci}`);
          if (b.data.pValue) parts.push(`p=${b.data.pValue}`);
          return parts.join(" | ");
        }
        case "bibliography":
          return b.data.entries.map((e) => e.formatted).join("\n");
        case "timeline":
          return b.data.entries.map((e) => `${e.label}${e.date ? ` (${e.date})` : ""}${e.description ? `: ${e.description}` : ""}`).join("\n");
        case "divider":
          return "---";
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}
