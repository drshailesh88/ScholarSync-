"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Upload,
  Trash,
  Copy,
  FilePdf,
  X,
  Spinner,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface ImageItem {
  id: string;
  filename: string;
  storageKey: string;
  sizeBytes: number;
  contentType: string;
  url: string;
}

interface ImageBrowserProps {
  projectId: string;
  onInsertImage: (latexCode: string) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(contentType: string) {
  if (contentType === "application/pdf") return FilePdf;
  return ImageIcon;
}

function isPreviewableImage(contentType: string) {
  return contentType.startsWith("image/");
}

export function ImageBrowser({ projectId, onInsertImage }: ImageBrowserProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load images on first open
  const loadImages = useCallback(async () => {
    if (loaded || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/latex/images/list?projectId=${projectId}`);
      if (res.ok) {
        const data = await res.json();
        setImages(data.images || []);
        setLoaded(true);
      }
    } catch {
      // Ignore - will show empty state
    } finally {
      setIsLoading(false);
    }
  }, [projectId, loaded, isLoading]);

  const handleUpload = useCallback(async (file: File) => {
    if (!file) return;

    // Validate type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid file type. Supported: PNG, JPG, PDF`);
      return;
    }

    // Validate size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Maximum size is 10MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("projectId", projectId);
      formData.append("file", file);

      const res = await fetch("/api/latex/images", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }

      const newImage: ImageItem = await res.json();
      setImages((prev) => [...prev, newImage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }, [projectId]);

  const handleDelete = useCallback(async (image: ImageItem) => {
    try {
      const res = await fetch(
        `/api/latex/images?storageKey=${encodeURIComponent(image.storageKey)}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== image.id));
      }
    } catch {
      // Ignore delete errors
    }
  }, []);

  const handleInsert = useCallback((image: ImageItem) => {
    // Determine if it's a PDF or image
    const isPdf = image.contentType === "application/pdf";
    const ext = image.filename.split(".").pop()?.toLowerCase() || "png";

    // Generate LaTeX code - user can adjust path as needed
    const baseName = image.filename.replace(/\.[^/.]+$/, "");
    const latexCode = isPdf
      ? `\\includegraphics[width=\\linewidth]{figures/${baseName}.pdf}`
      : `\\includegraphics[width=\\linewidth]{figures/${baseName}.${ext}}`;

    onInsertImage(latexCode);
  }, [onInsertImage]);

  const handleCopyPath = useCallback((image: ImageItem) => {
    const baseName = image.filename.replace(/\.[^/.]+$/, "");
    const ext = image.filename.split(".").pop()?.toLowerCase() || "png";
    navigator.clipboard.writeText(`figures/${baseName}.${ext}`);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [handleUpload]);

  return (
    <div
      className="flex flex-col h-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onFocus={loadImages}
      onMouseEnter={loadImages}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border-subtle">
        <span className="text-[10px] font-semibold text-ink-muted/60 tracking-wider uppercase">
          Figures
        </span>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="p-1 rounded-md text-ink-muted hover:text-brand hover:bg-brand/10 transition-colors disabled:opacity-50"
          title="Upload image"
        >
          {isUploading ? <Spinner size={14} className="animate-spin" /> : <Upload size={14} />}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="mx-2 mt-2 px-2 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
          <span className="text-[10px] text-red-400 flex-1">{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
            <X size={12} />
          </button>
        </div>
      )}

      {/* Drop zone / image list */}
      <div
        className={cn(
          "flex-1 overflow-y-auto px-2 py-1.5 transition-colors",
          dragOver && "bg-brand/5"
        )}
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner size={20} className="animate-spin text-ink-muted" />
          </div>
        ) : images.length === 0 ? (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center transition-colors m-2",
              dragOver ? "border-brand bg-brand/5" : "border-border-subtle"
            )}
          >
            <ImageIcon size={24} className="mx-auto text-ink-muted/40 mb-2" />
            <p className="text-[10px] text-ink-muted/60 mb-1">
              Drag & drop images here
            </p>
            <p className="text-[9px] text-ink-muted/40">
              PNG, JPG, or PDF (max 10MB)
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {images.map((image) => {
              const Icon = getFileIcon(image.contentType);
              return (
                <div
                  key={image.id}
                  className="group flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-raised transition-colors"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border-subtle bg-surface-raised">
                    {isPreviewableImage(image.contentType) ? (
                      <Image
                        src={image.url}
                        alt={image.filename}
                        className="object-cover"
                        loading="lazy"
                        fill
                        sizes="40px"
                        unoptimized
                      />
                    ) : image.contentType === "application/pdf" ? (
                      <iframe
                        src={image.url}
                        title={image.filename}
                        className="h-full w-full pointer-events-none"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Icon size={14} className="text-sky-500 shrink-0" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-ink truncate">{image.filename}</p>
                    <p className="text-[9px] text-ink-muted">
                      {formatFileSize(image.sizeBytes ?? 0)}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleInsert(image)}
                      className="p-1 rounded text-ink-muted hover:text-brand hover:bg-brand/10"
                      title="Insert \\includegraphics"
                    >
                      <Upload size={12} />
                    </button>
                    <button
                      onClick={() => handleCopyPath(image)}
                      className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-raised"
                      title="Copy path"
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      onClick={() => handleDelete(image)}
                      className="p-1 rounded text-ink-muted hover:text-red-400 hover:bg-red-500/10"
                      title="Delete image"
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer hint */}
      {images.length > 0 && (
        <div className="px-3 py-1.5 border-t border-border-subtle">
          <p className="text-[9px] text-ink-muted/50 text-center">
            Click to insert \\includegraphics
          </p>
        </div>
      )}
    </div>
  );
}
