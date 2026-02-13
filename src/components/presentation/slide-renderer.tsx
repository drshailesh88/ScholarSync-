"use client";

import { cn } from "@/lib/utils";
import type { ContentBlock, ThemeConfig, SlideLayout } from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";

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
  const theme = themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;
  const isDark = isColorDark(theme.backgroundColor);

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
        style={{ height: `${scale * 4}px`, backgroundColor: theme.primaryColor }}
      />

      <div className="absolute inset-0 p-[6%] pt-[8%] flex flex-col">
        {renderLayout(layout, title, subtitle, contentBlocks, theme, scale)}
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

function renderLayout(
  layout: SlideLayout,
  title: string | null | undefined,
  subtitle: string | null | undefined,
  blocks: ContentBlock[],
  theme: ThemeConfig,
  scale: number
) {
  switch (layout) {
    case "title_slide":
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-[0.5em]">
          <h1
            className="text-[2em] font-bold leading-tight"
            style={{ color: theme.primaryColor, fontFamily: theme.headingFontFamily }}
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
            style={{ color: theme.primaryColor, fontFamily: theme.headingFontFamily }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-[0.85em] mt-[0.4em] opacity-60">{subtitle}</p>
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
            <div><ContentBlockList blocks={left} theme={theme} /></div>
            <div><ContentBlockList blocks={right} theme={theme} /></div>
          </div>
        </>
      );
    }

    case "quote_slide": {
      const quoteBlock = blocks.find((b) => b.type === "quote");
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-[8%]">
          <div className="text-[2.5em] leading-none mb-[0.2em]" style={{ color: theme.accentColor }}>
            &ldquo;
          </div>
          <p className="text-[1.1em] italic leading-relaxed">
            {quoteBlock?.type === "quote" ? quoteBlock.data.text : title}
          </p>
          {quoteBlock?.type === "quote" && quoteBlock.data.attribution && (
            <p className="text-[0.75em] mt-[0.6em] opacity-60">
              — {quoteBlock.data.attribution}
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
            <div className="flex items-center justify-center rounded-[0.3em] overflow-hidden" style={{ backgroundColor: theme.primaryColor + "10" }}>
              {imgBlock?.type === "image" && imgBlock.data.url ? (
                <img src={imgBlock.data.url} alt={imgBlock.data.alt} className="max-w-full max-h-full object-contain" />
              ) : (
                <div className="text-[0.7em] opacity-40">Image placeholder</div>
              )}
            </div>
            <div><ContentBlockList blocks={otherBlocks} theme={theme} /></div>
          </div>
        </>
      );
    }

    case "chart_slide": {
      const chartBlock = blocks.find((b) => b.type === "chart");
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          <div className="flex-1 flex items-center justify-center mt-[0.5em]">
            {chartBlock?.type === "chart" ? (
              <SimpleChartPreview chart={chartBlock.data} theme={theme} />
            ) : (
              <div className="text-[0.7em] opacity-40">Chart placeholder</div>
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

    case "title_content":
    default:
      return (
        <>
          <SlideTitle title={title} theme={theme} />
          {subtitle && (
            <p className="text-[0.7em] opacity-60 mt-[-0.2em]">{subtitle}</p>
          )}
          <div className="flex-1 mt-[0.5em] overflow-hidden">
            <ContentBlockList blocks={blocks} theme={theme} />
          </div>
        </>
      );
  }
}

function SlideTitle({ title, theme }: { title?: string | null; theme: ThemeConfig }) {
  if (!title) return null;
  return (
    <h2
      className="text-[1.3em] font-bold leading-tight shrink-0"
      style={{ color: theme.primaryColor, fontFamily: theme.headingFontFamily }}
    >
      {title}
    </h2>
  );
}

function ContentBlockList({ blocks, theme }: { blocks: ContentBlock[]; theme: ThemeConfig }) {
  return (
    <div className="space-y-[0.4em]">
      {blocks.map((block, i) => (
        <ContentBlockItem key={i} block={block} theme={theme} />
      ))}
    </div>
  );
}

function ContentBlockItem({ block, theme }: { block: ContentBlock; theme: ThemeConfig }) {
  switch (block.type) {
    case "text":
      return (
        <p className={cn(
          "leading-relaxed",
          block.data.style === "title" && "text-[1.2em] font-bold",
          block.data.style === "subtitle" && "text-[0.9em] opacity-70",
          block.data.style === "caption" && "text-[0.65em] opacity-50",
          (!block.data.style || block.data.style === "body") && "text-[0.75em]",
        )}>
          {block.data.text}
        </p>
      );

    case "bullets":
      const Tag = block.data.ordered ? "ol" : "ul";
      return (
        <Tag className={cn("text-[0.75em] leading-relaxed space-y-[0.15em] pl-[1.2em]", block.data.ordered ? "list-decimal" : "list-disc")}>
          {block.data.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </Tag>
      );

    case "image":
      return (
        <div className="flex flex-col items-center">
          {block.data.url ? (
            <img src={block.data.url} alt={block.data.alt} className="max-h-[8em] object-contain rounded-[0.2em]" />
          ) : (
            <div
              className="w-full h-[5em] rounded-[0.2em] flex items-center justify-center text-[0.6em]"
              style={{ backgroundColor: theme.primaryColor + "10", color: theme.primaryColor }}
            >
              {block.data.suggestion ?? block.data.alt}
            </div>
          )}
          {block.data.caption && (
            <p className="text-[0.55em] opacity-50 mt-[0.2em]">{block.data.caption}</p>
          )}
        </div>
      );

    case "chart":
      return <SimpleChartPreview chart={block.data} theme={theme} />;

    case "table":
      return <SimpleTablePreview table={block.data} theme={theme} />;

    case "citation":
      return (
        <div className="text-[0.65em] pl-[0.5em] border-l-2 opacity-70" style={{ borderColor: theme.accentColor }}>
          <p>{block.data.text}</p>
          <p className="text-[0.85em] opacity-60 mt-[0.1em]">— {block.data.source}</p>
        </div>
      );

    case "quote":
      return (
        <blockquote className="text-[0.85em] italic pl-[0.8em] border-l-[0.15em]" style={{ borderColor: theme.accentColor }}>
          <p>&ldquo;{block.data.text}&rdquo;</p>
          <p className="text-[0.65em] not-italic opacity-60 mt-[0.2em]">— {block.data.attribution}</p>
        </blockquote>
      );

    default:
      return null;
  }
}

function SimpleChartPreview({
  chart,
  theme,
}: {
  chart: { chartType: string; title: string; labels: string[]; datasets: { label: string; data: number[] }[] };
  theme: ThemeConfig;
}) {
  const maxVal = Math.max(...(chart.datasets[0]?.data ?? [1]));
  return (
    <div className="w-full">
      <p className="text-[0.65em] font-medium mb-[0.3em]">{chart.title}</p>
      {chart.chartType === "bar" && (
        <div className="flex items-end gap-[0.3em] h-[4em]">
          {chart.datasets[0]?.data.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end">
              <div
                className="w-full rounded-t-[0.1em] min-h-[0.2em]"
                style={{
                  height: `${(val / maxVal) * 100}%`,
                  backgroundColor: theme.primaryColor,
                }}
              />
              <span className="text-[0.45em] opacity-50 mt-[0.1em] truncate w-full text-center">
                {chart.labels[i]}
              </span>
            </div>
          ))}
        </div>
      )}
      {chart.chartType === "pie" && (
        <div className="flex items-center justify-center gap-[0.5em]">
          <div className="w-[3.5em] h-[3.5em] rounded-full border-[0.3em]" style={{ borderColor: theme.primaryColor }} />
          <div className="space-y-[0.1em]">
            {chart.labels.slice(0, 4).map((label, i) => (
              <p key={i} className="text-[0.5em] opacity-60">{label}</p>
            ))}
          </div>
        </div>
      )}
      {chart.chartType === "line" && (
        <div className="h-[4em] flex items-end gap-[0.15em]">
          {chart.datasets[0]?.data.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end">
              <div
                className="w-[0.25em] h-[0.25em] rounded-full"
                style={{ backgroundColor: theme.primaryColor, marginBottom: `${(val / maxVal) * 3}em` }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
                style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.slice(0, 5).map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-[0.5em] py-[0.2em] border-b border-current/10">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function isColorDark(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
