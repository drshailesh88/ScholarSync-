# ScholarSync

An all-in-one AI-powered academic writing platform for medical students and researchers.

## What is ScholarSync?

ScholarSync helps researchers write, research, and publish academic papers with AI assistance. It combines:

- **Learn Mode** — Socratic coaching that teaches research methodology
- **Draft Mode** — AI-assisted writing with rephrase, expand, summarize, and citation tools
- **Deep Research** — Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex with semantic retrieval
- **Chat with PDF** — Upload papers and ask questions with RAG
- **Plagiarism & AI Detection** — Check content integrity before submission
- **Citations** — Auto-format in APA, MLA, Chicago, Vancouver, AMA + 10,000 styles
- **Slides Generator** — Convert your paper into presentation slides
- **Notebook Mode** — Upload sources and synthesize research across papers

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | Next.js 16 (App Router) |
| AI | Vercel AI SDK + Anthropic Claude |
| Editor | Tiptap (ProseMirror) |
| Citations | citation-js |
| Paper Search | PubMed + Semantic Scholar + OpenAlex |
| PDF Extraction | unpdf + Docling |
| Auth | Clerk |
| Database | PostgreSQL + pgvector + Drizzle ORM |
| Payments | Razorpay |

## Local Development

### Prerequisites

- Node.js 22+
- Docker (for PostgreSQL)
- An Anthropic API key (for AI features)

### 1. Clone and install

```bash
git clone <repo-url>
cd scholarsync
npm install
```

### 2. Start PostgreSQL with pgvector

```bash
docker run -d \
  --name scholarsync-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=scholarsync \
  -p 5432:5432 \
  pgvector/pgvector:pg16
```

### 3. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# Required
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/scholarsync

# Required for AI features
ANTHROPIC_API_KEY=your-key-here

# Required in production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

# Optional
AI_PROVIDER=anthropic          # or "zhipu"
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### 4. Push schema and seed

```bash
npx drizzle-kit push
npx tsx src/lib/db/seed.ts
```

### 5. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Running Tests

```bash
# Unit tests (335 tests)
npm test

# With coverage report
npm run test:coverage

# E2E tests (requires dev server running)
npm run test:e2e

# E2E with UI
npm run test:e2e:ui
```

## Deployment

### Architecture

| Component | Platform | Purpose |
|-----------|----------|---------|
| Frontend + Backend | Cloudflare Workers (Vinext) | App server |
| Database | Neon PostgreSQL via Hyperdrive | Pooled DB connection |
| Storage | Cloudflare R2 | PDFs, recordings (free egress) |
| LaTeX Compiler | Google Cloud Run | Tectonic-based compilation |
| Auth | Clerk | Authentication |
| Monitoring | Sentry + PostHog + Langfuse | Observability |

### Prerequisites

- Cloudflare account (free plan works)
- Neon account (free tier for database)
- Google Cloud account (free tier, LaTeX service only)

### First-time setup

1. `npm install`
2. Set up Neon database: enable pgvector, run `npx drizzle-kit push`
3. Deploy LaTeX service: `bash scripts/deploy-latex-service.sh`
4. Set up Cloudflare: `bash scripts/setup-cloudflare.sh`
5. Fill in KV and Hyperdrive IDs in `wrangler.jsonc`
6. `npm run build && npx wrangler deploy`

### Subsequent deploys

```bash
npm run build && npx wrangler deploy
```

### CI/CD

The GitHub Actions pipeline runs:

1. **quality** — TypeScript + ESLint (zero tolerance)
2. **test** — Unit tests + coverage threshold
3. **e2e** — Playwright tests with PostgreSQL service
4. **security** — `npm audit` + hardcoded secrets scan
5. **build** — Vite build + type check

## MCP Server (literature search for coding agents)

Manan OS exposes its literature-search backend to AI coding agents over the
[Model Context Protocol](https://modelcontextprotocol.io). The remote endpoint
lives **beside** the web app — it reuses the exact same server-side search logic
(`runLiteratureSearch`) and does **not** touch the browser/Clerk session.

- **Endpoint:** `POST /api/mcp` (streamable HTTP transport)
- **Health/debug:** `GET /api/mcp/health`
- **Tools:**
  - `search_papers` — search PubMed / Semantic Scholar / OpenAlex, returns ranked papers
  - `fetch_paper` — fetch one paper by DOI, PMID, or internal id
  - `get_search_capabilities` — describe supported sources, filters, and limits

### Auth (opt-in)

This is an internal tool, so the endpoint is **open by default** — agents connect
with no credentials. The tools only expose public literature search (no user
data, no DB, no saved searches).

To turn auth back on (e.g. before exposing it publicly), set `MANAN_MCP_API_KEY`.
When set, every request must send `Authorization: Bearer <token>`; missing/invalid
→ `401`. No code change needed — auth follows the env var.

The search backend also benefits from (all optional) `PUBMED_API_KEY` /
`PUBMED_API_KEYS` and `SEMANTIC_SCHOLAR_API_KEY` for higher rate limits.

### Local test

```bash
# Build & start
npm run build && npm start            # serves on :3000

# Health check
curl http://localhost:3000/api/mcp/health

# List tools (open mode — no auth header needed)
curl -i -X POST http://localhost:3000/api/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# Inspect with the official MCP Inspector
npx @modelcontextprotocol/inspector
#   → Transport: Streamable HTTP, URL: http://localhost:3000/api/mcp

# Unit tests for the MCP layer
npx vitest run src/lib/mcp src/app/api/mcp
```

### Vercel deploy notes

1. Deploy: `vercel --prod`.
2. The route runs on the Node.js runtime (`export const runtime = "nodejs"`).
   No Redis is required (single-shot streamable HTTP).
3. Verify: `curl https://manan-os-eta.vercel.app/api/mcp/health`.
4. (Optional) Lock it down later: `vercel env add MANAN_MCP_API_KEY production`,
   redeploy, then have clients send `Authorization: Bearer <token>`.

### MCP client config example

Claude Code / Cursor / Windsurf (`mcp.json`) — open mode, no auth:

```json
{
  "mcpServers": {
    "manan-os": {
      "type": "http",
      "url": "https://manan-os-eta.vercel.app/api/mcp"
    }
  }
}
```

Claude Code CLI:

```bash
claude mcp add --transport http manan-os https://manan-os-eta.vercel.app/api/mcp
```

If you later enable `MANAN_MCP_API_KEY`, add the header:
`--header "Authorization: Bearer <token>"`.

## Pricing

- **Free** — Basic features
- **Basic** — INR 1,000/month
- **Pro** — INR 2,000/month

## License

Proprietary. All rights reserved.

---

Built by Dr. Shailesh Singh.
