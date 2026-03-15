"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  LinkedinLogo,
  XLogo,
  InstagramLogo,
  Copy,
  Download,
  Check,
  SpinnerGap,
  CaretLeft,
  type Icon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { ThemeConfig } from "@/types/presentation";
import { SOCIAL_FORMATS, type SocialFormatKey } from "@/lib/presentation/social-formats";
import { SocialSlideRenderer } from "./social-slide-renderer";
import {
  captureSlideAsImage,
  exportAsLinkedInPdf,
  generateTwitterThread,
  downloadBlob,
  downloadImagesAsZipOrIndividual,
  copyThreadToClipboard,
  type SlideData,
} from "@/lib/presentation/social-export";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SocialExportModalProps {
  slides: SlideData[];
  themeKey: string;
  themeConfig?: ThemeConfig;
  deckTitle: string;
  onClose: () => void;
}

// Icon map for social format cards
const FORMAT_ICONS: Record<string, Icon> = {
  LinkedinLogo,
  XLogo,
  InstagramLogo,
};

// ---------------------------------------------------------------------------
// SocialExportModal
// ---------------------------------------------------------------------------

export function SocialExportModal({
  slides,
  themeKey,
  themeConfig,
  deckTitle,
  onClose,
}: SocialExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<SocialFormatKey | null>(null);
  const [exporting, setExporting] = useState(false);
  const [showBranding, setShowBranding] = useState(true);
  const [copied, setCopied] = useState(false);
  const [_twitterThread, setTwitterThread] = useState<string[]>([]);
  const [editedThread, setEditedThread] = useState<string[]>([]);
  const slideRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const offscreenContainerRef = useRef<HTMLDivElement>(null);

  // Generate twitter thread when format selected
  useEffect(() => {
    if (selectedFormat === "twitter_thread") {
      const thread = generateTwitterThread(slides);
      setTwitterThread(thread);
      setEditedThread([...thread]);
    }
  }, [selectedFormat, slides]);

  // Reset copied state
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const setSlideRef = useCallback((index: number, el: HTMLDivElement | null) => {
    if (el) {
      slideRefs.current.set(index, el);
    } else {
      slideRefs.current.delete(index);
    }
  }, []);

  // Handle image-based export (LinkedIn PDF, Twitter images, Instagram)
  const handleImageExport = useCallback(async () => {
    if (!selectedFormat || selectedFormat === "twitter_thread") return;

    setExporting(true);
    try {
      const formatConfig = SOCIAL_FORMATS[selectedFormat];
      const maxSlides = "maxSlides" in formatConfig ? formatConfig.maxSlides : slides.length;
      const slidesToExport = slides.slice(0, maxSlides ?? slides.length);

      // Wait a tick for rendering
      await new Promise((resolve) => setTimeout(resolve, 500));

      const images: Blob[] = [];
      for (let i = 0; i < slidesToExport.length; i++) {
        const element = slideRefs.current.get(i);
        if (!element) continue;
        const blob = await captureSlideAsImage(element, selectedFormat);
        images.push(blob);
      }

      if (images.length === 0) return;

      // Download based on format
      if (selectedFormat === "linkedin_carousel") {
        const pdfBlob = await exportAsLinkedInPdf(images);
        const safeName = deckTitle.replace(/[^a-zA-Z0-9_-]/g, "_");
        downloadBlob(pdfBlob, `${safeName}_linkedin_carousel.pdf`);
      } else {
        const safeName = deckTitle.replace(/[^a-zA-Z0-9_-]/g, "_");
        const formatName = selectedFormat.replace(/_/g, "_");
        await downloadImagesAsZipOrIndividual(images, `${safeName}_${formatName}`);
      }
    } catch (err) {
      console.error("Social export error:", err);
    } finally {
      setExporting(false);
    }
  }, [selectedFormat, slides, deckTitle]);

  // Handle thread copy
  const handleCopyThread = useCallback(async () => {
    const success = await copyThreadToClipboard(editedThread);
    if (success) setCopied(true);
  }, [editedThread]);

  // Handle thread download as text file
  const handleDownloadThread = useCallback(() => {
    const text = editedThread
      .map((tweet, i) => `--- Tweet ${i + 1} ---\n${tweet}\n`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const safeName = deckTitle.replace(/[^a-zA-Z0-9_-]/g, "_");
    downloadBlob(blob, `${safeName}_twitter_thread.txt`);
  }, [editedThread, deckTitle]);

  const formatConfig = selectedFormat ? SOCIAL_FORMATS[selectedFormat] : null;
  const maxSlides =
    formatConfig && "maxSlides" in formatConfig
      ? formatConfig.maxSlides
      : slides.length;
  const slidesToExport = slides.slice(0, maxSlides ?? slides.length);

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            {selectedFormat && (
              <button
                onClick={() => setSelectedFormat(null)}
                className="p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
              >
                <CaretLeft size={18} />
              </button>
            )}
            <h2 className="text-lg font-semibold text-ink">
              {selectedFormat
                ? `Export as ${SOCIAL_FORMATS[selectedFormat].name}`
                : "Export for Social Media"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedFormat ? (
            /* ---- Format selection grid ---- */
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(Object.entries(SOCIAL_FORMATS) as [SocialFormatKey, (typeof SOCIAL_FORMATS)[SocialFormatKey]][]).map(
                ([key, fmt]) => {
                  const IconComp = FORMAT_ICONS[fmt.icon];
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedFormat(key)}
                      className="flex flex-col items-center gap-3 p-5 rounded-xl border border-border hover:border-brand/50 hover:bg-brand/5 transition-all group text-left"
                    >
                      {IconComp && (
                        <IconComp size={32} weight="duotone" />
                      )}
                      <div className="text-center">
                        <p className="text-sm font-medium text-ink group-hover:text-brand transition-colors">
                          {fmt.name}
                        </p>
                        <p className="text-xs text-ink-muted mt-1">
                          {fmt.description}
                        </p>
                        {"aspectRatio" in fmt && fmt.aspectRatio && (
                          <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-medium bg-surface-raised rounded-full text-ink-muted">
                            {fmt.aspectRatio}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                },
              )}
            </div>
          ) : selectedFormat === "twitter_thread" ? (
            /* ---- Twitter thread editor ---- */
            <div className="space-y-4">
              <p className="text-sm text-ink-muted">
                Review and edit each tweet before copying. Character counts are
                shown for each tweet.
              </p>
              <div className="space-y-3">
                {editedThread.map((tweet, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-ink-muted">
                        Tweet {i + 1} of {editedThread.length}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-mono",
                          tweet.length > 280
                            ? "text-red-500"
                            : tweet.length > 260
                              ? "text-amber-500"
                              : "text-ink-muted",
                        )}
                      >
                        {tweet.length}/280
                      </span>
                    </div>
                    <textarea aria-label="Text area"
                      value={tweet}
                      onChange={(e) => {
                        const updated = [...editedThread];
                        updated[i] = e.target.value;
                        setEditedThread(updated);
                      }}
                      rows={4}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface-raised text-ink resize-none focus:outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ---- Image preview ---- */
            <div className="space-y-4">
              {/* Options */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-ink-muted cursor-pointer">
                  <input aria-label="Checkbox"
                    type="checkbox"
                    checked={showBranding}
                    onChange={(e) => setShowBranding(e.target.checked)}
                    className="rounded border-border text-brand focus:ring-brand/30"
                  />
                  Show &ldquo;Created with ScholarSync&rdquo; branding
                </label>
                {maxSlides && maxSlides < slides.length && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    Limited to {maxSlides} slides for this format
                  </span>
                )}
              </div>

              {/* Preview grid */}
              <div className="text-xs text-ink-muted mb-2">
                Preview ({slidesToExport.length} slide
                {slidesToExport.length !== 1 ? "s" : ""})
              </div>
              <div
                className={cn(
                  "grid gap-4",
                  formatConfig && "width" in formatConfig && "height" in formatConfig && formatConfig.height > formatConfig.width
                    ? "grid-cols-2 sm:grid-cols-3"
                    : "grid-cols-2",
                )}
              >
                {slidesToExport.map((slide, i) => (
                  <div
                    key={i}
                    className="border border-border rounded-lg overflow-hidden shadow-sm"
                    style={{
                      // Show a scaled preview
                      aspectRatio:
                        formatConfig && "width" in formatConfig && "height" in formatConfig
                          ? `${formatConfig.width}/${formatConfig.height}`
                          : "1/1",
                    }}
                  >
                    <div
                      style={{
                        transform: `scale(${getPreviewScale(selectedFormat)})`,
                        transformOrigin: "top left",
                        width:
                          formatConfig && "width" in formatConfig
                            ? `${formatConfig.width}px`
                            : "1080px",
                        height:
                          formatConfig && "height" in formatConfig
                            ? `${formatConfig.height}px`
                            : "1080px",
                      }}
                    >
                      <SocialSlideRenderer
                        ref={(el) => setSlideRef(i, el)}
                        title={slide.title}
                        subtitle={slide.subtitle}
                        contentBlocks={slide.contentBlocks}
                        themeKey={themeKey}
                        themeConfig={themeConfig}
                        format={selectedFormat}
                        slideNumber={i + 1}
                        totalSlides={slidesToExport.length}
                        showBranding={showBranding}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Offscreen full-size renders for capture */}
              <div
                ref={offscreenContainerRef}
                style={{
                  position: "fixed",
                  left: "-9999px",
                  top: 0,
                  pointerEvents: "none",
                  opacity: 0,
                }}
              >
                {slidesToExport.map((slide, i) => (
                  <SocialSlideRenderer
                    key={`offscreen-${i}`}
                    ref={(el) => setSlideRef(i, el)}
                    title={slide.title}
                    subtitle={slide.subtitle}
                    contentBlocks={slide.contentBlocks}
                    themeKey={themeKey}
                    themeConfig={themeConfig}
                    format={selectedFormat}
                    slideNumber={i + 1}
                    totalSlides={slidesToExport.length}
                    showBranding={showBranding}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer — action buttons */}
        {selectedFormat && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border-subtle">
            {selectedFormat === "twitter_thread" ? (
              <>
                <button
                  onClick={handleDownloadThread}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
                >
                  <Download size={16} />
                  Download .txt
                </button>
                <button
                  onClick={handleCopyThread}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy Thread"}
                </button>
              </>
            ) : (
              <button
                onClick={handleImageExport}
                disabled={exporting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exporting ? (
                  <>
                    <SpinnerGap size={16} className="animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Download{" "}
                    {selectedFormat === "linkedin_carousel" ? "PDF" : "Images"}
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Render in portal to escape any overflow/stacking context
  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}

// ---------------------------------------------------------------------------
// Preview scale helper — scales the full-size render to fit in the grid
// ---------------------------------------------------------------------------

function getPreviewScale(format: SocialFormatKey): number {
  const config = SOCIAL_FORMATS[format];
  const width = "width" in config ? config.width : 1080;
  // Target preview width ~280px in the grid
  return 280 / width;
}
