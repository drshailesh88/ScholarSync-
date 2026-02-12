# ScholarSync - Database Comparison Research

> **Date:** 2026-02-11
> **Status:** Research complete, awaiting founder decision

---

## Executive Summary

11 database options evaluated for ScholarSync. Top contenders: **Convex** (best DX for non-technical founder) and **Supabase** (most mature PostgreSQL ecosystem). Both are excellent — the decision depends on founder preference for "new and elegant" vs "proven and portable."

---

## Ranked Comparison Matrix

| Criteria (weight) | **Convex** | **Supabase** | **Neon+Drizzle** | **MongoDB** | **Turso** | **Firebase** |
|---|---|---|---|---|---|---|
| **Non-tech DX** (25%) | 9.5/10 | 7/10 | 6.5/10 | 7/10 | 6/10 | 7.5/10 |
| **Pricing 0-1K users** (20%) | 9/10 | 9/10 | 8.5/10 | 8/10 | 9.5/10 | 8/10 |
| **Pricing 1K-10K** (10%) | 7/10 | 8/10 | 8/10 | 7/10 | 8/10 | 6/10 |
| **Vector search** (10%) | 8/10 | 9/10 | 9/10 | 8.5/10 | 7/10 | 2/10 |
| **File storage** (10%) | 9/10 | 9/10 | 2/10 | 3/10 | 2/10 | 8/10 |
| **Real-time** (5%) | 10/10 | 7/10 | 3/10 | 5/10 | 3/10 | 9/10 |
| **Clerk integration** (5%) | 10/10 | 9/10 | 8/10 | 7/10 | 7/10 | 5/10 |
| **Vendor lock-in risk** (5%) | 7/10 | 9/10 | 10/10 | 8/10 | 8/10 | 4/10 |
| **Next.js/Vercel** (5%) | 9/10 | 9/10 | 10/10 | 9/10 | 8/10 | 7/10 |
| **Ecosystem** (5%) | 7/10 | 9/10 | 9/10 | 9/10 | 6/10 | 10/10 |
| **WEIGHTED TOTAL** | **8.7** | **8.2** | **7.2** | **7.0** | **6.7** | **6.6** |

---

## Pricing at Scale

### Development / 0-100 users

| Database | Monthly Cost | Notes |
|---|---|---|
| Convex Starter | $0 | 1M function calls, 0.5GB DB, 1GB files |
| Supabase Free | $0 | 500MB DB, 1GB files (pauses after 7d inactivity) |
| Neon Free | $0 | 0.5GB, 100 CU-hours, scale-to-zero |
| Turso Free | $0 | 5GB storage, 500M rows read |
| MongoDB Atlas Free | $0 | 512MB storage |
| Firebase Free | $0 | 50K reads/day, 1GB storage |

### 1,000 active users (~200 daily)

| Database | Est. Monthly Cost |
|---|---|
| Convex Starter | $0-15 |
| Supabase Pro | $25 |
| Neon Launch | $5-20 |
| Turso Developer | $5 |
| MongoDB Atlas Flex | $8-15 |
| Firebase Blaze | $10-30 |

### 10,000 active users (~2,000 daily)

| Database | Est. Monthly Cost |
|---|---|
| Convex Pro | $75-175 |
| Supabase Pro | $75-225 |
| Neon Scale | $50-150 |
| Turso Scaler | $29-50 |
| MongoDB Dedicated | $57-200 |

---

## Top 4 Detailed Analysis

### 1. CONVEX — "Zero-SQL, Maximum DX"

**Ease of use: 9.5/10** — No SQL, pure TypeScript. Claude Code can generate working backend code a non-technical founder can understand, deploy, and debug.

```typescript
// Convex: Get all projects for a user
export const getUserProjects = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// React — automatically reactive, no useEffect needed
function ProjectList() {
  const projects = useQuery(api.projects.getUserProjects, { userId: user.id });
  return projects?.map(p => <div>{p.title}</div>);
}
```

**Built-in:** File storage, vector search, real-time (automatic), Clerk integration (first-class).

**Concerns:** Smaller community, bandwidth costs need monitoring, no HIPAA certification yet.

**Startup program:** Up to 1 year free Professional ($25/mo) + 30% off usage.

### 2. SUPABASE — "Batteries-Included PostgreSQL"

**Ease of use: 7/10** — More approachable than raw PostgreSQL but SQL knowledge helps for advanced features.

```typescript
// Supabase query
const { data, error } = await supabase
  .from('library_papers')
  .insert({ user_id: userId, title: 'TREM2...', embedding: vector })

// Vector similarity search (requires SQL function)
const { data: similar } = await supabase.rpc('match_papers', {
  query_embedding: queryVector,
  match_threshold: 0.78,
  match_count: 10,
});
```

**Built-in:** PostgreSQL + pgvector + auth + file storage + realtime + edge functions.

**Strengths:** Biggest open-source BaaS community (75K+ stars), standard PostgreSQL (zero lock-in), excellent LLM training coverage.

**Concerns:** RLS policies require SQL, schema changes require migrations.

### 3. NEON + DRIZZLE — "Future-Proof PostgreSQL"

**Ease of use: 6.5/10** — TypeScript-first ORM but requires understanding migrations and connection pooling.

**Strengths:** Vercel-native, scale-to-zero, DB branching, zero lock-in.

**Lacks:** No file storage, no real-time, no auth (need separate services for each).

### 4. MONGODB ATLAS — "Document Database"

**Ease of use: 7/10** — Document model maps naturally to academic data. Atlas Vector Search is production-ready.

**Strengths:** Flexible schema, Vercel Marketplace integration, generous free tier.

**Lacks:** No file storage, no real-time subscriptions, no auth.

---

## Eliminated Options

| Database | Why Not |
|----------|---------|
| **Firebase** | Per-read pricing explodes with data-heavy academic apps |
| **PlanetScale** | No free tier (removed Apr 2024), MySQL-only |
| **CockroachDB** | Overengineered for this use case |
| **Appwrite** | Smaller ecosystem, no vector search |
| **Xata** | Free tier gutted Jan 2025, uncertain trajectory |
| **Railway PG** | Too manual, missing key features |

---

## Indian Market Considerations

- Revenue: INR 1,000-2,000/user/month (~$12-24 USD)
- All top contenders cost < $0.03/user/month at 1,000 users
- None will blow the bill at any realistic scale
- HIPAA-adjacent compliance: Supabase Enterprise and Convex Enterprise (coming) offer compliance
- Data residency: Self-hosting Supabase or Convex on Indian cloud (AWS Mumbai, GCP asia-south1) gives full control

---

## The Real Decision: Convex vs Supabase

**Choose Convex if:** Speed of development and DX simplicity will be the difference between shipping and not shipping. Maximum velocity for a non-technical founder with Claude Code.

**Choose Supabase if:** You want the safety net of PostgreSQL's 30-year ecosystem, the largest open-source community, and the most portable data format.

Both are excellent. Neither is wrong.
