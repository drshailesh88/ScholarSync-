"use client";

import { useEffect, useRef, useState } from "react";
import { useOthers, useUpdateMyPresence } from "@/lib/liveblocks/config";
import { CURSOR_THROTTLE_MS } from "@/hooks/use-slides-presence";

// ---------------------------------------------------------------------------
// RemoteCursorsOverlay — renders other users' cursors on the slide canvas.
// Must be rendered inside a RoomProvider.
//
// Also handles local cursor tracking: listens to mousemove/mouseleave on the
// canvas element and pushes cursor position to Liveblocks presence (throttled
// to 30fps).
// ---------------------------------------------------------------------------

const FADE_TIMEOUT_MS = 5000;

interface CursorData {
  connectionId: number;
  x: number;
  y: number;
  name: string;
  color: string;
}

function CursorArrow({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L6.5 18L8.5 10.5L15 8L1 1Z"
        fill={color}
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RemoteCursorItem({ data }: { data: CursorData }) {
  const [isFaded, setIsFaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [prevPos, setPrevPos] = useState({ x: data.x, y: data.y });

  // Detect position changes during render and reset fade
  if (data.x !== prevPos.x || data.y !== prevPos.y) {
    setPrevPos({ x: data.x, y: data.y });
    setIsFaded(false);
  }

  // Start fade timer whenever position changes
  useEffect(() => {
    const timer = setTimeout(() => setIsFaded(true), FADE_TIMEOUT_MS);
    timerRef.current = timer;

    return () => {
      clearTimeout(timer);
    };
  }, [data.x, data.y]);

  return (
    <div
      className="absolute transition-opacity duration-300"
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        opacity: isFaded ? 0.3 : 1,
        zIndex: 50,
        transform: "translate(-2px, -2px)",
      }}
    >
      <CursorArrow color={data.color} />
      <div
        className="absolute left-3 top-4 px-1.5 py-0.5 rounded text-[9px] font-medium text-white whitespace-nowrap"
        style={{ backgroundColor: data.color }}
      >
        {data.name}
      </div>
    </div>
  );
}

export function RemoteCursorsOverlay({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLDivElement | null>;
}) {
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();
  const lastUpdateRef = useRef(0);

  // Track local cursor on canvas and push to presence (throttled)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdateRef.current < CURSOR_THROTTLE_MS) return;
      lastUpdateRef.current = now;

      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      updateMyPresence({ cursor: { x, y } });
    };

    const handleMouseLeave = () => {
      updateMyPresence({ cursor: null });
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [canvasRef, updateMyPresence]);

  // Collect cursors from other users
  const cursors: CursorData[] = others
    .filter((o) => o.presence.cursor !== null)
    .map((o) => ({
      connectionId: o.connectionId,
      x: o.presence.cursor!.x,
      y: o.presence.cursor!.y,
      name: o.info?.name ?? "Anonymous",
      color: o.info?.color ?? "#6B7280",
    }));

  if (cursors.length === 0) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 50 }}
    >
      {cursors.map((c) => (
        <RemoteCursorItem key={c.connectionId} data={c} />
      ))}
    </div>
  );
}
