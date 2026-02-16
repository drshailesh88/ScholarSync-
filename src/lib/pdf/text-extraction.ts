import * as pdfjs from "pdfjs-dist";

/**
 * Extracts the full text from a PDF document, page by page.
 * Returns an array of page texts and the concatenated full text.
 */
export async function extractTextFromPDF(pdfUrl: string): Promise<{
  pages: Array<{ pageNumber: number; text: string }>;
  fullText: string;
  sectionHeadings: string[];
}> {
  const loadingTask = pdfjs.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;

  const pages: Array<{ pageNumber: number; text: string }> = [];
  const allText: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => {
        if ("str" in item) return item.str;
        return "";
      })
      .join(" ");

    pages.push({ pageNumber: i, text: pageText });
    allText.push(pageText);
  }

  const fullText = allText.join("\n\n");
  const sectionHeadings = extractSectionHeadings(fullText);

  return { pages, fullText, sectionHeadings };
}

/**
 * Extracts likely section headings from the text.
 * Looks for common academic paper section patterns.
 */
function extractSectionHeadings(text: string): string[] {
  const headingPatterns = [
    /^(Abstract|ABSTRACT)\b/m,
    /^(Introduction|INTRODUCTION)\b/m,
    /^(Background|BACKGROUND)\b/m,
    /^(Methods?|METHODS?|Materials?\s+and\s+Methods?)\b/m,
    /^(Results?|RESULTS?)\b/m,
    /^(Discussion|DISCUSSION)\b/m,
    /^(Conclusion|CONCLUSION|Conclusions|CONCLUSIONS)\b/m,
    /^(References|REFERENCES|Bibliography|BIBLIOGRAPHY)\b/m,
    /^(Limitations?|LIMITATIONS?)\b/m,
    /^(Statistical\s+Analysis|STATISTICAL\s+ANALYSIS)\b/m,
    /^(Study\s+Design|STUDY\s+DESIGN)\b/m,
    /^(Acknowledgments?|ACKNOWLEDGMENTS?)\b/m,
    /^(Supplementary|SUPPLEMENTARY)\b/m,
  ];

  const headings: string[] = [];
  for (const pattern of headingPatterns) {
    const match = text.match(pattern);
    if (match) {
      headings.push(match[1]);
    }
  }

  return headings;
}

/**
 * Extracts text from a specific page of a PDF.
 */
export async function extractPageText(
  pdfUrl: string,
  pageNumber: number
): Promise<string> {
  const loadingTask = pdfjs.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;

  if (pageNumber < 1 || pageNumber > pdf.numPages) {
    throw new Error(`Page ${pageNumber} out of range (1-${pdf.numPages})`);
  }

  const page = await pdf.getPage(pageNumber);
  const textContent = await page.getTextContent();

  return textContent.items
    .map((item) => {
      if ("str" in item) return item.str;
      return "";
    })
    .join(" ");
}
