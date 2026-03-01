"use client";

import Image from "next/image";
import type { ThemeConfig } from "@/types/presentation";

interface ImageBlockProps {
  data: { url?: string; alt: string; caption?: string; suggestion?: string };
  theme: ThemeConfig;
}

export function ImageBlock({ data, theme }: ImageBlockProps) {
  if (!data.url) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-[0.3em] p-[1em] h-full"
        style={{ backgroundColor: `${theme.primaryColor}08` }}
      >
        <div className="text-[0.7em] opacity-50 text-center">
          {data.suggestion ?? data.alt ?? "Image placeholder"}
        </div>
      </div>
    );
  }

  return (
    <figure className="flex flex-col items-center gap-[0.3em]">
      <div className="rounded-[0.3em] overflow-hidden">
        <Image
          src={data.url}
          alt={data.alt}
          width={640}
          height={480}
          className="max-w-full max-h-full object-contain"
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
}
