/**
 * Clipboard Handler Service
 * Handles paste events and routes content to appropriate importers.
 *
 * Features:
 * - Listens for paste events
 * - Detects content type (image, SVG, text)
 * - Routes to appropriate importer
 * - Handles HTML containing SVG
 * - Handles plain SVG text
 */

import type { Object as FabricObject } from 'fabric';
import {
  type ImportResult,
  type ImportOptions,
  type ClipboardContent,
  type ClipboardContentType,
  type ImportProgressCallback,
  ImportError,
} from './types.js';
import { SVGImporter } from './SVGImporter.js';
import { ImageImporter } from './ImageImporter.js';

/** Event handler type for clipboard paste */
export type ClipboardPasteHandler = (result: ImportResult) => void;

/** Event handler type for clipboard errors */
export type ClipboardErrorHandler = (error: ImportError) => void;

/** Clipboard handler options */
export interface ClipboardHandlerOptions extends ImportOptions {
  /** Element to attach paste listener to (defaults to document) */
  targetElement?: HTMLElement | Document;
  /** Whether to automatically handle paste events */
  autoHandle?: boolean;
  /** Callback when content is successfully pasted */
  onPaste?: ClipboardPasteHandler;
  /** Callback when an error occurs */
  onError?: ClipboardErrorHandler;
  /** Progress callback for import operations */
  onProgress?: ImportProgressCallback;
}

export class ClipboardHandler {
  private options: ClipboardHandlerOptions;
  private svgImporter: SVGImporter;
  private imageImporter: ImageImporter;
  private isListening: boolean = false;
  private boundPasteHandler: ((e: ClipboardEvent) => void) | null = null;

  constructor(options: ClipboardHandlerOptions = {}) {
    this.options = {
      targetElement: typeof document !== 'undefined' ? document : undefined,
      autoHandle: true,
      ...options,
    };

    this.svgImporter = new SVGImporter({
      preserveGroups: options.preserveGroups,
      centerOnCanvas: options.centerOnCanvas,
      scale: options.scale,
    });

    this.imageImporter = new ImageImporter({
      centerOnCanvas: options.centerOnCanvas,
      scale: options.scale,
      maxDimension: options.maxDimension,
    });
  }

  /**
   * Start listening for paste events
   */
  startListening(): void {
    if (this.isListening || !this.options.targetElement) {
      return;
    }

    this.boundPasteHandler = this.handlePaste.bind(this);
    this.options.targetElement.addEventListener(
      'paste',
      this.boundPasteHandler as EventListener
    );
    this.isListening = true;
  }

  /**
   * Stop listening for paste events
   */
  stopListening(): void {
    if (!this.isListening || !this.options.targetElement || !this.boundPasteHandler) {
      return;
    }

    this.options.targetElement.removeEventListener(
      'paste',
      this.boundPasteHandler as EventListener
    );
    this.boundPasteHandler = null;
    this.isListening = false;
  }

