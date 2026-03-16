# research — Spec 009

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Unified Search API Internals
- [x] PASS: Unhandled unified-search failures return HTTP 500 with `{ "error": "Search failed" }`
#### Source Adapter Normalization
- [x] PASS: PubMed result parsing drops any `<PubmedArticle>` chunk whose `<ArticleTitle>` is missing or empty
- [x] PASS: PubMed structured abstracts concatenate every `<AbstractText>` segment into one string separated by spaces
- [x] PASS: Labeled PubMed abstract segments are prefixed as `Label: text` during parsing
- [x] PASS: PubMed author names are normalized to `LastName ForeName`
- [x] PASS: PubMed journal name prefers `<ISOAbbreviation>` and falls back to `<Title>`
- [x] PASS: PubMed year parsing prefers `<Year>` inside `<PubDate>` and falls back to `<MedlineDate>`
- [x] PASS: PubMed year parsing falls back to numeric `0` when no four-digit year can be extracted
- [x] PASS: PubMed DOI is read from `<ArticleId IdType="doi">`
- [x] PASS: PubMed publication types are collected from every `<PublicationType>` tag into `publicationTypes[]`
- [x] PASS: PubMed MeSH terms are collected from every `<DescriptorName>` tag into `meshTerms[]`
- [x] PASS: PubMed study type uses the first mapped publication type that is not `"other"`
- [x] PASS: PubMed results always set `citationCount` to `0`
- [x] PASS: PubMed results always set `isOpenAccess` to `false`
- [x] PASS: PubMed source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
- [x] PASS: PubMed resilient fetch calls use timeout `15000` and `baseDelay: 400`
- [x] PASS: Semantic Scholar sanitization strips PubMed field tags such as `[MeSH]`, `[tiab]`, `[pt]`, `[au]`, `[ta]`, `[dp]`, and `[mesh]` before querying S2
- [x] PASS: Semantic Scholar sanitization removes parentheses, double quotes, and boolean operators `AND`, `OR`, and `NOT`
- [x] PASS: Semantic Scholar year filtering serializes as `YYYY-YYYY`, `YYYY-`, or `-YYYY` depending on which bounds are present
- [x] PASS: Semantic Scholar results expose `openAccessPdfUrl` separately from `isOpenAccess`
- [x] PASS: Semantic Scholar results default `fieldsOfStudy` to an empty array when the API omits them
- [x] PASS: Semantic Scholar result mapping treats `JournalArticle` / `Journal Article` publication types as study type `"other"`
- [x] PASS: Semantic Scholar source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
- [x] PASS: Semantic Scholar resilient fetch calls use timeout `15000` and `baseDelay: 1000`
- [x] PASS: OpenAlex strips the `https://doi.org/` prefix before storing DOI values on unified results
- [x] PASS: OpenAlex reconstructs abstract text from `abstract_inverted_index` by sorting word-position pairs numerically
- [x] PASS: OpenAlex concept chips are limited to concepts whose score is greater than `0.3`
- [x] PASS: OpenAlex year filtering serializes into the `filter=` query param as `publication_year:start-end`, `publication_year:start-`, or `publication_year:-end`
- [x] PASS: OpenAlex adds `is_oa:true` to its `filter=` query param only when `onlyOpenAccess` is true
- [x] PASS: OpenAlex source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
- [x] PASS: ClinicalTrials keyword extraction strips punctuation characters including `? . , ! ; : ' " ( ) [ ] { }`
- [x] PASS: ClinicalTrials keyword extraction drops single-character tokens and a built-in stop-word list before joining the remaining search terms
- [x] PASS: ClinicalTrials falls back to the raw query string when keyword extraction produces an empty term string
- [x] PASS: ClinicalTrials requests always include `sort=@relevance`, `format=json`, and `countTotal=true`
- [x] PASS: ClinicalTrials status filtering only maps `recruiting` to `RECRUITING` and `completed` to `COMPLETED`
