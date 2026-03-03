"use client";

import { useState, useEffect, useRef } from "react";
import { SlideRendererV2 as SlideRenderer } from "@/components/slides/shared/slide-renderer-v2";
import { PRESET_THEMES } from "@/types/presentation";
import type { ContentBlock, ThemeConfig, SlideLayout } from "@/types/presentation";

/**
 * Audience view — receives slide data from the presenter window via BroadcastChannel.
 * Opens as a popup from the presenter controls (Monitor icon / "D" key).
 * Shows only the current slide with no controls.
 */

interface SlideData {
  title: string;
  subtitle: string;
  layout: SlideLayout;
  contentBlocks: ContentBlock[];
}

export default function AudienceViewPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [theme, setTheme] = useState<ThemeConfig>(PRESET_THEMES.modern);
  const [themeKey, setThemeKey] = useState("modern");
  const [connected, setConnected] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel("presenter-slide-sync");
    channelRef.current = channel;

    channel.onmessage = (e) => {
      const msg = e.data;
      if (msg.type === "slide") {
        setSlideIndex(msg.index ?? 0);
      }
      if (msg.type === "init") {
        setSlides(msg.slides ?? []);
        setTheme(msg.themeConfig ?? PRESET_THEMES.modern);
        setThemeKey(msg.themeKey ?? "modern");
        setConnected(true);
      }
    };

    // Request initial data from presenter
    channel.postMessage({ type: "audience-ready" });

    return () => channel.close();
  }, []);

  const currentSlide = slides[slideIndex];

  if (!connected || !currentSlide) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="text-center text-white/60">
          <p className="text-lg font-medium mb-2">Audience View</p>
          <p className="text-sm">Waiting for presenter connection...</p>
          <div className="w-6 h-6 border-2 border-white/30 border-t-white/80 rounded-full animate-spin mx-auto mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="w-full h-full">
        <SlideRenderer
          layout={currentSlide.layout}
          title={currentSlide.title}
          subtitle={currentSlide.subtitle}
          contentBlocks={currentSlide.contentBlocks}
          themeKey={themeKey}
          themeConfig={theme}
          scale={1}
        />
      </div>
    </div>
  );
}
