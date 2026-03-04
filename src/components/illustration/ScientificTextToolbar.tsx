"use client";
/**
 * ScientificTextToolbar Component
 *
 * Floating toolbar for scientific text editing.
 * Provides Greek letters, sub/superscript, and math symbols.
 * Appears when text objects are selected on the canvas.
 *
 * @module components/illustration/ScientificTextToolbar
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useEditorStore } from '@/stores/illustration/editorStore';

// ============================================================================
// TYPES
// ============================================================================

interface ScientificTextToolbarProps {
  /** Position of the toolbar */
  x?: number;
  y?: number;
  /** Whether the toolbar is visible */
  visible?: boolean;
  /** Callback when toolbar should close */
  onClose?: () => void;
}

interface SymbolButton {
  symbol: string;
  label: string;
  category: 'greek' | 'superscript' | 'subscript' | 'math' | 'number';
}

// ============================================================================
// SYMBOLS DATA
// ============================================================================

const GREEK_LETTERS: SymbolButton[] = [
  { symbol: 'α', label: 'alpha', category: 'greek' },
  { symbol: 'β', label: 'beta', category: 'greek' },
  { symbol: 'γ', label: 'gamma', category: 'greek' },
  { symbol: 'δ', label: 'delta', category: 'greek' },
  { symbol: 'ε', label: 'epsilon', category: 'greek' },
  { symbol: 'ζ', label: 'zeta', category: 'greek' },
  { symbol: 'η', label: 'eta', category: 'greek' },
  { symbol: 'θ', label: 'theta', category: 'greek' },
  { symbol: 'ι', label: 'iota', category: 'greek' },
  { symbol: 'κ', label: 'kappa', category: 'greek' },
  { symbol: 'λ', label: 'lambda', category: 'greek' },
  { symbol: 'μ', label: 'mu', category: 'greek' },
  { symbol: 'ν', label: 'nu', category: 'greek' },
  { symbol: 'ξ', label: 'xi', category: 'greek' },
  { symbol: 'π', label: 'pi', category: 'greek' },
  { symbol: 'ρ', label: 'rho', category: 'greek' },
  { symbol: 'σ', label: 'sigma', category: 'greek' },
  { symbol: 'τ', label: 'tau', category: 'greek' },
  { symbol: 'υ', label: 'upsilon', category: 'greek' },
  { symbol: 'φ', label: 'phi', category: 'greek' },
  { symbol: 'χ', label: 'chi', category: 'greek' },
  { symbol: 'ψ', label: 'psi', category: 'greek' },
  { symbol: 'ω', label: 'omega', category: 'greek' },
  { symbol: 'Γ', label: 'Gamma', category: 'greek' },
  { symbol: 'Δ', label: 'Delta', category: 'greek' },
  { symbol: 'Θ', label: 'Theta', category: 'greek' },
  { symbol: 'Λ', label: 'Lambda', category: 'greek' },
  { symbol: 'Σ', label: 'Sigma', category: 'greek' },
  { symbol: 'Φ', label: 'Phi', category: 'greek' },
  { symbol: 'Ψ', label: 'Psi', category: 'greek' },
  { symbol: 'Ω', label: 'Omega', category: 'greek' },
];

const SUPERSCRIPTS: SymbolButton[] = [
  { symbol: '⁰', label: 'superscript 0', category: 'superscript' },
  { symbol: '¹', label: 'superscript 1', category: 'superscript' },
  { symbol: '²', label: 'superscript 2', category: 'superscript' },
  { symbol: '³', label: 'superscript 3', category: 'superscript' },
  { symbol: '⁴', label: 'superscript 4', category: 'superscript' },
  { symbol: '⁵', label: 'superscript 5', category: 'superscript' },
  { symbol: '⁶', label: 'superscript 6', category: 'superscript' },
  { symbol: '⁷', label: 'superscript 7', category: 'superscript' },
  { symbol: '⁸', label: 'superscript 8', category: 'superscript' },
  { symbol: '⁹', label: 'superscript 9', category: 'superscript' },
  { symbol: '⁺', label: 'superscript plus', category: 'superscript' },
  { symbol: '⁻', label: 'superscript minus', category: 'superscript' },
  { symbol: '⁼', label: 'superscript equals', category: 'superscript' },
  { symbol: '⁽', label: 'superscript left paren', category: 'superscript' },
  { symbol: '⁾', label: 'superscript right paren', category: 'superscript' },
  { symbol: 'ⁿ', label: 'superscript n', category: 'superscript' },
];

