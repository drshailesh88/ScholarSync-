import JSZip from "jszip";
import type { ContentBlock, SlideLayout } from "@/types/presentation";

export const PPTX_MAX_FILE_SIZE = 50 * 1024 * 1024;
const PASSWORD_PROTECTED_SIGNATURE = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];

export interface PptxPreviewSlide {
  index: number;
  title: string;
  subtitle: string;
  previewText: string;
  layout: SlideLayout;
  imageCount: number;
  tableCount: number;
  chartCount: number;
  speakerNotes: string;
}

export interface PptxPreviewData {
  title: string;
  themeName: string | null;
  slideCount: number;
  slides: PptxPreviewSlide[];
  warnings: string[];
  sourceText: string;
}

export interface PptxImageAsset {
  blockIndex: number;
  extension: string;
  mimeType: string;
  data: Uint8Array | null;
}

export interface ParsedPptxSlide extends PptxPreviewSlide {
  contentBlocks: ContentBlock[];
  imageAssets: PptxImageAsset[];
}

export interface ParsedPptxDeck extends PptxPreviewData {
  slides: ParsedPptxSlide[];
}

interface ParseOptions {
  fileName?: string;
  includeAssets?: boolean;
}

interface SlideShapeText {
  placeholderType: string | null;
  name: string;
  text: string;
  paragraphs: string[];
  position?: BlockPosition;
}

interface BlockPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SlideBuildState {
  title: string;
  subtitle: string;
  textFrames: SlideShapeText[];
  contentBlocks: ContentBlock[];
  imageAssets: PptxImageAsset[];
  warnings: string[];
  chartCount: number;
  tableCount: number;
  imageCount: number;
  speakerNotes: string;
  layoutHint: string | null;
}

interface SlideRelationship {
  id: string;
  type: string;
  target: string;
}

interface ChartSeries {
  label: string;
  categories: string[];
  values: number[];
}

export function isPptxFile(fileName: string, mimeType?: string): boolean {
  if (fileName.toLowerCase().endsWith(".pptx")) return true;
  return mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation";
}

export function isPasswordProtectedPptx(data: Uint8Array): boolean {
  if (data.length < PASSWORD_PROTECTED_SIGNATURE.length) return false;
  return PASSWORD_PROTECTED_SIGNATURE.every((byte, index) => data[index] === byte);
}

export async function extractPptxPreview(
  data: ArrayBuffer | Uint8Array,
  options: Omit<ParseOptions, "includeAssets"> = {}
): Promise<PptxPreviewData> {
  const parsed = await parsePptx(data, { ...options, includeAssets: false });
  return {
    title: parsed.title,
    themeName: parsed.themeName,
    slideCount: parsed.slideCount,
    slides: parsed.slides.map((slide) => ({
      index: slide.index,
      title: slide.title,
      subtitle: slide.subtitle,
      previewText: slide.previewText,
      layout: slide.layout,
      imageCount: slide.imageCount,
      tableCount: slide.tableCount,
      chartCount: slide.chartCount,
      speakerNotes: slide.speakerNotes,
    })),
    warnings: parsed.warnings,
    sourceText: parsed.sourceText,
  };
}

