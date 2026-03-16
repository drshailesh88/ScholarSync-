"use client";

import Image from "next/image";
import { CircleNotch, Upload } from "@phosphor-icons/react";
import { memo, useMemo, useRef, useState } from "react";
import type { ImageData, ThemeConfig } from "@/types/presentation";
import { requestGeneratedSlideImage } from "@/lib/slides/image-generation-client";

interface ImageBlockProps {
  data: ImageData;
  theme: ThemeConfig;
  onDataChange?: (partial: Partial<ImageData>) => void;
  showFullImage?: boolean;
}

const IMAGE_ACCEPT = ".jpg,.jpeg,.png,.gif,.webp,.svg,image/jpeg,image/png,image/gif,image/webp,image/svg+xml";
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
]);

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export const ImageBlock = memo(function ImageBlock({ data, theme, onDataChange, showFullImage = false }: ImageBlockProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const clipPath = useMemo(() => {
    if (!data.crop || showFullImage) return undefined;
    const x = clampPercent(data.crop.x);
    const y = clampPercent(data.crop.y);
    const width = clampPercent(data.crop.width);
    const height = clampPercent(data.crop.height);
    const top = y;
    const right = clampPercent(100 - (x + width));
    const bottom = clampPercent(100 - (y + height));
    const left = x;
    return `inset(${top}% ${right}% ${bottom}% ${left}%)`;
  }, [data.crop, showFullImage]);

  const cssFilter = useMemo(() => {
    const f = data.filters;
    if (!f) return undefined;
    const parts: string[] = [];
    if (f.brightness != null && f.brightness !== 100) parts.push(`brightness(${f.brightness}%)`);
    if (f.contrast != null && f.contrast !== 100) parts.push(`contrast(${f.contrast}%)`);
    if (f.saturation != null && f.saturation !== 100) parts.push(`saturate(${f.saturation}%)`);
    if (f.blur != null && f.blur !== 0) parts.push(`blur(${f.blur}px)`);
    if (f.grayscale != null && f.grayscale !== 0) parts.push(`grayscale(${f.grayscale}%)`);
    if (f.sepia != null && f.sepia !== 0) parts.push(`sepia(${f.sepia}%)`);
    if (f.hueRotate != null && f.hueRotate !== 0) parts.push(`hue-rotate(${f.hueRotate}deg)`);
    if (f.opacity != null && f.opacity !== 100) parts.push(`opacity(${f.opacity}%)`);
    return parts.length > 0 ? parts.join(" ") : undefined;
  }, [data.filters]);

  const uploadFile = async (file: File) => {
    if (!onDataChange || !ALLOWED_IMAGE_TYPES.has(file.type)) return;
    setUploading(true);
    setGenerationError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/slides/upload-image", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const payload = (await response.json()) as { url?: string };
      if (!payload.url) throw new Error("Missing URL");
      onDataChange({ url: payload.url, crop: undefined });
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const generateImage = async () => {
    if (!onDataChange) return;
    const prompt = data.suggestion?.trim() || data.alt.trim();
    if (!prompt) return;

    setGenerating(true);
    setGenerationError(null);
    try {
      const payload = await requestGeneratedSlideImage({
        prompt,
        style: "illustration",
        aspectRatio: "16:9",
      });
      onDataChange({
        url: payload.imageUrl,
        attribution: payload.attribution,
        suggestion: prompt,
        crop: undefined,
      });
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : "Image generation failed");
    } finally {
      setGenerating(false);
    }
  };

  if (!data.url) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center rounded-[0.3em] border border-dashed p-[1em] text-center"
        style={{ backgroundColor: `${theme.primaryColor}08` }}
        role={onDataChange ? "button" : undefined}
        tabIndex={onDataChange ? 0 : undefined}
        onClick={() => {
          if (onDataChange) inputRef.current?.click();
        }}
        onKeyDown={(e) => {
          if (!onDataChange) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input aria-label="File upload"
          ref={inputRef}
          type="file"
          accept={IMAGE_ACCEPT}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void uploadFile(file);
          }}
        />
        <Upload size={24} className="mb-[0.3em] opacity-60" />
        <div className="text-[0.7em] opacity-60">
          {data.suggestion ?? data.alt ?? "Image placeholder"}
        </div>
        <div className="mt-[0.7em] flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            disabled={!onDataChange || uploading}
            className="rounded border border-border bg-surface-raised px-2 py-1 text-[0.65em] text-ink disabled:opacity-60"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          <button
            type="button"
            disabled={!onDataChange || generating || !(data.suggestion?.trim() || data.alt.trim())}
            className="inline-flex items-center gap-1 rounded border border-brand/30 bg-brand/10 px-2 py-1 text-[0.65em] text-brand disabled:opacity-60"
            onClick={(e) => {
              e.stopPropagation();
              void generateImage();
            }}
          >
            {generating ? <CircleNotch size={12} className="animate-spin" /> : null}
            {generating ? "Generating..." : "Generate Image"}
          </button>
        </div>
        {generationError && (
          <div className="mt-[0.5em] text-[0.6em] text-red-600">
            {generationError}
          </div>
        )}
      </div>
    );
  }

  return (
    <figure className="flex h-full w-full flex-col items-center gap-[0.3em]">
      <div className="relative w-full flex-1 min-h-0 rounded-[0.3em] overflow-hidden">
        <Image alt={data.alt}
          src={data.url}
          width={640}
          height={480}
          className="h-full w-full object-contain"
          style={{
            ...(clipPath ? { clipPath } : undefined),
            ...(cssFilter ? { filter: cssFilter } : undefined),
          }}
          unoptimized
        />
      </div>
      {data.caption && (
        <figcaption
          className="text-[0.55em] opacity-60 italic text-center"
          style={{ color: theme.textColor }}
        >
          {data.caption}
        </figcaption>
      )}
    </figure>
  );
});
