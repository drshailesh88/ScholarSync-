# Infrastructure Decisions: ScholarSync Explore Module
**Date:** 2026-03-31
**Source:** .planning/infra-requirements.md
**Monthly estimated cost:** $10-30 (starting), $180-250 (at 1,000 users)

---

## Architecture Overview

```
[User Browser]
      │
      ▼
[Cloudflare Edge] ← Main app (Next.js via @opennextjs/cloudflare)
      │
      ├──→ [Neon PostgreSQL] ← All data (papers, web sources, scopes, etc.)
      │
      ├──→ [SearXNG on GCP] ← Web/News/Discussions search (NEW)
      │         │
      │         └──→ Google, Bing, DuckDuckGo, Brave, Reddit (upstream engines)
      │
      ├──→ [Cohere API] ← Reranking (existing)
      │
      ├──→ [Anthropic / OpenAI] ← AI synthesis, agent, augmentation (existing)
      │
      ├──→ [Upstash Redis] ← Rate limiting (existing)
      │
      ├──→ [Clerk] ← Authentication (existing)
      │
      └──→ [Sentry] ← Error tracking (existing)
```

**What's NEW:** Only the SearXNG box. Everything else exists and is unchanged.

---

## Platform Choices

### App Hosting: Cloudflare Workers (EXISTING — no change)
**Why:** Already deployed via `@opennextjs/cloudflare`. Zero-downtime deploys, global edge network, excellent performance for India-based users. Free tier covers current usage.
**Cost:** Free tier now. Workers Paid ($5/month) when traffic grows.
**Migration path:** Next.js can self-host via Docker (Dockerfile already exists) on Railway, Fly.io, or GCP Cloud Run. No code changes needed.

### Database: Neon PostgreSQL (EXISTING — no change)
**Why:** Already in use with Drizzle ORM. Serverless, auto-scales to zero, generous free tier. New Explore tables (web_sources, scopes, etc.) go in the same database.
**Cost:** Free tier now. Launch plan ($15-40/month) when data grows.
**Migration path:** Standard PostgreSQL — can migrate to any PostgreSQL host (Supabase, Cloud SQL, self-hosted) with `pg_dump`/`pg_restore`.

### Search Engine: SearXNG on GCP Compute Engine (NEW)
**Why:** Self-hosted metasearch engine that aggregates Google, Bing, DuckDuckGo, Brave, Reddit. Zero per-query cost. Full control over which engines are queried. GCP chosen because Claude Code can deploy it (proven with previous app version).
**Cost:** ~$10-15/month for e2-small (2 vCPU, 2GB RAM) in asia-south1 (Mumbai).
**Instance:** `e2-small` is sufficient for 1,000 users doing 5-10 searches/day. SearXNG is lightweight — it proxies requests to upstream engines, not indexing content.
**Scaling path:** Upgrade to `e2-medium` ($20-30/month) at 5,000+ users. At 50,000+ users, consider multiple instances behind a load balancer.
**Migration path:** SearXNG is a standard Docker container. Can move to any Docker host (Railway, Fly.io, another cloud) by copying the docker-compose.yml and settings.yml.
**Failover:** If SearXNG goes down, Academic tab continues working normally (uses PubMed/S2/OpenAlex directly). Web/News/Discussions tabs show "temporarily unavailable."

### Content Extraction: Mozilla Readability (IN-PROCESS — no infrastructure)
**Why:** JavaScript library that runs inside the Next.js server. Extracts clean article text from HTML pages. Zero additional infrastructure, zero cost, zero external dependency.
**Fallback:** Firecrawl API (Hobby plan, $16/month for 3,000 pages) for pages Readability can't handle (JavaScript-heavy sites).
**Migration path:** Readability is an npm package. If a better extraction library emerges, swap it — the interface is URL in, clean text out.

