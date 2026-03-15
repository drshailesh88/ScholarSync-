// Empty state: renders nothing when data.length === 0
"use client";

import { useEffect, useRef, useState, useId } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type {
  ContentBlock,
  ThemeConfig,
  SlideLayout,
  CalloutData,
  BibliographyData,
  TimelineData,
  StatResultData,
  DiagramData,
  MathData,
  CodeData,
  ChartData,
} from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import katex from "katex";
import "katex/dist/katex.min.css";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "default" });

// ---------------------------------------------------------------------------
// Callout color map
// ---------------------------------------------------------------------------
const CALLOUT_COLORS: Record<
  CalloutData["type"],
  { border: string; bg: string; icon: string }
> = {
  info: { border: "#3B82F6", bg: "#EFF6FF", icon: "i" },
  warning: { border: "#F59E0B", bg: "#FFFBEB", icon: "!" },
  success: { border: "#10B981", bg: "#ECFDF5", icon: "\u2713" },
  finding: { border: "#8B5CF6", bg: "#F5F3FF", icon: "\u2605" },
  limitation: { border: "#EF4444", bg: "#FEF2F2", icon: "\u2717" },
  methodology: { border: "#6366F1", bg: "#EEF2FF", icon: "M" },
  clinical: { border: "#14B8A6", bg: "#F0FDFA", icon: "+" },
};

// ---------------------------------------------------------------------------
// Chart palette — 8 colors for multi-dataset charts
// ---------------------------------------------------------------------------
const CHART_PALETTE = [
  "#4F46E5",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
];

// ---------------------------------------------------------------------------
// SlideRenderer — public API
// ---------------------------------------------------------------------------
interface SlideRendererProps {
  title?: string | null;
  subtitle?: string | null;
  layout?: SlideLayout;
  contentBlocks?: ContentBlock[];
  themeKey?: string;
  themeConfig?: ThemeConfig;
  className?: string;
  scale?: number;
  showSlideNumber?: boolean;
  slideNumber?: number;
}

