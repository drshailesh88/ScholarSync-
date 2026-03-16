# editor — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Version History and Restore Details
- [x] PASS: Non-auto-saved versions use a filled dot marker while auto-saved versions use an open-circle marker
- [x] PASS: Every version card renders both `Preview` and `Restore` actions
- [x] PASS: Clicking `Preview` fetches version content and opens a centered overlay modal
- [x] PASS: Version Preview modal body shows raw formatted JSON inside a `<pre>` block
- [x] PASS: Clicking `Restore` first opens a browser confirm about saving current content as a version
- [x] PASS: Cancelling the browser confirm leaves restore state idle and does not fetch version content
- [x] PASS: While restore is in progress for a row, only that row's button shows a spinner and disabled state
- [x] PASS: Successful restore closes the side panel and remounts the editor using a bumped `contentKey`
#### Export Dialog Detailed States
- [x] PASS: Editor-page `Export` button is disabled while the page is loading
- [x] PASS: Editor-page `Export` button is also disabled when there is no `editorContent`
- [x] PASS: Opening export on `/editor/[id]` shows a centered modal titled `Export Manuscript`
- [x] PASS: Export dialog default selected format is `DOCX`
- [x] PASS: Export dialog renders exactly two format cards: `DOCX` and `PDF`
- [x] PASS: Active export-format card uses brand border and background styling
- [x] PASS: `Include page numbers` checkbox defaults to checked
- [x] PASS: `Double-spaced` checkbox defaults to checked
- [x] PASS: Clicking the dark modal backdrop closes the export dialog
- [x] PASS: `Cancel` closes the export dialog without starting an export
- [x] PASS: Export button label changes from `Export` to `Exporting...` while an export is running
- [x] PASS: Export button is disabled only while `isExporting` is true
- [x] PASS: DOCX export generates a download filename that strips punctuation and replaces whitespace with underscores
- [x] PASS: PDF export on `/editor/[id]` uses `window.print()` rather than an API-backed file download
- [x] PASS: Successful exports close the dialog through `onClose()`
- [x] PASS: Export failures are logged to the console and do not render inline validation text inside the dialog
#### Studio Workspace Shell and Left Rail Details
- [x] PASS: `/studio` reads `projectId` from the query string and coerces it to a number for initial project selection
- [x] PASS: `/studio?mode=learn` initializes the page in Learn mode on first render
- [x] PASS: Studio left-rail title input is always visible above the Write/Learn mode toggle
- [x] PASS: Studio left-rail title input is controlled by `docTitle`
- [x] PASS: Studio left-rail Write/Learn toggle uses `Write` and `Learn` text buttons inside a shared pill container
- [x] PASS: `Write` button is visually active by default unless the URL requests learn mode
- [x] PASS: `Learn` button becomes visually active with emerald styling when selected
- [x] PASS: Project selector is omitted entirely when the user has zero or one project
- [x] PASS: Closed project selector button shows the selected project title or the fallback text `Select project`
- [x] PASS: Clicking outside the project selector closes the dropdown without changing the selected project
- [x] PASS: Project selector dropdown lists every available project as a button row
