# illustrate — Spec 015

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Welcome Page — Detailed Behavior
- [ ] Recent diagram card `aria-label` includes both diagram name and relative last-edited text
- [ ] Recent diagram thumbnail renders `img` when `thumbnail` exists and falls back to file icon when missing
- [ ] Recent diagram thumbnail image is decorative with empty `alt` and `aria-hidden="true"`
- [ ] Relative date formatter falls back to locale date string after 7 or more days
- [ ] Empty Recent Diagrams state shows exact text "No recent diagrams. Create your first one!"
- [ ] Quick Templates grid label is "Quick templates" via `aria-label`
- [ ] Quick template card `aria-label` includes both template name and description
- [ ] Quick template cards navigate to `/illustrate/agent?template={id}` even though the agent page itself does not consume that query param in the current route component
- [ ] Welcome-page template cards expose only icon and name text; description is used in accessibility label rather than shown visibly
- [ ] Welcome-page keyboard activation helper triggers on `Enter` and Space and prevents default on Space
#### Agent Mode — Hydration, Layout, and Sidebar
- [ ] `/illustrate/agent` shows a three-column skeleton before client hydration completes
- [ ] Hydration skeleton includes placeholder left sidebar, chat area, and preview pane blocks
- [ ] Agent mode is wrapped in an `ErrorBoundary` with full-screen illustration fallback UI
- [ ] Template sidebar title reads "Templates"
- [ ] Sidebar collapse button title is "Collapse sidebar"
- [ ] Collapsed sidebar replaces the full template list with a single expand button
- [ ] Collapsed sidebar expand button title is "Expand sidebar"
- [ ] Template search input placeholder reads "Search templates..."
- [ ] Category tabs are hidden whenever template search query is non-empty
- [ ] Template search matches against template `name` and `description`
- [ ] Template search pulls from all templates across categories instead of only the selected category
- [ ] Empty template-search state shows exact text "No templates found"
- [ ] Sidebar footer helper text reads "Click a template to populate the prompt"
- [ ] Selected category default is `medicine`
- [ ] Selected category persists via `finnish-agent-storage`
- [ ] Sidebar collapsed state does not persist across refresh because `isSidebarCollapsed` is not included in store partialization
- [ ] Template search text does not persist across refresh because it is component-local state
- [ ] Category tabs shown in the live sidebar are Medicine, Biology, Chemistry, and General
- [ ] Medicine category contains exactly 3 built-in templates in the store
- [ ] Biology category contains exactly 3 built-in templates in the store
- [ ] Chemistry category contains exactly 2 built-in templates in the store
- [ ] General category contains exactly 4 built-in templates in the store
- [ ] Template card click calls `onSelectTemplate(template.prompt)` directly
- [ ] Template click sends the prompt immediately in the current route instead of prefilling the textarea for later edit
#### Agent Mode — Prompt Input and Generation Flow
- [ ] Prompt input is a multiline `textarea`, not a single-line input