export async function parsePptx(
  data: ArrayBuffer | Uint8Array,
  options: ParseOptions = {}
): Promise<ParsedPptxDeck> {
  const bytes = toUint8Array(data);
  if (isPasswordProtectedPptx(bytes)) {
    throw new Error("PASSWORD_PROTECTED_PPTX");
  }

  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(bytes);
  } catch {
    throw new Error("INVALID_PPTX");
  }

  if (!zip.file("ppt/presentation.xml")) {
    throw new Error("INVALID_PPTX");
  }

  const presentationXml = await readZipText(zip, "ppt/presentation.xml");
  const presentationRels = parseRelationships(await readZipText(zip, "ppt/_rels/presentation.xml.rels"));
  const orderedSlidePaths = getOrderedSlidePaths(presentationXml, presentationRels);
  const slidePaths =
    orderedSlidePaths.length > 0
      ? orderedSlidePaths
      : zip
          .file(/^ppt\/slides\/slide\d+\.xml$/)
          .map((file) => file.name)
          .sort(numericSlideSort);

  const coreXml = await readZipText(zip, "docProps/core.xml");
  const themeName = await getThemeName(zip, presentationRels);
  const slideWarnings: string[] = [];
  const slides: ParsedPptxSlide[] = [];

  for (const [index, slidePath] of slidePaths.entries()) {
    const slideXml = await readZipText(zip, slidePath);
    const relsPath = slidePath.replace("/slides/", "/slides/_rels/").replace(".xml", ".xml.rels");
    const slideRels = parseRelationships(await readZipText(zip, relsPath));
    const layoutPath = resolveRelationshipTarget(
      slidePath,
      slideRels.find((rel) => rel.type.endsWith("/slideLayout"))?.target ?? null
    );
    const layoutXml = layoutPath ? await readZipText(zip, layoutPath) : "";
    const notesPath = resolveRelationshipTarget(
      slidePath,
      slideRels.find((rel) => rel.type.endsWith("/notesSlide"))?.target ?? null
    );
    const notesXml = notesPath ? await readZipText(zip, notesPath) : "";

    const built = await buildSlide({
      zip,
      slideXml,
      slidePath,
      slideRels,
      layoutXml,
      notesXml,
      includeAssets: options.includeAssets ?? false,
    });

    const title = built.title || `Slide ${index + 1}`;
    const subtitle = built.subtitle;
    const layout = chooseLayout(built);
    const previewText = buildPreviewText(title, subtitle, built.contentBlocks, built.speakerNotes);

    for (const warning of built.warnings) {
      slideWarnings.push(`Slide ${index + 1}: ${warning}`);
    }

    slides.push({
      index: index + 1,
      title,
      subtitle,
      previewText,
      layout,
      imageCount: built.imageCount,
      tableCount: built.tableCount,
      chartCount: built.chartCount,
      speakerNotes: built.speakerNotes,
      contentBlocks: built.contentBlocks,
      imageAssets: built.imageAssets,
    });
  }

  const title = extractTagValue(coreXml, "dc:title") || slides[0]?.title || stripExtension(options.fileName ?? "Imported Presentation");
  const warnings = dedupe(slideWarnings);

  return {
    title,
    themeName,
    slideCount: slides.length,
    slides,
    warnings,
    sourceText: buildSourceText(title, themeName, slides),
  };
}

async function buildSlide({
  zip,
  slideXml,
  slidePath,
  slideRels,
  layoutXml,
  notesXml,
  includeAssets,
}: {
  zip: JSZip;
  slideXml: string;
  slidePath: string;
  slideRels: SlideRelationship[];
  layoutXml: string;
  notesXml: string;
  includeAssets: boolean;
}): Promise<SlideBuildState> {
  const state: SlideBuildState = {
    title: "",
    subtitle: "",
    textFrames: [],
    contentBlocks: [],
    imageAssets: [],
    warnings: [],
    chartCount: 0,
    tableCount: 0,
    imageCount: 0,
    speakerNotes: normalizeWhitespace(extractTextRuns(notesXml)),
    layoutHint: extractCSlideName(layoutXml) || extractCSlideName(slideXml),
  };

  const smartArtMatches = slideXml.match(/drawingml\/2006\/diagram/gi) ?? [];
  if (smartArtMatches.length > 0) {
    state.warnings.push("SmartArt converted to text");
  }

  if (
    /<a:videoFile\b/i.test(slideXml) ||
    slideRels.some((rel) => rel.type.endsWith("/video") || rel.type.endsWith("/media"))
  ) {
    state.warnings.push("Video embed not imported");
  }

  for (const shapeXml of matchXmlBlocks(slideXml, "p:sp")) {
    const textFrame = parseTextShape(shapeXml);
    if (!textFrame.text) continue;
    state.textFrames.push(textFrame);
  }

  assignTitleAndSubtitle(state);
  appendTextBlocks(state);
  appendTableBlocks(state, slideXml);
  await appendImageBlocks(state, zip, slideXml, slidePath, slideRels, includeAssets);
  await appendChartBlocks(state, zip, slidePath, slideXml, slideRels);

  return state;
}

