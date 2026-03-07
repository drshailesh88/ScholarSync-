"use client";

import { PlayCircle, Pause, Play, Upload, SpeakerHigh } from "@phosphor-icons/react";
import { useRef, useState, useCallback, useEffect } from "react";
import type { MediaData, ThemeConfig } from "@/types/presentation";

interface MediaBlockProps {
  data: MediaData;
  theme: ThemeConfig;
  scale?: number;
  onDataChange?: (partial: Partial<MediaData>) => void;
  isPresenterMode?: boolean;
  isSlideVisible?: boolean;
}

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|ogv)$/i;
const AUDIO_EXTENSIONS = /\.(mp3|wav|ogg|oga|aac|flac|m4a)$/i;

export function detectMediaType(url: string): "video" | "audio" | "video_embed" | null {
  try {
    const u = new URL(url, "https://placeholder.test");
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "youtu.be") return "video_embed";
    if (host === "vimeo.com") return "video_embed";

    const pathname = u.pathname;
    if (VIDEO_EXTENSIONS.test(pathname)) return "video";
    if (AUDIO_EXTENSIONS.test(pathname)) return "audio";
  } catch {
    // invalid URL
  }
  return null;
}

function toYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    let videoId: string | null = null;
    if (host === "youtu.be") {
      videoId = u.pathname.slice(1).split("/")[0] || null;
    } else if (host === "youtube.com") {
      videoId = u.searchParams.get("v");
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

function toVimeoEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const match = u.pathname.match(/^\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : null;
  } catch {
    return null;
  }
}

function isYouTubeUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host === "youtube.com" || host === "youtu.be";
  } catch {
    return false;
  }
}

function isVimeoUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host === "vimeo.com";
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Format helpers
// ---------------------------------------------------------------------------

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Audio Player sub-component
// ---------------------------------------------------------------------------

function AudioPlayer({
  url,
  title,
  autoplay,
  loop,
  muted,
  startTime,
  endTime,
  theme,
  isPresenterMode,
  isSlideVisible,
}: {
  url: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  startTime?: number;
  endTime?: number;
  theme: ThemeConfig;
  isPresenterMode?: boolean;
  isSlideVisible?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  }, []);

  // Presenter mode: auto-play/pause based on slide visibility
  useEffect(() => {
    if (!isPresenterMode) return;
    const el = audioRef.current;
    if (!el) return;
    if (isSlideVisible && autoplay) {
      void el.play();
    } else if (!isSlideVisible) {
      el.pause();
    }
  }, [isPresenterMode, isSlideVisible, autoplay]);

  // Enforce endTime
  useEffect(() => {
    if (endTime == null) return;
    const el = audioRef.current;
    if (!el) return;
    const handler = () => {
      if (el.currentTime >= endTime) {
        if (loop) {
          el.currentTime = startTime ?? 0;
        } else {
          el.pause();
        }
      }
    };
    el.addEventListener("timeupdate", handler);
    return () => el.removeEventListener("timeupdate", handler);
  }, [endTime, loop, startTime]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="flex flex-col gap-[0.4em] rounded-[0.4em] p-[0.8em]"
      style={{
        backgroundColor: theme.surfaceColor ?? theme.backgroundColor,
        border: `1px solid ${theme.borderColor ?? theme.primaryColor + "20"}`,
      }}
    >
      <audio
        ref={audioRef}
        src={url}
        loop={loop}
        muted={muted}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const el = e.currentTarget;
          setDuration(el.duration);
          if (startTime) el.currentTime = startTime;
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {title && (
        <div
          className="text-[0.75em] font-medium truncate"
          style={{ color: theme.textColor }}
        >
          {title}
        </div>
      )}

      <div className="flex items-center gap-[0.5em]">
        <button
          type="button"
          onClick={togglePlay}
          className="shrink-0 flex items-center justify-center rounded-full"
          style={{
            width: "2em",
            height: "2em",
            backgroundColor: theme.primaryColor,
            color: "#fff",
          }}
        >
          {playing ? <Pause size="1em" weight="fill" /> : <Play size="1em" weight="fill" />}
        </button>

        {/* Progress bar */}
        <div className="flex-1 flex flex-col gap-[0.15em]">
          <div
            className="relative h-[0.35em] rounded-full overflow-hidden cursor-pointer"
            style={{ backgroundColor: theme.borderColor ?? "#e5e7eb" }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              const el = audioRef.current;
              if (el && duration > 0) {
                el.currentTime = pct * duration;
              }
            }}
          >
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-[width] duration-150"
              style={{
                width: `${progress}%`,
                backgroundColor: theme.primaryColor,
              }}
            />
          </div>
          <div className="flex justify-between text-[0.55em]" style={{ color: theme.textColor + "80" }}>
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
          </div>
        </div>

        <SpeakerHigh size="1em" style={{ color: theme.textColor + "60" }} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main MediaBlock component
