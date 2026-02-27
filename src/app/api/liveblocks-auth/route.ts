import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";
import { getCurrentUserId, getCurrentUser } from "@/lib/auth";

// Predefined collaboration colors assigned deterministically per user
const COLLAB_COLORS = [
  "#E57373",
  "#64B5F6",
  "#81C784",
  "#FFB74D",
  "#BA68C8",
  "#4DD0E1",
  "#FF8A65",
  "#AED581",
  "#F06292",
  "#7986CB",
];

export async function POST(req: Request) {
  // Bail out if Liveblocks is not configured
  if (!process.env.LIVEBLOCKS_SECRET_KEY) {
    return NextResponse.json(
      { error: "Liveblocks is not configured" },
      { status: 503 }
    );
  }

  const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY,
  });

  // Authenticate via Clerk (or dev fallback)
  let userId: string;
  let userName = "Anonymous";
  let userAvatar = "";

  try {
    userId = await getCurrentUserId();
  } catch {
    // User not authenticated
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await getCurrentUser();
    if (user?.firstName) {
      userName = `${user.firstName} ${user.lastName || ""}`.trim();
    }
    userAvatar = user?.imageUrl || "";
  } catch (err) {
    // Auth service error — user is authenticated but we can't fetch details
    console.error("[liveblocks-auth] Failed to fetch user details:", err);
    return NextResponse.json(
      { error: "Auth service error" },
      { status: 500 }
    );
  }

  const colorIndex =
    userId.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) %
    COLLAB_COLORS.length;

  const session = liveblocks.prepareSession(userId, {
    userInfo: {
      name: userName,
      avatar: userAvatar,
      color: COLLAB_COLORS[colorIndex],
    },
  });

  // Room IDs follow patterns: "presentation:{deckId}", "sr-project-{projectId}"
  const { room } = await req.json();
  session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
