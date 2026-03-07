"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowsClockwise,
  CircleNotch,
  DownloadSimple,
  Headphones,
  Pause,
  Play,
  Warning,
  X,
} from "@phosphor-icons/react";

type AudioState = "idle" | "generating" | "ready" | "playing" | "paused" | "error";
type NotebookAudioMode = "research" | "learn";
type AudioLength = "brief" | "default" | "detailed";

interface AudioOverviewPanelProps {
  conversationId: number | null;
  paperIds: number[];
  mode?: NotebookAudioMode;
  onClose: () => void;
}

interface AudioOverviewResponse {
  audioUrl: string;
  script: string;
  durationSeconds: number;
  cached: boolean;
}

const SPEED_OPTIONS = [1, 1.25, 1.5, 2] as const;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

export function AudioOverviewPanel({
  conversationId,
  paperIds,
  mode = "research",
  onClose,
}: AudioOverviewPanelProps): React.ReactElement {
  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [script, setScript] = useState<string | null>(null);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isCachedResult, setIsCachedResult] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [audioLength, setAudioLength] = useState<AudioLength>("default");
  const [showOptions, setShowOptions] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const paperIdsKey = useMemo(
    () => [...new Set(paperIds)].sort((a, b) => a - b).join(","),
    [paperIds]
  );

  const normalizedPaperIds = useMemo(() => {
    if (!paperIdsKey) return [];
    return paperIdsKey
      .split(",")
      .map((id) => Number.parseInt(id, 10))
      .filter((id) => Number.isInteger(id) && id > 0);
  }, [paperIdsKey]);

  const handleGenerate = useCallback(async () => {
    if (!conversationId || normalizedPaperIds.length === 0) {
      setAudioState("error");
      setErrorMessage("Select papers and start a notebook conversation first.");
      return;
    }

    setAudioState("generating");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/audio-overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          paperIds: normalizedPaperIds,
          mode,
          ...(customPrompt.trim() ? { customPrompt: customPrompt.trim() } : {}),
          ...(audioLength !== "default" ? { length: audioLength } : {}),
        }),
      });

      const data = (await res.json()) as Partial<AudioOverviewResponse> & {
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      if (!data.audioUrl || !data.script || typeof data.durationSeconds !== "number") {
        throw new Error("Invalid audio overview response");
      }

      setAudioUrl(data.audioUrl);
      setScript(data.script);
      setDurationSeconds(data.durationSeconds);
      setCurrentTime(0);
      setShowTranscript(false);
      setIsCachedResult(Boolean(data.cached));
      setAudioState("ready");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to generate audio overview"
      );
      setAudioState("error");
    }
  }, [conversationId, mode, normalizedPaperIds, customPrompt, audioLength]);

  useEffect(() => {
    setAudioState("idle");
    setAudioUrl(null);
    setScript(null);
    setDurationSeconds(0);
    setCurrentTime(0);
    setShowTranscript(false);
    setErrorMessage(null);
    setIsCachedResult(false);
  }, [conversationId, paperIdsKey, mode, customPrompt, audioLength]);

  // Auto-generate on first mount only (not on option changes)
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!conversationId || normalizedPaperIds.length === 0) {
      setAudioState("error");
      setErrorMessage("Select at least one paper to generate an audio overview.");
      return;
    }

    if (!hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      void handleGenerate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, normalizedPaperIds.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => {
      setAudioState("ready");
      setCurrentTime(0);
      audio.currentTime = 0;
    };
    const onLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDurationSeconds(audio.duration);
      }
    };
    const onPause = () => {
      setAudioState((prev) => (prev === "playing" ? "paused" : prev));
    };
    const onPlay = () => setAudioState("playing");
    const onError = () => {
      setErrorMessage("Unable to play generated audio.");
      setAudioState("error");
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("error", onError);
    };
  }, [audioUrl]);

  const togglePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setAudioState("playing");
      } catch {
        setAudioState("error");
        setErrorMessage("Playback failed. Please try again.");
      }
      return;
    }

    audio.pause();
    setAudioState("paused");
  }, []);

  const handleSeek = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(event.target.value);
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time)) return;

    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const cycleSpeed = useCallback(() => {
    const nextIndex = (speedIndex + 1) % SPEED_OPTIONS.length;
    setSpeedIndex(nextIndex);

    if (audioRef.current) {
      audioRef.current.playbackRate = SPEED_OPTIONS[nextIndex];
    }
  }, [speedIndex]);

  const handleDownload = useCallback(() => {
    if (!audioUrl) return;

    const anchor = document.createElement("a");
    anchor.href = audioUrl;
    anchor.download = "audio-overview.mp3";
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }, [audioUrl]);

  const handleRetry = useCallback(() => {
    void handleGenerate();
  }, [handleGenerate]);

  const handleClose = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    onClose();
  }, [onClose]);

  // Escape key to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  const canControlAudio =
    audioState === "ready" || audioState === "playing" || audioState === "paused";

  return (
    <div className="border-t border-border bg-surface/95 backdrop-blur-md rounded-xl">
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="auto" />}

      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Headphones size={14} className="text-brand" />
            <span className="text-xs font-medium text-ink">Audio Overview</span>
            {audioState === "generating" && (
              <span className="text-[10px] text-ink-muted flex items-center gap-1">
                <CircleNotch size={10} className="animate-spin" />
                Generating...
              </span>
            )}
            {isCachedResult && canControlAudio && (
              <span className="text-[10px] text-green-500">Cached</span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-ink-muted hover:text-ink transition-colors"
            title="Close audio overview"
          >
            <X size={14} />
          </button>
        </div>

        {audioState === "error" && (
          <div className="flex items-center gap-2 py-2">
            <Warning size={14} className="text-red-400 shrink-0" />
            <p className="text-xs text-red-400 flex-1">{errorMessage}</p>
            <button
              onClick={handleRetry}
              className="text-xs text-brand hover:text-brand-hover font-medium flex items-center gap-1"
            >
              <ArrowsClockwise size={12} />
              Retry
            </button>
          </div>
        )}

        {canControlAudio && (
          <>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => void togglePlayPause()}
                className="p-2 rounded-full bg-brand text-white hover:bg-brand-hover transition-colors shrink-0"
                title={audioState === "playing" ? "Pause" : "Play"}
              >
                {audioState === "playing" ? (
                  <Pause size={16} weight="fill" />
                ) : (
                  <Play size={16} weight="fill" />
                )}
              </button>

              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] text-ink-muted tabular-nums w-8 text-right">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={Math.max(durationSeconds, 0)}
                  step={0.1}
                  value={Math.min(currentTime, durationSeconds)}
                  onChange={handleSeek}
                  className="flex-1 h-1 accent-brand cursor-pointer"
                />
                <span className="text-[10px] text-ink-muted tabular-nums w-8">
                  {formatTime(durationSeconds)}
                </span>
              </div>

              <button
                onClick={cycleSpeed}
                className="px-2 py-0.5 rounded text-[10px] font-medium text-ink-muted hover:text-ink bg-surface-raised transition-colors"
                title="Playback speed"
              >
                {SPEED_OPTIONS[speedIndex]}x
              </button>

              <button
                onClick={handleDownload}
                className="p-1.5 text-ink-muted hover:text-ink transition-colors"
                title="Download audio"
              >
                <DownloadSimple size={14} />
              </button>
            </div>

            <button
              onClick={() => setShowTranscript((value) => !value)}
              className="text-[10px] text-ink-muted hover:text-brand transition-colors"
            >
              {showTranscript ? "Hide transcript" : "Show transcript"}
            </button>

            {showTranscript && script && (
              <div className="mt-2 max-h-32 overflow-y-auto rounded-lg bg-surface-raised/50 p-3">
                <p className="text-xs text-ink leading-relaxed whitespace-pre-wrap">
                  {script}
                </p>
              </div>
            )}
          </>
        )}

        {/* Options — shown before generating or when toggled */}
        {(audioState === "idle" || showOptions) && (
          <div className="space-y-3 py-2">
            {/* Length selector */}
            <div>
              <label className="text-[10px] font-medium text-ink-muted block mb-1">Length</label>
              <div className="flex gap-1.5">
                {(["brief", "default", "detailed"] as const).map((len) => (
                  <button
                    key={len}
                    onClick={() => setAudioLength(len)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                      audioLength === len
                        ? "bg-brand text-white"
                        : "bg-surface-raised text-ink-muted hover:text-ink"
                    }`}
                  >
                    {len === "brief" ? "Brief (~1 min)" : len === "default" ? "Standard (~3 min)" : "Detailed (~5 min)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom focus prompt */}
            <div>
              <label className="text-[10px] font-medium text-ink-muted block mb-1">
                Focus on (optional)
              </label>
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., primary endpoint results, methodology comparison..."
                className="w-full px-3 py-1.5 bg-surface-raised border border-border-subtle rounded-lg text-xs text-ink placeholder-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/50"
                maxLength={500}
              />
            </div>

            {/* Generate / Regenerate button */}
            {audioState !== "idle" && (
              <button
                onClick={() => { setShowOptions(false); void handleGenerate(); }}
                className="w-full py-1.5 bg-brand hover:bg-brand-hover text-white text-xs font-medium rounded-lg transition-colors"
              >
                Regenerate with new settings
              </button>
            )}
          </div>
        )}

        {/* Options toggle — when audio is ready */}
        {canControlAudio && !showOptions && (
          <button
            onClick={() => setShowOptions(true)}
            className="text-[10px] text-ink-muted hover:text-brand transition-colors mr-3"
          >
            Options
          </button>
        )}

        {audioState === "generating" && (
          <div className="flex items-center justify-center py-4 gap-3">
            <CircleNotch size={20} className="animate-spin text-brand" />
            <div>
              <p className="text-xs text-ink">Creating your audio summary...</p>
              <p className="text-[10px] text-ink-muted">
                Writing script, then synthesizing speech. This usually takes 10-30 seconds.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
