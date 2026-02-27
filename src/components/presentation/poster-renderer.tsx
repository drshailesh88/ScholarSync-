"use client";

import { useEffect, useRef, useState, useId } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type {
  ContentBlock,
  ThemeConfig,
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
import type { PosterData, PosterSection, PosterSize } from "@/types/poster";
import { POSTER_SIZES, POSTER_GRID_LAYOUTS } from "@/types/poster";
import katex from "katex";
import "katex/dist/katex.min.css";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "default" });

// ---------------------------------------------------------------------------
// Callout color map (reused from slide-renderer)
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

const CHART_PALETTE = [
  "#4F46E5", "#06B6D4", "#10B981", "#F59E0B",
  "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6",
];

// ---------------------------------------------------------------------------
// PosterRenderer — public API
// ---------------------------------------------------------------------------
interface PosterRendererProps {
  poster: PosterData;
  scale?: number;
  className?: string;
  onSectionClick?: (sectionId: string) => void;
  activeSectionId?: string | null;
}

export function PosterRenderer({
  poster,
  scale = 0.2,
  className,
  onSectionClick,
  activeSectionId,
}: PosterRendererProps) {
  const theme = poster.themeConfig ?? PRESET_THEMES.modern;
  const gridConfig = POSTER_GRID_LAYOUTS[poster.gridLayout];
  const columns = gridConfig?.columns ?? 3;
  const sizeConfig = POSTER_SIZES[poster.size];

  // Calculate aspect ratio from poster size
  const aspectRatio = sizeConfig.width / sizeConfig.height;

  // Separate title section from content sections
  const titleSection = poster.sections.find(
    (s) => s.colSpan && s.colSpan >= columns
  );
  const contentSections = poster.sections.filter(
    (s) => !s.colSpan || s.colSpan < columns
  );

  return (
    <div
      className={cn("relative overflow-hidden shadow-lg", className)}
      style={{
        aspectRatio: `${aspectRatio}`,
        fontSize: `${scale * 14}px`,
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily ?? "Inter, sans-serif",
      }}
    >
      {/* Poster content container */}
      <div
        className="h-full flex flex-col"
        style={{ padding: "1.5em" }}
      >
        {/* Title bar — spans full width */}
        {titleSection ? (
          <div
            className={cn(
              "rounded-[0.4em] mb-[1em] p-[1.2em] shrink-0 cursor-pointer transition-all",
              activeSectionId === titleSection.id && "ring-2 ring-blue-500"
            )}
            style={{
              background: theme.gradientFrom && theme.gradientTo
                ? `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`
                : theme.primaryColor,
              color: "#FFFFFF",
            }}
            onClick={() => onSectionClick?.(titleSection.id)}
          >
            <h1
              className="text-[2.2em] font-bold leading-tight mb-[0.2em]"
              style={{ fontFamily: theme.headingFontFamily }}
            >
              {poster.title}
            </h1>
            {poster.authors.length > 0 && (
              <p className="text-[0.9em] opacity-90 mt-[0.3em]">
                {poster.authors.join(", ")}
              </p>
            )}
            {poster.affiliations.length > 0 && (
              <p className="text-[0.75em] opacity-75 mt-[0.15em]">
                {poster.affiliations.join("; ")}
              </p>
            )}
            {/* Render any extra content blocks in the title section */}
            {titleSection.contentBlocks.length > 0 && (
              <div className="mt-[0.5em]">
                <PosterBlockList blocks={titleSection.contentBlocks} theme={{ ...theme, textColor: "#FFFFFF" }} />
              </div>
            )}
          </div>
        ) : (
          <div
            className="rounded-[0.4em] mb-[1em] p-[1.2em] shrink-0"
            style={{ backgroundColor: theme.primaryColor, color: "#FFFFFF" }}
          >
            <h1
              className="text-[2.2em] font-bold leading-tight"
              style={{ fontFamily: theme.headingFontFamily }}
            >
              {poster.title}
            </h1>
          </div>
        )}

        {/* Content grid */}
        <div
          className="flex-1 gap-[0.8em]"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridAutoRows: "auto",
          }}
        >
          {contentSections.map((section) => (
            <PosterSectionCard
              key={section.id}
              section={section}
              theme={theme}
              isActive={activeSectionId === section.id}
              onClick={() => onSectionClick?.(section.id)}
            />
          ))}
        </div>

        {/* QR Code footer */}
        {poster.qrCodeUrl && (
          <div className="flex items-center justify-end mt-[0.5em] gap-[0.5em]">
            <span className="text-[0.6em] opacity-50">Scan for full paper</span>
            <div
              className="w-[3em] h-[3em] rounded-[0.2em] flex items-center justify-center text-[0.5em] opacity-60"
              style={{
                backgroundColor: theme.surfaceColor ?? "#F5F5F5",
                border: `1px solid ${theme.borderColor ?? "#E5E5E5"}`,
              }}
            >
              QR
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PosterSectionCard — a bordered section within the poster grid
// ---------------------------------------------------------------------------

function PosterSectionCard({
  section,
  theme,
  isActive,
  onClick,
}: {
  section: PosterSection;
  theme: ThemeConfig;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-[0.4em] overflow-hidden cursor-pointer transition-all",
        isActive && "ring-2 ring-blue-500"
      )}
      style={{
        gridColumn: section.colSpan ? `span ${section.colSpan}` : undefined,
        border: `2px solid ${theme.primaryColor}30`,
        backgroundColor: theme.surfaceColor ?? theme.backgroundColor,
      }}
      onClick={onClick}
    >
      {/* Section header */}
      <div
        className="px-[0.8em] py-[0.4em]"
        style={{
          backgroundColor: theme.primaryColor + "15",
          borderBottom: `2px solid ${theme.primaryColor}30`,
        }}
      >
        <h2
          className="text-[1em] font-bold"
          style={{
            color: theme.primaryColor,
            fontFamily: theme.headingFontFamily,
          }}
        >
          {section.title}
        </h2>
      </div>

      {/* Section content */}
      <div className="p-[0.8em]">
        <PosterBlockList blocks={section.contentBlocks} theme={theme} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PosterBlockList — renders content blocks within a poster section
// ---------------------------------------------------------------------------

function PosterBlockList({
  blocks,
  theme,
}: {
  blocks: ContentBlock[];
  theme: ThemeConfig;
}) {
  return (
    <div className="space-y-[0.4em]">
      {blocks.map((block, i) => (
        <PosterBlockItem key={i} block={block} theme={theme} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PosterBlockItem — renders a single content block (poster-adapted version)
// ---------------------------------------------------------------------------

function PosterBlockItem({
  block,
  theme,
}: {
  block: ContentBlock;
  theme: ThemeConfig;
}) {
  switch (block.type) {
    case "text":
      return (
        <p
          className={cn(
            "leading-relaxed",
            block.data.style === "title" && "text-[1.2em] font-bold",
            block.data.style === "subtitle" && "text-[0.9em] opacity-70",
            block.data.style === "caption" && "text-[0.65em] opacity-50",
            (!block.data.style || block.data.style === "body") &&
              "text-[0.75em]"
          )}
        >
          {block.data.text}
        </p>
      );

    case "bullets": {
      const Tag = block.data.ordered ? "ol" : "ul";
      return (
        <Tag
          className={cn(
            "text-[0.75em] leading-relaxed space-y-[0.15em] pl-[1.2em]",
            block.data.ordered ? "list-decimal" : "list-disc"
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
            <Image
              src={block.data.url}
              alt={block.data.alt}
              width={400}
              height={300}
              className="max-w-full max-h-[12em] object-contain rounded-[0.2em]"
              unoptimized
            />
          ) : (
            <div
              className="w-full h-[6em] rounded-[0.2em] flex items-center justify-center text-[0.6em]"
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
      return <PosterChartPreview chart={block.data} theme={theme} />;

    case "table":
      return <PosterTablePreview table={block.data} theme={theme} />;

    case "citation":
      return (
        <div
          className="text-[0.6em] pl-[0.5em] border-l-2 opacity-70"
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

    case "math":
      return <PosterMathBlock data={block.data} theme={theme} />;

    case "diagram":
      return <PosterDiagramBlock data={block.data} theme={theme} />;

    case "code":
      return <PosterCodeBlock data={block.data} theme={theme} />;

    case "callout":
      return <PosterCalloutBlock data={block.data} theme={theme} />;

    case "stat_result":
      return <PosterStatResultBlock data={block.data} theme={theme} />;

    case "bibliography":
      return <PosterBibliographyBlock data={block.data} theme={theme} />;

    case "timeline":
      return <PosterTimelineBlock data={block.data} theme={theme} />;

    case "divider":
      return (
        <hr
          className="my-[0.3em]"
          style={{
            border: "none",
            borderTop: `1px ${block.data.style ?? "solid"} ${theme.borderColor ?? theme.primaryColor + "30"}`,
          }}
        />
      );

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Chart Preview — bar/pie/line charts rendered with HTML/CSS
// ---------------------------------------------------------------------------

function PosterChartPreview({
  chart,
  theme,
}: {
  chart: ChartData;
  theme: ThemeConfig;
}) {
  const maxVal = Math.max(
    ...chart.datasets.flatMap((ds) => ds.data),
    1
  );

  if (chart.chartType === "pie") {
    const total = chart.datasets[0]?.data.reduce((a, b) => a + b, 0) ?? 1;
    return (
      <div className="flex flex-col items-center">
        {chart.title && (
          <p className="text-[0.7em] font-medium mb-[0.3em]" style={{ color: theme.primaryColor }}>
            {chart.title}
          </p>
        )}
        <div className="flex flex-wrap gap-[0.3em] justify-center text-[0.6em]">
          {chart.labels.map((label, i) => {
            const val = chart.datasets[0]?.data[i] ?? 0;
            const pct = ((val / total) * 100).toFixed(1);
            return (
              <div key={i} className="flex items-center gap-[0.3em]">
                <div
                  className="w-[0.8em] h-[0.8em] rounded-full"
                  style={{ backgroundColor: CHART_PALETTE[i % CHART_PALETTE.length] }}
                />
                <span>{label}: {pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Bar chart
  return (
    <div className="w-full">
      {chart.title && (
        <p className="text-[0.7em] font-medium mb-[0.3em]" style={{ color: theme.primaryColor }}>
          {chart.title}
        </p>
      )}
      <div className="space-y-[0.2em]">
        {chart.labels.map((label, i) => {
          const val = chart.datasets[0]?.data[i] ?? 0;
          return (
            <div key={i} className="flex items-center gap-[0.3em]">
              <span className="text-[0.55em] w-[5em] truncate text-right opacity-70">
                {label}
              </span>
              <div className="flex-1 h-[1em] rounded-[0.1em] overflow-hidden" style={{ backgroundColor: theme.surfaceColor ?? "#F3F4F6" }}>
                <div
                  className="h-full rounded-[0.1em]"
                  style={{
                    width: `${(val / maxVal) * 100}%`,
                    backgroundColor: chart.datasets[0]?.color ?? CHART_PALETTE[i % CHART_PALETTE.length],
                  }}
                />
              </div>
              <span className="text-[0.55em] w-[3em] opacity-60">{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table Preview
// ---------------------------------------------------------------------------

function PosterTablePreview({
  table,
  theme,
}: {
  table: { headers: string[]; rows: string[][] };
  theme: ThemeConfig;
}) {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full text-[0.65em] border-collapse">
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th
                key={i}
                className="px-[0.5em] py-[0.3em] text-left font-semibold"
                style={{
                  backgroundColor: theme.primaryColor + "15",
                  borderBottom: `2px solid ${theme.primaryColor}40`,
                  color: theme.primaryColor,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-[0.5em] py-[0.2em]"
                  style={{
                    borderBottom: `1px solid ${theme.borderColor ?? "#E5E5E5"}`,
                  }}
                >
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

// ---------------------------------------------------------------------------
// Math Block (KaTeX)
// KaTeX.renderToString produces sanitized HTML - see https://katex.org/docs/security.html
// ---------------------------------------------------------------------------

function PosterMathBlock({ data, theme }: { data: MathData; theme: ThemeConfig }) {
  let html = "";
  try {
    html = katex.renderToString(data.expression, {
      displayMode: data.displayMode,
      throwOnError: false,
    });
  } catch {
    html = `<span style="color:red">Invalid LaTeX</span>`;
  }

  return (
    <div className="flex flex-col items-center my-[0.2em]">
      <div
        className="rounded-[0.2em] px-[0.8em] py-[0.4em] w-full flex items-center justify-center"
        style={{
          backgroundColor: theme.surfaceColor ?? theme.primaryColor + "08",
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

// ---------------------------------------------------------------------------
// Diagram Block (Mermaid)
// Mermaid.render produces SVG from its own diagram DSL parser - safe for innerHTML
// ---------------------------------------------------------------------------

function PosterDiagramBlock({ data, theme }: { data: DiagramData; theme: ThemeConfig }) {
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
        const { svg } = await mermaid.render(`mermaid_poster_${instanceId}`, data.syntax);
        if (!cancelled) {
          setSvgHtml(svg);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Diagram render failed");
        }
      }
    }
    render();
    return () => { cancelled = true; };
  }, [data.syntax, instanceId]);

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <div
          className="w-full rounded-[0.2em] p-[0.4em] text-[0.6em] opacity-60"
          style={{ backgroundColor: theme.surfaceColor ?? theme.primaryColor + "08" }}
        >
          <p className="font-medium">Diagram preview unavailable</p>
          <pre className="text-[0.8em] mt-[0.1em] whitespace-pre-wrap opacity-50">
            {data.syntax.slice(0, 200)}
          </pre>
        </div>
      ) : svgHtml ? (
        // Mermaid SVG output is generated by the library's own parser, not user HTML
        <div
          ref={containerRef}
          className="max-w-full overflow-hidden"
          dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
      ) : (
        <div className="text-[0.6em] opacity-40 py-[0.5em]">Rendering diagram...</div>
      )}
      {data.caption && (
        <p className="text-[0.55em] opacity-50 mt-[0.15em] text-center">{data.caption}</p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Code Block
// ---------------------------------------------------------------------------

function PosterCodeBlock({ data, theme }: { data: CodeData; theme: ThemeConfig }) {
  return (
    <div className="flex flex-col">
      <pre
        className="rounded-[0.2em] p-[0.5em] text-[0.6em] overflow-auto leading-relaxed"
        style={{
          backgroundColor: theme.codeBackground ?? "#1E1E2E",
          color: "#E2E8F0",
        }}
      >
        <code>{data.code}</code>
      </pre>
      {data.caption && (
        <p className="text-[0.5em] opacity-50 mt-[0.1em]">{data.caption}</p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Callout Block
// ---------------------------------------------------------------------------

function PosterCalloutBlock({ data, theme }: { data: CalloutData; theme: ThemeConfig }) {
  const colors = CALLOUT_COLORS[data.type] ?? CALLOUT_COLORS.info;
  return (
    <div
      className="rounded-[0.3em] p-[0.5em] border-l-[0.2em]"
      style={{
        borderLeftColor: colors.border,
        backgroundColor: colors.bg,
      }}
    >
      {data.title && (
        <p className="text-[0.7em] font-bold mb-[0.1em]" style={{ color: colors.border }}>
          {data.title}
        </p>
      )}
      <p className="text-[0.65em] leading-relaxed">{data.text}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat Result Block
// ---------------------------------------------------------------------------

function PosterStatResultBlock({ data, theme }: { data: StatResultData; theme: ThemeConfig }) {
  return (
    <div
      className="rounded-[0.3em] p-[0.5em]"
      style={{
        backgroundColor: theme.surfaceColor ?? theme.primaryColor + "08",
        border: `1px solid ${theme.borderColor ?? theme.primaryColor + "15"}`,
      }}
    >
      <div className="flex items-baseline gap-[0.3em]">
        <span className="text-[0.65em] font-medium opacity-70">{data.label}:</span>
        <span className="text-[0.9em] font-bold" style={{ color: theme.primaryColor }}>
          {data.value}
        </span>
      </div>
      <div className="flex gap-[0.5em] mt-[0.1em] text-[0.55em] opacity-60">
        {data.ci && <span>CI: {data.ci}</span>}
        {data.pValue && <span>p = {data.pValue}</span>}
      </div>
      {data.interpretation && (
        <p className="text-[0.55em] opacity-60 mt-[0.1em] italic">
          {data.interpretation}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bibliography Block
// ---------------------------------------------------------------------------

function PosterBibliographyBlock({ data, theme }: { data: BibliographyData; theme: ThemeConfig }) {
  return (
    <div className="space-y-[0.1em]">
      {data.entries.map((entry, i) => (
        <p key={i} className="text-[0.5em] leading-snug opacity-70">
          [{typeof entry.id === "number" ? entry.id : i + 1}] {entry.formatted}
          {entry.doi && (
            <span className="opacity-60"> doi:{entry.doi}</span>
          )}
        </p>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline Block
// ---------------------------------------------------------------------------

function PosterTimelineBlock({ data, theme }: { data: TimelineData; theme: ThemeConfig }) {
  return (
    <div>
      {data.title && (
        <p className="text-[0.7em] font-medium mb-[0.2em]" style={{ color: theme.primaryColor }}>
          {data.title}
        </p>
      )}
      <div className="space-y-[0.15em]">
        {data.entries.map((entry, i) => (
          <div key={i} className="flex items-start gap-[0.3em]">
            <div
              className="w-[0.5em] h-[0.5em] rounded-full mt-[0.15em] shrink-0"
              style={{
                backgroundColor:
                  entry.status === "completed"
                    ? "#10B981"
                    : entry.status === "in_progress"
                      ? theme.primaryColor
                      : "#9CA3AF",
              }}
            />
            <div>
              <span className="text-[0.65em] font-medium">{entry.label}</span>
              {entry.date && (
                <span className="text-[0.55em] opacity-50 ml-[0.3em]">{entry.date}</span>
              )}
              {entry.description && (
                <p className="text-[0.55em] opacity-60">{entry.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
