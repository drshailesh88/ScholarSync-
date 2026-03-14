# latex — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Image Browser — Full Behavior
- [x] PASS: Delete sends DELETE to `/api/latex/images?storageKey={encodedKey}`
- [x] PASS: PDF thumbnails render as inline iframe; images use Next.js `<Image>` with `unoptimized` flag
- [x] PASS: File input accept attribute: `.png,.jpg,.jpeg,.pdf`
#### Compile API Route (`/api/latex/compile`)
- [x] PASS: Request body validated via zod: `projectId` must be a UUID string
- [x] PASS: Invalid body → 400 `{ error: "Invalid request" }`
- [x] PASS: Project not found or not owned by current user → 404 `{ error: "Project not found" }`
- [x] PASS: No files in project → 400 `{ error: "No files in project" }`
- [x] PASS: No main file found → 400 `{ error: "No main .tex file found" }`
- [x] PASS: Server-side compile timeout: 60 seconds per attempt (`AbortSignal.timeout(60_000)`)
- [x] PASS: Server-side retry: up to 2 retries on 503/504 or fetch errors, with progressive backoff (1s × attempt)
- [x] PASS: 429 from upstream compiler is passed through directly to the client
- [x] PASS: 422 (compilation failure) saves an error compilation record to DB and returns `{ error: "Compilation failed", log, errors, durationMs }`
- [x] PASS: Successful compilation saves record to DB and returns PDF binary with headers: `Content-Disposition`, `X-Compilation-Status`, `X-Compilation-Duration`
- [x] PASS: Compilation log is decoded from base64 `X-Compilation-Log` response header
- [x] PASS: Compiler authenticated via `Authorization: Bearer {secret}` when `LATEX_COMPILER_SECRET` env var is set
- [x] PASS: Compile payload includes `projectId` for persistent build cache on the compiler service
- [x] PASS: Unexpected status codes → 502 `{ error: "Compilation service error" }`
- [x] PASS: Unhandled exceptions → 500 `{ error: "Internal server error" }`
#### Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)
- [x] PASS: Preview handles `\part` (centered, 1.8em) and `\chapter` sectioning commands in addition to section/subsection/subsubsection
- [x] PASS: Preview handles `\paragraph` and `\subparagraph` as inline bold text (not block headings)
- [x] PASS: `\footnote{text}` renders as superscript `[*]` with title tooltip showing the footnote text
- [x] PASS: `\textcolor{color}{text}` renders with inline `color` style
- [x] PASS: `\colorbox{color}{text}` renders with inline `background-color` style and padding
- [x] PASS: 10 font size commands handled: `\tiny` (0.6em) through `\Huge` (2.5em)
- [x] PASS: `\href{url}{text}` renders as anchor with `target="_blank" rel="noopener"`
- [x] PASS: `\url{url}` renders as code-styled link with same attributes
- [x] PASS: `\LaTeX` and `\TeX` render as styled logo elements with sup/sub tags
- [x] PASS: `\today` renders current date in `en-US` locale with `{ year: "numeric", month: "long", day: "numeric" }`
- [x] PASS: Smart quote conversion: ` `` ` → left double quote, `''` → right double quote, `` ` `` → left single quote
- [x] PASS: `---` → em-dash (U+2014), `--` → en-dash (U+2013)
- [x] PASS: `\newpage`/`\clearpage`/`\cleardoublepage` render as `<hr>` with pagebreak class
- [x] PASS: `\tableofcontents` → italic "Table of Contents" placeholder, `\listoffigures` → "List of Figures", `\listoftables` → "List of Tables"
- [x] PASS: `\vspace{X}` → div with `margin-top:X`, `\hspace{X}` → span with `margin-left:X`
- [x] PASS: `\textsc{text}` → `font-variant: small-caps`
- [x] PASS: `~` (tilde) renders as non-breaking space (U+00A0)
