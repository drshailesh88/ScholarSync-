# systematic-review — Spec 012

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Hub Page — Loading, Empty State, and Project Cards
- [ ] Card hover changes both border color and title/icon text color through the `group` hover styles
- [ ] Stage badge falls back to raw `reviewStage` text with neutral styling for unknown stage values
- [ ] Paper-count text always renders as `{project.paperCount} papers`
- [ ] Screening-progress text renders only when `screeningProgress > 0`
- [ ] Progress bar renders only when `paperCount > 0`
- [ ] Progress bar inline width style is derived from `screeningProgress`
- [ ] Hub cards link to `/systematic-review/{project.id}` via `Link`, not an imperative router push
#### Workflow Shell — Route Loading, Provider Setup, and Navigation
- [ ] Non-numeric `projectId` params return `null` from the outer page component before rendering workflow UI
- [ ] Liveblocks room id is constructed as `sr-project-{projectId}`
- [ ] SR room provider initial presence includes empty `userId`, `name`, `avatar`, and `color`
- [ ] SR room provider initial presence sets `activeTab` and `currentPaperId` to `null`
- [ ] Workflow page fetches `/api/systematic-review/config?projectId={projectId}` on mount
- [ ] Workflow `404` config response shows centered error text `Project not found`
- [ ] Generic config-load failure shows centered error text `Failed to load project`
- [ ] Error state offers a `Back to Reviews` link to `/systematic-review`
- [ ] Successful workflow load additionally fetches `/api/systematic-review/projects` to derive `paperCount`
- [ ] Failure of the secondary projects fetch is tolerated silently without replacing the main workflow page
- [ ] Workflow loading state is spinner-only and does not show loading copy
- [ ] Route-level loading component shows skeleton icon, title bar, 5 skeleton tabs, and one large content skeleton
- [ ] Route-level error component title is `Systematic Review unavailable`
- [ ] Route-level error component message is `We couldn't load the systematic review tool. Please try again.`
- [ ] Top-left back link text is exactly `All Reviews`
- [ ] Back link uses a `Link` to `/systematic-review`
- [ ] Project header subtitle is `PRISMA 2020-compliant systematic review`
- [ ] Paper-count pill only renders in the header when `paperCount > 0`
- [ ] Stepper label abbreviations are `Search`, `Screening`, `Full-Text`, `Extraction`, `RoB`, `Meta-Analysis`, `Reporting`
#### Workflow Tabs and Presence — Actual Current Behavior
- [ ] Workflow tab bar is built from the shared `Tabs` component with text labels only
- [ ] Workflow tab bar does not render tab icons in the current live shell
- [ ] Workflow tab bar does not render tab counts in the current live shell
- [ ] Workflow tab container is a plain flex row and is not explicitly horizontally scrollable in the current `Tabs` component
- [ ] Active tab default is `strategy`
- [ ] Active tab persists in `scholarsync-systematic-review`
- [ ] Collaborator presence receives `activeTab` updates through `updatePresence({ activeTab })`
- [ ] Collaborator presence self tooltip title is `You`
- [ ] Self tooltip shows the active-tab label when `self.presence.activeTab` exists
