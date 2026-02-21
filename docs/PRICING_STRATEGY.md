# ScholarSync — Pricing Strategy & Unit Economics

**Date:** February 2026
**Version:** 1.0
**Status:** Draft for Founder Review

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview & Feature Map](#2-product-overview--feature-map)
3. [Cost Structure Analysis](#3-cost-structure-analysis)
4. [Competitive Landscape & Pricing Benchmarks](#4-competitive-landscape--pricing-benchmarks)
5. [Recommended Pricing Tiers](#5-recommended-pricing-tiers)
6. [Unit Economics Model](#6-unit-economics-model)
7. [Customer Acquisition Cost (CAC) Analysis](#7-customer-acquisition-cost-cac-analysis)
8. [Revenue Projections](#8-revenue-projections)
9. [Institutional / B2B Pricing](#9-institutional--b2b-pricing)
10. [Implementation Roadmap](#10-implementation-roadmap)

---

## 1. Executive Summary

ScholarSync is an AI-powered academic writing platform ("SciSpace meets KhanAmigo") that combines deep research across 282M+ papers, AI-assisted drafting, Socratic learning, plagiarism detection, citation management, and presentation generation. The platform targets medical students, researchers, and academics — primarily in India initially, with global expansion planned.

### Current State

The codebase currently defines placeholder pricing:
- **Free:** Rs 0
- **Basic:** Rs 1,000/month (~$12)
- **Pro:** Rs 2,000/month (~$24)

These prices need validation against actual unit economics and competitive positioning. This document provides a comprehensive analysis to set data-driven, market-appropriate prices.

### Key Recommendations

| Tier | Price (INR/mo) | Price (USD/mo) | Annual (INR/mo) | Target Segment |
|------|---------------|----------------|-----------------|----------------|
| **Free** | Rs 0 | $0 | -- | Students discovering the tool |
| **Plus** | Rs 499 | $6 | Rs 349 (~$4) | UG/PG students, casual researchers |
| **Pro** | Rs 1,499 | $18 | Rs 999 (~$12) | PhD students, active researchers |
| **Team** | Rs 999/user | $12/user | Rs 699/user (~$8) | Lab groups, departments |
| **Institutional** | Custom | Custom | Custom | Universities, medical colleges |

---

## 2. Product Overview & Feature Map

### Core Features (from codebase analysis)

| Feature | AI Model Used | Cost Driver | Notes |
|---------|--------------|-------------|-------|
| **Draft Mode** (chat, rephrase, expand, summarize) | Claude Sonnet 4 | High — streaming tokens | Primary AI cost center |
| **Learn Mode** (Socratic coaching) | Claude Sonnet 4 | Medium — conversational | Multiple turns per session |
| **Deep Research** (search 282M+ papers) | Claude Sonnet 4 + External APIs | High — multi-step agent | PubMed, Semantic Scholar, OpenAlex (free APIs) |
| **Chat with PDF** (RAG) | Claude Sonnet 4 + embeddings | High — large context + embedding costs | OpenAI embeddings (1536-dim vectors) |
| **Integrity Check** (AI detection) | Claude Sonnet 4 | Medium — structured output | Uses `generateObject` |
| **Plagiarism Check** | Copyleaks API | Direct cost — per-scan | Third-party API with per-page pricing |
| **Citations** | None (library-based) | Negligible | Uses citation-js, no AI cost |
| **Slides Generator** | Claude Sonnet 4 | Medium — structured output | Multiple calls per deck |
| **Paper Search** | None (API calls) | Negligible | PubMed/Semantic Scholar/OpenAlex are free |
| **Notebook Mode** | Claude Sonnet 4 | Medium | Synthesis across sources |
| **PICO Extraction** | Claude Sonnet 4 | Low | Single structured call |
| **Evidence Tables** | Claude Sonnet 4 | Medium | Extraction + formatting |
| **Humanize Text** | Claude Sonnet 4 | Low | Short rewrites |
| **Simple tasks** (classification, formatting) | Claude Haiku 4.5 | Low | Cheap model for lightweight work |

### Usage Tracking (from database schema)

The platform tracks these per-user quotas:
- `tokens_used_this_month` / `tokens_limit`
- `searches_used_this_month`
- `plagiarism_checks_used`
- `exports_used_this_month`
- `deep_research_used`

### Rate Limits (current defaults)

| Endpoint Category | Limit |
|-------------------|-------|
| AI chat/generation | 60 requests/hour |
| Search | 120 requests/hour |
| Export (PDF/DOCX/PPTX) | 30 requests/hour |
| Plagiarism/integrity | 20 requests/hour |
| Embedding | 60 requests/hour |

---

## 3. Cost Structure Analysis

### 3.1 AI API Costs (Anthropic Claude)

**Current model pricing (as of Feb 2026):**

| Model | Input (per 1M tokens) | Output (per 1M tokens) | Use in ScholarSync |
|-------|----------------------|------------------------|-------------------|
| Claude Sonnet 4 | $3.00 | $15.00 | Main workhorse — draft, chat, research, extraction |
| Claude Haiku 4.5 | $0.80 | $4.00 | Simple tasks — classification, formatting, summaries |

**Estimated per-user AI costs by usage pattern:**

| User Type | Sessions/mo | Avg Input Tokens/Session | Avg Output Tokens/Session | Monthly Cost (USD) |
|-----------|------------|-------------------------|--------------------------|-------------------|
| **Casual** (free/light) | 10 | 2,000 | 800 | $0.18 |
| **Regular student** | 30 | 3,000 | 1,200 | $0.81 |
| **Active researcher** | 60 | 5,000 | 2,000 | $2.70 |
| **Power user** (PhD writing thesis) | 120 | 8,000 | 3,000 | $8.28 |
| **Heavy power user** (systematic review) | 200 | 10,000 | 4,000 | $18.00 |

**Calculation method:**
- Per session cost = (input_tokens × $3/1M) + (output_tokens × $15/1M)
- Example: Regular student = 30 × ((3,000 × $0.000003) + (1,200 × $0.000015)) = 30 × ($0.009 + $0.018) = $0.81/mo

**Deep Research cost estimate:**
Each deep research session involves multi-step agent workflow (query decomposition → search → read → extract → synthesize), consuming roughly 15,000–40,000 input tokens and 5,000–15,000 output tokens across multiple calls.
- Single deep research session: **$0.12–$0.35**
- 10 sessions/month: **$1.20–$3.50**

**Haiku offloading opportunity:**
Currently, `getSmallModel()` (Haiku 4.5) is defined but underused. Routing simple classification, formatting, and summary tasks through Haiku could reduce costs by 30–40% for those operations. A 50/50 Sonnet/Haiku split on applicable tasks would save approximately **$0.15–$0.50/user/month** for active users.

### 3.2 Embedding Costs (OpenAI)

The codebase uses 1536-dimensional vectors (OpenAI `text-embedding-3-small`):
- **Pricing:** $0.02 per 1M tokens
- **Per paper embedded:** ~2,000 tokens → $0.00004
- **User embedding 100 papers/month:** ~$0.004
- **Negligible cost** — effectively free at any scale

### 3.3 Copyleaks (Plagiarism Detection)

Copyleaks charges per scan based on word count:
- **Typical pricing:** $0.02–$0.05 per page (250 words)
- **Average paper (5,000 words / 20 pages):** $0.40–$1.00 per scan
- **This is the highest marginal cost per action** in the platform

### 3.4 Infrastructure Costs (GCP)

Current setup (asia-south1, Mumbai):

| Component | Monthly Cost (USD) | Notes |
|-----------|-------------------|-------|
| Cloud SQL (db-f1-micro, 10GB SSD) | $8–$15 | Shared vCPU, adequate for <1,000 users |
| Cloud Run (1 instance, 256MB–1GB) | $5–$30 | Auto-scales; pay-per-request |
| GCS (PDF storage) | $0.02/GB | Grows with user uploads |
| Artifact Registry | $0.10/GB | Docker images |
| Secret Manager | ~$0.06/secret/mo | 11 secrets |
| VPC Connector | $6.50 | Flat rate |
| Upstash Redis | $0 (free tier) or $10 | Rate limiting |
| **Total baseline** | **$25–$65/mo** | Before scaling |

**Scaling estimates:**

| Users | Cloud SQL Tier | Cloud Run | Est. Monthly Infra Cost |
|-------|---------------|-----------|------------------------|
| 0–1,000 | db-f1-micro | 1–2 instances | $25–$65 |
| 1,000–5,000 | db-g1-small | 2–5 instances | $80–$200 |
| 5,000–20,000 | db-custom-2-7680 | 5–15 instances | $300–$800 |
| 20,000–100,000 | db-custom-4-15360 | 15–50 instances | $1,000–$3,000 |

### 3.5 Third-Party SaaS Costs

| Service | Free Tier | Paid Tier | Trigger |
|---------|-----------|-----------|---------|
| **Clerk** (auth) | 10,000 MAU free | $0.02/MAU after | At scale |
| **Copyleaks** | None (pay-per-use) | ~$0.02–$0.05/page | Every plagiarism scan |
| **Upstash Redis** | 10,000 requests/day free | $10/mo+ | At scale |
| **Domain + DNS** | -- | $10–$15/year | Fixed |

### 3.6 Team & Operational Costs (Projected)

| Role | Monthly Cost (INR) | Monthly Cost (USD) | Notes |
|------|-------------------|-------------------|-------|
| Founder (full-time) | Rs 0 (sweat equity) | $0 | Initial phase |
| Full-stack dev (1) | Rs 80,000–1,50,000 | $950–$1,800 | After MVP validation |
| AI/ML engineer (1) | Rs 1,00,000–2,00,000 | $1,200–$2,400 | For prompt optimization, RAG tuning |
| Design/UX (contract) | Rs 30,000–50,000 | $350–$600 | Part-time |
| Customer support (1) | Rs 25,000–40,000 | $300–$480 | After 1,000+ paying users |
| Office/coworking | Rs 15,000–30,000 | $180–$360 | Optional initially |
| Legal/accounting | Rs 10,000–20,000 | $120–$240 | Monthly retainer |
| **Total team burn** | **Rs 2,60,000–5,90,000** | **$3,100–$7,080** | -- |

---

## 4. Competitive Landscape & Pricing Benchmarks

### 4.1 Direct Competitors — Pricing Comparison

| Tool | Free Tier | Paid Price (Monthly) | Paid Price (Annual/mo) | Key Differentiator |
|------|-----------|---------------------|----------------------|-------------------|
| **SciSpace** | Limited (30 previews, 1K words) | $20/mo (Premium), $70/mo (Advanced) | $12/mo (Premium annual) | Deep Review, journal formatting |
| **Jenni AI** | 200 words/day | $20/mo | $12/mo | AI writing focused, citation assist |
| **Elicit** | 5,000 credits free | $12/mo (Plus), $25+ (Pro) | $10/mo (Plus annual) | Research workflow, systematic review |
| **Consensus** | Limited searches | $12/mo (Premium) | $8.99/mo (annual) | Search-focused, evidence-based answers |
| **Scite.ai** | Limited | $20/mo (individual) | $12/mo (annual) | Smart citations, citation context |
| **ResearchRabbit** | Free | Free | Free | Paper discovery only (limited scope) |
| **Connected Papers** | 5 graphs/month | $3–$5/mo | -- | Visual citation graphs only |
| **Paperpal** | Limited checks | $12–$21/mo | $9–$18/mo | Language editing, manuscript checks |
| **Writefull** | Limited | $6–$16/mo | -- | Academic language editing |

### 4.2 Market Positioning

**Price anchoring insight:** The competitive median for a comprehensive academic AI tool sits at **$12–$20/month globally** and **$8–$12/month on annual plans**. Most tools offer a single premium tier at $12–$20.

**India-specific context:**
- Indian students and early-career researchers are extremely price-sensitive
- Rs 499/month (~$6) is the psychological sweet spot for Indian student SaaS (comparable to Canva Pro India pricing at Rs 500/mo)
- Rs 1,499/month (~$18) is acceptable for working professionals and funded PhD students
- Many competitors do not have India-specific pricing, creating an opportunity

**ScholarSync's competitive advantage:**
ScholarSync is the **only** tool combining ALL of: Socratic learning + AI writing + deep research + systematic review + plagiarism detection + slides + citations in one platform. Competitors typically cover 2–3 of these. This "all-in-one" positioning justifies a premium — or enables aggressive per-feature pricing that undercuts specialists.

---

## 5. Recommended Pricing Tiers

### 5.1 Tier Structure

#### Free Tier — "Explorer"
**Price: Rs 0 / $0**

| Feature | Limit |
|---------|-------|
| AI chat & drafting | 5,000 tokens/month (~15–20 messages) |
| Paper search | 50 searches/month |
| PDF upload & chat | 3 papers/month |
| Learn Mode | 5 sessions/month |
| Deep Research | Not included |
| Plagiarism check | Not included |
| Exports (PDF/DOCX) | 3/month (watermarked) |
| Slides generation | Not included |
| Citation formatting | Unlimited |
| Projects | 2 max |
| Papers per project | 20 max |

**Purpose:** Acquisition funnel. Let students experience the product and hit limits that drive upgrades. The 5,000 token limit means users can do ~15–20 meaningful interactions before needing to upgrade.

**Estimated cost to serve free user:** $0.05–$0.20/month (AI tokens only)

#### Plus Tier — "Student"
**Price: Rs 499/month ($6) | Rs 349/month annual ($4/mo, billed Rs 4,188/year)**

| Feature | Limit |
|---------|-------|
| AI chat & drafting | 50,000 tokens/month |
| Paper search | 500 searches/month |
| PDF upload & chat | 25 papers/month |
| Learn Mode | Unlimited |
| Deep Research | 5 sessions/month |
| Plagiarism check | 3 scans/month |
| AI detection | 10 checks/month |
| Exports | 20/month (no watermark) |
| Slides generation | 5 decks/month |
| Citation formatting | Unlimited |
| Projects | 10 max |
| Papers per project | 100 max |
| File upload | 25 MB max |

**Target:** UG/PG students, casual researchers who need more than free but aren't writing publications regularly.

**Estimated cost to serve:** $0.50–$1.20/month
**Gross margin:** 75–85%

#### Pro Tier — "Researcher"
**Price: Rs 1,499/month ($18) | Rs 999/month annual ($12/mo, billed Rs 11,988/year)**

| Feature | Limit |
|---------|-------|
| AI chat & drafting | 300,000 tokens/month |
| Paper search | Unlimited |
| PDF upload & chat | Unlimited |
| Learn Mode | Unlimited |
| Deep Research | 30 sessions/month |
| Plagiarism check | 15 scans/month |
| AI detection | Unlimited |
| Exports | Unlimited |
| Slides generation | Unlimited |
| Citation formatting | Unlimited (all 10,000+ styles) |
| Notebook Mode | Unlimited |
| Evidence tables | Unlimited |
| PICO extraction | Unlimited |
| Projects | Unlimited |
| Papers per project | 500 max |
| File upload | 100 MB max |
| Priority support | Yes |

**Target:** PhD students, postdocs, active researchers writing papers, faculty.

**Estimated cost to serve:** $2.00–$5.00/month (average), up to $10 for heavy users
**Gross margin:** 60–75%

#### Team Tier — "Lab"
**Price: Rs 999/user/month ($12/user) | Rs 699/user/month annual ($8/user)**
**Minimum 3 users**

Everything in Pro, plus:
- Shared project workspaces
- Team admin dashboard
- Shared paper library across team
- Usage analytics per team member
- Volume discount: 10+ users get 15% off, 25+ users get 25% off

**Target:** Research lab groups, small departments, study groups

#### Institutional Tier — "Campus"
**Price: Custom (contact sales)**

Everything in Team, plus:
- SSO/SAML integration
- Unlimited users within institution
- Custom branding
- Dedicated support manager
- Usage analytics & reporting
- Custom API access
- Data residency options
- Typical pricing: $2,000–$10,000/year per department, or $5–$15/user/year for campus-wide

---

### 5.2 Pricing Rationale

**Why Rs 499 (not Rs 1,000 as currently coded):**
1. Rs 1,000/month is above the Indian student SaaS comfort zone (Rs 299–599 is the sweet spot)
2. Jenni AI and Elicit charge $12/mo globally — Rs 499 ($6) undercuts them in India while remaining profitable
3. Higher conversion rate at Rs 499 × more users > fewer users at Rs 1,000
4. Annual plan at Rs 349/mo provides lock-in and upfront cash

**Why Rs 1,499 (not Rs 2,000):**
1. Aligns with the global $12–$20 range when considering annual pricing
2. Rs 1,499 is a proven Indian SaaS price point (used by Notion, Canva Pro teams, etc.)
3. Covers power-user AI costs while maintaining 60%+ gross margins

---

## 6. Unit Economics Model

### 6.1 Blended Cost Per User

| Cost Component | Free User | Plus User | Pro User | Team User |
|----------------|-----------|-----------|----------|-----------|
| AI API (Claude) | $0.10 | $0.80 | $3.50 | $3.00 |
| Embeddings | $0.001 | $0.004 | $0.01 | $0.01 |
| Copyleaks | $0.00 | $0.90 | $4.50 | $3.75 |
| Infrastructure (per-user share) | $0.02 | $0.05 | $0.08 | $0.06 |
| Clerk auth | $0.00 | $0.02 | $0.02 | $0.02 |
| **Total COGS/user/mo** | **$0.12** | **$1.77** | **$8.11** | **$6.84** |
| Revenue/user/mo | $0.00 | $6.00 | $18.00 | $12.00 |
| **Gross Margin** | **-$0.12** | **$4.23 (70%)** | **$9.89 (55%)** | **$5.16 (43%)** |

*Note: Pro user COGS is higher because Copyleaks plagiarism scans are expensive. If AI-based integrity checks substitute for some scans, Pro gross margin improves to 65–70%.*

### 6.2 Blended Gross Margin Target

Assuming a user mix of:
- 70% free, 20% Plus, 7% Pro, 3% Team

| Metric | Value |
|--------|-------|
| Paying user % | 30% |
| Blended ARPU (paying users) | $9.60/mo |
| Blended COGS (paying users) | $3.14/mo |
| **Blended gross margin** | **67%** |

### 6.3 Key Cost Levers

1. **Haiku offloading:** Route 40%+ of AI calls to Haiku 4.5 instead of Sonnet 4. Impact: -20–30% on AI costs.
2. **Prompt caching:** Anthropic's prompt caching can reduce input token costs by up to 90% for repeated system prompts and context. Impact: -15–25% on AI costs.
3. **Copyleaks substitution:** Use AI-based integrity checking (already built) as default, reserve Copyleaks for "certified" scans on Pro tier. Impact: -60% on plagiarism costs.
4. **Embedding model switch:** Continue using text-embedding-3-small (already cheapest option).
5. **Token budget enforcement:** Implement hard token budgets per tier to prevent cost overruns.

**Optimized COGS after implementing levers:**

| Component | Before Optimization | After Optimization | Savings |
|-----------|--------------------|--------------------|---------|
| AI API (avg paying user) | $2.10 | $1.35 | -36% |
| Copyleaks (avg) | $2.25 | $0.90 | -60% |
| Other | $0.15 | $0.15 | 0% |
| **Total COGS (avg paying)** | **$4.50** | **$2.40** | **-47%** |
| **Blended gross margin** | **67%** | **75%** | +8pts |

---

## 7. Customer Acquisition Cost (CAC) Analysis

### 7.1 Channel-by-Channel CAC

Based on comprehensive marketing research for the academic SaaS space:

#### India Market

| Channel | Monthly Budget (USD) | Expected Signups | CAC | Notes |
|---------|---------------------|-----------------|-----|-------|
| **YouTube micro-influencers** (10K-100K subs) | $800–$1,200 | 200–600 | $1.50–$4.00 | Best immediate ROI; academic edu-tech niche |
| **Google Ads** (academic keywords) | $500–$1,000 | 200–800 | $1.25–$3.75 | India CPC $0.15–$0.80 for academic terms |
| **Meta Ads** (student targeting) | $400–$600 | 150–500 | $1.00–$4.00 | CPM $0.50–$3.00 in India |
| **Instagram Reels** (studygram) | $300–$500 | 100–300 | $1.50–$5.00 | Brand awareness + signups |
| **Twitter/X** (academic community) | $200–$400 | 50–200 | $2.00–$8.00 | High credibility, lower volume |
| **Organic / SEO** (programmatic) | $2,000–$4,000 | 500–5,000 (at scale) | $0.50–$2.00 | Highest ROI long-term (3–12 month ramp) |
| **Campus ambassadors** | $500–$1,000 | 200–500 | $2.00–$5.00 | College student referral programs |

#### Global Market

| Channel | Monthly Budget (USD) | Expected Signups | CAC | Notes |
|---------|---------------------|-----------------|-----|-------|
| **YouTube influencers** (global academic) | $1,500–$3,000 | 100–400 | $7.50–$15.00 | Higher costs, broader reach |
| **Google Ads** (US/UK keywords) | $2,000–$5,000 | 100–350 | $14–$30 | CPC $1.50–$8.00 |
| **TikTok StudyTok** | $1,000–$3,000 | 100–400 | $5–$15 | Great for student audience |
| **SEO (programmatic paper pages)** | $4,000–$8,000 | 1,000–10,000 | $0.50–$4.00 | Massive ROI at scale |

### 7.2 Recommended Marketing Budget Allocation

**Phase 1: Pre-launch / First 1,000 users (Budget: Rs 1–2 lakh/mo, $1,200–$2,400)**

| Channel | Budget | % |
|---------|--------|---|
| YouTube micro-influencers (India) | $600 | 35% |
| Google Ads (India) | $400 | 25% |
| Instagram/Meta (India students) | $300 | 18% |
| Campus ambassador program | $200 | 12% |
| Twitter/X organic + seeding | $100 | 6% |
| SEO tooling setup | $100 | 6% |

**Expected:** 500–1,500 signups/month, blended CAC $1.50–$4.00

**Phase 2: Growth (1,000–10,000 users, Budget: Rs 3–5 lakh/mo, $3,600–$6,000)**

| Channel | Budget | % |
|---------|--------|---|
| SEO (programmatic paper indexing) | $2,000 | 35% |
| YouTube influencers (India + global) | $1,500 | 25% |
| Google Ads (multi-geo) | $1,000 | 17% |
| Meta Ads | $700 | 12% |
| TikTok (global) | $400 | 7% |
| Twitter/X | $200 | 3% |

**Expected:** 2,000–6,000 signups/month, blended CAC $1.00–$3.00

### 7.3 CAC Payback Period

| Tier | ARPU/mo | Blended CAC | Payback Period | LTV (24mo) | LTV:CAC |
|------|---------|-------------|----------------|------------|---------|
| Plus (India) | $4–$6 | $3.00 | < 1 month | $48–$72 | 16–24x |
| Pro (India) | $12–$18 | $3.00 | < 1 month | $144–$216 | 48–72x |
| Plus (Global) | $6 | $12.00 | 2 months | $72 | 6x |
| Pro (Global) | $18 | $12.00 | < 1 month | $216 | 18x |

**Verdict:** India-first strategy has exceptional unit economics — CAC payback in under 1 month for most channels, with LTV:CAC ratios of 16–72x.

### 7.4 Programmatic SEO — The Long-Term Moat

**Strategy:** Index 100,000–1,000,000 paper abstracts/metadata as searchable web pages on scholarsync.com. Each page becomes a landing page for long-tail academic searches.

| Scale | Investment | Monthly Traffic (6–12mo) | Equivalent Ad Value | CPA |
|-------|-----------|--------------------------|--------------------|----|
| 50K papers | $5,000 setup + $2,000/mo | 10,000–50,000 visits | $5,000–$25,000/mo | $0.50–$1.00 |
| 500K papers | $10,000 setup + $4,000/mo | 100,000–500,000 visits | $50,000–$250,000/mo | $0.20–$0.50 |

This is how Semantic Scholar built 10M+ monthly organic visits. ScholarSync already has paper search infrastructure (PubMed, Semantic Scholar, OpenAlex APIs) — indexing paper landing pages is a natural extension.

---

## 8. Revenue Projections

### 8.1 Conservative Growth Scenario

| Month | Total Users | Free | Plus | Pro | Team | MRR (USD) |
|-------|-------------|------|------|-----|------|-----------|
| 1 | 500 | 425 | 50 | 20 | 5 | $660 |
| 3 | 2,000 | 1,600 | 280 | 90 | 30 | $3,720 |
| 6 | 5,000 | 3,750 | 850 | 300 | 100 | $12,900 |
| 12 | 15,000 | 10,500 | 3,000 | 1,100 | 400 | $47,400 |
| 18 | 35,000 | 24,500 | 7,000 | 2,500 | 1,000 | $115,000 |
| 24 | 70,000 | 49,000 | 14,000 | 5,000 | 2,000 | $230,000 |

### 8.2 Revenue Composition at 12 Months

| Tier | Users | ARPU | MRR | % of Revenue |
|------|-------|------|-----|-------------|
| Plus | 3,000 | $5.00 | $15,000 | 32% |
| Pro | 1,100 | $15.00 | $16,500 | 35% |
| Team | 400 | $10.00 | $4,000 | 8% |
| Institutional (est.) | 5 deals | $2,400/yr ea | $1,000 | 2% |
| Annual prepayments (cash) | -- | -- | $10,900 | 23% |
| **Total MRR** | | | **$47,400** | |
| **ARR** | | | **$568,800** | |

### 8.3 Breakeven Analysis

| Cost Category | Monthly (at 15K users) |
|---------------|----------------------|
| AI API costs | $8,000 |
| Infrastructure | $500 |
| Copyleaks | $2,500 |
| Clerk + SaaS tools | $400 |
| Team (2 devs + support) | $4,000 |
| Marketing | $5,000 |
| Office + misc | $500 |
| **Total monthly burn** | **$20,900** |
| **Monthly revenue** | **$47,400** |
| **Net margin** | **$26,500 (56%)** |

**Breakeven point:** ~4,000–5,000 total users (with 30% paying conversion) or approximately Month 4–5.

---

## 9. Institutional / B2B Pricing

### 9.1 Indian Medical Colleges & Universities

India has 700+ medical colleges and thousands of universities. Institutional deals offer:
- Predictable revenue (annual contracts)
- Low CAC (single sales process for hundreds of users)
- High retention (switching costs are high for institutions)

**Suggested institutional pricing:**

| Package | Price (INR/year) | Price (USD/year) | Includes |
|---------|-----------------|-----------------|----------|
| **Department** (up to 50 users) | Rs 1,50,000 | $1,800 | Pro features for all users |
| **College** (up to 500 users) | Rs 8,00,000 | $9,600 | Pro features + admin dashboard |
| **University** (unlimited) | Rs 20,00,000+ | $24,000+ | Everything + SSO + API + dedicated support |

**Per-user institutional cost:** Rs 250–500/user/year ($3–$6/user/year) — significantly cheaper than individual Pro, creating strong value proposition for procurement.

### 9.2 Global Institutional Pricing

| Package | Price (USD/year) | Per-user equivalent |
|---------|-----------------|-------------------|
| Department (up to 50) | $5,000 | $100/user/year |
| School/College (up to 500) | $25,000 | $50/user/year |
| University (unlimited) | $50,000–$100,000+ | $10–$30/user/year |

---

## 10. Implementation Roadmap

### Phase 1: Launch Pricing (Months 1–3)

1. **Update `razorpay.ts`** to reflect new tier prices:
   - Plus: Rs 499/mo (49900 paise) and Rs 4,188/year (418800 paise)
   - Pro: Rs 1,499/mo (149900 paise) and Rs 11,988/year (1198800 paise)

2. **Update `planEnum`** in database schema:
   - Rename `basic` → `plus` across codebase
   - Add `team` to the enum

3. **Implement usage quotas** per tier:
   ```
   Free:  5,000 tokens, 50 searches, 0 plagiarism, 3 exports, 0 deep research
   Plus:  50,000 tokens, 500 searches, 3 plagiarism, 20 exports, 5 deep research
   Pro:   300,000 tokens, unlimited searches, 15 plagiarism, unlimited exports, 30 deep research
   Team:  Pro limits per user
   ```

4. **Add annual billing** option to Razorpay integration (one-time payment or Razorpay Subscriptions)

5. **Build pricing page** with tier comparison

### Phase 2: Optimization (Months 3–6)

1. **Implement Haiku routing** — route simple tasks to `getSmallModel()` more aggressively
2. **Enable Anthropic prompt caching** for system prompts
3. **Add usage tracking dashboard** for users to see their consumption
4. **A/B test pricing page** — test Rs 499 vs Rs 599 vs Rs 399 for Plus tier
5. **Implement referral program** — give both referrer and referee 1 month Plus free

### Phase 3: Scale (Months 6–12)

1. **Launch Team tier** with shared workspaces
2. **Begin institutional sales outreach** to Indian medical colleges
3. **Implement programmatic SEO** — paper landing pages
4. **Add usage-based overage pricing** (pay-as-you-go beyond limits)
5. **Consider global pricing** — USD pricing for non-India users via Stripe

### Phase 4: Expansion (Months 12–24)

1. **Launch Institutional tier** with SSO, admin tools
2. **Add Stripe** for global payments alongside Razorpay
3. **Consider marketplace** — premium templates, style guides (additional revenue stream)
4. **Evaluate add-on pricing** — premium deep research packs, bulk plagiarism checks

---

## Appendix A: Code Changes Required

### Files to modify:

| File | Change |
|------|--------|
| `src/lib/billing/razorpay.ts` | Update `PLAN_PRICES` and `PLAN_LABELS` |
| `src/lib/db/schema/enums.ts` | Rename `basic` → `plus`, add `team` to `planEnum` |
| `src/lib/db/schema/billing.ts` | Update `usageQuotas` default values |
| `src/lib/actions/billing.ts` | Update plan type unions |
| `src/app/api/billing/*` | Update route handlers for new tier names |
| New: `src/app/(marketing)/pricing/page.tsx` | Pricing page component |
| `src/lib/rate-limit.ts` | Add tier-aware rate limits |

### Database migration needed:

```sql
-- Rename basic → plus in plan enum
ALTER TYPE plan RENAME VALUE 'basic' TO 'plus';
-- Add team to plan enum
ALTER TYPE plan ADD VALUE 'team' AFTER 'pro';

-- Seed usage quotas
INSERT INTO usage_quotas (plan, ai_tokens_monthly, paper_searches_monthly, plagiarism_checks_monthly, exports_monthly, deep_research_monthly, max_projects, max_papers_per_project, max_file_upload_mb) VALUES
  ('free', 5000, 50, 0, 3, 0, 2, 20, 10),
  ('plus', 50000, 500, 3, 20, 5, 10, 100, 25),
  ('pro', 300000, -1, 15, -1, 30, -1, 500, 100),
  ('team', 300000, -1, 15, -1, 30, -1, 500, 100),
  ('institutional', -1, -1, -1, -1, -1, -1, -1, 500);
-- Note: -1 = unlimited
```

---

## Appendix B: Key Metrics to Track

| Metric | Target | Measurement |
|--------|--------|-------------|
| Free → Paid conversion | 15–30% | Monthly cohort analysis |
| Plus → Pro upgrade rate | 10–20% | Within 6 months |
| Monthly churn (Plus) | < 8% | MRR churn |
| Monthly churn (Pro) | < 5% | MRR churn |
| Blended CAC | < $5 (India), < $15 (global) | By channel |
| LTV:CAC ratio | > 10:1 | Per cohort |
| Gross margin | > 65% | Monthly P&L |
| AI cost per active user | < $3.00 | Usage tracking |
| Token utilization rate | 40–60% of limit | Per tier |
| NPS | > 50 | Quarterly survey |

---

## Appendix C: Marketing Cost Reference Data

### YouTube Influencer Costs (India, Academic Niche)

| Tier | Subscribers | Cost/Dedicated Video (INR) | Cost/Integration (INR) |
|------|------------|---------------------------|----------------------|
| Nano | 1K–10K | Rs 2,000–10,000 | Rs 1,000–5,000 |
| Micro | 10K–100K | Rs 10,000–80,000 | Rs 5,000–30,000 |
| Mid | 100K–500K | Rs 80,000–3,00,000 | Rs 30,000–1,50,000 |
| Large | 500K–1M | Rs 3,00,000–8,00,000 | Rs 1,50,000–4,00,000 |

### Google Ads CPC (Academic Keywords)

| Keyword | India CPC (USD) | US CPC (USD) |
|---------|-----------------|--------------|
| "AI research assistant" | $0.30–$0.80 | $2.50–$6.00 |
| "literature review tool" | $0.20–$0.60 | $2.00–$5.00 |
| "academic paper search" | $0.15–$0.40 | $1.50–$3.50 |
| "research paper writing tool" | $0.20–$0.50 | $1.80–$4.00 |
| "citation manager" | $0.15–$0.45 | $1.50–$3.50 |

### Meta Ads CPM (Education Audiences)

| Audience | India CPM (USD) | US CPM (USD) |
|----------|-----------------|--------------|
| College Students (18–24) | $0.50–$1.50 | $6.00–$12.00 |
| Graduate Students | $0.80–$2.00 | $8.00–$15.00 |
| Researchers/Academics | $1.00–$3.00 | $10.00–$20.00 |

Education industry average CPM globally: **$5–$17** (source: SuperAds, WordStream, Varos 2025 benchmarks). Education CPMs run **10–30% below** the all-industry average.

---

*This document should be reviewed quarterly and updated based on actual usage data, competitive moves, and cost changes.*