// ---------------------------------------------------------------------------

const MEDIA_ACCEPT = "video/*,audio/*";

export function MediaBlock({
  data,
  theme,
  scale = 1,
  onDataChange,
  isPresenterMode,
  isSlideVisible,
}: MediaBlockProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [uploading, setUploading] = useState(false);

  // Presenter mode: auto-play/pause video based on slide visibility
  useEffect(() => {
    if (!isPresenterMode || data.mediaType !== "video") return;
    const el = videoRef.current;
    if (!el) return;
    if (isSlideVisible && data.autoplay) {
      void el.play();
    } else if (!isSlideVisible) {
      el.pause();
    }
  }, [isPresenterMode, isSlideVisible, data.autoplay, data.mediaType]);

  const uploadFile = async (file: File) => {
    if (!onDataChange) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/slides/upload-media", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const payload = (await response.json()) as { url?: string; mimeType?: string };
      if (!payload.url) throw new Error("Missing URL");
      const isAudio = file.type.startsWith("audio/");
      onDataChange({
        url: payload.url,
        mimeType: payload.mimeType ?? file.type,
        mediaType: isAudio ? "audio" : "video",
        source: "upload",
      });
    } catch (error) {
      console.error("Media upload failed:", error);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  // No URL → placeholder / upload area
  if (!data.url || data.url.trim() === "") {
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
        data-testid="media-placeholder"
      >
        <input
          ref={inputRef}
          type="file"
          accept={MEDIA_ACCEPT}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void uploadFile(file);
          }}
        />
        <PlayCircle size={Math.round(28 * scale)} weight="duotone" className="mb-[0.3em] opacity-60" />
        <div className="text-[0.7em] opacity-60">
          {data.title ?? "No media added"}
        </div>
        <button
          type="button"
          disabled={!onDataChange || uploading}
          className="mt-[0.7em] rounded border border-border bg-surface-raised px-2 py-1 text-[0.65em] text-ink disabled:opacity-60"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          <Upload size={12} className="inline mr-1" />
          {uploading ? "Uploading..." : "Upload Media"}
        </button>
      </div>
    );
  }

  const url = data.url;

  // YouTube embed
  if (isYouTubeUrl(url)) {
    const embedUrl = toYouTubeEmbedUrl(url);
    if (embedUrl) {
      return (
        <div className="w-full" data-testid="media-youtube">
          {data.title && (
            <p className="mb-[0.3em] text-[0.75em] font-medium" style={{ color: theme.textColor }}>
              {data.title}
            </p>
          )}
          <div className="w-full aspect-video overflow-hidden rounded-[0.3em]" style={{ border: `1px solid ${theme.borderColor ?? theme.primaryColor + "20"}` }}>
            <iframe
              src={embedUrl}
              title={data.title ?? "YouTube video"}
              className="h-full w-full"
              sandbox="allow-scripts allow-same-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      );
    }
  }

  // Vimeo embed
  if (isVimeoUrl(url)) {
    const embedUrl = toVimeoEmbedUrl(url);
    if (embedUrl) {
      return (
        <div className="w-full" data-testid="media-vimeo">
          {data.title && (
            <p className="mb-[0.3em] text-[0.75em] font-medium" style={{ color: theme.textColor }}>
              {data.title}
            </p>
          )}
          <div className="w-full aspect-video overflow-hidden rounded-[0.3em]" style={{ border: `1px solid ${theme.borderColor ?? theme.primaryColor + "20"}` }}>
            <iframe
              src={embedUrl}
              title={data.title ?? "Vimeo video"}
              className="h-full w-full"
              sandbox="allow-scripts allow-same-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      );
    }
  }

  // Audio
  if (data.mediaType === "audio") {
    return (
      <AudioPlayer
        url={url}
        title={data.title}
        autoplay={data.autoplay}
        loop={data.loop}
        muted={data.muted}
        startTime={data.startTime}
        endTime={data.endTime}
        theme={theme}
        isPresenterMode={isPresenterMode}
        isSlideVisible={isSlideVisible}
      />
    );
  }

  // Video (direct file)
  return (
    <div className="w-full" data-testid="media-video">
      {data.title && (
        <p className="mb-[0.3em] text-[0.75em] font-medium" style={{ color: theme.textColor }}>
          {data.title}
        </p>
      )}
      <video
        ref={videoRef}
        src={url}
        controls
        poster={data.posterUrl}
        autoPlay={data.autoplay}
        loop={data.loop}
        muted={data.muted}
        className="w-full rounded-[0.3em]"
        style={{ border: `1px solid ${theme.borderColor ?? theme.primaryColor + "20"}` }}
        onLoadedMetadata={(e) => {
          if (data.startTime) e.currentTarget.currentTime = data.startTime;
        }}
      />
    </div>
  );
}
