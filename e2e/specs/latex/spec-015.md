# latex — Spec 015

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Image Browser — Full Behavior
- [ ] Delete sends DELETE to `/api/latex/images?storageKey={encodedKey}`
- [ ] PDF thumbnails render as inline iframe; images use Next.js `<Image>` with `unoptimized` flag
- [ ] File input accept attribute: `.png,.jpg,.jpeg,.pdf`
#### Compile API Route (`/api/latex/compile`)
- [ ] Request body validated via zod: `projectId` must be a UUID string
- [ ] Invalid body → 400 `{ error: "Invalid request" }`
- [ ] Project not found or not owned by current user → 404 `{ error: "Project not found" }`
- [ ] No files in project → 400 `{ error: "No files in project" }`
- [ ] No main file found → 400 `{ error: "No main .tex file found" }`
- [ ] Server-side compile timeout: 60 seconds per attempt (`AbortSignal.timeout(60_000)`)
- [ ] Server-side retry: up to 2 retries on 503/504 or fetch errors, with progressive backoff (1s × attempt)
- [ ] 429 from upstream compiler is passed through directly to the client
- [ ] 422 (compilation failure) saves an error compilation record to DB and returns `{ error: "Compilation failed", log, errors, durationMs }`
- [ ] Successful compilation saves record to DB and returns PDF binary with headers: `Content-Disposition`, `X-Compilation-Status`, `X-Compilation-Duration`
- [ ] Compilation log is decoded from base64 `X-Compilation-Log` response header
- [ ] Compiler authenticated via `Authorization: Bearer {secret}` when `LATEX_COMPILER_SECRET` env var is set
- [ ] Compile payload includes `projectId` for persistent build cache on the compiler service
- [ ] Unexpected status codes → 502 `{ error: "Compilation service error" }`
- [ ] Unhandled exceptions → 500 `{ error: "Internal server error" }`
#### Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)
- [ ] Preview handles `\part` (centered, 1.8em) and `\chapter` sectioning commands in addition to section/subsection/subsubsection
- [ ] Preview handles `\paragraph` and `\subparagraph` as inline bold text (not block headings)
- [ ] `\footnote{text}` renders as superscript `[*]` with title tooltip showing the footnote text
- [ ] `\textcolor{color}{text}` renders with inline `color` style
- [ ] `\colorbox{color}{text}` renders with inline `background-color` style and padding
- [ ] 10 font size commands handled: `\tiny` (0.6em) through `\Huge` (2.5em)
- [ ] `\href{url}{text}` renders as anchor with `target="_blank" rel="noopener"`
- [ ] `\url{url}` renders as code-styled link with same attributes
- [ ] `\LaTeX` and `\TeX` render as styled logo elements with sup/sub tags
- [ ] `\today` renders current date in `en-US` locale with `{ year: "numeric", month: "long", day: "numeric" }`
- [ ] Smart quote conversion: ` `` ` → left double quote, `''` → right double quote, `` ` `` → left single quote
- [ ] `---` → em-dash (U+2014), `--` → en-dash (U+2013)
- [ ] `\newpage`/`\clearpage`/`\cleardoublepage` render as `<hr>` with pagebreak class
- [ ] `\tableofcontents` → italic "Table of Contents" placeholder, `\listoffigures` → "List of Figures", `\listoftables` → "List of Tables"
- [ ] `\vspace{X}` → div with `margin-top:X`, `\hspace{X}` → span with `margin-left:X`
- [ ] `\textsc{text}` → `font-variant: small-caps`
- [ ] `~` (tilde) renders as non-breaking space (U+00A0)
