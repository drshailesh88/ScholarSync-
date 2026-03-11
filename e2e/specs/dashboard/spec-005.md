# dashboard — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] `DashboardClient` triggers `migrateLocalDocuments()` once on mount inside `useEffect`
- [ ] Local document migration failures are sent to `console.error`
- [ ] Dashboard content wrapper uses `max-w-5xl mx-auto`
- [ ] Action cards are rendered from the `actionCards` config array in source order
- [ ] Each action card is a `Link`, not a button with imperative routing
- [ ] Each card icon container is `w-12 h-12 rounded-xl`
- [ ] Each card icon uses `size={24}`
- [ ] Each card has `border border-border` before hover styling is applied
- [ ] Card hover scale effect is applied to the icon through `group-hover:scale-110`
- [ ] `Literature Search` card href is `/research`
- [ ] `Write & Draft` card href is `/studio`
- [ ] `Learn Mode` card href is `/studio?mode=learn`
- [ ] `Final Checks` card href is `/compliance`
- [ ] Stats cards are hard-coded as four panels rather than mapped from a config array
- [ ] Each stats card uses `glass-panel rounded-2xl p-5 border border-border`
- [ ] Stats number text uses `text-2xl font-bold`
- [ ] Stats label text uses `text-xs text-ink-muted`
- [ ] `Projects` stat reads `stats.projectCount`
- [ ] `Papers Saved` stat reads `stats.paperCount`
- [ ] `Searches` stat reads `stats.searchCount`
- [ ] `Conversations` stat reads `stats.conversationCount`
- [ ] `Active Manuscripts` rows are rendered directly from `recentProjects`
- [ ] Each project row uses `router.push(`/studio/${project.id}`)` on click
- [ ] Project icon container uses `w-10 h-10 rounded-lg bg-surface-raised`
- [ ] Project title hover changes to `text-brand`
- [ ] Project subtitle format is `{relative time} · {formatted project type}`
- [ ] `formatProjectType(null)` falls back to `Project`
- [ ] `formatRelativeTime(null)` falls back to `Never`
- [ ] Row arrow affordance is a circular bordered container containing `ArrowRight`
- [ ] Reviewing status uses the `active` badge variant in the current implementation
- [ ] Empty manuscripts state is a centered text block with no CTA button
- [ ] Search rows are rendered directly from `recentSearches`
- [ ] Each search row icon container uses `w-8 h-8 rounded-lg bg-surface-raised`
- [ ] Search query text is truncated with `truncate`
- [ ] Search metadata line renders `No results` when `result_count` is null