const SUBSCRIPTS: SymbolButton[] = [
  { symbol: '₀', label: 'subscript 0', category: 'subscript' },
  { symbol: '₁', label: 'subscript 1', category: 'subscript' },
  { symbol: '₂', label: 'subscript 2', category: 'subscript' },
  { symbol: '₃', label: 'subscript 3', category: 'subscript' },
  { symbol: '₄', label: 'subscript 4', category: 'subscript' },
  { symbol: '₅', label: 'subscript 5', category: 'subscript' },
  { symbol: '₆', label: 'subscript 6', category: 'subscript' },
  { symbol: '₇', label: 'subscript 7', category: 'subscript' },
  { symbol: '₈', label: 'subscript 8', category: 'subscript' },
  { symbol: '₉', label: 'subscript 9', category: 'subscript' },
  { symbol: '₊', label: 'subscript plus', category: 'subscript' },
  { symbol: '₋', label: 'subscript minus', category: 'subscript' },
  { symbol: '₌', label: 'subscript equals', category: 'subscript' },
  { symbol: '₍', label: 'subscript left paren', category: 'subscript' },
  { symbol: '₎', label: 'subscript right paren', category: 'subscript' },
];

const MATH_SYMBOLS: SymbolButton[] = [
  { symbol: '±', label: 'plus minus', category: 'math' },
  { symbol: '×', label: 'multiply', category: 'math' },
  { symbol: '÷', label: 'divide', category: 'math' },
  { symbol: '≠', label: 'not equal', category: 'math' },
  { symbol: '≤', label: 'less than or equal', category: 'math' },
  { symbol: '≥', label: 'greater than or equal', category: 'math' },
  { symbol: '≈', label: 'approximately equal', category: 'math' },
  { symbol: '∞', label: 'infinity', category: 'math' },
  { symbol: '∫', label: 'integral', category: 'math' },
  { symbol: '∑', label: 'summation', category: 'math' },
  { symbol: '∏', label: 'product', category: 'math' },
  { symbol: '√', label: 'square root', category: 'math' },
  { symbol: '∂', label: 'partial derivative', category: 'math' },
  { symbol: '∇', label: 'nabla', category: 'math' },
  { symbol: 'Δ', label: 'delta (change)', category: 'math' },
  { symbol: '→', label: 'arrow right', category: 'math' },
  { symbol: '←', label: 'arrow left', category: 'math' },
  { symbol: '↔', label: 'arrow both', category: 'math' },
  { symbol: '°', label: 'degree', category: 'math' },
  { symbol: '′', label: 'prime', category: 'math' },
  { symbol: '″', label: 'double prime', category: 'math' },
];

// ============================================================================
// STYLES
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  toolbar: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '8px',
    minWidth: '280px',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
    paddingBottom: '8px',
    borderBottom: '1px solid var(--border-primary)',
  },
  headerTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  section: {
    marginBottom: '12px',
  },
  sectionTitle: {
    fontSize: '10px',
    fontWeight: 500,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '6px',
  },
  symbolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: '4px',
  },
  symbolButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '28px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    fontFamily: 'Times New Roman, serif',
  },
  formatButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '28px',
    padding: '0 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  formatButtonsRow: {
    display: 'flex',
    gap: '4px',
    marginBottom: '8px',
  },
};

// ============================================================================
// ICONS
// ============================================================================

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

interface SymbolGridProps {
  symbols: SymbolButton[];
  onInsert: (symbol: string) => void;
}

function SymbolGrid({ symbols, onInsert }: SymbolGridProps): JSX.Element {
  return (
    <div style={styles.symbolsGrid}>
      {symbols.map((item, index) => (
        <button
          key={`${item.category}-${item.label}-${index}`}
          style={styles.symbolButton}
          onClick={() => onInsert(item.symbol)}
          title={item.label}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          {item.symbol}
        </button>
      ))}
    </div>
  );
}

interface FormatButtonProps {
  label: string;
  onClick: () => void;
}

