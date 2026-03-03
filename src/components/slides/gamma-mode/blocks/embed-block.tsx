"use client";

import { Globe, LinkBreak } from "@phosphor-icons/react";
import type { EmbedData, ThemeConfig } from "@/types/presentation";

interface EmbedBlockProps {
  data: EmbedData;
  theme: ThemeConfig;
  scale?: number;
}

// ---------------------------------------------------------------------------
// URL detection helpers
// ---------------------------------------------------------------------------

type DetectedEmbedType = NonNullable<EmbedData["embedType"]>;

function detectEmbedType(url: string): DetectedEmbedType {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "youtu.be") return "youtube";
    if (host === "vimeo.com") return "vimeo";
    if (host.endsWith("figma.com")) return "figma";
    if (host === "docs.google.com") {
      if (u.pathname.startsWith("/spreadsheets")) return "google_sheets";
      return "google_docs";
    }
    if (host === "twitter.com" || host === "x.com") return "twitter";
  } catch {
    // invalid URL — fall through
  }
  return "generic";
}

function toEmbedUrl(url: string, embedType: DetectedEmbedType): string | null {
  try {
    const u = new URL(url);

    switch (embedType) {
      case "youtube": {
        // youtube.com/watch?v=ID  or  youtu.be/ID
        let videoId: string | null = null;
        if (u.hostname.replace(/^www\./, "") === "youtu.be") {
          videoId = u.pathname.slice(1).split("/")[0] || null;
        } else {
          videoId = u.searchParams.get("v");
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      case "vimeo": {
        const match = u.pathname.match(/^\/(\d+)/);
        return match ? `https://player.vimeo.com/video/${match[1]}` : null;
      }

      case "figma":
        return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;

      case "google_sheets":
      case "google_docs": {
        // If already an embed / pub URL, use as-is
        if (u.pathname.includes("/pub") || u.pathname.includes("/embed")) return url;
        // Try converting edit URL to pub URL
        return url.replace(/\/edit.*$/, "/pub?embedded=true");
      }

      case "twitter":
        // No oembed — return null so we render a link instead
        return null;

      case "generic":
      default:
        return url;
    }
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Aspect ratio class helper
// ---------------------------------------------------------------------------

function aspectClass(ratio: EmbedData["aspectRatio"]): string {
  switch (ratio) {
    case "4:3":
      return "aspect-[4/3]";
    case "1:1":
      return "aspect-square";
    case "16:9":
    default:
      return "aspect-video";
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EmbedBlock({ data, theme, scale = 1 }: EmbedBlockProps) {
  const { url, title, aspectRatio } = data;

  // Empty URL → placeholder
  if (!url || url.trim() === "") {
    return (
      <div
        className="flex flex-col items-center justify-center gap-[0.4em] rounded-[0.3em] border border-dashed p-[1.2em] text-[0.7em]"
        style={{
          borderColor: theme.borderColor ?? theme.primaryColor + "33",
          color: theme.textColor + "80",
        }}
      >
        <Globe size={Math.round(24 * scale)} weight="duotone" />
        <span>No embed URL provided</span>
      </div>
    );
  }

  const embedType = data.embedType ?? detectEmbedType(url);
  const embedUrl = toEmbedUrl(url, embedType);

  // Twitter / X — render as a styled link (no iframe oembed)
  if (embedType === "twitter" || embedUrl === null) {
    return (
      <div className="text-[0.7em]">
        {title && (
          <p
            className="mb-[0.3em] text-[0.85em] font-medium"
            style={{ color: theme.textColor }}
          >
            {title}
          </p>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[0.3em] rounded-[0.3em] border px-[0.6em] py-[0.4em] transition-colors hover:opacity-80"
          style={{
            borderColor: theme.borderColor ?? theme.primaryColor + "33",
            color: theme.primaryColor,
            backgroundColor: theme.surfaceColor ?? theme.backgroundColor,
          }}
        >
          <LinkBreak size={Math.round(14 * scale)} weight="bold" />
          <span className="truncate max-w-[20em]">{url}</span>
        </a>
      </div>
    );
  }

  return (
    <div className="text-[0.7em]">
      {title && (
        <p
          className="mb-[0.3em] text-[0.85em] font-medium"
          style={{ color: theme.textColor }}
        >
          {title}
        </p>
      )}
      <div
        className={`w-full overflow-hidden rounded-[0.3em] border ${aspectClass(aspectRatio)}`}
        style={{
          borderColor: theme.borderColor ?? theme.primaryColor + "20",
        }}
      >
        <iframe
          src={embedUrl}
          title={title ?? "Embedded content"}
          className="h-full w-full"
          sandbox="allow-scripts allow-same-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
