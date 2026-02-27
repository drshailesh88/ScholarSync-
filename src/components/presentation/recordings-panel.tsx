"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  VideoCamera,
  Play,
  Trash,
  X,
  Clock,
  SpinnerGap,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Recording {
  id: string;
  storageUrl: string;
  durationMs: number | null;
  fileSizeBytes: number | null;
  slideMarkers: { slideIndex: number; timestampMs: number }[] | null;
  createdAt: string;
}

interface RecordingsPanelProps {
  deckId: number;
  open: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function RecordingsPanel({ deckId, open, onClose }: RecordingsPanelProps) {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch recordings
  const fetchRecordings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/recordings/upload?deckId=${deckId}`);
      if (res.ok) {
        const data = await res.json();
        setRecordings(data.recordings ?? []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  useEffect(() => {
    if (open) fetchRecordings();
  }, [open, fetchRecordings]);

  // Delete a recording
  const handleDelete = async (recordingId: string) => {
    if (!confirm("Delete this recording?")) return;
    setDeletingId(recordingId);
    try {
      await fetch(`/api/recordings/upload?id=${recordingId}`, {
        method: "DELETE",
      });
      setRecordings((r) => r.filter((rec) => rec.id !== recordingId));
      if (playingId === recordingId) setPlayingId(null);
    } catch {
      // ignore
    } finally {
      setDeletingId(null);
    }
  };

  const formatDuration = (ms: number | null): string => {
    if (!ms) return "--:--";
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const formatSize = (bytes: number | null): string => {
    if (!bytes) return "";
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full max-w-lg max-h-[80vh] bg-[#111118] rounded-2xl ring-1 ring-white/10 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <VideoCamera weight="bold" className="w-5 h-5 text-blue-400" />
                <h2 className="text-base font-semibold text-white">
                  Recordings
                </h2>
                <span className="text-xs text-white/40">
                  ({recordings.length})
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X weight="bold" className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <SpinnerGap
                    weight="bold"
                    className="w-6 h-6 text-white/30 animate-spin"
                  />
                </div>
              ) : recordings.length === 0 ? (
                <div className="text-center py-12">
                  <VideoCamera
                    weight="thin"
                    className="w-12 h-12 text-white/15 mx-auto mb-3"
                  />
                  <p className="text-sm text-white/40">
                    No recordings yet. Start presenting and click Record!
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recordings.map((rec) => (
                    <div key={rec.id}>
                      <div
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors",
                          playingId === rec.id
                            ? "bg-blue-500/10 ring-1 ring-blue-500/20"
                            : "hover:bg-white/5"
                        )}
                      >
                        {/* Play button */}
                        <button
                          onClick={() =>
                            setPlayingId(playingId === rec.id ? null : rec.id)
                          }
                          className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center shrink-0 hover:bg-white/10 transition-colors"
                        >
                          {playingId === rec.id ? (
                            <X weight="bold" className="w-3.5 h-3.5 text-white/70" />
                          ) : (
                            <Play
                              weight="fill"
                              className="w-3.5 h-3.5 text-white/70 ml-0.5"
                            />
                          )}
                        </button>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white/80 truncate">
                            {formatDate(rec.createdAt)}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                              <Clock weight="bold" className="w-3 h-3" />
                              {formatDuration(rec.durationMs)}
                            </span>
                            {rec.fileSizeBytes && (
                              <span>{formatSize(rec.fileSizeBytes)}</span>
                            )}
                          </div>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(rec.id)}
                          disabled={deletingId === rec.id}
                          className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40"
                        >
                          {deletingId === rec.id ? (
                            <SpinnerGap
                              weight="bold"
                              className="w-4 h-4 animate-spin"
                            />
                          ) : (
                            <Trash weight="bold" className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Inline video player */}
                      <AnimatePresence>
                        {playingId === rec.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 mb-1 mx-1 rounded-lg overflow-hidden bg-black">
                              <video
                                src={rec.storageUrl}
                                controls
                                autoPlay
                                playsInline
                                className="w-full aspect-video"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