function assignTitleAndSubtitle(state: SlideBuildState) {
  const remaining: SlideShapeText[] = [];

  for (const frame of state.textFrames) {
    const lowerName = frame.name.toLowerCase();
    const placeholder = frame.placeholderType?.toLowerCase();

    if (!state.title && (placeholder === "title" || placeholder === "ctrtitle" || lowerName.includes("title"))) {
      state.title = frame.text;
      continue;
    }

    if (!state.subtitle && (placeholder === "subtitle" || placeholder === "subTitle".toLowerCase())) {
      state.subtitle = frame.text;
      continue;
    }

    remaining.push(frame);
  }

  if (!state.title && remaining.length > 0) {
    state.title = remaining.shift()?.text ?? "";
  }

  if (!state.subtitle && remaining.length > 0) {
    const first = remaining[0];
    const looksLikeSubtitle =
      first.placeholderType?.toLowerCase() === "subtitle" ||
      first.name.toLowerCase().includes("subtitle");
    if (looksLikeSubtitle && first.paragraphs.length <= 2 && first.text.length <= 180) {
      state.subtitle = first.text;
      remaining.shift();
    }
  }

  state.textFrames = remaining;
}

function appendTextBlocks(state: SlideBuildState) {
  for (const frame of state.textFrames) {
    if (!frame.text.trim()) continue;

    if (frame.paragraphs.length > 1) {
      state.contentBlocks.push({
        type: "bullets",
        data: {
          items: frame.paragraphs,
        },
        ...(frame.position ? { position: frame.position } : {}),
      });
      continue;
    }

    state.contentBlocks.push({
      type: "text",
      data: {
        text: frame.text,
        style: "body",
      },
      ...(frame.position ? { position: frame.position } : {}),
    });
  }
}

function appendTableBlocks(state: SlideBuildState, slideXml: string) {
  for (const tableXml of matchXmlBlocks(slideXml, "a:tbl")) {
    const rows = matchXmlBlocks(tableXml, "a:tr")
      .map((rowXml) =>
        matchXmlBlocks(rowXml, "a:tc")
          .map((cellXml) => normalizeWhitespace(extractTextRuns(cellXml)))
          .filter(Boolean)
      )
      .filter((row) => row.length > 0);

    if (rows.length === 0) continue;
    const [headerRow, ...bodyRows] = rows;
    state.contentBlocks.push({
      type: "table",
      data: {
        headers: headerRow,
        rows: bodyRows,
      },
    });
    state.tableCount += 1;
  }
}

async function appendImageBlocks(
  state: SlideBuildState,
  zip: JSZip,
  slideXml: string,
  slidePath: string,
  slideRels: SlideRelationship[],
  includeAssets: boolean
) {
  for (const picXml of matchXmlBlocks(slideXml, "p:pic")) {
    const relId = matchAttribute(picXml, /(?:r:embed|embed)="([^"]+)"/i);
    if (!relId) continue;

    const rel = slideRels.find((item) => item.id === relId);
    if (!rel) continue;

    const assetPath = resolveRelationshipTarget(slidePath, rel.target);
    if (!assetPath) continue;

    const extension = extensionFromPath(assetPath);
    const mimeType = mimeTypeFromExtension(extension);
    const alt = matchAttribute(picXml, /\bdescr="([^"]*)"/i) || matchAttribute(picXml, /\bname="([^"]*)"/i) || "Imported image";
    const position = parsePosition(picXml);
    const blockIndex = state.contentBlocks.length;

    state.contentBlocks.push({
      type: "image",
      data: {
        alt,
      },
      ...(position ? { position } : {}),
    });

    state.imageAssets.push({
      blockIndex,
      extension,
      mimeType,
      data: includeAssets ? await readZipBytes(zip, assetPath) : null,
    });
    state.imageCount += 1;
  }
}

