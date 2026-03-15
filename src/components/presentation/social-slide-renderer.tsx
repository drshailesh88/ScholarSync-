// Empty state: renders nothing when data.length === 0
"use client";

import { forwardRef } from "react";
import type { ContentBlock, ThemeConfig } from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import type { SocialFormatKey } from "@/lib/presentation/social-formats";
import { SOCIAL_FORMATS } from "@/lib/presentation/social-formats";

// ---------------------------------------------------------------------------
// SocialSlideRenderer — Renders a single slide at social media dimensions
// ---------------------------------------------------------------------------

interface SocialSlideRendererProps {
  title?: string | null;
  subtitle?: string | null;
  contentBlocks: ContentBlock[];
  themeKey?: string;
  themeConfig?: ThemeConfig;
  format: SocialFormatKey;
  slideNumber: number;
  totalSlides: number;
  showBranding?: boolean;
}

export const SocialSlideRenderer = forwardRef<
  HTMLDivElement,
  SocialSlideRendererProps
>(function SocialSlideRenderer(
  {
    title,
    subtitle,
    contentBlocks,
    themeKey = "modern",
    themeConfig,
    format,
    slideNumber,
    totalSlides,
    showBranding = true,
  },
  ref,
) {
  const theme = themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;
  const formatConfig = SOCIAL_FORMATS[format];

  // Text-only format — no visual rendering needed
  if (format === "twitter_thread") return null;

  const width = "width" in formatConfig ? formatConfig.width : 1080;
  const height = "height" in formatConfig ? formatConfig.height : 1080;
  const isSquare = width === height;
  const isVertical = height > width;

  // Determine font sizing based on format
  const baseFontSize = isVertical ? 36 : isSquare ? 28 : 22;
  const titleFontSize = isVertical ? 52 : isSquare ? 44 : 32;
  const bulletFontSize = isVertical ? 32 : isSquare ? 24 : 18;
  const maxBullets = isVertical ? 4 : isSquare ? 5 : 4;

  // Extract text content from content blocks
  const textBlocks = contentBlocks.filter(
    (b) =>
      b.type === "text" ||
      b.type === "bullets" ||
      b.type === "quote" ||
      b.type === "callout" ||
      b.type === "stat_result",
  );

  return (
    <div
      ref={ref}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily ?? "Inter, system-ui, sans-serif",
        fontSize: `${baseFontSize}px`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: isVertical ? "8px" : "6px",
          backgroundColor: theme.primaryColor,
          flexShrink: 0,
        }}
      />

      {/* Slide number indicator */}
      {totalSlides > 1 && (
        <div
          style={{
            position: "absolute",
            top: isVertical ? "32px" : "24px",
            right: isVertical ? "32px" : "24px",
            fontSize: isVertical ? "28px" : "22px",
            fontWeight: 600,
            color: theme.primaryColor,
            opacity: 0.7,
          }}
        >
          {slideNumber}/{totalSlides}
        </div>
      )}

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: isVertical ? "60px 48px" : isSquare ? "48px 40px" : "32px 40px",
          justifyContent: isVertical ? "center" : "flex-start",
          gap: isVertical ? "32px" : isSquare ? "24px" : "16px",
          overflow: "hidden",
        }}
      >
        {/* Title */}
        {title && (
          <h1
            style={{
              fontSize: `${titleFontSize}px`,
              fontWeight: 700,
              lineHeight: 1.2,
              color: theme.primaryColor,
              fontFamily: theme.headingFontFamily ?? theme.fontFamily,
              margin: 0,
              ...(isVertical && { textAlign: "center" as const }),
            }}
          >
            {title}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontSize: `${baseFontSize}px`,
              opacity: 0.7,
              lineHeight: 1.4,
              margin: 0,
              ...(isVertical && { textAlign: "center" as const }),
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Content blocks — simplified for social */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: isVertical ? "24px" : "16px",
            overflow: "hidden",
          }}
        >
          {textBlocks.map((block, idx) => {
            if (block.type === "bullets") {
              const items = block.data.items.slice(0, maxBullets);
              return (
                <ul
                  key={idx}
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: isVertical ? "20px" : "12px",
                  }}
                >
                  {items.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: `${bulletFontSize}px`,
                        lineHeight: 1.5,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          color: theme.accentColor ?? theme.primaryColor,
                          fontWeight: 700,
                          flexShrink: 0,
                          fontSize: `${bulletFontSize}px`,
                        }}
                      >
                        {block.data.ordered ? `${i + 1}.` : "\u2022"}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {block.data.items.length > maxBullets && (
                    <li
                      style={{
                        fontSize: `${bulletFontSize * 0.85}px`,
                        opacity: 0.5,
                        fontStyle: "italic",
                      }}
                    >
                      +{block.data.items.length - maxBullets} more...
                    </li>
                  )}
                </ul>
              );
            }

            if (block.type === "text") {
              const style = block.data.style ?? "body";
              const fontSize =
                style === "title"
                  ? titleFontSize
                  : style === "subtitle"
                    ? baseFontSize * 1.1
                    : style === "caption"
                      ? baseFontSize * 0.8
                      : baseFontSize;
              return (
                <p
                  key={idx}
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: 1.5,
                    margin: 0,
                    fontWeight: style === "title" ? 700 : 400,
                    opacity: style === "caption" ? 0.6 : 1,
                    ...(isVertical && { textAlign: "center" as const }),
                  }}
                >
                  {block.data.text}
                </p>
              );
            }

            if (block.type === "quote") {
              return (
                <blockquote
                  key={idx}
                  style={{
                    borderLeft: `4px solid ${theme.accentColor ?? theme.primaryColor}`,
                    paddingLeft: "20px",
                    margin: 0,
                    fontStyle: "italic",
                    fontSize: `${baseFontSize * 1.1}px`,
                    lineHeight: 1.5,
                  }}
                >
                  <p style={{ margin: 0 }}>
                    &ldquo;{block.data.text}&rdquo;
                  </p>
                  {block.data.attribution && (
                    <footer
                      style={{
                        marginTop: "8px",
                        fontSize: `${baseFontSize * 0.8}px`,
                        opacity: 0.6,
                      }}
                    >
                      &mdash; {block.data.attribution}
                    </footer>
                  )}
                </blockquote>
              );
            }

            if (block.type === "callout") {
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor:
                      theme.surfaceColor ?? theme.backgroundColor,
                    border: `2px solid ${theme.primaryColor}40`,
                    borderRadius: "12px",
                    padding: isVertical ? "24px" : "16px",
                  }}
                >
                  {block.data.title && (
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: `${baseFontSize}px`,
                        margin: 0,
                        marginBottom: "8px",
                        color: theme.primaryColor,
                      }}
                    >
                      {block.data.title}
                    </p>
                  )}
                  <p
                    style={{
                      fontSize: `${baseFontSize * 0.9}px`,
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {block.data.text}
                  </p>
                </div>
              );
            }

            if (block.type === "stat_result") {
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor:
                      theme.surfaceColor ?? theme.backgroundColor,
                    borderRadius: "12px",
                    padding: isVertical ? "24px" : "16px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: `${titleFontSize}px`,
                      fontWeight: 700,
                      color: theme.primaryColor,
                      margin: 0,
                    }}
                  >
                    {block.data.value}
                  </p>
                  <p
                    style={{
                      fontSize: `${baseFontSize * 0.85}px`,
                      opacity: 0.7,
                      margin: "4px 0 0",
                    }}
                  >
                    {block.data.label}
                  </p>
                  {block.data.interpretation && (
                    <p
                      style={{
                        fontSize: `${baseFontSize * 0.75}px`,
                        opacity: 0.5,
                        margin: "4px 0 0",
                        fontStyle: "italic",
                      }}
                    >
                      {block.data.interpretation}
                    </p>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>

      {/* Branding footer */}
      {showBranding && (
        <div
          style={{
            padding: isVertical ? "20px 48px" : "12px 40px",
            borderTop: `1px solid ${theme.borderColor ?? theme.textColor + "20"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: isVertical ? "20px" : "14px",
              opacity: 0.4,
              letterSpacing: "0.02em",
            }}
          >
            Created with ScholarSync
          </span>
        </div>
      )}
    </div>
  );
});
