import type { PDFTextSelection } from "./types";

/**
 * Captures the current text selection from a PDF viewer page.
 * Extracts text, page number, bounding rects (as percentages), and character offsets.
 */
export function capturePDFSelection(
  containerEl: HTMLElement
): PDFTextSelection | null {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || !selection.rangeCount) {
    return null;
  }

  const text = selection.toString().trim();
  if (!text) return null;

  const range = selection.getRangeAt(0);

  // Find the page container — react-pdf wraps each page in a div with data-page-number
  const pageEl = findPageContainer(range.startContainer);
  if (!pageEl) return null;

  const pageNumber = parseInt(pageEl.getAttribute("data-page-number") || "1", 10);
  const pageRect = pageEl.getBoundingClientRect();

  // Get all client rects for the selection and convert to percentages
  const clientRects = range.getClientRects();
  const rects: PDFTextSelection["rects"] = [];

  for (let i = 0; i < clientRects.length; i++) {
    const rect = clientRects[i];
    // Filter out zero-dimension rects
    if (rect.width < 1 || rect.height < 1) continue;

    rects.push({
      x: ((rect.left - pageRect.left) / pageRect.width) * 100,
      y: ((rect.top - pageRect.top) / pageRect.height) * 100,
      width: (rect.width / pageRect.width) * 100,
      height: (rect.height / pageRect.height) * 100,
    });
  }

  if (rects.length === 0) return null;

  // Compute character offsets from the page's text layer
  const textLayer = pageEl.querySelector(".react-pdf__Page__textContent");
  const { startOffset, endOffset } = computeTextOffsets(
    textLayer,
    range
  );

  return {
    text,
    pageNumber,
    rects,
    startOffset,
    endOffset,
  };
}

/**
 * Walks up the DOM tree to find the page container element.
 */
function findPageContainer(node: Node): HTMLElement | null {
  let current: Node | null = node;
  while (current) {
    if (
      current instanceof HTMLElement &&
      current.getAttribute("data-page-number")
    ) {
      return current;
    }
    current = current.parentNode;
  }
  return null;
}

/**
 * Computes the character start/end offsets of the selection within
 * the page's text content.
 */
function computeTextOffsets(
  textLayer: Element | null,
  range: Range
): { startOffset: number; endOffset: number } {
  if (!textLayer) {
    return { startOffset: 0, endOffset: 0 };
  }

  const walker = document.createTreeWalker(
    textLayer,
    NodeFilter.SHOW_TEXT,
    null
  );

  let charCount = 0;
  let startOffset = 0;
  let endOffset = 0;
  let foundStart = false;
  let foundEnd = false;

  let node: Node | null;
  while ((node = walker.nextNode())) {
    const textNode = node as Text;
    const nodeLength = textNode.textContent?.length || 0;

    if (!foundStart && node === range.startContainer) {
      startOffset = charCount + range.startOffset;
      foundStart = true;
    }

    if (!foundEnd && node === range.endContainer) {
      endOffset = charCount + range.endOffset;
      foundEnd = true;
      break;
    }

    charCount += nodeLength;
  }

  return { startOffset, endOffset };
}

/**
 * Positions a floating menu relative to a selection's bounding rects.
 * Returns the x,y coordinates for the menu (centered above the selection).
 */
export function getSelectionMenuPosition(
  rects: PDFTextSelection["rects"],
  pageEl: HTMLElement
): { x: number; y: number } {
  if (rects.length === 0) return { x: 0, y: 0 };

  const pageRect = pageEl.getBoundingClientRect();

  // Use the first rect to position above the selection
  const firstRect = rects[0];
  const lastRect = rects[rects.length - 1];

  // Center horizontally across the selection span
  const leftPx = (firstRect.x / 100) * pageRect.width + pageRect.left;
  const rightPx =
    ((lastRect.x + lastRect.width) / 100) * pageRect.width + pageRect.left;
  const centerX = (leftPx + rightPx) / 2;

  // Position above the first rect
  const topPx = (firstRect.y / 100) * pageRect.height + pageRect.top;

  return {
    x: centerX,
    y: topPx - 8, // 8px gap above selection
  };
}