async function appendChartBlocks(
  state: SlideBuildState,
  zip: JSZip,
  slidePath: string,
  slideXml: string,
  slideRels: SlideRelationship[]
) {
  const chartIds = [...slideXml.matchAll(/<c:chart\b[^>]*(?:r:id|id)="([^"]+)"/gi)].map((match) => match[1]);

  for (const relId of chartIds) {
    const rel = slideRels.find((item) => item.id === relId);
    if (!rel) continue;

    const chartPath = resolveRelationshipTarget(slidePath, rel.target);
    if (!chartPath) continue;
    const chartXml = await readZipText(zip, chartPath);
    const chartType = detectChartType(chartXml);
    const series = parseChartSeries(chartXml);

    if (series.length === 0) {
      state.contentBlocks.push({
        type: "callout",
        data: {
          type: "info",
          title: "Imported chart placeholder",
          text: "Original chart data could not be imported. Rebuild this chart in ScholarSync.",
        },
      });
      state.warnings.push("Chart imported as placeholder");
      state.chartCount += 1;
      continue;
    }

    const labels = series[0]?.categories ?? [];
    state.contentBlocks.push({
      type: "chart",
      data: {
        chartType,
        title: extractChartTitle(chartXml) || "Imported chart",
        labels,
        datasets: series.map((item) => ({
          label: item.label || "Series",
          data: item.values,
        })),
        showLegend: series.length > 1,
      },
    });
    state.chartCount += 1;
  }
}

function chooseLayout(state: SlideBuildState): SlideLayout {
  const hint = state.layoutHint?.toLowerCase() ?? "";
  if (state.chartCount > 0) return "chart_slide";
  if (state.tableCount > 0) return "table_slide";
  if (state.imageCount > 0 && state.contentBlocks.some((block) => block.type === "text" || block.type === "bullets")) {
    return "image_text";
  }
  if (hint.includes("two content") || hint.includes("comparison")) return "two_column";
  if (hint.includes("section") || hint.includes("header")) return "section_header";
  if (state.title && state.subtitle && state.contentBlocks.length === 0) return "title_slide";
  if (hasTwoColumnText(state.contentBlocks)) return "two_column";
  return "title_content";
}

function hasTwoColumnText(blocks: ContentBlock[]): boolean {
  const positioned = blocks.filter(
    (block) => (block.type === "text" || block.type === "bullets") && Boolean(block.position)
  );
  if (positioned.length < 2) return false;
  const left = positioned.some((block) => (block.position?.x ?? 0) < 45);
  const right = positioned.some((block) => (block.position?.x ?? 0) > 45);
  return left && right;
}

function buildPreviewText(
  title: string,
  subtitle: string,
  blocks: ContentBlock[],
  speakerNotes: string
): string {
  const parts = [title, subtitle];
  for (const block of blocks) {
    if (block.type === "text") {
      parts.push(block.data.text);
    } else if (block.type === "bullets") {
      parts.push(block.data.items.join(" "));
    } else if (block.type === "table") {
      parts.push([...block.data.headers, ...block.data.rows.flat()].join(" "));
    } else if (block.type === "chart") {
      parts.push(block.data.title);
      parts.push(block.data.labels.join(" "));
    } else if (block.type === "callout") {
      parts.push(block.data.title ?? "");
      parts.push(block.data.text);
    }
  }
  parts.push(speakerNotes);
  return truncate(normalizeWhitespace(parts.filter(Boolean).join(" ")), 220);
}

function buildSourceText(title: string, themeName: string | null, slides: ParsedPptxSlide[]): string {
  const lines = [`Deck Title: ${title}`];
  if (themeName) lines.push(`Theme: ${themeName}`);

  for (const slide of slides) {
    lines.push(``);
    lines.push(`Slide ${slide.index}: ${slide.title}`);
    if (slide.subtitle) lines.push(`Subtitle: ${slide.subtitle}`);

    for (const block of slide.contentBlocks) {
      if (block.type === "text") lines.push(`Text: ${block.data.text}`);
      if (block.type === "bullets") lines.push(`Bullets: ${block.data.items.join(" | ")}`);
      if (block.type === "table") {
        lines.push(`Table Headers: ${block.data.headers.join(" | ")}`);
        for (const row of block.data.rows) {
          lines.push(`Table Row: ${row.join(" | ")}`);
        }
      }
      if (block.type === "chart") {
        lines.push(`Chart: ${block.data.title}`);
        lines.push(`Chart Labels: ${block.data.labels.join(" | ")}`);
        for (const dataset of block.data.datasets) {
          lines.push(`Chart Series ${dataset.label}: ${dataset.data.join(", ")}`);
        }
      }
      if (block.type === "image") lines.push(`Image: ${block.data.alt}`);
      if (block.type === "callout") lines.push(`Note: ${block.data.text}`);
    }

    if (slide.speakerNotes) {
      lines.push(`Speaker Notes: ${slide.speakerNotes}`);
    }
  }

  return lines.join("\n").trim();
}

