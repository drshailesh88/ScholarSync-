/**
 * IconSearch Component
 *
 * Search input with debounce for filtering icons by name/tags.
 * Provides real-time search feedback as user types.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';

// =============================================================================
// TYPES
// =============================================================================

export interface IconSearchProps {
  /** Callback fired when search query changes (debounced) */
  onSearch: (query: string) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Initial search value */
  initialValue?: string;
  /** Whether to show clear button */
  showClear?: boolean;
  /** Whether the search input is disabled */
  disabled?: boolean;
  /** Custom class name for the container */
  className?: string;
}

// =============================================================================
// ICONS
// =============================================================================

const SearchIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClearIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// =============================================================================
// HOOK: useDebounce
// =============================================================================

/**
 * Custom hook for debouncing a value
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const IconSearch: React.FC<IconSearchProps> = ({
  onSearch,
  placeholder = 'Search icons...',
  debounceMs = 300,
  initialValue = '',
  showClear = true,
  disabled = false,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the search query
  const debouncedQuery = useDebounce(inputValue, debounceMs);

  // Call onSearch when debounced value changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  // Handle clear button click
  const handleClear = useCallback(() => {
    setInputValue('');
    inputRef.current?.focus();
  }, []);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        if (inputValue) {
          setInputValue('');
        } else {
          inputRef.current?.blur();
        }
      }
    },
    [inputValue]
  );

  return (
    <div
      className={className}
      style={{
        ...styles.container,
        ...(isFocused ? styles.containerFocused : {}),
        ...(disabled ? styles.containerDisabled : {}),
      }}
    >
      <span style={styles.searchIcon}>
        <SearchIcon />
      </span>

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        style={styles.input}
        aria-label="Search icons"
      />

      {showClear && inputValue && !disabled && (
        <button
          onClick={handleClear}
          style={styles.clearButton}
          type="button"
          aria-label="Clear search"
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
};

// =============================================================================
// STYLES
// =============================================================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: 'var(--bg-tertiary, #1f2937)',
    border: '1px solid var(--border-color, #374151)',
    borderRadius: '8px',
    padding: '0 12px',
    transition: 'all 0.2s ease',
  },
  containerFocused: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
  },
  containerDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  searchIcon: {
    width: '18px',
    height: '18px',
    color: 'var(--text-muted, #9ca3af)',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '10px 8px',
    fontSize: '14px',
    color: 'var(--text-primary, #f3f4f6)',
    minWidth: 0,
  },
  clearButton: {
    width: '20px',
    height: '20px',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: '4px',
    color: 'var(--text-muted, #9ca3af)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    flexShrink: 0,
  },
};

// Add hover styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .icon-search-clear:hover {
      color: var(--text-primary, #f3f4f6);
      background: var(--bg-hover, rgba(255, 255, 255, 0.1));
    }
    .icon-search-input::placeholder {
      color: var(--text-muted, #9ca3af);
    }
  `;
  document.head.appendChild(styleSheet);
}

export default IconSearch;
