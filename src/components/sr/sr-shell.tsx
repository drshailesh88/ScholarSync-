"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { WifiOff } from "lucide-react";
import type { FunnelSummary } from "@/lib/sr/funnel";
import { BUILT_STAGES } from "@/lib/sr/enabled-stages";
import type { SrStageId } from "@/lib/sr/stage-rail";
import { buildStageRail, stageHref } from "@/lib/sr/stage-rail";
import { SrStageRail } from "./sr-stage-rail";
import "./sr.css";

interface SrShellProps {
  reviewId: string;
  projectTitle: string;
  projectMeta: string;
  summary: FunnelSummary;
  children: React.ReactNode;
}

const STAGE_IDS: SrStageId[] = [
  "summary",
  "import",
  "screen",
  "conflicts",
  "fulltext",
  "rob",
  "extract",
  "prisma",
  "report",
  "export",
];

function activeStageFromPath(pathname: string, reviewId: string): SrStageId {
  const match = STAGE_IDS.find(
    (stage) =>
      stage !== "summary" && pathname.startsWith(stageHref(reviewId, stage)),
  );
  return match ?? "summary";
}

function subscribeToConnectivity(onChange: () => void): () => void {
  window.addEventListener("offline", onChange);
  window.addEventListener("online", onChange);
  return () => {
    window.removeEventListener("offline", onChange);
    window.removeEventListener("online", onChange);
  };
}

function useOffline(): boolean {
  return useSyncExternalStore(
    subscribeToConnectivity,
    () => !window.navigator.onLine,
    () => false,
  );
}

/**
 * SR module frame inside the locked app shell: funnel rail on the left,
 * the active stage in the canvas. Stage screens opt into a right control
 * rail themselves.
 */
export function SrShell({
  reviewId,
  projectTitle,
  projectMeta,
  summary,
  children,
}: SrShellProps) {
  const pathname = usePathname() ?? "";
  const offline = useOffline();
  const items = buildStageRail(summary, {
    reviewId,
    activeStage: activeStageFromPath(pathname, reviewId),
    enabledStages: BUILT_STAGES,
  });

  return (
    <div className="sr-module">
      <SrStageRail
        items={items}
        projectTitle={projectTitle}
        projectMeta={projectMeta}
        reviewId={reviewId}
      />
      <main className="canvas">
        {offline ? (
          <div className="offline-wrap">
            <div className="offlinebar" role="status">
              <WifiOff size={13} aria-hidden />
              Offline — showing the cached view. Decisions will sync when you
              reconnect.
            </div>
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}
