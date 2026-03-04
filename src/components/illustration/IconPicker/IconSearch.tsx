/**
 * IconSearch Component
 *
 * Search input with debounce for searching across all unified icon libraries.
 * Shows result count and library source filters.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';

// =============================================================================
// TYPES
// =============================================================================

export interface IconSearchProps {
  /** Callback fired when search query changes (debounced) */
  onSearch: (query: string) => void;
  /** Current result count to display */
  resultCount?: number;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Initial search value */
  initialValue?: string;
  /** Whether the search input is disabled */
  disabled?: boolean;
  /** Custom class name for the container */
  className?: string;
}

// =============================================================================
// DEBOUNCE HOOK
// =============================================================================

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
  resultCount,
  placeholder = 'Search all icons...',
  debounceMs = 200,
  initialValue = '',
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
    <div className={`icon-picker-search ${className}`}>
      <div
        className={`icon-picker-search-container ${isFocused ? 'focused' : ''} ${disabled ? 'disabled' : ''}`}
      >
        <svg
          className="icon-picker-search-icon"
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
          className="icon-picker-search-input"
          aria-label="Search icons"
        />

        {inputValue && !disabled && (
          <button
            onClick={handleClear}
            className="icon-picker-search-clear"
            type="button"
            aria-label="Clear search"
          >
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
          </button>
        )}
      </div>

      {inputValue && resultCount !== undefined && (
        <div className="icon-picker-search-results">
          <span className="icon-picker-search-count">
            {resultCount} result{resultCount !== 1 ? 's' : ''} for "{inputValue}"
          </span>
        </div>
      )}
    </div>
  );
};

export default IconSearch;
