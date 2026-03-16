# systematic-review — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Hub Page — Loading, Empty State, and Project Cards
- [x] PASS: Card hover changes both border color and title/icon text color through the `group` hover styles
- [x] PASS: Stage badge falls back to raw `reviewStage` text with neutral styling for unknown stage values
- [x] PASS: Paper-count text always renders as `{project.paperCount} papers`
- [x] PASS: Screening-progress text renders only when `screeningProgress > 0`
- [x] PASS: Progress bar renders only when `paperCount > 0`
- [x] PASS: Progress bar inline width style is derived from `screeningProgress`
- [x] PASS: Hub cards link to `/systematic-review/{project.id}` via `Link`, not an imperative router push
#### Workflow Shell — Route Loading, Provider Setup, and Navigation
- [x] PASS: Non-numeric `projectId` params return `null` from the outer page component before rendering workflow UI
- [x] PASS: Liveblocks room id is constructed as `sr-project-{projectId}`
- [x] PASS: SR room provider initial presence includes empty `userId`, `name`, `avatar`, and `color`
- [x] PASS: SR room provider initial presence sets `activeTab` and `currentPaperId` to `null`
- [x] PASS: Workflow page fetches `/api/systematic-review/config?projectId={projectId}` on mount
- [x] PASS: Workflow `404` config response shows centered error text `Project not found`
- [x] PASS: Generic config-load failure shows centered error text `Failed to load project`
- [x] PASS: Error state offers a `Back to Reviews` link to `/systematic-review`
- [x] PASS: Successful workflow load additionally fetches `/api/systematic-review/projects` to derive `paperCount`
- [x] PASS: Failure of the secondary projects fetch is tolerated silently without replacing the main workflow page
- [x] PASS: Workflow loading state is spinner-only and does not show loading copy
- [x] PASS: Route-level loading component shows skeleton icon, title bar, 5 skeleton tabs, and one large content skeleton
- [x] PASS: Route-level error component title is `Systematic Review unavailable`
- [x] PASS: Route-level error component message is `We couldn't load the systematic review tool. Please try again.`
- [x] PASS: Top-left back link text is exactly `All Reviews`
- [x] PASS: Back link uses a `Link` to `/systematic-review`
- [x] PASS: Project header subtitle is `PRISMA 2020-compliant systematic review`
- [x] PASS: Paper-count pill only renders in the header when `paperCount > 0`
- [x] PASS: Stepper label abbreviations are `Search`, `Screening`, `Full-Text`, `Extraction`, `RoB`, `Meta-Analysis`, `Reporting`
#### Workflow Tabs and Presence — Actual Current Behavior
- [x] PASS: Workflow tab bar is built from the shared `Tabs` component with text labels only
- [x] PASS: Workflow tab bar does not render tab icons in the current live shell
- [x] PASS: Workflow tab bar does not render tab counts in the current live shell
- [x] PASS: Workflow tab container is a plain flex row and is not explicitly horizontally scrollable in the current `Tabs` component
- [x] PASS: Active tab default is `strategy`
- [x] PASS: Active tab persists in `scholarsync-systematic-review`
- [x] PASS: Collaborator presence receives `activeTab` updates through `updatePresence({ activeTab })`
- [x] PASS: Collaborator presence self tooltip title is `You`
- [x] PASS: Self tooltip shows the active-tab label when `self.presence.activeTab` exists
