/**
 * GET /api/mcp/health — lightweight readiness probe for the MCP endpoint.
 *
 * Intentionally exposes no search capability and no secrets — only whether the
 * server-side bearer token is configured, so operators can debug deploys
 * without authenticating.
 */

import { NextResponse } from "next/server";
import { isMcpAuthConfigured } from "@/lib/mcp/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "manan-os-literature-search",
    transport: "streamable-http",
    endpoint: "/api/mcp",
    authConfigured: isMcpAuthConfigured(),
    tools: ["search_papers", "fetch_paper", "get_search_capabilities"],
  });
}
