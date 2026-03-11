# editor — Spec 012

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Version History and Restore Details
- [ ] Non-auto-saved versions use a filled dot marker while auto-saved versions use an open-circle marker
- [ ] Every version card renders both `Preview` and `Restore` actions
- [ ] Clicking `Preview` fetches version content and opens a centered overlay modal
- [ ] Version Preview modal body shows raw formatted JSON inside a `<pre>` block
- [ ] Clicking `Restore` first opens a browser confirm about saving current content as a version
- [ ] Cancelling the browser confirm leaves restore state idle and does not fetch version content
- [ ] While restore is in progress for a row, only that row's button shows a spinner and disabled state
- [ ] Successful restore closes the side panel and remounts the editor using a bumped `contentKey`
#### Export Dialog Detailed States
- [ ] Editor-page `Export` button is disabled while the page is loading
- [ ] Editor-page `Export` button is also disabled when there is no `editorContent`
- [ ] Opening export on `/editor/[id]` shows a centered modal titled `Export Manuscript`
- [ ] Export dialog default selected format is `DOCX`
- [ ] Export dialog renders exactly two format cards: `DOCX` and `PDF`
- [ ] Active export-format card uses brand border and background styling
- [ ] `Include page numbers` checkbox defaults to checked
- [ ] `Double-spaced` checkbox defaults to checked
- [ ] Clicking the dark modal backdrop closes the export dialog
- [ ] `Cancel` closes the export dialog without starting an export
- [ ] Export button label changes from `Export` to `Exporting...` while an export is running
- [ ] Export button is disabled only while `isExporting` is true
- [ ] DOCX export generates a download filename that strips punctuation and replaces whitespace with underscores
- [ ] PDF export on `/editor/[id]` uses `window.print()` rather than an API-backed file download
- [ ] Successful exports close the dialog through `onClose()`
- [ ] Export failures are logged to the console and do not render inline validation text inside the dialog
#### Studio Workspace Shell and Left Rail Details
- [ ] `/studio` reads `projectId` from the query string and coerces it to a number for initial project selection
- [ ] `/studio?mode=learn` initializes the page in Learn mode on first render
- [ ] Studio left-rail title input is always visible above the Write/Learn mode toggle
- [ ] Studio left-rail title input is controlled by `docTitle`
- [ ] Studio left-rail Write/Learn toggle uses `Write` and `Learn` text buttons inside a shared pill container
- [ ] `Write` button is visually active by default unless the URL requests learn mode
- [ ] `Learn` button becomes visually active with emerald styling when selected
- [ ] Project selector is omitted entirely when the user has zero or one project
- [ ] Closed project selector button shows the selected project title or the fallback text `Select project`
- [ ] Clicking outside the project selector closes the dropdown without changing the selected project
- [ ] Project selector dropdown lists every available project as a button row
