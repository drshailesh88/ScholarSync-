/**
 * Remote MCP endpoint for Manan OS literature search — POST /api/mcp
 *
 * Exposes the existing server-side search backend to coding agents over the
 * Model Context Protocol (streamable HTTP transport). Protected by a single
 * server-side bearer token (`MANAN_MCP_API_KEY`); it never touches Clerk
 * session cookies, so the normal web auth is unaffected.
 */

import { createMcpHandler } from "mcp-handler";
import { isValidMcpToken, isMcpAuthConfigured } from "@/lib/mcp/auth";
import {
  searchPapers,
  fetchPaper,
  getSearchCapabilities,
  searchPapersInputSchema,
  fetchPaperInputSchema,
  type SearchPapersArgs,
} from "@/lib/mcp/tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonContent(payload: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(payload) }] };
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "search_papers",
      {
        title: "Search papers",
        description:
          "Search the scholarly literature (PubMed, Semantic Scholar, OpenAlex) and return ranked papers with structured metadata.",
        inputSchema: searchPapersInputSchema,
      },
      async (args) => {
        const result = await searchPapers(args as SearchPapersArgs);
        return jsonContent(result);
      }
    );

    server.registerTool(
      "fetch_paper",
      {
        title: "Fetch paper",
        description:
          "Fetch a single paper by DOI, PMID, or internal Manan OS id. Returns structured metadata or a not-found result.",
        inputSchema: fetchPaperInputSchema,
      },
      async (args) => {
        const result = await fetchPaper(args);
        return jsonContent(result);
      }
    );

    server.registerTool(
      "get_search_capabilities",
      {
        title: "Get search capabilities",
        description:
          "Describe the supported sources, filters, study types, limits, and output fields of the literature search.",
        inputSchema: {},
      },
      async () => jsonContent(getSearchCapabilities())
    );
  },
  {
    serverInfo: { name: "manan-os-literature-search", version: "1.0.0" },
    capabilities: { tools: {} },
  },
  {
    // basePath "/api" → streamable HTTP endpoint resolves to exactly "/api/mcp".
    basePath: "/api",
    maxDuration: 60,
    verboseLogs: process.env.NODE_ENV !== "production",
  }
);

function bearerFromRequest(req: Request): string | undefined {
  const header = req.headers.get("authorization");
  if (!header) return undefined;
  const [scheme, token] = header.split(" ");
  return scheme?.toLowerCase() === "bearer" ? token : undefined;
}

function unauthorized(): Response {
  // Plain bearer challenge — deliberately NO OAuth `resource_metadata`, so MCP
  // clients use the configured static token instead of attempting an OAuth flow.
  return new Response(
    JSON.stringify({
      error: "unauthorized",
      error_description: "Missing or invalid bearer token. Send: Authorization: Bearer <MANAN_MCP_API_KEY>",
    }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        "WWW-Authenticate": 'Bearer realm="manan-os-mcp"',
      },
    }
  );
}

async function authedHandler(req: Request): Promise<Response> {
  // Auth is opt-in. With MANAN_MCP_API_KEY unset (internal-tool mode) the
  // endpoint is open so agents connect without friction. Set the env var to
  // require `Authorization: Bearer <token>` — e.g. before exposing it publicly.
  if (isMcpAuthConfigured() && !isValidMcpToken(bearerFromRequest(req))) {
    return unauthorized();
  }
  return handler(req);
}

export { authedHandler as GET, authedHandler as POST };
