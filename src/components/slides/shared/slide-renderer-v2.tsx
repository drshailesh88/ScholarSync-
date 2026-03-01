"use client";

import type { ContentBlock, SlideLayout, ThemeConfig } from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import { computeLayout, regionToCSS } from "./slide-layout-engine";
import { ThemeProvider } from "./theme-engine";
import { BLOCK_REGISTRY } from "../blocks";

// ---------------------------------------------------------------------------
// SlideRendererV2 — modular, block-registry-based renderer
// ---------------------------------------------------------------------------

interface SlideRendererV2Props {
  title?: string | null;
  subtitle?: string | null;
  layout?: SlideLayout | null;
  contentBlocks?: ContentBlock[];
  themeKey?: string;
  themeConfig?: ThemeConfig;
  className?: string;
  scale?: number;
  showSlideNumber?: boolean;
  slideNumber?: number;
}

export function SlideRendererV2({
  title,
  subtitle,
  layout: rawLayout,
  contentBlocks = [],
  themeKey = "modern",
  themeConfig,
  className,
  scale = 1,
  showSlideNumber,
  slideNumber,
}: SlideRendererV2Props) {
  const theme = themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;
  const layout = (rawLayout ?? "title_content") as SlideLayout;
  const layoutResult = computeLayout(layout, contentBlocks);

  return (
    <ThemeProvider
      theme={theme}
      className={`aspect-video relative overflow-hidden ${className ?? ""}`}
      style={{ fontSize: `${scale * 16}px` }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: `${scale * 4}px`, backgroundColor: theme.primaryColor }}
      />

      <div className="absolute inset-0 p-[6%] pt-[8%] flex flex-col">
        {/* Title area */}
        {!layoutResult.hasBuiltInTitle && title && (
          <div className="mb-[0.5em] shrink-0">
            <h2
              className="text-[1.3em] font-bold leading-tight"
              style={{
                color: theme.primaryColor,
                fontFamily: theme.headingFontFamily ?? theme.fontFamily,
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-[0.75em] opacity-60 mt-[0.15em]">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Built-in title layouts (title_slide, section_header, quote_slide) */}
        {layout === "title_slide" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-[0.5em]">
            <h1
              className="text-[2em] font-bold leading-tight"
              style={{
                color: theme.primaryColor,
                fontFamily: theme.headingFontFamily ?? theme.fontFamily,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-[1em] opacity-70">{subtitle}</p>
            )}
          </div>
        )}

        {layout === "section_header" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div
              className="w-[3em] h-[0.15em] mb-[0.8em] rounded-full"
              style={{ backgroundColor: theme.accentColor }}
            />
            <h1
              className="text-[1.8em] font-bold"
              style={{
                color: theme.primaryColor,
                fontFamily: theme.headingFontFamily ?? theme.fontFamily,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-[0.85em] mt-[0.4em] opacity-60">{subtitle}</p>
            )}
          </div>
        )}

        {/* Content regions from layout engine */}
        {layoutResult.regions.length > 0 && (
          <div className="flex-1 relative min-h-0">
            {layoutResult.regions.map((region) => (
              <div key={region.id} style={regionToCSS(region)}>
                {region.blocks.map((block, i) => {
                  const entry = BLOCK_REGISTRY[block.type];
                  if (!entry) return null;
                  const Renderer = entry.render;
                  return (
                    <Renderer
                      key={`${block.type}-${i}`}
                      data={block.data as Record<string, unknown>}
                      theme={theme}
                      scale={scale}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide number */}
      {showSlideNumber && slideNumber != null && (
        <div
          className="absolute bottom-[3%] right-[4%] text-[0.6em] opacity-50"
          style={{ color: theme.textColor }}
        >
          {slideNumber}
        </div>
      )}
    </ThemeProvider>
  );
}
