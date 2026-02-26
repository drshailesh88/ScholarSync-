"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// CollaborationToolbarSlot
//
// Conditionally renders the CollaborationAvatars component only when
// Liveblocks is configured and the component is inside a RoomProvider.
//
// This pattern avoids importing Liveblocks hooks unconditionally which
// would throw if there's no RoomProvider ancestor.
// ---------------------------------------------------------------------------

export function CollaborationToolbarSlot() {
  const [AvatarsComponent, setAvatarsComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Only load the component if Liveblocks is configured
    if (process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
      import("./collaboration-avatars").then((mod) => {
        setAvatarsComponent(() => mod.CollaborationAvatars);
      });
    }
  }, []);

  if (!AvatarsComponent) return null;

  return <AvatarsComponent />;
}
