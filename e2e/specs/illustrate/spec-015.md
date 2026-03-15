# illustrate — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Welcome Page — Detailed Behavior
- [x] PASS: Recent diagram card `aria-label` includes both diagram name and relative last-edited text
- [x] PASS: Recent diagram thumbnail renders `img` when `thumbnail` exists and falls back to file icon when missing
- [x] PASS: Recent diagram thumbnail image is decorative with empty `alt` and `aria-hidden="true"`
- [x] PASS: Relative date formatter falls back to locale date string after 7 or more days
- [x] PASS: Empty Recent Diagrams state shows exact text "No recent diagrams. Create your first one!"
- [x] PASS: Quick Templates grid label is "Quick templates" via `aria-label`
- [x] PASS: Quick template card `aria-label` includes both template name and description
- [x] PASS: Quick template cards navigate to `/illustrate/agent?template={id}` even though the agent page itself does not consume that query param in the current route component
- [x] PASS: Welcome-page template cards expose only icon and name text; description is used in accessibility label rather than shown visibly
- [x] PASS: Welcome-page keyboard activation helper triggers on `Enter` and Space and prevents default on Space
#### Agent Mode — Hydration, Layout, and Sidebar
- [x] PASS: `/illustrate/agent` shows a three-column skeleton before client hydration completes
- [x] PASS: Hydration skeleton includes placeholder left sidebar, chat area, and preview pane blocks
- [x] PASS: Agent mode is wrapped in an `ErrorBoundary` with full-screen illustration fallback UI
- [x] PASS: Template sidebar title reads "Templates"
- [x] PASS: Sidebar collapse button title is "Collapse sidebar"
- [x] PASS: Collapsed sidebar replaces the full template list with a single expand button
- [x] PASS: Collapsed sidebar expand button title is "Expand sidebar"
- [x] PASS: Template search input placeholder reads "Search templates..."
- [x] PASS: Category tabs are hidden whenever template search query is non-empty
- [x] PASS: Template search matches against template `name` and `description`
- [x] PASS: Template search pulls from all templates across categories instead of only the selected category
- [x] PASS: Empty template-search state shows exact text "No templates found"
- [x] PASS: Sidebar footer helper text reads "Click a template to populate the prompt"
- [x] PASS: Selected category default is `medicine`
- [x] PASS: Selected category persists via `finnish-agent-storage`
- [x] PASS: Sidebar collapsed state does not persist across refresh because `isSidebarCollapsed` is not included in store partialization
- [x] PASS: Template search text does not persist across refresh because it is component-local state
- [x] PASS: Category tabs shown in the live sidebar are Medicine, Biology, Chemistry, and General
- [x] PASS: Medicine category contains exactly 3 built-in templates in the store
- [x] PASS: Biology category contains exactly 3 built-in templates in the store
- [x] PASS: Chemistry category contains exactly 2 built-in templates in the store
- [x] PASS: General category contains exactly 4 built-in templates in the store
- [x] PASS: Template card click calls `onSelectTemplate(template.prompt)` directly
- [x] PASS: Template click sends the prompt immediately in the current route instead of prefilling the textarea for later edit
#### Agent Mode — Prompt Input and Generation Flow
- [x] PASS: Prompt input is a multiline `textarea`, not a single-line input
