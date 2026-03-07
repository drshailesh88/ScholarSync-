"use client";

type PngScale = 1 | 2 | 3;
type SlideImageFormat = "png" | "svg";

interface ExportPngOptions {
  scale?: PngScale;
}

interface ExportAllSlidesOptions {
  format?: SlideImageFormat;
  scale?: PngScale;
}

function normalizeScale(scale?: number): PngScale {
  if (scale === 1 || scale === 2 || scale === 3) {
    return scale;
  }
  return 2;
}

function dataUrlToBlob(dataUrl: string): Blob {
  if (!dataUrl.startsWith("data:")) {
    throw new Error("Expected a data URL");
  }

  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) {
    throw new Error("Invalid data URL");
  }

  const meta = dataUrl.slice(5, commaIndex);
  const payload = dataUrl.slice(commaIndex + 1);
  const mimeType = meta.split(";")[0] || "application/octet-stream";

  if (meta.includes(";base64")) {
    const binary = atob(payload);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([bytes], { type: mimeType });
  }

  return new Blob([decodeURIComponent(payload)], { type: mimeType });
}

function extractSvgMarkup(svgData: string): string {
  if (!svgData.startsWith("data:")) {
    return svgData;
  }

  const commaIndex = svgData.indexOf(",");
  if (commaIndex === -1) {
    throw new Error("Invalid SVG data URL");
  }

  const meta = svgData.slice(5, commaIndex);
  const payload = svgData.slice(commaIndex + 1);

  if (meta.includes(";base64")) {
    return atob(payload);
  }

  return decodeURIComponent(payload);
}

function sanitizeFilename(input: string): string {
  return input.replace(/[^a-zA-Z0-9_-]/g, "_");
}

export async function exportSlideAsPNG(
  element: HTMLElement,
  options?: ExportPngOptions,
): Promise<Blob> {
  const scale = normalizeScale(options?.scale);
  const dataUrl = await import("html-to-image").then((m) =>
    m.toPng(element, {
      pixelRatio: scale,
      cacheBust: true,
    }),
  );

  return dataUrlToBlob(dataUrl);
}

export async function exportSlideAsSVG(element: HTMLElement): Promise<string> {
  const dataUrl = await import("html-to-image").then((m) =>
    m.toSvg(element, {
      cacheBust: true,
    }),
  );
  return extractSvgMarkup(dataUrl);
}

export async function exportAllSlidesAsZip(
  elements: HTMLElement[],
  slideNames: string[],
  options?: ExportAllSlidesOptions,
): Promise<Blob> {
  const format: SlideImageFormat = options?.format ?? "png";
  const scale = normalizeScale(options?.scale);
  const zip = await import("jszip").then((m) => new m.default());

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const safeTitle = sanitizeFilename(slideNames[i] ?? `Slide_${i + 1}`) || `Slide_${i + 1}`;
    const index = String(i + 1).padStart(2, "0");
    const filename = `${index}_${safeTitle}.${format}`;

    if (format === "svg") {
      const svgMarkup = await exportSlideAsSVG(element);
      zip.file(filename, svgMarkup);
      continue;
    }

    const pngBlob = await exportSlideAsPNG(element, { scale });
    zip.file(filename, pngBlob);
  }

  return zip.generateAsync({ type: "blob" });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();

  requestAnimationFrame(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  });
}

