"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Record,
  Pause,
  Play,
  Stop,
  Microphone,
  MicrophoneSlash,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RecordingControlsProps {
  elapsedMs: number;
  isPaused: boolean;
  isMuted: boolean;
  webcamStream: MediaStream | null;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onToggleMute: () => void;
}

// ---------------------------------------------------------------------------
// Webcam Preview (circular)
// ---------------------------------------------------------------------------

function WebcamPreview({ stream }: { stream: MediaStream }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 shrink-0">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function RecordingControls({
  elapsedMs,
  isPaused,
  isMuted,
  webcamStream,
  onPause,
  onResume,
  onStop,
  onToggleMute,
}: RecordingControlsProps) {
  // Pulsing dot animation state
  const [dotVisible, setDotVisible] = useState(true);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => setDotVisible((v) => !v), 500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (ms: number): string => {
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[10001]"
      >
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-red-500/30">
          {/* Recording indicator */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-opacity",
                isPaused ? "bg-yellow-400" : "bg-red-500",
                !isPaused && !dotVisible && "opacity-0"
              )}
            />
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
              {isPaused ? "Paused" : "REC"}
            </span>
          </div>

          {/* Timer */}
          <span className="text-sm font-mono text-white/90 tabular-nums min-w-[50px]">
            {formatTime(elapsedMs)}
          </span>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10" />

          {/* Pause / Resume */}
          <button
            onClick={isPaused ? onResume : onPause}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? (
              <Play weight="bold" className="w-4 h-4" />
            ) : (
              <Pause weight="bold" className="w-4 h-4" />
            )}
          </button>

          {/* Mute toggle */}
          <button
            onClick={onToggleMute}
            className={cn(
              "p-2 rounded-xl transition-colors",
              isMuted
                ? "text-red-400 bg-red-400/15 hover:bg-red-400/20"
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <MicrophoneSlash weight="bold" className="w-4 h-4" />
            ) : (
              <Microphone weight="bold" className="w-4 h-4" />
            )}
          </button>

          {/* Webcam preview */}
          {webcamStream && <WebcamPreview stream={webcamStream} />}

          {/* Divider */}
          <div className="w-px h-5 bg-white/10" />

          {/* Stop */}
          <button
            onClick={onStop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-colors"
            title="Stop Recording"
          >
            <Stop weight="fill" className="w-4 h-4" />
            <span className="text-xs font-semibold">Stop</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
