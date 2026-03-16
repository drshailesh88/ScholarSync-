# analysis — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Error Handling & Edge Cases
#### API Errors
- [x] PASS: **Unauthenticated (401)** — API route returns 401 with `{ error: "Not authenticated" }` (route.ts:44-49); page reads `data.error` on `!res.ok` (page.tsx:170-175) and displays inline under textarea (page.tsx:359-361)
- [x] PASS: **Rate limited (429)** — `checkRateLimit` returns 429 with `{ error: "Rate limit exceeded. Please try again later." }` (rate-limit.ts:77-83); page error handler surfaces this message via the same `!res.ok` path
- [x] PASS: **Server error (500)** — outer catch in API route returns 500 with `{ error: "Failed to analyze text" }` (route.ts:156-161); page displays the generic error message inline
- [x] PASS: **Network failure** — page catch block (page.tsx:204-205) sets error to "Failed to connect. Check your API key." which is displayed as inline red text; user can retry by clicking "Analyze Writing" again
#### Plan Restrictions
- [x] PASS: **Free tier API** — integrity/index.ts:38-39 gates plagiarism and citation engines behind `isPaid` flag; free-tier users get AI detection only (`runPlagiarism = isPaid && …`, `runCitations = isPaid && …`)
- [x] PASS: **Current `/analysis` UI** — no upgrade prompt, locked-state card, or tier-related UI exists in page.tsx; all users see the same interface regardless of plan
#### Document Mode Edge Cases
- [x] PASS: **No projects** — project selector only renders when `projects.length > 0` (page.tsx:292); when empty, `getActiveDocumentForAnalysis(null)` returns null, showing FileText illustration with "No document found. Write something in the Studio first, or switch to paste mode." guidance
- [x] PASS: **Empty document** — when document has no text content, `getActiveDocumentForAnalysis` returns null (analysis.ts:89 `!plainText.trim()`); UI shows FileText empty state illustration rather than a blank textarea, which effectively prevents analysis of empty documents; analyze button is not rendered in this state
- [x] PASS: **Project fetch failure** — fixed: `.catch()` now sets error "Could not load projects. Switching to paste mode." and auto-switches to paste mode (page.tsx:92-96); previously error was silently swallowed

