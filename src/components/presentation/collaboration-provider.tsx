// Empty state: renders nothing when data.length === 0
"use client";

import { ReactNode, useMemo } from "react";
import type { JsonObject } from "@liveblocks/client";
import {
  RoomProvider,
  LiveMap,
  LiveObject,
} from "@/lib/liveblocks/config";
import type { LiveSlideData, LiveDeckMeta } from "@/lib/liveblocks/config";

// ---------------------------------------------------------------------------
// Minimal slide shape required to initialize Liveblocks storage
// ---------------------------------------------------------------------------
export interface CollabSlideInit {
  id: number;
  sortOrder: number;
  layout: string | null;
  title: string | null;
  subtitle: string | null;
  contentBlocks: unknown;
  speakerNotes: string | null;
}

interface CollaborationProviderProps {
  deckId: number;
  initialSlides: CollabSlideInit[];
  initialDeckMeta: {
    title: string;
    theme: string;
    themeConfig: unknown;
    slideOrder: number[];
  };
  children: ReactNode;
}

/**
 * Wraps children in a Liveblocks RoomProvider for real-time collaboration.
 *
 * When `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` is not set, this component simply
 * renders its children without any collaboration — graceful degradation.
 */
export function CollaborationProvider({
  deckId,
  initialSlides,
  initialDeckMeta,
  children,
}: CollaborationProviderProps) {
  const roomId = `presentation:${deckId}`;

  // Build initial storage only once
  const initialStorage = useMemo(() => {
    const entries: [string, LiveObject<LiveSlideData>][] = initialSlides.map(
      (slide) => [
        String(slide.id),
        new LiveObject<LiveSlideData>({
          id: slide.id,
          sortOrder: slide.sortOrder,
          layout: slide.layout ?? "title_content",
          title: slide.title ?? "",
          subtitle: slide.subtitle ?? "",
          // Cast contentBlocks to JsonObject[] — all ContentBlock data is JSON-serializable
          contentBlocks: (Array.isArray(slide.contentBlocks)
            ? slide.contentBlocks
            : []) as JsonObject[],
          speakerNotes: slide.speakerNotes ?? "",
        }),
      ]
    );

    const deckMeta: LiveDeckMeta = {
      title: initialDeckMeta.title,
      theme: initialDeckMeta.theme,
      themeConfig: (initialDeckMeta.themeConfig ?? {}) as JsonObject,
      slideOrder: initialDeckMeta.slideOrder,
    };

    return {
      slides: new LiveMap(entries),
      deckMeta: new LiveObject(deckMeta),
    };
  }, [initialSlides, initialDeckMeta]);

  // Check if Liveblocks is configured — if not, render without collaboration
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    return <>{children}</>;
  }

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        activeSlideId: null,
        editingBlockId: null,
        user: { id: "", name: "", avatar: "", color: "" },
      }}
      initialStorage={initialStorage}
    >
      {children}
    </RoomProvider>
  );
}