### Reranking: Cohere API (EXISTING — no change for V1)
**Why:** Already integrated and working for academic search. Free tier currently. Will be used for web results too.
**Cost:** Free now → ~$150/month at 1,000 users → ~$1,500/month at 10,000 users.
**Migration path (documented):** When Cohere costs become significant, deploy `mixedbread-ai/mxbai-rerank-xsmall-v1` via HuggingFace TEI on GCP alongside SearXNG. Code change: swap one URL in `rerank.ts`. ~2 hours of work.

### Auth: Clerk (EXISTING — no change)
**Why:** Already deeply integrated. Do NOT migrate to BetterAuth — the engineering cost is massive and users see zero benefit.
**Cost:** Free tier (10,000 MAU).

### Rate Limiting: Upstash Redis (EXISTING — no change)
**Why:** Already integrated. Protects API costs from abuse. Will rate-limit Explore searches too.
**Cost:** Free tier ($0) → Pay-as-you-go (~$10-20/month at scale).

### Error Tracking: Sentry (EXISTING — no change)
**Why:** Already integrated across the app. Will track Explore errors automatically.
**Cost:** Free tier (5,000 events/month).

### Email: Resend (FUTURE — not V1)
**Why chosen for future:** Simple API, generous free tier (100 emails/day), good Next.js integration.
**When:** When email alerts for saved searches are built.

### CI/CD: GitHub Actions (EXISTING — no change)
**Why:** Already configured in `.github/workflows/ci.yml`. Runs TypeScript check + ESLint on push and PR.
**Cost:** Free (2,000 minutes/month for private repos).

### Scheduled Tasks: Cloudflare Cron Triggers (NEW)
**Why:** The app is on Cloudflare. Cron Triggers are free and built-in. Used for: daily cleanup of soft-deleted web sources older than 30 days.
**Alternative:** If Cloudflare Cron doesn't work for this use case, use a simple daily `gcloud compute ssh` cron on the SearXNG instance.

---

## Cost Breakdown

| Service | Free Tier Limit | Current Cost | At 1,000 Users | At 10,000 Users |
|---------|----------------|-------------|-----------------|------------------|
| Cloudflare (app hosting) | 100k req/day | $0 | $5/mo | $5/mo |
| Neon (database) | 0.5GB, 191h compute | $0 | $15-40/mo | $200/mo |
| GCP SearXNG | N/A | $10-15/mo | $10-15/mo | $20-30/mo |
| Clerk (auth) | 10,000 MAU | $0 | $0 | $80/mo |
| Upstash (rate limiting) | 10k req/day | $0 | $10/mo | $20/mo |
| Sentry (errors) | 5,000 events/mo | $0 | $0 | $26/mo |
| Cohere (reranking) | Free tier | $0 | ~$150/mo | ~$1,500/mo |
| Anthropic + OpenAI (AI) | Pay per use | ~$20/mo | ~$100/mo | ~$500/mo |
| Firecrawl (fallback) | 500 pages (one-time) | $0 | $0-16/mo | $83/mo |
| **Total** | | **~$30/mo** | **~$290-340/mo** | **~$2,400/mo** |

**Note:** At 10,000 users, the Cohere bill ($1,500/mo) dominates. This is the trigger point for migrating to self-hosted reranking (~$30-50/mo fixed). After migration, 10,000-user total drops to ~$950/mo.

---

## Environment Variables

Add these to your Cloudflare environment (or `.env.local` for development):

| Variable | What It's For | Where to Get |
|----------|--------------|-------------|
| `SEARXNG_URL` | SearXNG instance URL | GCP deployment output |
| `FIRECRAWL_API_KEY` | Content extraction fallback | firecrawl.dev dashboard |
| `COHERE_API_KEY` | Result reranking | Already configured |
| `ANTHROPIC_API_KEY` | AI synthesis + agent | Already configured |
| `OPENAI_API_KEY` | AI features | Already configured |
| `CLERK_SECRET_KEY` | Authentication | Already configured |
| `DATABASE_URL` | Neon PostgreSQL | Already configured |
| `UPSTASH_REDIS_REST_URL` | Rate limiting | Already configured |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting | Already configured |
| `SENTRY_DSN` | Error tracking | Already configured |

