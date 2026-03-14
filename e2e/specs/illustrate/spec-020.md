# illustrate — Spec 020

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Editor File Import, Canvas Interaction, and Toast Outcomes
- [ ] Dropping without a supported image file shows error toast `Drop a PNG, JPG, or SVG image file.`
- [ ] Canvas drop imports only the first supported image file from the dropped file list
- [ ] Export success toast text is format-specific for PNG, PDF, SVG, PowerPoint, and LaTeX
- [ ] Export failure toast reads `Export failed. Please try again.`
- [ ] Document settings modal confirm shows success toast `Canvas updated to {w}x{h}`
- [ ] Hand-drawn apply-to-selection path only runs when hand-drawn mode is enabled
- [ ] Right panel active tab defaults to `layers`
- [ ] Right panel tab labels are Layers, Properties, Icons, Style, and Journal
- [ ] Right panel Properties tab lazy-load is wrapped in its own nested error boundary
- [ ] Right panel icon insertion centers the inserted icon and scales it to about 64px max dimension
- [ ] Right panel icon insertion success toast reads `Added "{icon.name}" to canvas`
- [ ] Right panel icon insertion failure toast reads `Failed to add icon to canvas`
- [ ] Right panel icon insertion shows warning toast when canvas is not ready
#### Save, Persistence, and API Reality
- [ ] Live editor route does not write recent diagrams into `localStorage['finnish-recent-diagrams']` during Save or Save As in the current implementation
- [ ] Live editor route does not write `localStorage['finnish-diagram-{id}']` during Save or Save As in the current implementation
- [ ] Welcome page recent-diagram list depends on pre-existing localStorage entries from elsewhere rather than current editor Save actions
- [ ] `POST /api/illustration/save` requires an authenticated user and returns 401 JSON error when auth lookup fails
- [ ] `POST /api/illustration/save` applies the `illustrations` write rate limit before parsing the request body
- [ ] `POST /api/illustration/save` validates `title` with `min(1)` and `max(500)`
- [ ] `POST /api/illustration/save` returns 400 with flattened field errors when validation fails
- [ ] `POST /api/illustration/save` currently returns a mock success payload with a random numeric `id`
- [ ] `POST /api/illustration/save` returns echoed illustration fields plus `createdAt` and `updatedAt`
- [ ] `POST /api/illustration/save` does not create a durable database record in the current implementation
#### Credits Page — Detailed Behavior
- [ ] Credits header logo links to `/`
- [ ] Credits-page "Back to Home" link also routes to `/`
- [ ] Credits page title reads "Credits & Attribution"
- [ ] Credits subtitle begins "FINNISH is built on the shoulders of giants."
- [ ] Credits page renders exactly 3 content sections: Scientific Illustrations, Icon Libraries, and Software Libraries
- [ ] Scientific Illustrations section title includes "(CC-BY - Attribution Required)"
- [ ] Attribution cards gain accent border and upward translate hover effect
- [ ] Attribution card license badge color changes based on license family returned by `getLicenseBadgeStyle`
- [ ] Attribution link text shows the raw external URL
- [ ] Attribution links use `target="_blank"` with `rel="noopener noreferrer"`
- [ ] Credits footer text reads "Built with ♥ for the scientific community"
- [ ] Credits footer second line reads "FINNISH - Scientific Illustration Made Simple"