### Quick Test Workflows
#### Document Workflow
- [x] PASS: First available project is auto-selected on initial page load in document mode — page.tsx:88-89: `if (p.length > 0 && !selectedProjectId) setSelectedProjectId(p[0].id)` assigns the first project ID on mount
- [x] PASS: Active document title is shown inline beside the project selector after a document loads — page.tsx:325-329: `{activeDoc && (<span>Document: <span className="text-ink font-medium">{activeDoc.documentTitle}</span></span>)}`
- [x] PASS: Document-mode textarea is read-only while showing the loaded project document text — page.tsx:357: `readOnly={sourceMode === "document"}`
- [x] PASS: Clicking outside the project dropdown closes the project menu — page.tsx:73-81: useEffect registers mousedown handler on `document`, checks click target against `projectDropdownRef`, calls `setProjectDropdownOpen(false)`
- [x] PASS: Empty document state shows a FileText illustration with guidance to write in Studio first or switch to paste mode — page.tsx:340-345: `<FileText size={32}>` + "No document found. Write something in the Studio first, or switch to paste mode."
#### Validation and Inline Errors
- [x] PASS: Manual submission with fewer than 50 characters shows the inline message "Please enter at least 50 characters of text to analyze." — page.tsx:153-155: guard checks `inputText.trim().length < 50` and calls `setError("Please enter at least 50 characters of text to analyze.")`
- [x] PASS: API validation failures surface the returned inline error text under the textarea (for example, "Invalid request") — API route returns `{ error: "Invalid request" }` on zod validation failure (route.ts:72-78); page reads `data.error` (page.tsx:175)
- [x] PASS: Network failures surface the inline message "Failed to connect. Check your API key." — page.tsx:204-205: catch block sets `setError("Failed to connect. Check your API key.")`
#### Instant Metrics Panel
- [x] PASS: Instant writing analysis appears after a 500ms debounce once text is present — page.tsx:130: `setTimeout(() => { … }, 500)` triggers `analyzeWriting(inputText)` after debounce
- [x] PASS: Instant readability badge uses the local analysis labels from the live UI (`Easy`, `Standard`, `Difficult`, `Very Difficult`) — writing-analysis.ts:133-138: `getReadabilityLabel` returns exactly these four labels; page.tsx:388 renders `clientMetrics.readabilityLabel` in CircularGauge
- [x] PASS: Client issue summaries show a `+N more issues` footer when more than 10 issues are detected — page.tsx:455-466: renders first 10 issues via `clientIssues.slice(0, 10)`, then `{clientIssues.length > 10 && (<p>+{clientIssues.length - 10} more issues</p>)}`
#### Results Mode
- [x] PASS: Results mode keeps the word, sentence, and paragraph summary cards above the right-side tabs — page.tsx:532-547: word/sentence/paragraph grid renders before `<Tabs>` at line 549
- [x] PASS: "Analyze New Text" resets the result view, clears stored paragraphs, and returns the right-side panel to the Issues tab — page.tsx:482-486: `onClick={() => { setResult(null); setParagraphs([]); setActiveTab("issues"); }}`
- [x] PASS: Issues tab shows a positive empty state message when no AI suggestions are returned: "No issues detected. Your writing looks great!" — page.tsx:554-557: conditional renders this exact string when `suggestions.length === 0`
- [x] PASS: Local issue cards in results mode are grouped under a dedicated "Writing Issues (write-good)" section beneath AI suggestions — page.tsx:573-579: `{clientIssues.length > 0 && (<><p>Writing Issues (write-good)</p>…</>)}` renders after AI suggestion cards
- [x] PASS: Results-mode write-good issues show a `+N more issues` footer when more than 15 issues are available — page.tsx:611-614: `{clientIssues.length > 15 && (<p>+{clientIssues.length - 15} more issues</p>)}`
- [x] PASS: Paragraph Breakdown in Detailed Metrics renders only when paragraph-level AI analysis entries are returned — page.tsx:757: `{result.paragraphAnalysis.length > 0 && (<div>…<h4>Paragraph Breakdown</h4>…</div>)}`
#### Integration Risks
- [x] PASS: The page-local `AnalysisResult` type expects top-level `humanScore`, `aiScore`, `paragraphAnalysis`, and `plagiarismIndicators` — page.tsx:29-41: interface defines these as top-level fields
- [x] PASS: `POST /api/integrity-check` returns those values under nested `aiDetection` and `plagiarism` objects instead — API returns `IntegrityCheckResult` (types.ts:145-165) with nested `aiDetection.humanScore`, `aiDetection.paragraphs`, `plagiarism.matches`
- [x] PASS: Result-mode AI detection, paragraph breakdown, and plagiarism indicator views are therefore out of contract until the page normalizes the API payload — page.tsx:183-205 NOW normalizes the payload: maps `data.aiDetection.humanScore` → `humanScore`, `data.aiDetection.paragraphs` → `paragraphAnalysis`, `data.plagiarism.matches` → `plagiarismIndicators`; contract mismatch is resolved
#### Detailed QA Coverage
- [x] PASS: `sourceMode` defaults to `document` on first render — page.tsx:47: `useState<SourceMode>("document")`
- [x] PASS: `docLoading` defaults to `true` before the first document fetch resolves — page.tsx:50: `useState(true)`
- [x] PASS: `result` defaults to `null`, so input mode is the first visible state — page.tsx:61: `useState<AnalysisResult | null>(null)`; page.tsx:286: `{!result ? (/* Input Mode */) : (/* Results Mode */)}`
- [x] PASS: `activeTab` defaults to `issues` before any result is shown — page.tsx:65: `useState("issues")`
- [x] PASS: `listProjectsForAnalysis()` runs on mount to populate the document dropdown — page.tsx:84-93: useEffect calls `listProjectsForAnalysis()` with `[selectedProjectId]` dependency, runs on mount when selectedProjectId is null
- [x] PASS: The first returned project ID is auto-assigned to `selectedProjectId` when no project is already selected — page.tsx:88-89: `if (p.length > 0 && !selectedProjectId) { setSelectedProjectId(p[0].id); }`