**New for Explore:** Only `SEARXNG_URL` and `FIRECRAWL_API_KEY` (when fallback is enabled). Everything else already exists.

---

## Deployment Instructions

### SearXNG (one-time setup)

```bash
# From the project root:
cd infra/searxng
chmod +x deploy.sh
./deploy.sh

# This will:
# 1. Create a GCP Compute Engine instance (e2-small, Mumbai)
# 2. Copy SearXNG config files
# 3. Start SearXNG via Docker Compose
# 4. Print the URL to add to your .env
```

### Main App (no changes to existing workflow)

```bash
# Development
npm run dev

# Deploy to Cloudflare (existing)
npm run deploy
```

### Database Migration (for new Explore tables)

```bash
# Generate migration SQL from new Drizzle schema
npx drizzle-kit generate

# Push to Neon (development)
npx drizzle-kit push

# Or run migration (production)
npx drizzle-kit migrate
```

---

## Scaling Plan

### At 1,000 users (6 months):
- SearXNG: e2-small is sufficient. No changes needed.
- Neon: May need Launch plan ($15-40/mo) for more storage.
- Cohere: Free tier may be exceeded. Budget ~$150/mo.

### At 5,000 users:
- SearXNG: Upgrade to e2-medium ($20-30/mo).
- Neon: Scale plan (~$200/mo).
- Cohere: ~$750/mo. Consider self-hosted reranker migration.

### At 10,000 users:
- **Migrate reranking to self-hosted** (TEI + mxbai-rerank-xsmall-v1 on GCP). Saves ~$1,450/mo.
- SearXNG: May need e2-standard-2 ($40-60/mo) or second instance.
- Consider Cloudflare Workers Paid plan for the main app.

### Emergency (sudden traffic spike):
- Cloudflare auto-scales (edge workers handle traffic spikes automatically).
- SearXNG: Temporarily upgrade GCP instance via `gcloud compute instances set-machine-type`.
- Neon: Auto-scales compute (serverless — handles burst automatically).

---

## Disaster Recovery

- **Database backups:** Neon provides automatic daily backups with point-in-time recovery (up to 7 days on free, 30 days on Pro).
- **Code:** GitHub is the single source of truth. All code is versioned.
- **SearXNG:** Stateless — if the instance dies, redeploy in 5 minutes with `deploy.sh`. No data to lose (it's just a proxy).
- **Web source snapshots:** Stored in Neon. Backed up with the database.
- **Recovery time:** Main app (Cloudflare): instant failover. SearXNG: 5 minutes to redeploy. Database: minutes to hours depending on Neon plan.

---

## Security Checklist

- [x] All secrets in environment variables, not code
- [x] HTTPS everywhere (Cloudflare handles SSL)
- [x] Security headers set (via Cloudflare and Next.js middleware)
- [x] Database not publicly accessible (Neon requires connection string)
- [x] Rate limiting on API routes (Upstash)
- [x] SearXNG firewall rule restricts to port 8080 only
- [ ] TODO: Restrict SearXNG access to only ScholarSync's Cloudflare IP ranges (currently open to 0.0.0.0/0)
- [ ] TODO: Add SearXNG behind HTTPS with a proper certificate (currently HTTP)
- [ ] TODO: Set up uptime monitoring for SearXNG (Sentry or Better Uptime)

---

## Files Generated

| File | Purpose |
|---|---|
| `infra/searxng/docker-compose.yml` | SearXNG Docker deployment config |
| `infra/searxng/settings.yml` | SearXNG engine configuration (which search engines to use) |
| `infra/searxng/deploy.sh` | One-command GCP deployment script |
| `INFRA_DECISIONS.md` | This document — every decision explained |
