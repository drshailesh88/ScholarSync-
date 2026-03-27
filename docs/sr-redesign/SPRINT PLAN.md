# SR Redesign: Sprint Plan

> GSD-style tracking for the Systematic Review module redesign.
> Update this file after each sprint.

-----

## Project Status

**Current Phase**: Sprint 3 - Typography & Spacing
**Last Updated**: March 27, 2026
**Overall Progress**: ███░░░░░░░ 30%

-----

## Sprint 0: Documentation & Setup ✅

**Goal**: Create baseline documentation and project infrastructure.

|Task                      |Status|Notes                                |
|--------------------------|------|-------------------------------------|
|Create CONTEXT.md         |✅ Done|Vision, constraints, brand principles|
|Create ARCHITECTURE.md    |✅ Done|Current state documentation          |
|Create UX_SPEC.md         |✅ Done|Target state specifications          |
|Create SPRINT_PLAN.md     |✅ Done|This file                            |
|Create Claude Code prompts|✅ Done|PLANNING.md, BUILDING.md             |
|Verify existing tests pass|⬜ TODO|Run Playwright suite                 |

**Exit Criteria**: All documentation in place, existing tests passing.

-----

## Sprint 1: Phase Navigation

**Goal**: Transform flat 19-tab navigation into grouped phase navigation.

|Task                            |Status|Notes                                         |
|--------------------------------|------|----------------------------------------------|
|Design phase grouping component |⬜ TODO|                                              |
|Map tabs to phases              |⬜ TODO|Setup, Search, Screen, Assess, Analyze, Report|
|Create PhaseNavigation component|⬜ TODO|                                              |
|Add phase completion indicators |⬜ TODO|                                              |
|Wire to existing tab state      |⬜ TODO|Don’t break activeTab in store                |
|Update workflow page layout     |⬜ TODO|                                              |
|Test all tabs still accessible  |⬜ TODO|                                              |
|Write Playwright tests          |⬜ TODO|                                              |

**Acceptance Criteria**:

- [ ] Tabs grouped into 6 phases
- [ ] Phase indicator shows current position
- [ ] Clicking phase expands to show tabs
- [ ] All existing panels still render
- [ ] No API routes broken
- [ ] Existing E2E tests still pass

-----

## Sprint 2: Screening Speed Mode

**Goal**: Make screening keyboard-first, single-paper focus.

|Task                                  |Status|Notes|
|--------------------------------------|------|-----|
|Create ScreeningSpeedMode component   |✅ Done|Integrated into ScreeningPanel as speed mode toggle|
|Add keyboard shortcuts (I, E, M, ←, →)|✅ Done|With contenteditable guard, input/textarea guard|
|Single paper centered layout          |✅ Done|max-width 720px centered card|
|Progress indicator (234 / 1,616)      |✅ Done|With locale-formatted numbers and mini progress bar|
|Auto-advance after decision           |✅ Done|Handles both unscreened filter (queue shrink) and other filters|
|Keyboard shortcut overlay (?)         |✅ Done|Press ? to toggle, Esc to close|
|Integrate with existing screening API |✅ Done|Reuses existing handleDecision, no API changes|
|Write Playwright tests                |⬜ TODO|     |

**Acceptance Criteria**:

- [ ] User can screen 10 papers in under 60 seconds using keyboard
- [ ] Progress updates after each decision
- [ ] No page reload between papers
- [ ] Decisions saved to database
- [ ] Can navigate back to change decision

-----

## Sprint 3: Typography & Spacing

**Goal**: Apply Studio DNA (fonts, spacing, colors) across SR module.

|Task                            |Status|Notes                     |
|--------------------------------|------|--------------------------|
|Create SR-specific CSS classes  |✅ Done|.sr-panel, .sr-panel-title, .sr-content in globals.css|
|Apply Source Serif 4 to headings|✅ Done|.sr-panel-title uses font-serif across 25+ panels|
|Apply DM Sans to UI elements    |✅ Done|.sr-panel scopes font-sans to UI elements|
|Increase panel padding to p-6   |✅ Done|.sr-panel sets 1.5rem padding on all primary GlassPanels|
|Set content max-width to 900px  |✅ Done|.sr-content (900px centered), wider panels override with max-w-5xl+|
|Update button styles            |⬜ TODO|Match Studio buttons      |
|Add transitions (200ms)         |✅ Done|200ms cubic-bezier on .sr-panel interactive elements|
|Visual QA pass                  |⬜ TODO|LLM-as-judge test         |

**Acceptance Criteria**:

- [ ] All SR screens use correct typography
- [ ] Spacing feels generous, not cramped
- [ ] Buttons and interactions match Studio
- [ ] No visual regressions

-----

## Sprint 4: Empty States

**Goal**: Replace generic “No data” with warm, helpful empty states.

