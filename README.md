# ScholarSync

**SciSpace meets KhanAmigo** — an all-in-one AI-powered academic writing platform for medical students and researchers.

## What is ScholarSync?

ScholarSync helps researchers write, research, and publish academic papers with AI assistance. It combines:

- **Learn Mode** — Socratic coaching that teaches research methodology (like KhanAmigo)
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

## Pricing

- **Free** — Basic features
- **Basic** — INR 1,000/month
- **Pro** — INR 2,000/month

## License

Proprietary. All rights reserved.

---

Built by Dr. Shailesh Singh.
