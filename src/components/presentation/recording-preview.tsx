"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  FloppyDisk,
  Trash,
  ArrowCounterClockwise,
  SpinnerGap,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { SlideMarker } from "@/lib/recording/presentation-recorder";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RecordingPreviewProps {
  blob: Blob;
  durationMs: number;
  slideMarkers: SlideMarker[];
  deckId: number;
  onSaved: () => void;
  onDiscard: () => void;
  onReRecord: () => void;
}

type UploadState = "idle" | "uploading" | "success" | "error";

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function RecordingPreview({
  blob,
  durationMs,
  slideMarkers,
  deckId,
  onSaved,
  onDiscard,
  onReRecord,
}: RecordingPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  // Create object URL
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [blob]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Play / pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Listen for video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => setIsPlaying(false);
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, []);

  // Upload handler
  const handleSave = async () => {
    setUploadState("uploading");
    setUploadProgress(0);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("video", blob, "recording.webm");
      formData.append("deckId", String(deckId));
      formData.append("durationMs", String(durationMs));
      formData.append("slideMarkers", JSON.stringify(slideMarkers));

      const xhr = new XMLHttpRequest();

      await new Promise<void>((resolve, reject) => {
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            setUploadProgress(Math.round((e.loaded / e.total) * 100));
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(xhr.responseText || "Upload failed"));
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Network error")));

        xhr.open("POST", "/api/recordings/upload");
        xhr.send(formData);
      });

      setUploadState("success");
      setTimeout(() => onSaved(), 1500);
    } catch (err) {
      setUploadState("error");
      setErrorMsg(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const formatDuration = (ms: number): string => {
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const fileSizeMB = (blob.size / (1024 * 1024)).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full max-w-2xl bg-[#111118] rounded-2xl ring-1 ring-white/10 shadow-2xl overflow-hidden"
      >
        {/* Video player */}
        <div className="relative bg-black aspect-video">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            playsInline
          />

          {/* Play overlay */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors"
                >
                  <Play weight="fill" className="w-7 h-7 text-white ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Info + Actions */}
        <div className="p-5 space-y-4">
          {/* Recording info */}
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>Duration: {formatDuration(durationMs)}</span>
            <span>Size: {fileSizeMB} MB</span>
            <span>Slides visited: {slideMarkers.length}</span>
          </div>

          {/* Upload progress */}
          {uploadState === "uploading" && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <SpinnerGap
                  weight="bold"
                  className="w-4 h-4 text-blue-400 animate-spin"
                />
                <span className="text-sm text-white/70">
                  Uploading... {uploadProgress}%
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {uploadState === "success" && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <CheckCircle weight="fill" className="w-4 h-4" />
              Recording saved successfully!
            </div>
          )}

          {uploadState === "error" && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <WarningCircle weight="fill" className="w-4 h-4" />
              {errorMsg || "Upload failed. Please try again."}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={uploadState === "uploading" || uploadState === "success"}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors",
                uploadState === "success"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20",
                (uploadState === "uploading" || uploadState === "success") &&
                  "opacity-60 pointer-events-none"
              )}
            >
              <FloppyDisk weight="bold" className="w-4 h-4" />
              {uploadState === "success" ? "Saved" : "Save Recording"}
            </button>

            <button
              onClick={onReRecord}
              disabled={uploadState === "uploading"}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
            >
              <ArrowCounterClockwise weight="bold" className="w-4 h-4" />
              Re-record
            </button>

            <button
              onClick={onDiscard}
              disabled={uploadState === "uploading"}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40"
            >
              <Trash weight="bold" className="w-4 h-4" />
              Discard
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
