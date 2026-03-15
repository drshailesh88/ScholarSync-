# library — Spec 010

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Quick Test Workflows
#### `/api/extract-pdf` Route Details
- [x] PASS: Validates file field exists and is a File instance; returns 400 `"No PDF file provided. Include a 'file' field in the form data."` (extract-pdf/route.ts:51-56)
- [x] PASS: Validates file has PDF MIME type or `.pdf` extension; returns 400 `"Uploaded file must be a PDF"` (extract-pdf/route.ts:58-63)
- [x] PASS: Enforces 20 MB max file size; returns 413 with message `"File size exceeds the 20MB limit. Uploaded file is {N}MB."` including actual file size (extract-pdf/route.ts:65-72)
- [x] PASS: Response shape on success: `{ text: string, pages: number, info: { title?: string, author?: string } }` (extract-pdf/route.ts:85-92)
- [x] PASS: Returns 500 `"Failed to extract text from PDF"` on parse errors (extract-pdf/route.ts:100-103)
#### `/api/papers/save` Route Details
- [x] PASS: Validates request body with Zod schema: `title` (string, min 1 required), `source` (enum `"semantic_scholar" | "pubmed"` only), `authors` (string[] optional, default []) (papers/save/route.ts:7-25)
- [x] PASS: Returns 400 `{ error: "Invalid paper payload", details: <flattened Zod errors> }` on validation failure (papers/save/route.ts:52-56)
- [x] PASS: Applies rate limiting with `RATE_LIMITS.write` bucket (papers/save/route.ts:43-48)
- [x] PASS: Returns `{ paperId: number }` on success (papers/save/route.ts:79)
- [x] PASS: Returns 500 `"Failed to save paper"` on server errors (papers/save/route.ts:82-86)
#### `/api/papers/[id]/pdf` Route Details
- [x] PASS: GET validates `id` param as numeric (`/^\d+$/`); returns 400 `"Invalid paper ID"` (papers/[id]/pdf/route.ts:22-23)
- [x] PASS: GET requires authentication; returns 401 `"Authentication required"` (papers/[id]/pdf/route.ts:28-31)
- [x] PASS: GET applies rate limiting with `RATE_LIMITS.export` bucket (papers/[id]/pdf/route.ts:35-36)
- [x] PASS: GET first attempts `getSignedPdfUrl(...)`; with the current R2/local helper this resolves to `null`, so the effective runtime fallback is local buffer (streamed with `Content-Type: application/pdf`, `Content-Disposition: inline`, `Cache-Control: private, max-age=3600`) → `pdf_url` redirect → `open_access_url` redirect → 404 (papers/[id]/pdf/route.ts:42-79)
- [x] PASS: GET returns 404 `"PDF not found for this paper"` when no PDF source found (papers/[id]/pdf/route.ts:77-80)
- [x] PASS: GET returns 500 `"Failed to serve PDF"` on server errors (papers/[id]/pdf/route.ts:83-86)
- [x] PASS: POST validates Content-Type must include `multipart/form-data`; returns 400 (papers/[id]/pdf/route.ts:121-127)
- [x] PASS: POST validates `id` param as numeric; returns 400 `"Invalid paper ID"` (papers/[id]/pdf/route.ts:102-103)
- [x] PASS: POST stores PDF via `uploadPdf(...)` to the app's R2/local storage layer, then sets `pdf_storage_path` and `full_text_available = true` on the paper record (papers/[id]/pdf/route.ts:143-152)
- [x] PASS: POST triggers `queuePdfProcessing(paperId, buffer)` for background text extraction and embedding (papers/[id]/pdf/route.ts:155)
- [x] PASS: POST returns `{ success: true, paperId: string, storagePath: string }` on success (papers/[id]/pdf/route.ts:157-161)
- [x] PASS: POST returns 500 `"Failed to store PDF file"` on server errors (papers/[id]/pdf/route.ts:164-168)
#### `/api/references/resolve` Route Details
- [x] PASS: Uses 10-second `AbortSignal.timeout` on CrossRef and PubMed external API calls (references/resolve/route.ts:87,135)
- [x] PASS: Returns 504 on CrossRef timeout: `"CrossRef request timed out. Try again."` (references/resolve/route.ts:118-120)
- [x] PASS: Returns 504 on PubMed timeout: `"PubMed request timed out. Try again."` (references/resolve/route.ts:169-174)
- [x] PASS: DOI 404 returns status 200 with `{ success: false, error: "Could not find a reference for this DOI. Check the DOI and try again, or add the reference manually." }` (references/resolve/route.ts:91-96)
- [x] PASS: Non-404 DOI failure returns 502 `"CrossRef returned status {N}"` (references/resolve/route.ts:97-103)
- [x] PASS: Bad PMID returns `"No PubMed record found for this ID."` — checks both HTTP error and XML `<ERROR>` tag (references/resolve/route.ts:139-152)
- [x] PASS: Unparseable PubMed record returns `"Could not parse PubMed record."` (references/resolve/route.ts:156-159)
- [x] PASS: Unresolvable PMCID returns `"Could not resolve PMCID. Try using the PMID or DOI instead."` (references/resolve/route.ts:198-201)
- [x] PASS: PMCID converter failure returns `"Failed to convert PMCID. Try using the PMID or DOI instead."` (references/resolve/route.ts:203-206)
- [x] PASS: URL without extractable DOI returns `"Could not extract a DOI from this URL. Try pasting the DOI directly."` (references/resolve/route.ts:49-56)
- [x] PASS: Unknown identifier type returns `"Could not determine identifier type. Try a DOI (starting with 10.) or a PMID (numeric)."` (references/resolve/route.ts:59-66)
- [x] PASS: Returns 500 `"Internal server error"` on unexpected exceptions (references/resolve/route.ts:70-74)
#### Server Action Additional Details
- [x] PASS: `savePaper` creates userReference with `collection: "All Papers"` as default collection value (papers.ts:464)
