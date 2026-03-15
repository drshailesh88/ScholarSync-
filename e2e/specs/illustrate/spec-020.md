# illustrate — Spec 020

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Editor File Import, Canvas Interaction, and Toast Outcomes
- [x] PASS: Dropping without a supported image file shows error toast `Drop a PNG, JPG, or SVG image file.`
- [x] PASS: Canvas drop imports only the first supported image file from the dropped file list
- [x] PASS: Export success toast text is format-specific for PNG, PDF, SVG, PowerPoint, and LaTeX
- [x] PASS: Export failure toast reads `Export failed. Please try again.`
- [x] PASS: Document settings modal confirm shows success toast `Canvas updated to {w}x{h}`
- [x] PASS: Hand-drawn apply-to-selection path only runs when hand-drawn mode is enabled
- [x] PASS: Right panel active tab defaults to `layers`
- [x] PASS: Right panel tab labels are Layers, Properties, Icons, Style, and Journal
- [x] PASS: Right panel Properties tab lazy-load is wrapped in its own nested error boundary
- [x] PASS: Right panel icon insertion centers the inserted icon and scales it to about 64px max dimension
- [x] PASS: Right panel icon insertion success toast reads `Added "{icon.name}" to canvas`
- [x] PASS: Right panel icon insertion failure toast reads `Failed to add icon to canvas`
- [x] PASS: Right panel icon insertion shows warning toast when canvas is not ready
#### Save, Persistence, and API Reality
- [x] PASS: Live editor route does not write recent diagrams into `localStorage['finnish-recent-diagrams']` during Save or Save As in the current implementation
- [x] PASS: Live editor route does not write `localStorage['finnish-diagram-{id}']` during Save or Save As in the current implementation
- [x] PASS: Welcome page recent-diagram list depends on pre-existing localStorage entries from elsewhere rather than current editor Save actions
- [x] PASS: `POST /api/illustration/save` requires an authenticated user and returns 401 JSON error when auth lookup fails
- [x] PASS: `POST /api/illustration/save` applies the `illustrations` write rate limit before parsing the request body
- [x] PASS: `POST /api/illustration/save` validates `title` with `min(1)` and `max(500)`
- [x] PASS: `POST /api/illustration/save` returns 400 with flattened field errors when validation fails
- [x] PASS: `POST /api/illustration/save` currently returns a mock success payload with a random numeric `id`
- [x] PASS: `POST /api/illustration/save` returns echoed illustration fields plus `createdAt` and `updatedAt`
- [x] PASS: `POST /api/illustration/save` does not create a durable database record in the current implementation
#### Credits Page — Detailed Behavior
- [x] PASS: Credits header logo links to `/`
- [x] PASS: Credits-page "Back to Home" link also routes to `/`
- [x] PASS: Credits page title reads "Credits & Attribution"
- [x] PASS: Credits subtitle begins "FINNISH is built on the shoulders of giants."
- [x] PASS: Credits page renders exactly 3 content sections: Scientific Illustrations, Icon Libraries, and Software Libraries
- [x] PASS: Scientific Illustrations section title includes "(CC-BY - Attribution Required)"
- [x] PASS: Attribution cards gain accent border and upward translate hover effect
- [x] PASS: Attribution card license badge color changes based on license family returned by `getLicenseBadgeStyle`
- [x] PASS: Attribution link text shows the raw external URL
- [x] PASS: Attribution links use `target="_blank"` with `rel="noopener noreferrer"`
- [x] PASS: Credits footer text reads "Built with ♥ for the scientific community"
- [x] PASS: Credits footer second line reads "FINNISH - Scientific Illustration Made Simple"