function getOrderedSlidePaths(presentationXml: string, rels: SlideRelationship[]): string[] {
  const slideRelIds = [...presentationXml.matchAll(/<p:sldId\b[^>]*r:id="([^"]+)"/gi)].map((match) => match[1]);
  return slideRelIds
    .map((id) => rels.find((rel) => rel.id === id))
    .filter((rel): rel is SlideRelationship => Boolean(rel))
    .map((rel) => resolveRelationshipTarget("ppt/presentation.xml", rel.target))
    .filter((path): path is string => Boolean(path));
}

async function getThemeName(zip: JSZip, rels: SlideRelationship[]): Promise<string | null> {
  const themeRel = rels.find((rel) => rel.type.endsWith("/theme"));
  if (!themeRel) return null;
  const themePath = resolveRelationshipTarget("ppt/presentation.xml", themeRel.target);
  if (!themePath) return null;
  const themeXml = await readZipText(zip, themePath);
  return matchAttribute(themeXml, /<a:theme\b[^>]*name="([^"]+)"/i) ?? null;
}

function parseRelationships(xml: string): SlideRelationship[] {
  if (!xml) return [];
  return [...xml.matchAll(/<Relationship\b[^>]*Id="([^"]+)"[^>]*Type="([^"]+)"[^>]*Target="([^"]+)"/gi)].map((match) => ({
    id: match[1],
    type: match[2],
    target: decodeXmlEntities(match[3]),
  }));
}

function parseTextShape(shapeXml: string): SlideShapeText {
  const paragraphs = [...shapeXml.matchAll(/<a:p\b[\s\S]*?<\/a:p>/gi)]
    .map((match) => normalizeWhitespace(extractTextRuns(match[0])))
    .filter(Boolean);

  return {
    placeholderType: matchAttribute(shapeXml, /<p:ph\b[^>]*type="([^"]+)"/i) ?? null,
    name: matchAttribute(shapeXml, /<p:cNvPr\b[^>]*name="([^"]+)"/i) ?? "",
    text: paragraphs.join("\n"),
    paragraphs,
    position: parsePosition(shapeXml),
  };
}

function parseChartSeries(chartXml: string): ChartSeries[] {
  return matchXmlBlocks(chartXml, "c:ser").map((seriesXml) => {
    const label =
      extractTagValue(seriesXml, "c:v") ||
      extractTagValue(seriesXml, "c:tx") ||
      matchAttribute(seriesXml, /<c:tx[^>]*>\s*<c:strRef[\s\S]*?<c:v>([\s\S]*?)<\/c:v>/i) ||
      "Series";
    const categories = parseChartValues(seriesXml, "cat");
    const values = parseChartValues(seriesXml, "val")
      .map((item) => Number(item))
      .filter((value) => Number.isFinite(value));
    return {
      label: normalizeWhitespace(label),
      categories,
      values,
    };
  }).filter((series) => series.categories.length > 0 || series.values.length > 0);
}

function parseChartValues(seriesXml: string, bucket: "cat" | "val"): string[] {
  const bucketMatch = seriesXml.match(new RegExp(`<c:${bucket}\\b[\\s\\S]*?<\\/c:${bucket}>`, "i"));
  if (!bucketMatch) return [];
  const cacheMatch =
    bucketMatch[0].match(/<c:strCache\b[\s\S]*?<\/c:strCache>/i) ??
    bucketMatch[0].match(/<c:numCache\b[\s\S]*?<\/c:numCache>/i);
  if (!cacheMatch) return [];
  return [...cacheMatch[0].matchAll(/<c:pt\b[^>]*>\s*<c:v>([\s\S]*?)<\/c:v>\s*<\/c:pt>/gi)].map((match) =>
    normalizeWhitespace(decodeXmlEntities(match[1]))
  );
}

function extractChartTitle(chartXml: string): string {
  return normalizeWhitespace(extractTextRuns(chartXml.match(/<c:title\b[\s\S]*?<\/c:title>/i)?.[0] ?? ""));
}