|Task                                      |Status|Notes                                |
|------------------------------------------|------|-------------------------------------|
|Design empty state pattern                |⬜ TODO|Icon + serif title + desc + CTA + tip|
|Create EmptyState component               |⬜ TODO|                                     |
|Implement for: Hub (no projects)          |⬜ TODO|                                     |
|Implement for: Import (no papers)         |⬜ TODO|                                     |
|Implement for: Screening (none to screen) |⬜ TODO|                                     |
|Implement for: Extraction (none extracted)|⬜ TODO|                                     |
|Implement for: Meta-analysis (no data)    |⬜ TODO|                                     |
|Write Playwright tests                    |⬜ TODO|                                     |

**Acceptance Criteria**:

- [ ] All empty states follow same pattern
- [ ] Each empty state has relevant icon
- [ ] Each empty state has clear CTA
- [ ] Each empty state has helpful tip

-----

## Sprint 5: Hub Page Redesign

**Goal**: Transform project list into card-based dashboard.

|Task                          |Status|Notes|
|------------------------------|------|-----|
|Design project card component |⬜ TODO|     |
|Show visual progress indicator|⬜ TODO|     |
|Show paper counts             |⬜ TODO|     |
|Show last updated             |⬜ TODO|     |
|Create “New Review” card      |⬜ TODO|     |
|Implement card grid layout    |⬜ TODO|     |
|Wire to existing projects API |⬜ TODO|     |
|Write Playwright tests        |⬜ TODO|     |

**Acceptance Criteria**:

- [ ] Projects shown as cards
- [ ] Progress visible at a glance
- [ ] Empty state for no projects
- [ ] Create new project works

-----

## Sprint 6: Full-Text Split View

**Goal**: PDF alongside eligibility checklist for full-text review.

|Task                                |Status|Notes|
|------------------------------------|------|-----|
|Design split view layout            |⬜ TODO|     |
|Integrate PDF viewer (left)         |⬜ TODO|     |
|Create eligibility checklist (right)|⬜ TODO|     |
|Make split resizable                |⬜ TODO|     |
|Add exclusion reason selector       |⬜ TODO|     |
|Add notes field                     |⬜ TODO|     |
|Wire to existing full-text API      |⬜ TODO|     |
|Write Playwright tests              |⬜ TODO|     |

**Acceptance Criteria**:

- [ ] PDF loads correctly
- [ ] Checklist updates on click
- [ ] Exclusion reason required if excluding
- [ ] Notes save automatically

-----

## Sprint 7: RoB Accordion View

**Goal**: Domain-based accordion with traffic light indicators.

|Task                           |Status|Notes               |
|-------------------------------|------|--------------------|
|Design domain accordion        |⬜ TODO|                    |
|Implement traffic light logic  |⬜ TODO|                    |
|Auto-calculate overall judgment|⬜ TODO|                    |
|Supporting text per domain     |⬜ TODO|                    |
|Navigation between studies     |⬜ TODO|                    |
|Handle multiple RoB tools      |⬜ TODO|RoB2, ROBINS-I, etc.|
|Write Playwright tests         |⬜ TODO|                    |

**Acceptance Criteria**:

- [ ] Domains expand/collapse
- [ ] Traffic lights update based on answers
- [ ] Overall judgment auto-calculated
- [ ] Correct tool shown per review type

-----

## Sprint 8: PRISMA Auto-Generation

**Goal**: Flow diagram with auto-populated counts.

|Task                        |Status|Notes|
|----------------------------|------|-----|
|Design PRISMA 2020 layout   |⬜ TODO|     |
|Auto-populate counts from DB|⬜ TODO|     |
|Real-time updates           |⬜ TODO|     |
|Export to SVG/PNG           |⬜ TODO|     |
|Clickable boxes show papers |⬜ TODO|     |
|Write Playwright tests      |⬜ TODO|     |

**Acceptance Criteria**:

- [ ] Counts match database
- [ ] Diagram updates in real-time
- [ ] Export works
- [ ] PRISMA 2020 compliant

-----

## Future Sprints (Backlog)

- Meta-Analysis Workspace improvements
- Network Meta-Analysis polish
- GRADE evidence profiles
- Manuscript auto-generation
- Living review alerts
- Buddy integration per screen
- Mobile responsive optimization
- Performance optimization

-----

## How to Use This File

### Starting a Sprint

1. Move sprint from “TODO” to “In Progress”
1. Break down tasks if needed
1. Update status as you work

### Completing a Task

Change status:

- `⬜ TODO` → `🔄 In Progress` → `✅ Done`
- If blocked: `⚠️ Blocked`
- If deferred: `⏸️ Deferred`

### Completing a Sprint

1. Verify all acceptance criteria met
1. Run Playwright tests
1. Update overall progress percentage
1. Move to next sprint

### Adding New Tasks

Add to current sprint or backlog as needed. Keep tasks small enough to complete in one Claude Code session.

-----

*Last updated: March 27, 2026*