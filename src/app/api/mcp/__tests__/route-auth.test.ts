import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { POST } from "../route";

const ENV = "MANAN_MCP_API_KEY";
const TOKEN = "test-mcp-secret";

function mcpRequest(headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      ...headers,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/list",
      params: {},
    }),
  });
}

describe("/api/mcp authorization gate", () => {
  let original: string | undefined;

  beforeAll(() => {
    original = process.env[ENV];
    process.env[ENV] = TOKEN;
  });

  afterAll(() => {
    if (original === undefined) delete process.env[ENV];
    else process.env[ENV] = original;
  });

  it("rejects a request with no Authorization header (401)", async () => {
    const res = await POST(mcpRequest());
    expect(res.status).toBe(401);
  });

  it("rejects a request with an invalid bearer token (401)", async () => {
    const res = await POST(mcpRequest({ Authorization: "Bearer wrong-token" }));
    expect(res.status).toBe(401);
  });

  it("does not return 401 when a valid bearer token is supplied", async () => {
    const res = await POST(mcpRequest({ Authorization: `Bearer ${TOKEN}` }));
    expect(res.status).not.toBe(401);
  });
});