function FormatButton({ label, onClick }: FormatButtonProps): JSX.Element {
  return (
    <button
      style={styles.formatButton}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
        e.currentTarget.style.color = 'var(--text-primary)';
      }}
    >
      {label}
    </button>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ScientificTextToolbar({
  x = 100,
  y = 100,
  visible = true,
  onClose
}: ScientificTextToolbarProps): JSX.Element | null {
  const canvas = useEditorStore((state) => state.canvas);
  const [activeTab] = useState<'greek' | 'scripts' | 'math'>('greek');
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Insert symbol at cursor position in active text object
  const insertSymbol = useCallback(
    (symbol: string) => {
      if (!canvas) return;

      const activeObject = canvas.getActiveObject();
      if (!activeObject) return;

      // Check if it's a text object
      if (activeObject.type === 'i-text' || activeObject.type === 'textbox') {
        const textObj = activeObject as any;

        // For IText, we can insert at cursor position
        if (activeObject.type === 'i-text' && textObj.insertChars) {
          const cursorIndex = textObj.selectionStart ?? 0;
          textObj.insertChars({
            [cursorIndex]: symbol
          });
          textObj.set('selectionStart', cursorIndex + symbol.length);
          textObj.set('selectionEnd', cursorIndex + symbol.length);
        } else {
          // For Textbox or other text objects, append to text
          const currentText = textObj.text || '';
          textObj.set('text', currentText + symbol);
        }

        canvas.requestRenderAll();
        canvas.fire('object:modified', { target: activeObject });
      }
    },
    [canvas]
  );

  // Apply formatting to selected text
  const applySuperscript = useCallback(() => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    if (activeObject.type === 'i-text' || activeObject.type === 'textbox') {
      const textObj = activeObject as any;
      // Toggle superscript using setSuperscript method
      if (textObj.setSuperscript) {
        const isSuperscript = textObj.isSuperscript?.() || false;
        if (!isSuperscript) {
          textObj.setSuperscript(textObj.getSelectionStyles()?.[0]?.superscript ?
            textObj.getSelectionStyles()?.[0]?.superscript :
            0.6
          );
          textObj.setSuperscript(0.6);
        } else {
          textObj.setSuperscript(1);
        }
      }
      canvas.requestRenderAll();
    }
  }, [canvas]);

  const applySubscript = useCallback(() => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    if (activeObject.type === 'i-text' || activeObject.type === 'textbox') {
      const textObj = activeObject as any;
      // Toggle subscript
      if (textObj.setSubscript) {
        textObj.setSubscript(0.6);
      }
      canvas.requestRenderAll();
    }
  }, [canvas]);

  if (!visible) return null;

  return (
    <div
      ref={toolbarRef}
      style={{
        ...styles.toolbar,
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerTitle}>Scientific Text</span>
        <button
          style={styles.closeButton}
          onClick={onClose}
          title="Close toolbar"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Quick Format Buttons */}
      <div style={styles.formatButtonsRow}>
        <FormatButton label="x²" onClick={applySuperscript} />
        <FormatButton label="x₂" onClick={applySubscript} />
      </div>

      {/* Tab Content */}
      {activeTab === 'greek' && (
        <>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Greek Letters (Lowercase)</div>
            <SymbolGrid
              symbols={GREEK_LETTERS.filter(s => s.symbol === s.symbol.toLowerCase() && !SUPERSCRIPTS.some(ss => ss.symbol === s.symbol))}
              onInsert={insertSymbol}
            />
          </div>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Greek Letters (Uppercase)</div>
            <SymbolGrid
              symbols={GREEK_LETTERS.filter(s => s.symbol === s.symbol.toUpperCase())}
              onInsert={insertSymbol}
            />
          </div>
        </>
      )}

      {activeTab === 'scripts' && (
        <>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Superscripts</div>
            <SymbolGrid symbols={SUPERSCRIPTS} onInsert={insertSymbol} />
          </div>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Subscripts</div>
            <SymbolGrid symbols={SUBSCRIPTS} onInsert={insertSymbol} />
          </div>
        </>
      )}

      {activeTab === 'math' && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Math Symbols</div>
          <SymbolGrid symbols={MATH_SYMBOLS} onInsert={insertSymbol} />
        </div>
      )}
    </div>
  );
}

export default ScientificTextToolbar;
