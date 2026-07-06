# Flagship Home Rebuild — Design Spec

**Status:** Approved (design), pending visual iteration in Paper
**Date:** 2026-07-04
**Surface:** Home (the post-login launchpad)
**Kind:** First surface of a complete, decomposed frontend rebuild — the reference implementation the rest of the app copies.

---

## 1. Goal

Rebuild the ScholarSync frontend to competition-grade, starting with **Home** as the flagship. The bar: the presentation quality must match both the competition *and* the quality of the content the app itself generates. Home becomes the living proof of the standard; every other surface then cascades from it.

## 2. Decisions (resolved forks)

These were decided during brainstorming and are now fixed for this work:

1. **Scope is decomposed.** "Rebuild the entire frontend" is too large for one spec. We nail one flagship surface end-to-end, then cascade. Flagship = **Home**.
2. **`design.md` is the sole design authority.** The frozen, council-ratified ink-first system (`docs/design/design.md`) stays as the north star. "From scratch" means rebuilding the *screens/implementation* to finally hit that bar — not re-opening the visual identity.
3. **The greenfield wireframe is canonical for IA only.** `~/S_S_a_2-codex-greenfield-reskin/prototype-greenfield` (`screens-core.js:317` = Home) defines layout, flows, screen inventory, and states. **Its visual skin is NOT canonical** — the prototype does not follow design.md. We take structure from it and apply design.md as the skin.
4. **Build of record is ScholarSync (the real app).** Not the static S_S_a_2 mock. The rebuild lands in real React/Next, wired to real data. S_S_a_2 remains only an optional throwaway visual scratchpad.
5. **New `/home` route behind a flag.** The current `/dashboard` stays the untouched default → zero risk to the 139 E2E tests / medical app until we deliberately flip the switch.
6. **Systematic Review is out of scope for now** — its wireframe logic will be revisited separately (per user).

## 3. Key finding — the wireframe is a navigation re-architecture

The greenfield rail is **five calm items**: `Home · Projects · Library · Inbox · Settings` (+ logo→Home, Shortcuts `?`, Command `⌘K`). The current app's sidebar is many grouped items (Create: Draft/LaTeX/Canvas/Poster/Stage; Research: Explore/Reading Room/Journal Feed/Deep Research/Library/Systematic Review; Audit) with PNG/phosphor icons.

The wireframe **collapses the deep tools inside a Project** (as focus-mode tools), leaving a minimal top-level rail. The user has endorsed this ("the wireframing logic is all true"). Therefore the rebuild is an **IA change, not a repaint**. This spec scopes the *flagship* to Home + the new shell; the full IA cascade (project-centric collapse across all surfaces) is the roadmap that follows.

## 4. Flagship scope

Two pieces — Home cannot look competition-grade inside the old off-system sidebar:

1. **New app shell** — the 5-item calm rail + a topbar carrying the `⌘K` command button. Reskinned to design.md + **Lucide** (replacing phosphor/PNG). No Assistant inspector on Home.
2. **Home center** — the calm launchpad (§5), wired to real `getDashboardData`.

The new shell wraps only the flagged `/home` route. Every other route keeps the existing shell until the cascade reaches it.

## 5. Home IA and data mapping

The calm launchpad, top to bottom:

1. **Header row** — date label + serif greeting ("Good morning, Dr. Singh") on the left; **New project** (ink primary button) on the right.
2. **Search on-ramp** — full-width bar, "Ask a question, or look something up — no project needed", with a Quick Look (`--accent`/sparkles) affordance. Routes to the search/quick-look surface; no project required.
3. **Continue where you left off** — one hero project card: color spine, title, goal · sources · claims, progress meter + phase, **Resume**.
4. **Two-column grid:**
   - **Your projects** — compact list (color spine, title, goal · updated, chevron) + "All →".
   - **What's new** — activity digest (trust dot, title, detail, time) + "Inbox →", footer "Quiet by default — no push notifications".

### Data sources (`getDashboardData()`)

| Home element | Real data |
|---|---|
| Greeting + date | Clerk user + current date |
| Search on-ramp / Quick Look | routes to `/research` (or `/explore` — TBD, §9) |
| Continue where you left off | `recentProjects[0]` |
| Your projects · All | `recentProjects` → `/projects` |
| What's new digest · Inbox | `recentActivity` |
| States (empty / loading / offline) | wireframe `stateCopy` |

**Deliberately calm:** Home does **not** surface the token/usage stats the current dashboard shows. This is on-identity (design.md §1 — "clinical research instrument, not a consumer metrics dashboard").

## 6. design.md application (the skin the prototype lacks)

- **Color** — ink primary button; `--accent` only on the Quick Look / AI affordance; functional color only on the What's-new trust dots. Everything else ink or hairline. Kill the `sky`/chromatic accents from the current dashboard.
- **Type** — Source Serif 4 for the greeting/section titles; DM Sans for body/UI; **JetBrains Mono for every number** (sources · claims · counts), right-aligned where tabular.
- **Surfaces** — hairline `--line` borders, 6–12px radii, flat (no shadows, no gradients).
- **Motion** — recents entrance = one quiet staggered fade (Continuity, §8.1), capped ≤6 items, entrance-only; `transform`/`opacity` only; motion tokens from §8.2; one hero moment max; `prefers-reduced-motion` collapses to instant.
- **Icons** — Lucide only.

## 7. States (from wireframe `stateCopy`)

- **empty** — "Welcome to your desk" + New project / Just look something up.
- **loading** — "Setting up your desk…" (skeletons, not spinners).
- **offline** — cached projects/sources readable; new searches need a connection; Retry.

## 8. Build strategy and safety

- New route `/home` (App Router), server component loads `getDashboardData()`, renders a new `HomeClient` inside the new shell.
- Gated behind a flag; `/dashboard` remains the default landing. No existing route, test, or medical flow is modified.
- The new shell ships as a distinct component (e.g. `AppShellV2`) so it can be adopted route-by-route during the cascade without a big-bang swap.

## 9. Open questions

1. **Quick Look destination** — `/research` vs `/explore` vs a new quick-look surface. Resolve when we design the search surface.
2. **Flag mechanism** — env flag vs. per-user vs. simple route coexistence. Decide at implementation.
3. **Systematic Review** — revisit its wireframe logic separately (user deferred).
4. **Cutover trigger** — what makes `/home` replace `/dashboard` as the default (parity checklist + E2E green).

## 10. Out of scope (this flagship)

- The full IA cascade to the other ~20 surfaces (roadmap, not this spec).
- Backend/data changes — we consume `getDashboardData` as-is.
- Systematic Review.

## 11. Design iteration

Visual form (exact composition, spacing, rhythm) will be refined in **Paper** before/alongside implementation. Paper work happens in a **new, separate file** — the user's existing Paper project is never opened, edited, or deleted (look-before-touch, read-only listing first).

## 12. Provenance

- **Skin (frozen system):** `docs/design/design.md` + `docs/design/reference/{editor-manuscript,systematic-review}.html`
- **IA (structure only):** `~/S_S_a_2-codex-greenfield-reskin/prototype-greenfield/screens/screens-core.js` (Home = `:317`), `js/app.js` (rail = `:110`, shell = `:169`)
- **Real data:** `src/lib/actions/dashboard.ts` (`getDashboardData`)
- **Current (to be replaced):** `src/app/(app)/dashboard/dashboard-client.tsx`, `src/components/layout/{app-shell,app-sidebar,app-header,nav-config}.tsx`
