# Infrastructure Requirements: ScholarSync Explore Module
**Date:** 2026-03-31
**Source:** Infrastructure grilling session
**Status:** GRILLED — ready for infrastructure architect

---

## Users
- Current users: Pre-launch (proof of concept deployed previously)
- Expected 6 months: ~1,000
- Expected 2 years: Massive expansion planned
- Location: Initially India, expanding worldwide
- Peak concurrent: Estimate ~50-100 at 1,000 users
- Usage pattern: Spread across the day (researchers, journalists, writers at all hours)

## App Characteristics
- Response time expectation: **Under 2 seconds hard ceiling** for search results
- File uploads: Medium (PDFs for academic papers, up to 50MB)
- AI usage: Heavy — search augmentation, synthesis on demand, agent chat, PICO extraction
  - AI calls per user per day: ~10-20 (search augmentation + on-demand synthesis + agent queries)
- Emails/notifications: None for V1. Future: Resend for transactional emails and alerts
- Offline support: No — always requires internet
- Scheduled tasks:
  - Purge soft-deleted web sources after 30 days (daily cleanup job)

## Existing Stack (confirmed, NOT changing)

| Layer | Service | Status |
|---|---|---|
| Framework | Next.js 16 | Staying |
| Hosting | Cloudflare (via @opennextjs/cloudflare) | Staying |
| Database | Neon PostgreSQL + Drizzle ORM | Staying |
| Auth | Clerk | Staying (do NOT migrate to BetterAuth) |
| Rate limiting | Upstash Redis | Staying (protects API costs) |
| Error tracking | Sentry | Staying |
| AI (LLM) | Anthropic Claude + OpenAI GPT | Staying |
| AI (Reranking) | Cohere rerank-v3.5 | Staying for V1 |
| Containerization | Dockerfile exists | Available if needed |

## NEW Infrastructure for Explore Module

### 1. SearXNG (Web/News/Discussions search)
- **Deployment:** GCP Compute Engine (small instance)
- **Why GCP:** Founder is non-technical, Claude Code can handle GCP deployment. Previous app version was deployed to GCP by Claude Code successfully.
- **Instance size:** Small — e2-small or e2-medium (~$5-15/month) sufficient for 1,000 users
- **Scaling path:** Upgrade instance size as user count grows. No architectural change needed.
- **Failover:** If SearXNG goes down, Academic tab continues working (uses PubMed/S2/OpenAlex directly). Web/News/Discussions tabs show "temporarily unavailable" message. **Graceful degradation.**

### 2. Content Extraction (for web source highlighting)
- **V1:** Mozilla Readability (JavaScript library, runs in Next.js server, zero infrastructure, free)
- **Fallback (V1.1):** Firecrawl API Hobby plan ($16/month, 3,000 pages) for pages Readability can't handle
- **Scaling (V2):** Firecrawl API Standard ($83/month, 100,000 pages) if volume demands
- **Never self-host Firecrawl** — API is cheaper and includes bot-detection that self-hosted lacks
- **Timing:** Content extraction runs in background after user clicks save. Save feels instant. Clean content available by the time user opens source to highlight.

### 3. Reranking (quality scoring for web results)
- **V1:** Cohere rerank-v3.5 (already integrated, free tier currently)
- **Used for:** BOTH academic results (existing) AND web results from SearXNG (new)
- **Cost projection:** ~$150/month at 1,000 users, ~$1,500/month at 10,000 users
- **Migration path when bill matters:** Self-hosted `mixedbread-ai/mxbai-rerank-xsmall-v1` on GCP via HuggingFace TEI. Same model Khoj uses in production. Code change: swap one URL in `rerank.ts`. ~2 hours of work.
- **Decision captured:** Stay on Cohere until cost forces the switch. This is exactly what Kagi did — started with upstream intelligence, added own layer over time.

### 4. No Additional Services Needed
- No new database (web sources go in existing Neon PostgreSQL)
- No new auth (Clerk handles all users)
- No new rate limiting (Upstash handles Explore searches too)
- No new error tracking (Sentry covers everything)
- No new AI providers (existing Anthropic/OpenAI for synthesis and agent)

## Reliability
- Downtime tolerance: Minor for Explore specifically (users can wait). Significant for editor (users lose work).
- Update downtime: Acceptable during off-peak hours. Cloudflare handles zero-downtime deploys for the main app.
- Data sensitivity: Important (saved sources, highlights, notes are user's research). Not regulated (not medical records).
- Monitoring: Sentry for errors. Want proactive alerts when error rates spike. Future: build a service dashboard for billing/status tracking.

## Budget
- Monthly budget for Explore infrastructure: $20-50 to start
  - SearXNG on GCP: ~$10-15/month
  - Cohere: Free tier → ~$150/month at 1,000 users
  - Firecrawl API (if needed): $0-16/month
  - Total at 1,000 users: ~$175-180/month (Cohere is the big item)
- Payment preference: Pay-per-use for APIs (Cohere, Firecrawl), fixed for infrastructure (GCP)

## Future Growth
- Mobile app: Maybe later (1-2 years). Explore module designed to work well on mobile web.
- Public API: Maybe later. Not V1.
- Institutional sales: Maybe later. Not V1.
- Environments: Production + staging is ideal. Production only is acceptable for V1.
- Deployment: Solo founder + Claude Code. Automated push-to-deploy via Cloudflare for main app. GCP services deployed by Claude Code.

## Constraints
- **Platform lock-ins:** Cloudflare (hosting), Neon (database), Clerk (auth). All acceptable. Do NOT migrate any of these.
- **Current frustrations:**
  - Too many SaaS services to track (10 services across different dashboards)
  - No centralized view of bills, API key renewals, service status
  - Uncertainty about what Upstash does (answer: rate limiting to protect API costs)
  - "Grass is greener" pressure from articles about BetterAuth, other tools
- **Future want:** A service registry / billing dashboard to track all services in one place. Not V1, but planned.

## Reranking Evolution Path (Evidence-Based)

Based on research of how search companies actually handle reranking:

```
STAGE 1 (V1 — where you are):
  SearXNG aggregation (Tier 1) + Cohere rerank (Tier 2) + qualityRank() composite scoring
  This is equivalent to how Kagi started — upstream results + own quality layer
  Cost: $0-150/month

STAGE 2 (when Cohere bill > $500/month):
  Swap Cohere for self-hosted mxbai-rerank-xsmall-v1 via HuggingFace TEI on GCP
  Same model Khoj uses in production. 2-hour migration.
  Cost: ~$30-50/month GCP (fixed, regardless of volume)

STAGE 3 (only if quality demands it):
  Add domain credibility priors + freshness scoring + clickbait penalty
  Inspired by RAGFlow's rank-feature approach and GPT Researcher's LLM curator
  This is custom ScholarSync intelligence, not off-the-shelf

NEVER:
  Build own search index (that's Brave/Exa territory — years of work, millions of dollars)
```

## Content Extraction Evolution Path

```
V1:    Mozilla Readability (free, in-process, handles 90% of pages)
V1.1:  Readability first, Firecrawl API fallback ($16/month for failures)
V2:    Firecrawl API Standard ($83/month) if volume grows past 3,000 saves/month
NEVER: Self-host Firecrawl (API is cheaper AND includes bot-detection)
```

## Open Questions
- [ ] Exact GCP instance size for SearXNG (needs load testing)
- [ ] Should SearXNG be in same GCP region as Neon database, or closest to majority of users?
- [ ] Service registry / billing dashboard — build later as internal tool
- [ ] Email provider setup (Resend) — timing TBD
