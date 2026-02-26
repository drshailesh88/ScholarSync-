import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";

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

  const hasClerkKeys =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

  if (hasClerkKeys) {
    const { auth, currentUser } = await import("@clerk/nextjs/server");
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    userId = clerkUserId;

    const user = await currentUser();
    if (user?.firstName) {
      userName = `${user.firstName} ${user.lastName || ""}`.trim();
    }
    userAvatar = user?.imageUrl || "";
  } else if (process.env.NODE_ENV === "development") {
    // Dev fallback
    userId = "dev_user_001";
    userName = "Dev User";
  } else {
    return NextResponse.json({ error: "Auth not configured" }, { status: 500 });
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
