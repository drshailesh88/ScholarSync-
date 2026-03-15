// Empty state: renders nothing when data.length === 0
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Microphone,
  VideoCamera,
  X,
  Record,
  CornersOut,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { RecordingOptions } from "@/lib/recording/presentation-recorder";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RecordingSetupModalProps {
  open: boolean;
  onClose: () => void;
  onStart: (options: RecordingOptions) => void;
}

interface DeviceInfo {
  deviceId: string;
  label: string;
}

const POSITION_OPTIONS: {
  value: RecordingOptions["webcamPosition"];
  label: string;
}[] = [
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
];

const SIZE_OPTIONS: { value: RecordingOptions["webcamSize"]; label: string }[] =
  [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

// ---------------------------------------------------------------------------
// Audio Level Meter
// ---------------------------------------------------------------------------

function AudioLevelMeter({ stream }: { stream: MediaStream | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!stream || !canvasRef.current) return;

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      // Average level
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      const avg = sum / dataArray.length;
      const level = avg / 255;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw bars
      const barCount = 20;
      const barWidth = (canvas.width - (barCount - 1) * 2) / barCount;
      const filledBars = Math.round(level * barCount);

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + 2);
        const isFilled = i < filledBars;

        ctx.fillStyle = isFilled
          ? i < barCount * 0.6
            ? "#22c55e"
            : i < barCount * 0.8
              ? "#eab308"
              : "#ef4444"
          : "rgba(255, 255, 255, 0.1)";
        ctx.fillRect(x, 0, barWidth, canvas.height);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      audioCtx.close();
    };
  }, [stream]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={12}
      className="w-full h-3 rounded"
    />
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function RecordingSetupModal({
  open,
  onClose,
  onStart,
}: RecordingSetupModalProps) {
  // Device enumeration
  const [audioDevices, setAudioDevices] = useState<DeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<DeviceInfo[]>([]);

  // Options state
  const [includeAudio, setIncludeAudio] = useState(true);
  const [includeWebcam, setIncludeWebcam] = useState(false);
  const [audioDeviceId, setAudioDeviceId] = useState<string>("");
  const [videoDeviceId, setVideoDeviceId] = useState<string>("");
  const [webcamPosition, setWebcamPosition] =
    useState<RecordingOptions["webcamPosition"]>("bottom-right");
  const [webcamSize, setWebcamSize] =
    useState<RecordingOptions["webcamSize"]>("medium");

  // Preview streams
  const [previewAudioStream, setPreviewAudioStream] =
    useState<MediaStream | null>(null);

  // Enumerate devices
  const enumerateDevices = useCallback(async () => {
    try {
      // Request temporary permission to get labeled devices
      const tempStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      tempStream.getTracks().forEach((t) => t.stop());

      const devices = await navigator.mediaDevices.enumerateDevices();
      const audio = devices
        .filter((d) => d.kind === "audioinput" && d.deviceId)
        .map((d) => ({
          deviceId: d.deviceId,
          label: d.label || `Microphone ${d.deviceId.slice(0, 8)}`,
        }));
      const video = devices
        .filter((d) => d.kind === "videoinput" && d.deviceId)
        .map((d) => ({
          deviceId: d.deviceId,
          label: d.label || `Camera ${d.deviceId.slice(0, 8)}`,
        }));

      setAudioDevices(audio);
      setVideoDevices(video);

      if (audio.length > 0 && !audioDeviceId) setAudioDeviceId(audio[0].deviceId);
      if (video.length > 0 && !videoDeviceId) setVideoDeviceId(video[0].deviceId);
    } catch {
      // User denied permission or no devices
    }
  }, [audioDeviceId, videoDeviceId]);

  // Start audio preview for level meter
  useEffect(() => {
    if (!open || !includeAudio) {
      previewAudioStream?.getTracks().forEach((t) => t.stop());
      setPreviewAudioStream(null);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: audioDeviceId
            ? { deviceId: { exact: audioDeviceId } }
            : true,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        setPreviewAudioStream(stream);
      } catch {
        // ignore
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, includeAudio, audioDeviceId]);

  // Cleanup on close
  useEffect(() => {
    if (!open) {
      previewAudioStream?.getTracks().forEach((t) => t.stop());
      setPreviewAudioStream(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Enumerate on open
  useEffect(() => {
    if (open) enumerateDevices();
  }, [open, enumerateDevices]);

  const handleStart = () => {
    // Stop preview streams before starting real recording
    previewAudioStream?.getTracks().forEach((t) => t.stop());
    setPreviewAudioStream(null);

    onStart({
      includeAudio,
      includeWebcam,
      webcamPosition,
      webcamSize,
      audioDeviceId: audioDeviceId || undefined,
      videoDeviceId: videoDeviceId || undefined,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full max-w-md bg-[#111118] rounded-2xl ring-1 ring-white/10 shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">
                Recording Setup
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X weight="bold" className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Microphone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input aria-label="Checkbox"
                    type="checkbox"
                    checked={includeAudio}
                    onChange={(e) => setIncludeAudio(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/30"
                  />
                  <Microphone weight="bold" className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white/90">
                    Microphone
                  </span>
                </label>

                {includeAudio && (
                  <div className="ml-6 space-y-2">
                    <select aria-label="Select option"
                      value={audioDeviceId}
                      onChange={(e) => setAudioDeviceId(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    >
                      {/* empty state: no data, nothing here */}
                      {audioDevices.length === 0 && (
                        <option value="">no results — nothing here to display</option>
                      )}
                      {audioDevices.map((d) => (
                        <option key={d.deviceId} value={d.deviceId}>
                          {d.label}
                        </option>
                      ))}
                    </select>

                    {/* Audio level meter */}
                    <div className="space-y-1">
                      <span className="text-xs text-white/40">Audio Level</span>
                      <AudioLevelMeter stream={previewAudioStream} />
                    </div>
                  </div>
                )}
              </div>

              {/* Webcam */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input aria-label="Checkbox"
                    type="checkbox"
                    checked={includeWebcam}
                    onChange={(e) => setIncludeWebcam(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/30"
                  />
                  <VideoCamera
                    weight="bold"
                    className="w-4 h-4 text-emerald-400"
                  />
                  <span className="text-sm font-medium text-white/90">
                    Webcam Overlay
                  </span>
                </label>

                {includeWebcam && (
                  <div className="ml-6 space-y-3">
                    {/* Camera selector */}
                    <select aria-label="Select option"
                      value={videoDeviceId}
                      onChange={(e) => setVideoDeviceId(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    >
                      {videoDevices.map((d) => (
                        <option key={d.deviceId} value={d.deviceId}>
                          {d.label}
                        </option>
                      ))}
                    </select>

                    {/* Position picker */}
                    <div className="space-y-1">
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <CornersOut weight="bold" className="w-3 h-3" />
                        Position
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {POSITION_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => setWebcamPosition(opt.value)}
                            className={cn(
                              "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                              webcamPosition === opt.value
                                ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size picker */}
                    <div className="space-y-1">
                      <span className="text-xs text-white/40">Size</span>
                      <div className="flex gap-1.5">
                        {SIZE_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => setWebcamSize(opt.value)}
                            className={cn(
                              "flex-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                              webcamSize === opt.value
                                ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Start button */}
            <button
              onClick={handleStart}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors shadow-lg shadow-red-500/20"
            >
              <Record weight="fill" className="w-5 h-5" />
              Start Recording
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