function detectChartType(chartXml: string): "bar" | "line" | "pie" | "scatter" | "area" | "radar" | "funnel" | "forest_plot" {
  if (/<c:lineChart\b/i.test(chartXml)) return "line";
  if (/<c:pieChart\b/i.test(chartXml) || /<c:doughnutChart\b/i.test(chartXml)) return "pie";
  if (/<c:scatterChart\b/i.test(chartXml)) return "scatter";
  if (/<c:areaChart\b/i.test(chartXml)) return "area";
  if (/<c:radarChart\b/i.test(chartXml)) return "radar";
  return "bar";
}

function parsePosition(xml: string): BlockPosition | undefined {
  const off = xml.match(/<a:off\b[^>]*x="([^"]+)"[^>]*y="([^"]+)"/i);
  const ext = xml.match(/<a:ext\b[^>]*cx="([^"]+)"[^>]*cy="([^"]+)"/i);
  if (!off || !ext) return undefined;

  const x = emuToPercent(Number(off[1]), 9144000);
  const y = emuToPercent(Number(off[2]), 6858000);
  const width = emuToPercent(Number(ext[1]), 9144000);
  const height = emuToPercent(Number(ext[2]), 6858000);
  if (![x, y, width, height].every((value) => Number.isFinite(value))) return undefined;

  return {
    x: round2(x),
    y: round2(y),
    width: round2(width),
    height: round2(height),
  };
}

function extractCSlideName(xml: string): string | null {
  return matchAttribute(xml, /<p:cSld\b[^>]*name="([^"]+)"/i) ?? null;
}

function extractTextRuns(xml: string): string {
  return [...xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/gi)]
    .map((match) => decodeXmlEntities(match[1]))
    .join(" ");
}

function extractTagValue(xml: string, tagName: string): string {
  const escaped = tagName.replace(":", "\\:");
  const match = xml.match(new RegExp(`<${escaped}>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  return normalizeWhitespace(decodeXmlEntities(match?.[1] ?? ""));
}

function matchXmlBlocks(xml: string, tagName: string): string[] {
  const escaped = tagName.replace(":", "\\:");
  return [...xml.matchAll(new RegExp(`<${escaped}\\b[\\s\\S]*?<\\/${escaped}>`, "gi"))].map((match) => match[0]);
}

function resolveRelationshipTarget(basePath: string, target: string | null): string | null {
  if (!target) return null;
  if (target.startsWith("/")) return target.replace(/^\/+/, "");
  const baseParts = basePath.split("/").slice(0, -1);
  const targetParts = target.split("/");
  const output = [...baseParts];

  for (const part of targetParts) {
    if (!part || part === ".") continue;
    if (part === "..") {
      output.pop();
      continue;
    }
    output.push(part);
  }

  return output.join("/");
}

async function readZipText(zip: JSZip, path: string): Promise<string> {
  const file = zip.file(path);
  return file ? file.async("text") : "";
}

async function readZipBytes(zip: JSZip, path: string): Promise<Uint8Array | null> {
  const file = zip.file(path);
  return file ? file.async("uint8array") : null;
}

function numericSlideSort(a: string, b: string): number {
  const aNum = Number(a.match(/slide(\d+)\.xml$/)?.[1] ?? "0");
  const bNum = Number(b.match(/slide(\d+)\.xml$/)?.[1] ?? "0");
  return aNum - bNum;
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}\u2026`;
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function matchAttribute(input: string, pattern: RegExp): string | null {
  const match = input.match(pattern);
  return match?.[1] ? decodeXmlEntities(match[1]) : null;
}

function extensionFromPath(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase();
  return ext || "png";
}

function mimeTypeFromExtension(extension: string): string {
  const map: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    bmp: "image/bmp",
    tif: "image/tiff",
    tiff: "image/tiff",
  };
  return map[extension] ?? "application/octet-stream";
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'");
}

function stripExtension(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, "");
}

function emuToPercent(value: number, total: number): number {
  return (value / total) * 100;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function dedupe(values: string[]): string[] {
  return [...new Set(values)];
}

function toUint8Array(data: ArrayBuffer | Uint8Array): Uint8Array {
  return data instanceof Uint8Array ? data : new Uint8Array(data);
}
