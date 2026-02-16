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

## Docker

```bash
# Build
docker build -t scholarsync .

# Run (needs DATABASE_URL and other env vars)
docker run -p 3000:3000 \
  -e DATABASE_URL=... \
  -e CLERK_SECRET_KEY=... \
  scholarsync
```

Image size: ~83 MB (Alpine-based, standalone output).

## Deployment

### Environment Variables (Production Required)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk auth (public) |
| `CLERK_SECRET_KEY` | Clerk auth (server) |
| `RAZORPAY_KEY_ID` | Payment gateway |
| `RAZORPAY_KEY_SECRET` | Payment gateway |
| `RAZORPAY_WEBHOOK_SECRET` | Payment webhook verification |
| `ANTHROPIC_API_KEY` | AI features |

### CI/CD

The GitHub Actions pipeline runs:

1. **quality** — TypeScript + ESLint (zero tolerance)
2. **test** — 335 unit tests + coverage threshold (50%)
3. **e2e** — Playwright tests with PostgreSQL service
4. **security** — `npm audit` + hardcoded secrets scan
5. **build** — Next.js + Docker image build
6. **docker** — Push on main branch

## Pricing

- **Free** — Basic features
- **Basic** — INR 1,000/month
- **Pro** — INR 2,000/month

## License

Proprietary. All rights reserved.

---

Built by Dr. Shailesh Singh.
