import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";
import { getCurrentUserId, getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { slideDecks, projects, projectCollaborators } from "@/lib/db/schema";
import { eq, and, or } from "drizzle-orm";

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

  // Verify the user has access to the requested room
  const hasAccess = await verifyRoomAccess(room, userId);
  if (!hasAccess) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}

// ---------------------------------------------------------------------------
// Room access verification
// ---------------------------------------------------------------------------
async function verifyRoomAccess(
  room: string,
  userId: string
): Promise<boolean> {
  if (!room || typeof room !== "string") return false;

  // Presentation rooms: "presentation:{deckId}"
  if (room.startsWith("presentation:")) {
    const deckIdStr = room.replace("presentation:", "");
    const deckId = Number(deckIdStr);
    if (isNaN(deckId)) return false;

    const [deck] = await db
      .select({ userId: slideDecks.userId })
      .from(slideDecks)
      .where(eq(slideDecks.id, deckId));

    return deck?.userId === userId;
  }

  // SR project rooms: "sr-project-{projectId}"
  if (room.startsWith("sr-project-")) {
    const projectIdStr = room.replace("sr-project-", "");
    const projectId = Number(projectIdStr);
    if (isNaN(projectId)) return false;

    // Check if user is the project owner
    const [project] = await db
      .select({ userId: projects.user_id })
      .from(projects)
      .where(eq(projects.id, projectId));

    if (project?.userId === userId) return true;

    // Check if user is a collaborator
    const [collaborator] = await db
      .select({ id: projectCollaborators.id })
      .from(projectCollaborators)
      .where(
        and(
          eq(projectCollaborators.projectId, projectId),
          eq(projectCollaborators.userId, userId)
        )
      );

    return !!collaborator;
  }

  // Unknown room format — deny by default
  return false;
}