  /**
   * Handle paste event
   */
  private async handlePaste(event: ClipboardEvent): Promise<void> {
    if (!this.options.autoHandle) {
      return;
    }

    // Prevent default paste behavior
    event.preventDefault();

    try {
      const result = await this.processClipboard(event.clipboardData);
      if (result && this.options.onPaste) {
        this.options.onPaste(result);
      }
    } catch (error) {
      if (this.options.onError) {
        if (error instanceof ImportError) {
          this.options.onError(error);
        } else {
          this.options.onError(
            new ImportError(
              `Clipboard paste failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
              'UNKNOWN_ERROR',
              error instanceof Error ? error : undefined
            )
          );
        }
      }
    }
  }

  /**
   * Process clipboard data and return import result
   */
  async processClipboard(
    clipboardData: DataTransfer | null
  ): Promise<ImportResult | null> {
    if (!clipboardData) {
      return null;
    }

    // Detect content type and extract data
    const content = await this.detectContent(clipboardData);
    if (!content) {
      return null;
    }

    // Route to appropriate importer
    return this.importContent(content);
  }

  /**
   * Manually process a paste event (useful for custom handling)
   */
  async processPasteEvent(event: ClipboardEvent): Promise<ImportResult | null> {
    return this.processClipboard(event.clipboardData);
  }

  /**
   * Read clipboard content using Clipboard API (async)
   * Useful for reading clipboard without a paste event
   */
  async readClipboard(): Promise<ImportResult | null> {
    if (!navigator.clipboard) {
      throw new ImportError(
        'Clipboard API not available',
        'CLIPBOARD_ACCESS_DENIED'
      );
    }

    try {
      // Try reading as ClipboardItem (modern API)
      const items = await navigator.clipboard.read();

      for (const item of items) {
        // Check for images
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            const content: ClipboardContent = {
              type: type as ClipboardContentType,
              data: blob,
            };
            return this.importContent(content);
          }
        }

        // Check for SVG
        if (item.types.includes('image/svg+xml')) {
          const blob = await item.getType('image/svg+xml');
          const text = await blob.text();
          const content: ClipboardContent = {
            type: 'image/svg+xml',
            data: text,
          };
          return this.importContent(content);
        }

        // Check for HTML (might contain SVG)
        if (item.types.includes('text/html')) {
          const blob = await item.getType('text/html');
          const html = await blob.text();
          const svgContent = this.extractSVGFromHTML(html);
          if (svgContent) {
            const content: ClipboardContent = {
              type: 'image/svg+xml',
              data: svgContent,
            };
            return this.importContent(content);
          }
        }

        // Check for plain text (might be SVG)
        if (item.types.includes('text/plain')) {
          const blob = await item.getType('text/plain');
          const text = await blob.text();
          if (this.isSVGString(text)) {
            const content: ClipboardContent = {
              type: 'image/svg+xml',
              data: text,
            };
            return this.importContent(content);
          }
        }
      }

      return null;
    } catch (error) {
      // Fall back to readText for browsers with limited Clipboard API
      try {
        const text = await navigator.clipboard.readText();
        if (this.isSVGString(text)) {
          const content: ClipboardContent = {
            type: 'image/svg+xml',
            data: text,
          };
          return this.importContent(content);
        }
        return null;
      } catch {
        throw new ImportError(
          'Failed to read clipboard: Permission denied or clipboard empty',
          'CLIPBOARD_ACCESS_DENIED',
          error instanceof Error ? error : undefined
        );
      }
    }
  }

  /**
   * Detect content type from clipboard data
   */
  private async detectContent(
    clipboardData: DataTransfer
  ): Promise<ClipboardContent | null> {
    // Priority 1: Check for image files
    if (clipboardData.files.length > 0) {
      const file = clipboardData.files[0];
      if (file.type.startsWith('image/')) {
        if (file.type === 'image/svg+xml') {
          // Read SVG as text
          const text = await this.readFileAsText(file);
          return {
            type: 'image/svg+xml',
            data: text,
            fileName: file.name,
          };
        } else {
          // Return image blob
          return {
            type: file.type as ClipboardContentType,
            data: file,
            fileName: file.name,
          };
        }
      }
    }

    // Priority 2: Check for image data in items
    for (const item of Array.from(clipboardData.items)) {
      if (item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        if (blob) {
          if (item.type === 'image/svg+xml') {
            const text = await this.readFileAsText(blob);
            return {
              type: 'image/svg+xml',
              data: text,
            };
          } else {
            return {
              type: item.type as ClipboardContentType,
              data: blob,
            };
          }
        }
      }
    }

    // Priority 3: Check for HTML containing SVG
    const html = clipboardData.getData('text/html');
    if (html) {
      const svgContent = this.extractSVGFromHTML(html);
      if (svgContent) {
        return {
          type: 'image/svg+xml',
          data: svgContent,
        };
      }
    }

    // Priority 4: Check for plain text SVG
    const text = clipboardData.getData('text/plain');
    if (text && this.isSVGString(text)) {
      return {
        type: 'image/svg+xml',
        data: text,
      };
    }

    return null;
  }

  /**
   * Import content based on detected type
   */
  private async importContent(content: ClipboardContent): Promise<ImportResult> {
    switch (content.type) {
      case 'image/svg+xml':
        return this.svgImporter.importFromString(
          content.data as string,
          this.options.onProgress
        );

      case 'image/png':
      case 'image/jpeg':
      case 'image/gif':
        return this.imageImporter.importFromBlob(
          content.data as Blob,
          this.options.onProgress
        );

      default:
        throw new ImportError(
          `Unsupported clipboard content type: ${content.type}`,
          'UNSUPPORTED_FORMAT'
        );
    }
  }

  /**
   * Extract SVG content from HTML string
   */
  private extractSVGFromHTML(html: string): string | null {
    // Try to find SVG element in HTML
    const svgMatch = html.match(/<svg[^>]*>[\s\S]*?<\/svg>/i);
    if (svgMatch) {
      return svgMatch[0];
    }

    // Check for SVG data URI in img tag
    const imgMatch = html.match(/src=["']data:image\/svg\+xml[^"']+["']/i);
    if (imgMatch) {
      const dataUri = imgMatch[0].match(/src=["']([^"']+)["']/);
      if (dataUri && dataUri[1]) {
        return this.decodeDataURI(dataUri[1]);
      }
    }

    return null;
  }

  /**
   * Decode SVG data URI
   */
  private decodeDataURI(dataUri: string): string | null {
    try {
      if (dataUri.startsWith('data:image/svg+xml;base64,')) {
        const base64 = dataUri.replace('data:image/svg+xml;base64,', '');
        return atob(base64);
      } else if (dataUri.startsWith('data:image/svg+xml,')) {
        const encoded = dataUri.replace('data:image/svg+xml,', '');
        return decodeURIComponent(encoded);
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Check if string contains valid SVG
   */
  private isSVGString(str: string): boolean {
    const trimmed = str.trim();
    return (
      trimmed.startsWith('<svg') ||
      trimmed.startsWith('<?xml') ||
      /<svg[^>]*>/i.test(trimmed)
    );
  }

  /**
   * Read file as text
   */
  private readFileAsText(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  /**
   * Copy objects to clipboard (for cut/copy operations)
   */
  async copyToClipboard(objects: FabricObject[]): Promise<void> {
    if (objects.length === 0) {
      return;
    }

    // Serialize objects to JSON for internal clipboard
    const serialized = objects.map(obj => obj.toJSON());
    const jsonString = JSON.stringify({
      type: 'finnish-objects',
      version: 1,
      objects: serialized,
    });

    // Also create SVG representation
    const svgStrings = objects.map(obj => {
      if ('toSVG' in obj && typeof obj.toSVG === 'function') {
        return (obj as FabricObject & { toSVG: () => string }).toSVG();
      }
      return '';
    });

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg">${svgStrings.join('')}</svg>`;

    try {
      // Use Clipboard API if available
      const clipboard = navigator.clipboard as Clipboard | undefined;
      if (clipboard?.write) {
        const items = [
          new ClipboardItem({
            'text/plain': new Blob([jsonString], { type: 'text/plain' }),
            'image/svg+xml': new Blob([svgContent], { type: 'image/svg+xml' }),
          }),
        ];
        await clipboard.write(items);
      } else if (clipboard?.writeText) {
        // Fallback to text-only clipboard
        await clipboard.writeText(jsonString);
      }
    } catch (error) {
      throw new ImportError(
        'Failed to copy to clipboard',
        'CLIPBOARD_ACCESS_DENIED',
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Check if clipboard has content we can paste
   */
  async hasClipboardContent(): Promise<boolean> {
    try {
      if (navigator.clipboard && 'read' in navigator.clipboard) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          for (const type of item.types) {
            if (
              type.startsWith('image/') ||
              type === 'text/html' ||
              type === 'text/plain'
            ) {
              return true;
            }
          }
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Update options
   */
  setOptions(options: Partial<ClipboardHandlerOptions>): void {
    this.options = { ...this.options, ...options };

    // Update importers with new options
    this.svgImporter = new SVGImporter({
      preserveGroups: this.options.preserveGroups,
      centerOnCanvas: this.options.centerOnCanvas,
      scale: this.options.scale,
    });

    this.imageImporter = new ImageImporter({
      centerOnCanvas: this.options.centerOnCanvas,
      scale: this.options.scale,
      maxDimension: this.options.maxDimension,
    });
  }

  /**
   * Get current options
   */
  getOptions(): ClipboardHandlerOptions {
    return { ...this.options };
  }

  /**
   * Check if currently listening for paste events
   */
  isActive(): boolean {
    return this.isListening;
  }

  /**
   * Destroy the handler and clean up
   */
  destroy(): void {
    this.stopListening();
  }
}

export default ClipboardHandler;
