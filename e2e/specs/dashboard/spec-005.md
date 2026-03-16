# dashboard — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: `DashboardClient` triggers `migrateLocalDocuments()` once on mount inside `useEffect`
- [x] PASS: Local document migration failures are sent to `console.error`
- [x] PASS: Dashboard content wrapper uses `max-w-5xl mx-auto`
- [x] PASS: Action cards are rendered from the `actionCards` config array in source order
- [x] PASS: Each action card is a `Link`, not a button with imperative routing
- [x] PASS: Each card icon container is `w-12 h-12 rounded-xl`
- [x] PASS: Each card icon uses `size={24}`
- [x] PASS: Each card has `border border-border` before hover styling is applied
- [x] PASS: Card hover scale effect is applied to the icon through `group-hover:scale-110`
- [x] PASS: `Literature Search` card href is `/research`
- [x] PASS: `Write & Draft` card href is `/studio`
- [x] PASS: `Learn Mode` card href is `/studio?mode=learn`
- [x] PASS: `Final Checks` card href is `/compliance`
- [x] PASS: Stats cards are hard-coded as four panels rather than mapped from a config array
- [x] PASS: Each stats card uses `glass-panel rounded-2xl p-5 border border-border`
- [x] PASS: Stats number text uses `text-2xl font-bold`
- [x] PASS: Stats label text uses `text-xs text-ink-muted`
- [x] PASS: `Projects` stat reads `stats.projectCount`
- [x] PASS: `Papers Saved` stat reads `stats.paperCount`
- [x] PASS: `Searches` stat reads `stats.searchCount`
- [x] PASS: `Conversations` stat reads `stats.conversationCount`
- [x] PASS: `Active Manuscripts` rows are rendered directly from `recentProjects`
- [x] PASS: Each project row is an accessible `Link` to `/studio?projectId=${project.id}`
- [x] PASS: Project icon container uses `w-10 h-10 rounded-lg bg-surface-raised`
- [x] PASS: Project title hover changes to `text-brand`
- [x] PASS: Project subtitle format is `{relative time} · {formatted project type}`
- [x] PASS: `formatProjectType(null)` falls back to `Project`
- [x] PASS: `formatRelativeTime(null)` falls back to `Never`
- [x] PASS: Row arrow affordance is a circular bordered container containing `ArrowRight`
- [x] PASS: Reviewing status uses the `active` badge variant in the current implementation
- [x] PASS: Empty manuscripts state is a centered text block with no CTA button
- [x] PASS: Search rows are rendered directly from `recentSearches`
- [x] PASS: Each search row icon container uses `w-8 h-8 rounded-lg bg-surface-raised`
- [x] PASS: Search query text is truncated with `truncate`
- [x] PASS: Search metadata line renders `No results` when `result_count` is null