export function SlideRenderer({
  title,
  subtitle,
  layout = "title_content",
  contentBlocks = [],
  themeKey = "modern",
  themeConfig,
  className,
  scale = 1,
  showSlideNumber,
  slideNumber,
}: SlideRendererProps) {
  const theme =
    themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;

  return (
    <div
      className={cn("aspect-video relative overflow-hidden", className)}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
        fontSize: `${scale * 16}px`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: `${scale * 4}px`,
          backgroundColor: theme.primaryColor,
        }}
      />

      <div className="absolute inset-0 p-[6%] pt-[8%] flex flex-col">
        {renderLayout(layout, title, subtitle, contentBlocks, theme)}
      </div>

      {showSlideNumber && slideNumber != null && (
        <div
          className="absolute bottom-[3%] right-[4%] text-[0.6em] opacity-50"
          style={{ color: theme.textColor }}
        >
          {slideNumber}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Layout renderer
// ---------------------------------------------------------------------------
function renderLayout(
  layout: SlideLayout,
  title: string | null | undefined,
  subtitle: string | null | undefined,
  blocks: ContentBlock[],
  theme: ThemeConfig,
) {
  switch (layout) {
    // =======================================================================
    // Original layouts
    // =======================================================================

    case "title_slide":
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-[0.5em]">
          <h1
            className="text-[2em] font-bold leading-tight"
            style={{
              color: theme.primaryColor,
              fontFamily: theme.headingFontFamily,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-[1em] opacity-70">{subtitle}</p>
          )}
          <ContentBlockList blocks={blocks} theme={theme} />
        </div>
      );

    case "section_header":
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div
            className="w-[3em] h-[0.15em] mb-[0.8em] rounded-full"
            style={{ backgroundColor: theme.accentColor }}
          />
          <h1
            className="text-[1.8em] font-bold"
            style={{
              color: theme.primaryColor,
              fontFamily: theme.headingFontFamily,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-[0.85em] mt-[0.4em] opacity-60">
              {subtitle}
            </p>
          )}
        </div>
      );

    case "two_column": {
      const mid = Math.ceil(blocks.length / 2);
      const left = blocks.slice(0, mid);
      const right = blocks.slice(mid);
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 grid grid-cols-2 gap-[1em] mt-[0.5em]">
            <div>
              <ContentBlockList blocks={left} theme={theme} />
            </div>
            <div>
              <ContentBlockList blocks={right} theme={theme} />
            </div>
          </div>
        </>
      );
    }

    case "quote_slide": {
      const quoteBlock = blocks.find((b) => b.type === "quote");
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-[8%]">
          <div
            className="text-[2.5em] leading-none mb-[0.2em]"
            style={{ color: theme.accentColor }}
          >
            &ldquo;
          </div>
          <p className="text-[1.1em] italic leading-relaxed">
            {quoteBlock?.type === "quote" ? quoteBlock.data.text : title}
          </p>
          {quoteBlock?.type === "quote" && quoteBlock.data.attribution && (
            <p className="text-[0.75em] mt-[0.6em] opacity-60">
              &mdash; {quoteBlock.data.attribution}
            </p>
          )}
        </div>
      );
    }

    case "comparison": {
      const compBlocks = blocks.length >= 2 ? blocks : [];
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 grid grid-cols-2 gap-[1em] mt-[0.5em]">
            {compBlocks.map((block, i) => (
              <div
                key={i}
                className="rounded-[0.3em] p-[0.6em] border"
                style={{ borderColor: theme.accentColor + "40" }}
              >
                <ContentBlockItem block={block} theme={theme} />
              </div>
            ))}
          </div>
        </>
      );
    }

    case "image_text": {
      const imgBlock = blocks.find((b) => b.type === "image");
      const otherBlocks = blocks.filter((b) => b.type !== "image");
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 grid grid-cols-2 gap-[1em] mt-[0.5em]">
            <div
              className="flex items-center justify-center rounded-[0.3em] overflow-hidden"
              style={{
                backgroundColor: theme.primaryColor + "10",
              }}
            >
              {imgBlock?.type === "image" && imgBlock.data.url ? (
                <Image alt={imgBlock.data.alt}
                  src={imgBlock.data.url}
                  width={480}
                  height={360}
                  className="max-w-full max-h-full object-contain"
                  unoptimized
                />
              ) : (
                <div className="text-[0.7em] opacity-40">
                  Image placeholder
                </div>
              )}
            </div>
            <div>
              <ContentBlockList blocks={otherBlocks} theme={theme} />
            </div>
          </div>
        </>
      );
    }

    case "chart_slide": {
      const chartBlock = blocks.find((b) => b.type === "chart");
      const otherBlocks = blocks.filter((b) => b.type !== "chart");
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 flex flex-col items-center justify-center mt-[0.5em]">
            {chartBlock?.type === "chart" ? (
              <SimpleChartPreview chart={chartBlock.data} theme={theme} />
            ) : (
              <div className="text-[0.7em] opacity-40">
                Chart placeholder
              </div>
            )}
            {otherBlocks.length > 0 && (
              <div className="w-full mt-[0.4em]">
                <ContentBlockList blocks={otherBlocks} theme={theme} />
              </div>
            )}
          </div>
        </>
      );
    }

    case "table_slide": {
      const tableBlock = blocks.find((b) => b.type === "table");
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 mt-[0.5em] overflow-auto">
            {tableBlock?.type === "table" ? (
              <SimpleTablePreview table={tableBlock.data} theme={theme} />
            ) : (
              <ContentBlockList blocks={blocks} theme={theme} />
            )}
          </div>
        </>
      );
    }

    case "blank":
      return (
        <div className="flex-1">
          <ContentBlockList blocks={blocks} theme={theme} />
        </div>
      );

    // =======================================================================
    // V2 Layouts
    // =======================================================================

    case "bibliography_slide": {
      const bibBlock = blocks.find((b) => b.type === "bibliography");
      const otherBlocks = blocks.filter((b) => b.type !== "bibliography");
      return (
        <>
          <SlideTitle title={title ?? "References"} theme={theme} />
          <div className="flex-1 mt-[0.3em] overflow-auto">
            {bibBlock?.type === "bibliography" ? (
              <BibliographyBlockRenderer
                data={bibBlock.data}
                theme={theme}
                twoColumn
              />
            ) : (
              <ContentBlockList
                blocks={otherBlocks.length > 0 ? otherBlocks : blocks}
                theme={theme}
              />
            )}
          </div>
        </>
      );
    }

    case "methodology": {
      const timelineBlock = blocks.find((b) => b.type === "timeline");
      const diagramBlock = blocks.find((b) => b.type === "diagram");
      const calloutBlocks = blocks.filter((b) => b.type === "callout");
      const detailBlocks = blocks.filter(
        (b) =>
          b.type !== "timeline" &&
          b.type !== "diagram" &&
          b.type !== "callout",
      );
      const leftBlock = timelineBlock ?? diagramBlock;
      const rightBlocks =
        calloutBlocks.length > 0 ? calloutBlocks : detailBlocks;
      const leftFallbackBlocks = leftBlock
        ? detailBlocks
        : detailBlocks.slice(0, Math.ceil(detailBlocks.length / 2));
      const rightFallbackBlocks = leftBlock
        ? rightBlocks
        : detailBlocks.slice(Math.ceil(detailBlocks.length / 2));

      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 grid grid-cols-5 gap-[0.8em] mt-[0.5em]">
            {/* Left 60% — methodology steps */}
            <div
              className="col-span-3 rounded-[0.3em] p-[0.5em] overflow-hidden"
              style={{
                backgroundColor:
                  theme.surfaceColor ?? theme.primaryColor + "08",
              }}
            >
              {leftBlock ? (
                <ContentBlockItem block={leftBlock} theme={theme} />
              ) : (
                <ContentBlockList
                  blocks={leftFallbackBlocks}
                  theme={theme}
                />
              )}
            </div>
            {/* Right 40% — key details cards */}
            <div className="col-span-2 space-y-[0.3em]">
              {rightFallbackBlocks.length > 0 ? (
                rightFallbackBlocks.map((b, i) => (
                  <div
                    key={i}
                    className="rounded-[0.25em] p-[0.4em] border"
                    style={{
                      borderColor:
                        theme.borderColor ?? theme.primaryColor + "20",
                      backgroundColor:
                        theme.surfaceColor ?? theme.primaryColor + "05",
                    }}
                  >
                    <ContentBlockItem block={b} theme={theme} />
                  </div>
                ))
              ) : (
                <ContentBlockList
                  blocks={
                    leftBlock
                      ? detailBlocks
                      : blocks.filter((b) => b !== leftBlock)
                  }
                  theme={theme}
                />
              )}
            </div>
          </div>
        </>
      );
    }

    case "results_summary": {
      const statBlocks = blocks.filter((b) => b.type === "stat_result");
      const calloutBlocks = blocks.filter((b) => b.type === "callout");
      const chartBlocks = blocks.filter((b) => b.type === "chart");
      const otherBlocks = blocks.filter(
        (b) =>
          b.type !== "stat_result" &&
          b.type !== "callout" &&
          b.type !== "chart",
      );
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 mt-[0.4em] flex flex-col gap-[0.5em] overflow-hidden">
            {/* Stat cards grid at top */}
            {statBlocks.length > 0 && (
              <div
                className={cn(
                  "grid gap-[0.4em]",
                  statBlocks.length <= 2
                    ? "grid-cols-2"
                    : statBlocks.length <= 3
                      ? "grid-cols-3"
                      : "grid-cols-4",
                )}
              >
                {statBlocks.map((b, i) => (
                  <ContentBlockItem key={i} block={b} theme={theme} />
                ))}
              </div>
            )}
            {/* Charts */}
            {chartBlocks.length > 0 && (
              <div
                className={cn(
                  "grid gap-[0.4em]",
                  chartBlocks.length === 1 ? "grid-cols-1" : "grid-cols-2",
                )}
              >
                {chartBlocks.map((b, i) => (
                  <ContentBlockItem key={i} block={b} theme={theme} />
                ))}
              </div>
            )}
            {/* Callouts */}
            {calloutBlocks.length > 0 && (
              <div className="space-y-[0.3em]">
                {calloutBlocks.map((b, i) => (
                  <ContentBlockItem key={i} block={b} theme={theme} />
                ))}
              </div>
            )}
            {/* Remaining content */}
            {otherBlocks.length > 0 && (
              <ContentBlockList blocks={otherBlocks} theme={theme} />
            )}
          </div>
        </>
      );
    }

    case "key_findings": {
      const statBlock = blocks.find((b) => b.type === "stat_result");
      const calloutBlocks = blocks.filter((b) => b.type === "callout");
      const bulletBlocks = blocks.filter((b) => b.type === "bullets");
      const otherBlocks = blocks.filter(
        (b) =>
          b.type !== "stat_result" &&
          b.type !== "callout" &&
          b.type !== "bullets",
      );
      // Determine the numbered items: prefer callouts, fallback to bullets, fallback to all
      const numberedItems =
        calloutBlocks.length > 0
          ? calloutBlocks
          : bulletBlocks.length > 0
            ? bulletBlocks
            : otherBlocks;
      const bottomCallout =
        calloutBlocks.length > 0 ? null : blocks.find((b) => b.type === "callout");

      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 mt-[0.4em] flex flex-col gap-[0.3em] overflow-auto">
            {/* Big number/stat at top */}
            {statBlock?.type === "stat_result" && (
              <div className="text-center mb-[0.2em]">
                <p
                  className="text-[2em] font-extrabold leading-none"
                  style={{ color: theme.accentColor }}
                >
                  {statBlock.data.value}
                </p>
                <p
                  className="text-[0.7em] font-semibold"
                  style={{ color: theme.primaryColor }}
                >
                  {statBlock.data.label}
                </p>
              </div>
            )}
            {/* Numbered key findings */}
            <div className="space-y-[0.3em] flex-1">
              {numberedItems.map((b, i) => (
                <div key={i} className="flex items-start gap-[0.4em]">
                  <span
                    className="shrink-0 w-[1.4em] h-[1.4em] rounded-full flex items-center justify-center text-[0.6em] font-bold text-white"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <ContentBlockItem block={b} theme={theme} />
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom callout */}
            {bottomCallout && (
              <ContentBlockItem block={bottomCallout} theme={theme} />
            )}
          </div>
        </>
      );
    }

    case "timeline_slide": {
      const timelineBlock = blocks.find((b) => b.type === "timeline");
      const otherBlocks = blocks.filter((b) => b.type !== "timeline");
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 mt-[0.4em] overflow-auto">
            {timelineBlock?.type === "timeline" ? (
              <TimelineBlockRenderer
                data={timelineBlock.data}
                theme={theme}
                horizontal={timelineBlock.data.entries.length <= 6}
              />
            ) : (
              <ContentBlockList
                blocks={otherBlocks.length > 0 ? otherBlocks : blocks}
                theme={theme}
              />
            )}
          </div>
        </>
      );
    }

    case "stat_overview": {
      const statBlocks = blocks.filter((b) => b.type === "stat_result");
      const otherBlocks = blocks.filter((b) => b.type !== "stat_result");
      const gridCols =
        statBlocks.length <= 3
          ? "grid-cols-3"
          : statBlocks.length === 4
            ? "grid-cols-2"
            : "grid-cols-3";
      const gridRows = statBlocks.length <= 3 ? "" : "grid-rows-2";
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 mt-[0.4em] flex flex-col gap-[0.5em] overflow-hidden">
            {statBlocks.length > 0 ? (
              <div className={cn("grid gap-[0.5em]", gridCols, gridRows)}>
                {statBlocks.map((b, i) => (
                  <ContentBlockItem key={i} block={b} theme={theme} />
                ))}
              </div>
            ) : (
              <ContentBlockList blocks={blocks} theme={theme} />
            )}
            {otherBlocks.length > 0 && (
              <div className="mt-[0.2em]">
                <ContentBlockList blocks={otherBlocks} theme={theme} />
              </div>
            )}
          </div>
        </>
      );
    }

    case "three_column": {
      const third = Math.ceil(blocks.length / 3);
      const col1 = blocks.slice(0, third);
      const col2 = blocks.slice(third, third * 2);
      const col3 = blocks.slice(third * 2);
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 grid grid-cols-3 gap-[0.8em] mt-[0.5em]">
            <div>
              <ContentBlockList blocks={col1} theme={theme} />
            </div>
            <div>
              <ContentBlockList blocks={col2} theme={theme} />
            </div>
            <div>
              <ContentBlockList blocks={col3} theme={theme} />
            </div>
          </div>
        </>
      );
    }

    case "big_number": {
      const statBlock = blocks.find((b) => b.type === "stat_result");
      const otherBlocks = blocks.filter((b) => b.type !== "stat_result");
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-[0.3em]">
          {statBlock?.type === "stat_result" ? (
            <>
              <p
                className="text-[3.5em] font-extrabold leading-none"
                style={{ color: theme.accentColor }}
              >
                {statBlock.data.value}
              </p>
              <p
                className="text-[1.1em] font-semibold"
                style={{
                  color: theme.primaryColor,
                  fontFamily: theme.headingFontFamily,
                }}
              >
                {statBlock.data.label}
              </p>
              {(statBlock.data.ci || statBlock.data.pValue) && (
                <div className="flex gap-[0.6em] text-[0.65em] opacity-50">
                  {statBlock.data.ci && <span>95% CI: {statBlock.data.ci}</span>}
                  {statBlock.data.pValue && (
                    <span>p = {statBlock.data.pValue}</span>
                  )}
                </div>
              )}
              {statBlock.data.interpretation && (
                <p className="text-[0.75em] opacity-60 max-w-[70%]">
                  {statBlock.data.interpretation}
                </p>
              )}
              {otherBlocks.length > 0 && (
                <div className="mt-[0.3em] max-w-[80%]">
                  <ContentBlockList blocks={otherBlocks} theme={theme} />
                </div>
              )}
            </>
          ) : (
            <>
              <h1
                className="text-[2em] font-bold leading-tight"
                style={{
                  color: theme.primaryColor,
                  fontFamily: theme.headingFontFamily,
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="text-[0.9em] opacity-60">{subtitle}</p>
              )}
              <ContentBlockList blocks={blocks} theme={theme} />
            </>
          )}
        </div>
      );
    }

    case "title_content":
    default:
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          {subtitle && (
            <p className="text-[0.7em] opacity-60 mt-[-0.2em]">
              {subtitle}
            </p>
          )}
          <div className="flex-1 mt-[0.5em] overflow-hidden">
            <ContentBlockList blocks={blocks} theme={theme} />
          </div>
        </>
      );
  }
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function SlideTitle({
  title,
  theme,
}: {
  title?: string | null;
  theme: ThemeConfig;
}) {
  if (!title) return null;
  return (
    <h2
      className="text-[1.3em] font-bold leading-tight shrink-0"
      style={{
        color: theme.primaryColor,
        fontFamily: theme.headingFontFamily,
      }}
    >
      {title}
    </h2>
  );
}

