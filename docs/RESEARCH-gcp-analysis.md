# ScholarSync - GCP Analysis

> **Date:** 2026-02-11
> **Status:** Research complete

---

## Founder's Reasoning for GCP

1. **Startup credits ($200K)** — 1-2 years of free infrastructure
2. **Google ecosystem** — Firebase, Cloud Run, Vertex AI, BigQuery, Cloud Storage
3. **Tutorials + LLM help** — Excellent docs, extensive Claude/GPT training data

---

## Competitor Cloud Choices

| Cloud | Used By |
|-------|---------|
| **GCP** | Consensus, Jenni AI, partially Elicit |
| **AWS** | Paperpal/CACTUS (primary), partially Elicit |
| **Azure** | Connected Papers, ResearchRabbit/Litmaps |

**GCP is the most popular choice among smaller, leaner startups** in the academic AI space.

---

## Where GCP Makes Sense for ScholarSync

### 1. Google Cloud for Startups Program
- Up to **$200K in GCP credits** over 2 years
- ScholarSync likely qualifies (solo founder, pre-revenue, pre-Series A)
- Covers compute, storage, and AI services

### 2. India Data Residency
- **Mumbai region (asia-south1)** — low latency for Indian med students
- Helps with DISHA compliance (Indian medical data regulations)

### 3. Cloud Run — Docling PDF Microservice
- Deploy Docker container for Python PDF extraction
- Scales to zero when idle — pay only when processing
- Essentially free at low volume

### 4. Vertex AI — SPECTER2 Embeddings
- Deploy academic embedding model on managed endpoints
- Auto-scales, no GPU management needed

---

## Where GCP Does NOT Make Sense

### Replacing Vercel
- Vercel is purpose-built for Next.js (zero-config, edge functions, ISR, image optimization)
- GCP alternatives (Cloud Run, App Engine) need Docker, load balancers, CDN config
- AI SDK built by Vercel FOR Vercel

### Replacing Convex/Supabase
- Cloud SQL: Need to manage connection pooling, scaling, backups, file storage (separately), real-time (separately), auth (separately) — 4-5 services instead of 1
- Firestore: Per-read pricing dangerous for data-heavy academic apps
- AlloyDB: Starts at ~$100/month minimum, overkill at launch

### Replacing Clerk
- Firebase Auth is good but Clerk has better React/Next.js components and Convex/Supabase integrations

---

## Recommended Hybrid Approach

```
Vercel (frontend) + Convex OR Supabase (database) + Clerk (auth)
    +
GCP Cloud Run → Docling PDF microservice (scales to zero, Mumbai region)
GCP Vertex AI → SPECTER2 embedding endpoint (optional)
GCP Cloud Storage → backup/archive (if needed)
```

- Keep the simple, managed stack for 95% of the app
- Use GCP only for Python/ML workloads that Vercel can't run
- $200K startup credits cover these GCP costs easily
- Cloud Run in Mumbai = low latency for Indian users

---

## Cost Estimate (Hybrid Approach, GCP portion only)

| Service | Monthly Cost | With Credits |
|---------|-------------|-------------|
| Cloud Run (Docling) | $5-20 | $0 (credited) |
| Vertex AI (SPECTER2) | $20-100 | $0 (credited) |
| Cloud Storage (backup) | $1-5 | $0 (credited) |
| **Total GCP** | **$26-125** | **$0 for 1-2 years** |
