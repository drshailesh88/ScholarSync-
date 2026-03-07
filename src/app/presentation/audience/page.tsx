"use client";

import { useState, useEffect, useRef } from "react";
import { SlideRendererV2 as SlideRenderer } from "@/components/slides/shared/slide-renderer-v2";
import { PRESET_THEMES } from "@/types/presentation";
import type {
  ContentBlock,
  ThemeConfig,
  SlideLayout,
  SlideMaster,
} from "@/types/presentation";
import { cn } from "@/lib/utils";

/**
 * Audience view — receives slide data from the presenter window via BroadcastChannel.
 * Opens as a popup from the presenter controls.
 * Shows only the current slide with no presenter notes or controls.
 */

interface SlideData {
  title: string;
  subtitle: string;
  layout: SlideLayout;
  masterId?: string;
  contentBlocks: ContentBlock[];
}

type ScreenMode = "normal" | "black" | "white";

export default function AudienceViewPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [masters, setMasters] = useState<SlideMaster[]>([]);
  const [theme, setTheme] = useState<ThemeConfig>(PRESET_THEMES.modern);
  const [themeKey, setThemeKey] = useState("modern");
  const [screenMode, setScreenMode] = useState<ScreenMode>("normal");
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
      if (msg.type === "screen-mode") {
        setScreenMode(msg.mode ?? "normal");
      }
      if (msg.type === "init") {
        setSlides(msg.slides ?? []);
        setMasters(msg.masters ?? []);
        setTheme(msg.themeConfig ?? PRESET_THEMES.modern);
        setThemeKey(msg.themeKey ?? "modern");
        setScreenMode(msg.screenMode ?? "normal");
        setConnected(true);
      }
    };

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
      <div className="relative w-full h-full">
        <SlideRenderer
          layout={currentSlide.layout}
          masterId={currentSlide.masterId}
          masters={masters}
          title={currentSlide.title}
          subtitle={currentSlide.subtitle}
          contentBlocks={currentSlide.contentBlocks}
          themeKey={themeKey}
          themeConfig={theme}
          scale={1}
        />

        {screenMode !== "normal" && (
          <div
            className={cn(
              "absolute inset-0 z-20",
              screenMode === "black" ? "bg-black" : "bg-white"
            )}
          />
        )}
      </div>
    </div>
  );
}