function ContentBlockList({
  blocks,
  theme,
}: {
  blocks: ContentBlock[];
  theme: ThemeConfig;
}) {
  return (
    <div className="space-y-[0.4em]">
      {blocks.map((block, i) => (
        <ContentBlockItem key={i} block={block} theme={theme} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ContentBlockItem — renders a single content block
// ---------------------------------------------------------------------------

function ContentBlockItem({
  block,
  theme,
}: {
  block: ContentBlock;
  theme: ThemeConfig;
}) {
  switch (block.type) {
    case "text": {
      const hasHtml = /<[a-z][\s\S]*>/i.test(block.data.text);
      return (
        <div
          className={cn(
            "leading-relaxed",
            block.data.style === "title" && "text-[1.2em] font-bold",
            block.data.style === "subtitle" && "text-[0.9em] opacity-70",
            block.data.style === "caption" && "text-[0.65em] opacity-50",
            (!block.data.style || block.data.style === "body") &&
              "text-[0.75em]",
          )}
          {...(hasHtml
            ? { dangerouslySetInnerHTML: { __html: block.data.text } }
            : { children: block.data.text })}
        />
      );
    }

    case "bullets": {
      const Tag = block.data.ordered ? "ol" : "ul";
      return (
        <Tag
          className={cn(
            "text-[0.75em] leading-relaxed space-y-[0.15em] pl-[1.2em]",
            block.data.ordered ? "list-decimal" : "list-disc",
          )}
        >
          {block.data.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </Tag>
      );
    }

    case "image":
      return (
        <div className="flex flex-col items-center">
          {block.data.url ? (
            <Image alt={block.data.alt}
              src={block.data.url}
              width={400}
              height={128}
              className="max-h-[8em] object-contain rounded-[0.2em]"
              unoptimized
            />
          ) : (
            <div
              className="w-full h-[5em] rounded-[0.2em] flex items-center justify-center text-[0.6em]"
              style={{
                backgroundColor: theme.primaryColor + "10",
                color: theme.primaryColor,
              }}
            >
              {block.data.suggestion ?? block.data.alt}
            </div>
          )}
          {block.data.caption && (
            <p className="text-[0.55em] opacity-50 mt-[0.2em]">
              {block.data.caption}
            </p>
          )}
        </div>
      );

    case "chart":
      return <SimpleChartPreview chart={block.data} theme={theme} />;

    case "table":
      return <SimpleTablePreview table={block.data} theme={theme} />;

    case "citation":
      return (
        <div
          className="text-[0.65em] pl-[0.5em] border-l-2 opacity-70"
          style={{ borderColor: theme.accentColor }}
        >
          <p>{block.data.text}</p>
          <p className="text-[0.85em] opacity-60 mt-[0.1em]">
            &mdash; {block.data.source}
          </p>
        </div>
      );

    case "quote":
      return (
        <blockquote
          className="text-[0.85em] italic pl-[0.8em] border-l-[0.15em]"
          style={{ borderColor: theme.accentColor }}
        >
          <p>&ldquo;{block.data.text}&rdquo;</p>
          <p className="text-[0.65em] not-italic opacity-60 mt-[0.2em]">
            &mdash; {block.data.attribution}
          </p>
        </blockquote>
      );

    // -------------------------------------------------------------------
    // V2: New content block types
    // -------------------------------------------------------------------

    case "math":
      return <MathBlockRenderer data={block.data} theme={theme} />;

    case "diagram":
      return <DiagramBlockRenderer data={block.data} theme={theme} />;

    case "code":
      return <CodeBlockRenderer data={block.data} theme={theme} />;

    case "callout":
      return <CalloutBlockRenderer data={block.data} theme={theme} />;

    case "stat_result":
      return <StatResultBlockRenderer data={block.data} theme={theme} />;

    case "bibliography":
      return <BibliographyBlockRenderer data={block.data} theme={theme} />;

    case "timeline":
      return <TimelineBlockRenderer data={block.data} theme={theme} />;

    case "divider":
      return <DividerBlockRenderer style={block.data.style} theme={theme} />;

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Math Block (KaTeX)
// ---------------------------------------------------------------------------

function MathBlockRenderer({
  data,
  theme,
}: {
  data: MathData;
  theme: ThemeConfig;
}) {
  let html = "";
  try {
    // KaTeX.renderToString produces sanitized HTML — safe for innerHTML usage.
    // See: https://katex.org/docs/security.html
    html = katex.renderToString(data.expression, {
      displayMode: data.displayMode,
      throwOnError: false,
    });
  } catch {
    html = `<span style="color:red">Invalid LaTeX</span>`;
  }

  if (data.displayMode) {
    return (
      <div className="flex flex-col items-center my-[0.3em]">
        <div
          className="rounded-[0.3em] px-[1em] py-[0.5em] w-full flex items-center justify-center"
          style={{
            backgroundColor:
              theme.surfaceColor ?? theme.primaryColor + "08",
            border: `1px solid ${theme.borderColor ?? theme.primaryColor + "15"}`,
          }}
        >
          {/* KaTeX output is sanitized by the library */}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        {data.caption && (
          <p className="text-[0.55em] opacity-50 mt-[0.15em] text-center">
            {data.caption}
          </p>
        )}
      </div>
    );
  }

  return (
    <span className="inline">
      {/* KaTeX output is sanitized by the library */}
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Diagram Block (Mermaid)
// ---------------------------------------------------------------------------

function DiagramBlockRenderer({
  data,
  theme,
}: {
  data: DiagramData;
  theme: ThemeConfig;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHtml, setSvgHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const instanceId = useId().replace(/:/g, "_");

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        // Mermaid.render produces SVG output from its own diagram DSL parser -
        // it does not pass through arbitrary HTML, making innerHTML safe here.
        const { svg } = await mermaid.render(
          `mermaid_${instanceId}`,
          data.syntax,
        );
        if (!cancelled) {
          setSvgHtml(svg);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Diagram render failed",
          );
        }
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [data.syntax, instanceId]);

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <div
          className="w-full rounded-[0.2em] p-[0.5em] text-[0.6em] opacity-60"
          style={{
            backgroundColor:
              theme.surfaceColor ?? theme.primaryColor + "08",
          }}
        >
          <p className="font-medium">Diagram preview unavailable</p>
          <p className="text-[0.75em] opacity-40 mt-[0.1em]">
            {data.diagramType}
          </p>
          <pre className="text-[0.8em] mt-[0.2em] whitespace-pre-wrap opacity-50">
            {data.syntax.slice(0, 200)}
          </pre>
        </div>
      ) : svgHtml ? (
        <div
          ref={containerRef}
          className="max-w-full overflow-hidden"
          dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
      ) : (
        <div className="text-[0.6em] opacity-40 py-[1em]">
          Rendering diagram...
        </div>
      )}
      {data.caption && (
        <p className="text-[0.55em] opacity-50 mt-[0.15em] text-center">
          {data.caption}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Code Block
// ---------------------------------------------------------------------------

function CodeBlockRenderer({
  data,
  theme,
}: {
  data: CodeData;
  theme: ThemeConfig;
}) {
  const lines = data.code.split("\n");
  const bgColor = theme.codeBackground ?? "#1E1E2E";

  return (
    <div className="flex flex-col">
      <div
        className="rounded-[0.3em] overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {/* Language label */}
        {data.language && (
          <div className="flex justify-end px-[0.5em] pt-[0.25em]">
            <span className="text-[0.45em] font-mono opacity-50 text-white/70">
              {data.language}
            </span>
          </div>
        )}
        <pre className="px-[0.6em] pb-[0.5em] pt-[0.2em] text-[0.6em] leading-relaxed overflow-auto text-white/90 font-mono">
          <code>
            {data.showLineNumbers
              ? lines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none opacity-30 w-[2em] text-right mr-[0.8em] shrink-0">
                      {i + 1}
                    </span>
                    <span>{line}</span>
                  </div>
                ))
              : data.code}
          </code>
        </pre>
      </div>
      {data.caption && (
        <p className="text-[0.55em] opacity-50 mt-[0.15em]">
          {data.caption}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Callout Block
// ---------------------------------------------------------------------------

function CalloutBlockRenderer({
  data,
  theme,
}: {
  data: CalloutData;
  theme: ThemeConfig;
}) {
  const colors = CALLOUT_COLORS[data.type] ?? CALLOUT_COLORS.info;
  const borderColor =
    data.type === "finding" ? theme.accentColor : colors.border;

  return (
    <div
      className="rounded-[0.25em] p-[0.5em] text-[0.7em] border-l-[0.2em]"
      style={{
        borderLeftColor: borderColor,
        backgroundColor: colors.bg + "80",
      }}
    >
      <div className="flex items-start gap-[0.35em]">
        <span
          className="shrink-0 w-[1.2em] h-[1.2em] rounded-full flex items-center justify-center text-[0.7em] font-bold text-white"
          style={{ backgroundColor: borderColor }}
        >
          {colors.icon}
        </span>
        <div className="flex-1 min-w-0">
          {data.title && (
            <p className="font-semibold mb-[0.1em]" style={{ color: borderColor }}>
              {data.title}
            </p>
          )}
          <p className="leading-relaxed">{data.text}</p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// StatResult Block
// ---------------------------------------------------------------------------

function StatResultBlockRenderer({
  data,
  theme,
}: {
  data: StatResultData;
  theme: ThemeConfig;
}) {
  return (
    <div
      className="rounded-[0.25em] p-[0.5em] border"
      style={{
        borderColor: theme.borderColor ?? theme.primaryColor + "20",
        backgroundColor: theme.surfaceColor ?? theme.primaryColor + "05",
      }}
    >
      <p className="text-[0.6em] font-semibold opacity-70">{data.label}</p>
      <p
        className="text-[1.3em] font-bold leading-tight"
        style={{ color: theme.primaryColor }}
      >
        {data.value}
      </p>
      {(data.ci || data.pValue) && (
        <div className="flex gap-[0.5em] text-[0.5em] opacity-60 mt-[0.1em]">
          {data.ci && <span>CI: {data.ci}</span>}
          {data.pValue && <span>p = {data.pValue}</span>}
        </div>
      )}
      {data.interpretation && (
        <p className="text-[0.5em] italic opacity-50 mt-[0.15em]">
          {data.interpretation}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bibliography Block
// ---------------------------------------------------------------------------

function BibliographyBlockRenderer({
  data,
  theme,
  twoColumn,
}: {
  data: BibliographyData;
  theme: ThemeConfig;
  twoColumn?: boolean;
}) {
  const useTwoColumns = twoColumn ?? data.entries.length > 4;

  return (
    <div>
      <p className="text-[0.55em] uppercase tracking-wider font-semibold opacity-40 mb-[0.2em]">
        {data.style.toUpperCase()} Format
      </p>
      <div className={cn(useTwoColumns && "columns-2 gap-[0.8em]")}>
        <ol className="text-[0.5em] leading-relaxed space-y-[0.2em] list-decimal pl-[1.2em]">
          {data.entries.map((entry, i) => (
            <li key={entry.id ?? i} className="break-inside-avoid">
              <span>{entry.formatted}</span>
              {entry.doi && (
                <a
                  href={`https://doi.org/${entry.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.85em] ml-[0.3em] hover:underline"
                  style={{ color: theme.accentColor }}
                >
                  doi:{entry.doi}
                </a>
              )}
              {!entry.doi && entry.url && (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.85em] ml-[0.3em] hover:underline"
                  style={{ color: theme.accentColor }}
                >
                  [Link]
                </a>
              )}
              {entry.citedOnSlides && entry.citedOnSlides.length > 0 && (
                <span className="ml-[0.3em]">
                  {entry.citedOnSlides.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center justify-center w-[1.3em] h-[1.3em] rounded-full text-[0.75em] font-medium mr-[0.1em] text-white"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      {s}
                    </span>
                  ))}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline Block
// ---------------------------------------------------------------------------

function TimelineBlockRenderer({
  data,
  theme,
  horizontal,
}: {
  data: TimelineData;
  theme: ThemeConfig;
  horizontal?: boolean;
}) {
  const statusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "#10B981";
      case "in_progress":
        return "#3B82F6";
      default:
        return "#9CA3AF";
    }
  };

  // Horizontal timeline for layouts with fewer entries
  if (horizontal && data.entries.length >= 2) {
    return (
      <div className="flex flex-col">
        {data.title && (
          <p className="text-[0.7em] font-semibold mb-[0.4em]">
            {data.title}
          </p>
        )}
        <div className="relative flex items-start justify-between px-[0.5em]">
          {/* Horizontal line */}
          <div
            className="absolute top-[0.55em] left-[0.5em] right-[0.5em] h-[0.1em]"
            style={{
              backgroundColor:
                theme.borderColor ?? theme.primaryColor + "20",
            }}
          />
          {data.entries.map((entry, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center text-center z-10"
              style={{ flex: "1 1 0" }}
            >
              {/* Dot */}
              <div
                className="w-[0.6em] h-[0.6em] rounded-full border-2 mb-[0.25em]"
                style={{
                  backgroundColor: statusColor(entry.status),
                  borderColor: theme.backgroundColor,
                }}
              />
              <span className="text-[0.6em] font-semibold leading-tight">
                {entry.label}
              </span>
              {entry.date && (
                <span className="text-[0.45em] opacity-50">
                  {entry.date}
                </span>
              )}
              {entry.description && (
                <span className="text-[0.4em] opacity-50 mt-[0.05em] max-w-[6em] leading-tight">
                  {entry.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vertical timeline (default)
  return (
    <div className="relative pl-[1em]">
      {data.title && (
        <p className="text-[0.7em] font-semibold mb-[0.3em] ml-[-1em]">
          {data.title}
        </p>
      )}
      {/* Vertical line */}
      <div
        className="absolute left-[0.35em] top-0 bottom-0 w-[0.1em]"
        style={{
          backgroundColor:
            theme.borderColor ?? theme.primaryColor + "20",
        }}
      />
      <div className="space-y-[0.5em]">
        {data.entries.map((entry, i) => (
          <div key={i} className="relative flex items-start gap-[0.4em]">
            {/* Dot */}
            <div
              className="absolute left-[-0.65em] top-[0.15em] w-[0.5em] h-[0.5em] rounded-full border-2 z-10"
              style={{
                backgroundColor: statusColor(entry.status),
                borderColor: theme.backgroundColor,
              }}
            />
            <div className="flex-1">
              <div className="flex items-baseline gap-[0.3em]">
                <span className="text-[0.7em] font-semibold">
                  {entry.label}
                </span>
                {entry.date && (
                  <span className="text-[0.5em] opacity-50">
                    {entry.date}
                  </span>
                )}
              </div>
              {entry.description && (
                <p className="text-[0.55em] opacity-60 mt-[0.05em]">
                  {entry.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Divider Block
// ---------------------------------------------------------------------------

function DividerBlockRenderer({
  style = "solid",
  theme,
}: {
  style?: "solid" | "dashed" | "gradient";
  theme: ThemeConfig;
}) {
  if (style === "gradient") {
    return (
      <div
        className="h-[0.1em] my-[0.4em] rounded-full"
        style={{
          background: `linear-gradient(to right, ${theme.gradientFrom ?? theme.primaryColor}, ${theme.gradientTo ?? theme.accentColor})`,
        }}
      />
    );
  }
  return (
    <hr
      className="my-[0.4em] border-0 h-[0.08em]"
      style={{
        backgroundColor:
          style === "dashed"
            ? "transparent"
            : (theme.borderColor ?? theme.primaryColor + "20"),
        borderTop:
          style === "dashed"
            ? `0.08em dashed ${theme.borderColor ?? theme.primaryColor + "40"}`
            : undefined,
        height: style === "dashed" ? 0 : undefined,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Chart Preview — supports all chart types
// ---------------------------------------------------------------------------

function SimpleChartPreview({
  chart,
  theme,
}: {
  chart: ChartData;
  theme: ThemeConfig;
}) {
  const datasets = chart.datasets ?? [];
  const data0 = datasets[0]?.data ?? [];
  const maxVal = Math.max(...data0, 1);
  const colors = datasets.map(
    (ds, i) => ds.color ?? CHART_PALETTE[i % CHART_PALETTE.length],
  );

  return (
    <div className="w-full">
      <p className="text-[0.65em] font-medium mb-[0.3em]">{chart.title}</p>

      {/* ---- BAR CHART ---- */}
      {chart.chartType === "bar" && (
        <div>
          <div className="flex items-end gap-[0.3em] h-[4em]">
            {data0.map((val, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center justify-end h-full"
              >
                <div
                  className="w-full rounded-t-[0.1em] min-h-[0.2em] transition-all"
                  style={{
                    height: `${(val / maxVal) * 100}%`,
                    backgroundColor: colors[0] ?? theme.primaryColor,
                  }}
                />
                <span className="text-[0.45em] opacity-50 mt-[0.1em] truncate w-full text-center">
                  {chart.labels[i]}
                </span>
              </div>
            ))}
          </div>
          {chart.showLegend && datasets.length > 1 && (
            <ChartLegend datasets={datasets} colors={colors} />
          )}
        </div>
      )}

      {/* ---- LINE CHART ---- */}
      {chart.chartType === "line" && (
        <div>
          <svg viewBox={`0 0 ${data0.length * 40} 100`} className="w-full h-[4em]" preserveAspectRatio="none">
            {datasets.map((ds, di) => {
              const dsMax = Math.max(...ds.data, 1);
              const points = ds.data
                .map(
                  (val, i) =>
                    `${i * 40 + 20},${100 - (val / dsMax) * 85 - 5}`,
                )
                .join(" ");
              const color =
                ds.color ?? CHART_PALETTE[di % CHART_PALETTE.length];
              return (
                <g key={di}>
                  <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {ds.data.map((val, i) => (
                    <circle
                      key={i}
                      cx={i * 40 + 20}
                      cy={100 - (val / dsMax) * 85 - 5}
                      r="3"
                      fill={color}
                    />
                  ))}
                </g>
              );
            })}
          </svg>
          <div className="flex justify-between text-[0.45em] opacity-50 px-[0.2em]">
            {chart.labels.map((label, i) => (
              <span key={i} className="truncate text-center" style={{ flex: "1 1 0" }}>
                {label}
              </span>
            ))}
          </div>
          {chart.showLegend && datasets.length > 1 && (
            <ChartLegend datasets={datasets} colors={colors} />
          )}
        </div>
      )}

      {/* ---- PIE CHART ---- */}
      {chart.chartType === "pie" && (() => {
        const total = data0.reduce((s, v) => s + v, 0) || 1;
        let cumulativeAngle = 0;
        const slices = data0.map((val, i) => {
          const angle = (val / total) * 360;
          const startAngle = cumulativeAngle;
          cumulativeAngle += angle;
          return { value: val, startAngle, angle, color: CHART_PALETTE[i % CHART_PALETTE.length], label: chart.labels[i] };
        });

        return (
          <div className="flex items-center justify-center gap-[0.8em]">
            <svg viewBox="0 0 100 100" className="w-[4em] h-[4em]">
              {slices.map((slice, i) => {
                const startRad = ((slice.startAngle - 90) * Math.PI) / 180;
                const endRad = ((slice.startAngle + slice.angle - 90) * Math.PI) / 180;
                const largeArc = slice.angle > 180 ? 1 : 0;
                const x1 = 50 + 45 * Math.cos(startRad);
                const y1 = 50 + 45 * Math.sin(startRad);
                const x2 = 50 + 45 * Math.cos(endRad);
                const y2 = 50 + 45 * Math.sin(endRad);
                // Handle full circle case
                if (slices.length === 1) {
                  return (
                    <circle key={i} cx="50" cy="50" r="45" fill={slice.color} />
                  );
                }
                return (
                  <path
                    key={i}
                    d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={slice.color}
                  />
                );
              })}
            </svg>
            <div className="space-y-[0.1em]">
              {slices.slice(0, 6).map((slice, i) => (
                <div key={i} className="flex items-center gap-[0.25em]">
                  <div
                    className="w-[0.5em] h-[0.5em] rounded-[0.05em]"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span className="text-[0.5em] opacity-70">
                    {slice.label}{" "}
                    <span className="opacity-60">
                      ({Math.round((slice.value / total) * 100)}%)
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ---- SCATTER CHART ---- */}
      {chart.chartType === "scatter" && (() => {
        // For scatter, datasets[0].data = x values, datasets[1].data = y values
        // Or each dataset is a series with data as y values, labels as x
        const allVals = datasets.flatMap((ds) => ds.data);
        const scatterMax = Math.max(...allVals, 1);
        const xMax = Math.max(...data0, 1);

        return (
          <div>
            <svg viewBox="0 0 200 120" className="w-full h-[5em]">
              {/* Axes */}
              <line x1="25" y1="5" x2="25" y2="105" stroke={theme.textColor} strokeOpacity={0.2} strokeWidth="1" />
              <line x1="25" y1="105" x2="195" y2="105" stroke={theme.textColor} strokeOpacity={0.2} strokeWidth="1" />
              {/* Grid lines */}
              {[0.25, 0.5, 0.75].map((frac) => (
                <line key={frac} x1="25" y1={105 - frac * 100} x2="195" y2={105 - frac * 100} stroke={theme.textColor} strokeOpacity={0.08} strokeWidth="0.5" />
              ))}
              {datasets.map((ds, di) => {
                const color = ds.color ?? CHART_PALETTE[di % CHART_PALETTE.length];
                // If two datasets, treat first as x, second as y
                if (datasets.length >= 2 && di > 0) {
                  return ds.data.map((yVal, pi) => {
                    const xVal = data0[pi] ?? 0;
                    const cx = 25 + (xVal / xMax) * 170;
                    const cy = 105 - (yVal / scatterMax) * 95;
                    return (
                      <circle
                        key={pi}
                        cx={cx}
                        cy={cy}
                        r="3.5"
                        fill={color}
                        fillOpacity={0.7}
                      />
                    );
                  });
                }
                // Single dataset: use labels as x-index
                if (datasets.length === 1) {
                  return ds.data.map((val, pi) => {
                    const cx = 25 + ((pi + 0.5) / ds.data.length) * 170;
                    const cy = 105 - (val / scatterMax) * 95;
                    return (
                      <circle
                        key={pi}
                        cx={cx}
                        cy={cy}
                        r="3.5"
                        fill={color}
                        fillOpacity={0.7}
                      />
                    );
                  });
                }
                return null;
              })}
              {/* Axis labels */}
              {chart.xAxisLabel && (
                <text x="110" y="118" textAnchor="middle" fontSize="6" fill={theme.textColor} opacity={0.5}>
                  {chart.xAxisLabel}
                </text>
              )}
              {chart.yAxisLabel && (
                <text x="8" y="55" textAnchor="middle" fontSize="6" fill={theme.textColor} opacity={0.5} transform="rotate(-90, 8, 55)">
                  {chart.yAxisLabel}
                </text>
              )}
            </svg>
            {chart.showLegend && datasets.length > 1 && (
              <ChartLegend datasets={datasets} colors={colors} />
            )}
          </div>
        );
      })()}

      {/* ---- AREA CHART ---- */}
      {chart.chartType === "area" && (() => {
        const areaWidth = data0.length * 40;
        return (
          <div>
            <svg viewBox={`0 0 ${areaWidth} 110`} className="w-full h-[4em]" preserveAspectRatio="none">
              {datasets.map((ds, di) => {
                const dsMax = Math.max(...ds.data, 1);
                const color = ds.color ?? CHART_PALETTE[di % CHART_PALETTE.length];
                const points = ds.data.map(
                  (val, i) => `${i * 40 + 20},${100 - (val / dsMax) * 85 - 5}`,
                );
                const areaPath = `M ${20},105 L ${points.join(" L ")} L ${(ds.data.length - 1) * 40 + 20},105 Z`;
                const linePath = points.join(" ");
                return (
                  <g key={di}>
                    <path d={areaPath} fill={color} fillOpacity={0.15} />
                    <polyline
                      points={linePath}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                );
              })}
            </svg>
            <div className="flex justify-between text-[0.45em] opacity-50 px-[0.2em]">
              {chart.labels.map((label, i) => (
                <span key={i} className="truncate text-center" style={{ flex: "1 1 0" }}>
                  {label}
                </span>
              ))}
            </div>
            {chart.showLegend && datasets.length > 1 && (
              <ChartLegend datasets={datasets} colors={colors} />
            )}
          </div>
        );
      })()}

      {/* ---- RADAR CHART ---- */}
      {chart.chartType === "radar" && (() => {
        const n = chart.labels.length || 1;
        const radarMax = Math.max(...datasets.flatMap((d) => d.data), 1);
        const cx = 100;
        const cy = 100;
        const radius = 80;

        const angleStep = (2 * Math.PI) / n;

        const getPoint = (index: number, value: number) => {
          const angle = angleStep * index - Math.PI / 2;
          const r = (value / radarMax) * radius;
          return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
        };

        return (
          <div className="flex items-center justify-center gap-[0.5em]">
            <svg viewBox="0 0 200 200" className="w-[5em] h-[5em]">
              {/* Grid rings */}
              {[0.25, 0.5, 0.75, 1].map((frac) => {
                const r = radius * frac;
                const ringPoints = Array.from({ length: n }, (_, i) => {
                  const angle = angleStep * i - Math.PI / 2;
                  return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
                }).join(" ");
                return (
                  <polygon
                    key={frac}
                    points={ringPoints}
                    fill="none"
                    stroke={theme.textColor}
                    strokeOpacity={0.1}
                    strokeWidth="0.5"
                  />
                );
              })}
              {/* Axis lines */}
              {Array.from({ length: n }, (_, i) => {
                const angle = angleStep * i - Math.PI / 2;
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={cx + radius * Math.cos(angle)}
                    y2={cy + radius * Math.sin(angle)}
                    stroke={theme.textColor}
                    strokeOpacity={0.1}
                    strokeWidth="0.5"
                  />
                );
              })}
              {/* Data polygons */}
              {datasets.map((ds, di) => {
                const color = ds.color ?? CHART_PALETTE[di % CHART_PALETTE.length];
                const points = ds.data
                  .slice(0, n)
                  .map((val, i) => {
                    const p = getPoint(i, val);
                    return `${p.x},${p.y}`;
                  })
                  .join(" ");
                return (
                  <g key={di}>
                    <polygon
                      points={points}
                      fill={color}
                      fillOpacity={0.2}
                      stroke={color}
                      strokeWidth="1.5"
                    />
                    {ds.data.slice(0, n).map((val, i) => {
                      const p = getPoint(i, val);
                      return (
                        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={color} />
                      );
                    })}
                  </g>
                );
              })}
              {/* Labels */}
              {chart.labels.map((label, i) => {
                const angle = angleStep * i - Math.PI / 2;
                const labelR = radius + 14;
                const lx = cx + labelR * Math.cos(angle);
                const ly = cy + labelR * Math.sin(angle);
                return (
                  <text
                    key={i}
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="7"
                    fill={theme.textColor}
                    opacity={0.6}
                  >
                    {label.length > 12 ? label.slice(0, 11) + "\u2026" : label}
                  </text>
                );
              })}
            </svg>
            {chart.showLegend && datasets.length > 1 && (
              <div className="space-y-[0.1em]">
                {datasets.map((ds, i) => (
                  <div key={i} className="flex items-center gap-[0.25em]">
                    <div
                      className="w-[0.5em] h-[0.5em] rounded-[0.05em]"
                      style={{
                        backgroundColor:
                          ds.color ?? CHART_PALETTE[i % CHART_PALETTE.length],
                      }}
                    />
                    <span className="text-[0.5em] opacity-70">{ds.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* ---- FUNNEL CHART ---- */}
      {chart.chartType === "funnel" && (() => {
        const funnelMax = Math.max(...data0, 1);
        const stepHeight = 100 / (data0.length || 1);

        return (
          <div>
            <svg viewBox="0 0 200 120" className="w-full h-[5em]">
              {data0.map((val, i) => {
                const widthFrac = val / funnelMax;
                const barWidth = widthFrac * 160;
                const x = (200 - barWidth) / 2;
                const y = i * stepHeight + 2;
                const color = CHART_PALETTE[i % CHART_PALETTE.length];
                return (
                  <g key={i}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={stepHeight - 3}
                      fill={color}
                      rx="2"
                    />
                    <text
                      x={100}
                      y={y + stepHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="6"
                      fill="white"
                      fontWeight="bold"
                    >
                      {chart.labels[i]} ({val})
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        );
      })()}

      {/* ---- FOREST PLOT ---- */}
      {chart.chartType === "forest_plot" && (() => {
        // Forest plot: each label is a study, data[0] = point estimate
        // If multiple datasets: datasets[0] = estimates, datasets[1] = CI lower, datasets[2] = CI upper
        const estimates = data0;
        const ciLower = datasets[1]?.data ?? estimates.map((v) => v * 0.7);
        const ciUpper = datasets[2]?.data ?? estimates.map((v) => v * 1.3);
        const allVals = [...estimates, ...ciLower, ...ciUpper];
        const plotMin = Math.min(...allVals, 0);
        const plotMax = Math.max(...allVals);
        const range = plotMax - plotMin || 1;
        const rowHeight = Math.min(18, 100 / (estimates.length || 1));
        const svgHeight = estimates.length * rowHeight + 20;
        const plotLeft = 80;
        const plotRight = 190;
        const plotWidth = plotRight - plotLeft;

        const toX = (val: number) =>
          plotLeft + ((val - plotMin) / range) * plotWidth;

        // Null line at 0 or 1 (common in meta-analysis)
        const nullValue = plotMin <= 1 && plotMax >= 1 ? 1 : 0;
        const nullX = toX(nullValue);

        return (
          <div>
            <svg
              viewBox={`0 0 200 ${svgHeight}`}
              className="w-full"
              style={{ height: `${Math.min(6, estimates.length * 1)}em` }}
            >
              {/* Null line */}
              <line
                x1={nullX}
                y1={5}
                x2={nullX}
                y2={svgHeight - 15}
                stroke={theme.textColor}
                strokeOpacity={0.3}
                strokeWidth="0.5"
                strokeDasharray="3,2"
              />
              {/* Study rows */}
              {estimates.map((est, i) => {
                const y = i * rowHeight + 10;
                const estX = toX(est);
                const lowX = toX(ciLower[i]);
                const highX = toX(ciUpper[i]);
                const color = theme.primaryColor;

                return (
                  <g key={i}>
                    {/* Study label */}
                    <text
                      x={plotLeft - 4}
                      y={y + 1}
                      textAnchor="end"
                      dominantBaseline="central"
                      fontSize="5"
                      fill={theme.textColor}
                      opacity={0.7}
                    >
                      {(chart.labels[i] ?? `Study ${i + 1}`).slice(0, 15)}
                    </text>
                    {/* CI line */}
                    <line
                      x1={lowX}
                      y1={y}
                      x2={highX}
                      y2={y}
                      stroke={color}
                      strokeWidth="1.5"
                    />
                    {/* CI whiskers */}
                    <line x1={lowX} y1={y - 3} x2={lowX} y2={y + 3} stroke={color} strokeWidth="1" />
                    <line x1={highX} y1={y - 3} x2={highX} y2={y + 3} stroke={color} strokeWidth="1" />
                    {/* Point estimate diamond */}
                    <polygon
                      points={`${estX},${y - 4} ${estX + 3},${y} ${estX},${y + 4} ${estX - 3},${y}`}
                      fill={color}
                    />
                  </g>
                );
              })}
              {/* X axis */}
              <line
                x1={plotLeft}
                y1={svgHeight - 15}
                x2={plotRight}
                y2={svgHeight - 15}
                stroke={theme.textColor}
                strokeOpacity={0.3}
                strokeWidth="0.5"
              />
              {/* Axis ticks */}
              {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
                const val = plotMin + frac * range;
                const tx = toX(val);
                return (
                  <g key={frac}>
                    <line
                      x1={tx}
                      y1={svgHeight - 15}
                      x2={tx}
                      y2={svgHeight - 12}
                      stroke={theme.textColor}
                      strokeOpacity={0.3}
                      strokeWidth="0.5"
                    />
                    <text
                      x={tx}
                      y={svgHeight - 7}
                      textAnchor="middle"
                      fontSize="4.5"
                      fill={theme.textColor}
                      opacity={0.5}
                    >
                      {val.toFixed(1)}
                    </text>
                  </g>
                );
              })}
            </svg>
            {chart.showLegend && (
              <p className="text-[0.45em] text-center opacity-40 mt-[0.1em]">
                Point estimates with confidence intervals
              </p>
            )}
          </div>
        );
      })()}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chart Legend helper
// ---------------------------------------------------------------------------

function ChartLegend({
  datasets,
  colors,
}: {
  datasets: { label: string; data: number[]; color?: string }[];
  colors: string[];
}) {
  return (
    <div className="flex flex-wrap gap-x-[0.6em] gap-y-[0.1em] mt-[0.2em] justify-center">
      {datasets.map((ds, i) => (
        <div key={i} className="flex items-center gap-[0.2em]">
          <div
            className="w-[0.45em] h-[0.45em] rounded-[0.05em]"
            style={{ backgroundColor: colors[i] }}
          />
          <span className="text-[0.45em] opacity-60">{ds.label}</span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table Preview
// ---------------------------------------------------------------------------

function SimpleTablePreview({
  table,
  theme,
}: {
  table: { headers: string[]; rows: string[][] };
  theme: ThemeConfig;
}) {
  return (
    <div className="overflow-auto text-[0.6em]">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th
                key={i}
                className="px-[0.5em] py-[0.25em] text-left font-semibold border-b-2"
                style={{
                  borderColor: theme.primaryColor,
                  color: theme.primaryColor,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.slice(0, 8).map((row, ri) => (
            <tr
              key={ri}
              style={{
                backgroundColor:
                  ri % 2 === 1
                    ? (theme.surfaceColor ?? theme.primaryColor + "05")
                    : "transparent",
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-[0.5em] py-[0.2em] border-b"
                  style={{
                    borderColor:
                      theme.borderColor ?? theme.primaryColor + "10",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {table.rows.length > 8 && (
            <tr>
              <td
                colSpan={table.headers.length}
                className="px-[0.5em] py-[0.15em] text-center opacity-40 text-[0.85em] italic"
              >
                +{table.rows.length - 8} more rows
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
