"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaretDown, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { ScopeRecord } from "@/lib/actions/scopes";
import type { ExploreTab } from "./ExploreTabs";

// ── Filter types ─────────────────────────────────────────────────────────────

export type OrderByValue = "quality" | "recency" | "citations" | "trust";

export type TimeFilterValue =
  | "any"
  | "24h"
  | "week"
  | "month"
  | "year"
  | "custom";

export interface ExploreFilters {
  scopeId: number | null; // null = "All Sources"
  orderBy: OrderByValue;
  timeFilter: TimeFilterValue;
  customDateFrom: string; // ISO date string
  customDateTo: string;
  exactMatch: boolean;
  usePreferences: boolean;
  openAccessOnly: boolean;
}

export const DEFAULT_FILTERS: ExploreFilters = {
  scopeId: null,
  orderBy: "quality",
  timeFilter: "any",
  customDateFrom: "",
  customDateTo: "",
  exactMatch: false,
  usePreferences: true,
  openAccessOnly: false,
};

// ── Built-in scopes ──────────────────────────────────────────────────────────

interface BuiltInScope {
  id: string;
  name: string;
  tabs: ExploreTab[];
}

const BUILT_IN_SCOPES: BuiltInScope[] = [
  { id: "all", name: "All Sources", tabs: ["academic", "web", "news", "discussions"] },
  { id: "academic", name: "Academic Papers", tabs: ["academic"] },
  { id: "web", name: "Web & Reports", tabs: ["web"] },
  { id: "news", name: "News", tabs: ["news"] },
  { id: "discussions", name: "Discussions", tabs: ["discussions"] },
];

// ── Order By options ─────────────────────────────────────────────────────────

interface OrderByOption {
  value: OrderByValue;
  label: string;
  academicOnly?: boolean;
}

const ORDER_BY_OPTIONS: OrderByOption[] = [
  { value: "quality", label: "Quality" },
  { value: "recency", label: "Recency" },
  { value: "citations", label: "Citation Count", academicOnly: true },
  { value: "trust", label: "Source Trust" },
];

// ── Time filter options ──────────────────────────────────────────────────────

const TIME_OPTIONS: { value: TimeFilterValue; label: string }[] = [
  { value: "any", label: "Any time" },
  { value: "24h", label: "Past 24 hours" },
  { value: "week", label: "Past week" },
  { value: "month", label: "Past month" },
  { value: "year", label: "Past year" },
  { value: "custom", label: "Custom range..." },
];

// ── Props ────────────────────────────────────────────────────────────────────

interface FilterPillsProps {
  filters: ExploreFilters;
  onFiltersChange: (filters: ExploreFilters) => void;
  activeTab: ExploreTab;
  userScopes: ScopeRecord[];
  onEditScopes?: () => void;
}

// ── Dropdown hook ────────────────────────────────────────────────────────────

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return { open, setOpen, ref };
}

// ── Pill button ──────────────────────────────────────────────────────────────

function PillButton({
  label,
  active,
  open,
  onClick,
}: {
  label: string;
  active: boolean;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-normal transition-colors",
        "border border-[var(--border)]",
        active
          ? "bg-[rgba(109,40,217,0.06)] text-[var(--brand)] dark:bg-[rgba(139,123,244,0.1)]"
          : "bg-[var(--surface-raised)] text-ink hover:bg-[var(--surface-raised)]/80",
        open && "ring-1 ring-[var(--brand)]/30"
      )}
      onClick={onClick}
      type="button"
    >
      {label}
      <CaretDown
        className={cn("transition-transform", open && "rotate-180")}
        size={10}
        weight="bold"
      />
    </button>
  );
}

// ── Dropdown menu ────────────────────────────────────────────────────────────

function DropdownMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-xl border border-[var(--border)] bg-[var(--background)] p-1 shadow-lg">
      {children}
    </div>
  );
}

function DropdownItem({
  label,
  selected,
  onClick,
  disabled,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] transition-colors",
        disabled
          ? "cursor-not-allowed text-ink-muted/40"
          : "text-ink hover:bg-[var(--surface-raised)]",
        selected && "font-medium"
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {label}
      {selected && (
        <Check className="text-[var(--brand)]" size={14} weight="bold" />
      )}
    </button>
  );
}

function DropdownDivider() {
  return <div className="mx-2 my-1 border-t border-[var(--border)]" />;
}

// ── Scope Dropdown ───────────────────────────────────────────────────────────

function ScopeDropdown({
  filters,
  onFiltersChange,
  userScopes,
  onEditScopes,
}: {
  filters: ExploreFilters;
  onFiltersChange: (filters: ExploreFilters) => void;
  userScopes: ScopeRecord[];
  onEditScopes?: () => void;
}) {
  const { open, setOpen, ref } = useDropdown();

  const activeLabel =
    filters.scopeId === null
      ? "All Sources"
      : userScopes.find((s) => s.id === filters.scopeId)?.name ?? "Scope";

  const isActive = filters.scopeId !== null;

  return (
    <div className="relative" ref={ref}>
      <PillButton
        active={isActive}
        label={activeLabel}
        onClick={() => setOpen(!open)}
        open={open}
      />
      {open && (
        <DropdownMenu>
          {BUILT_IN_SCOPES.map((scope) => (
            <DropdownItem
              key={scope.id}
              label={scope.name}
              onClick={() => {
                onFiltersChange({
                  ...filters,
                  scopeId: scope.id === "all" ? null : -(BUILT_IN_SCOPES.indexOf(scope) + 1),
                });
                setOpen(false);
              }}
              selected={
                scope.id === "all"
                  ? filters.scopeId === null
                  : filters.scopeId === -(BUILT_IN_SCOPES.indexOf(scope) + 1)
              }
            />
          ))}

          {userScopes.length > 0 && <DropdownDivider />}

          {userScopes
            .filter((s) => s.isActive)
            .map((scope) => (
              <DropdownItem
                key={scope.id}
                label={scope.name}
                onClick={() => {
                  onFiltersChange({ ...filters, scopeId: scope.id });
                  setOpen(false);
                }}
                selected={filters.scopeId === scope.id}
              />
            ))}

          <DropdownDivider />
          <button
            className="w-full rounded-lg px-3 py-2 text-left text-[13px] text-[var(--brand)] hover:bg-[var(--surface-raised)]"
            onClick={() => {
              setOpen(false);
              onEditScopes?.();
            }}
            type="button"
          >
            Edit Scopes...
          </button>
        </DropdownMenu>
      )}
    </div>
  );
}

// ── Order By Dropdown ────────────────────────────────────────────────────────

function OrderByDropdown({
  filters,
  onFiltersChange,
  activeTab,
}: {
  filters: ExploreFilters;
  onFiltersChange: (filters: ExploreFilters) => void;
  activeTab: ExploreTab;
}) {
  const { open, setOpen, ref } = useDropdown();

  const currentLabel =
    ORDER_BY_OPTIONS.find((o) => o.value === filters.orderBy)?.label ?? "Order By";
  const isActive = filters.orderBy !== "quality";

  return (
    <div className="relative" ref={ref}>
      <PillButton
        active={isActive}
        label={`Order: ${currentLabel}`}
        onClick={() => setOpen(!open)}
        open={open}
      />
      {open && (
        <DropdownMenu>
          {ORDER_BY_OPTIONS.map((option) => {
            const disabled =
              option.academicOnly && activeTab !== "academic";

            return (
              <DropdownItem
                disabled={disabled}
                key={option.value}
                label={
                  option.label +
                  (disabled ? " (Academic only)" : "")
                }
                onClick={() => {
                  if (disabled) return;
                  onFiltersChange({ ...filters, orderBy: option.value });
                  setOpen(false);
                }}
                selected={filters.orderBy === option.value}
              />
            );
          })}
        </DropdownMenu>
      )}
    </div>
  );
}

// ── Time Dropdown ────────────────────────────────────────────────────────────

function TimeDropdown({
  filters,
  onFiltersChange,
}: {
  filters: ExploreFilters;
  onFiltersChange: (filters: ExploreFilters) => void;
}) {
  const { open, setOpen, ref } = useDropdown();

  const currentLabel =
    TIME_OPTIONS.find((o) => o.value === filters.timeFilter)?.label ?? "Time";
  const isActive = filters.timeFilter !== "any";

  return (
    <div className="relative" ref={ref}>
      <PillButton
        active={isActive}
        label={currentLabel}
        onClick={() => setOpen(!open)}
        open={open}
      />
      {open && (
        <DropdownMenu>
          {TIME_OPTIONS.filter((o) => o.value !== "custom").map((option) => (
            <DropdownItem
              key={option.value}
              label={option.label}
              onClick={() => {
                onFiltersChange({
                  ...filters,
                  timeFilter: option.value,
                  customDateFrom: "",
                  customDateTo: "",
                });
                setOpen(false);
              }}
              selected={filters.timeFilter === option.value}
            />
          ))}

          <DropdownDivider />

          <div className="px-3 py-2">
            <p className="mb-2 text-[12px] font-medium text-ink-muted">
              Custom range
            </p>
            <div className="flex items-center gap-2">
              <input
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-[12px] text-ink"
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    timeFilter: "custom",
                    customDateFrom: e.target.value,
                  })
                }
                placeholder="From"
                type="date"
                value={filters.customDateFrom}
              />
              <span className="text-[12px] text-ink-muted">–</span>
              <input
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-[12px] text-ink"
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    timeFilter: "custom",
                    customDateTo: e.target.value,
                  })
                }
                placeholder="To"
                type="date"
                value={filters.customDateTo}
              />
            </div>
          </div>
        </DropdownMenu>
      )}
    </div>
  );
}

// ── Options Dropdown ─────────────────────────────────────────────────────────

function OptionsDropdown({
  filters,
  onFiltersChange,
  activeTab,
}: {
  filters: ExploreFilters;
  onFiltersChange: (filters: ExploreFilters) => void;
  activeTab: ExploreTab;
}) {
  const { open, setOpen, ref } = useDropdown();

  const activeCount =
    (filters.exactMatch ? 1 : 0) +
    (!filters.usePreferences ? 1 : 0) +
    (filters.openAccessOnly ? 1 : 0);

  const isActive = activeCount > 0;

  return (
    <div className="relative" ref={ref}>
      <PillButton
        active={isActive}
        label={`Options${activeCount > 0 ? ` (${activeCount})` : ""}`}
        onClick={() => setOpen(!open)}
        open={open}
      />
      {open && (
        <DropdownMenu>
          <ToggleItem
            checked={filters.exactMatch}
            label="Exact match"
            onChange={(checked) =>
              onFiltersChange({ ...filters, exactMatch: checked })
            }
          />
          <ToggleItem
            checked={filters.usePreferences}
            label="Use my preferences"
            onChange={(checked) =>
              onFiltersChange({ ...filters, usePreferences: checked })
            }
          />
          {activeTab === "academic" && (
            <ToggleItem
              checked={filters.openAccessOnly}
              label="Open access only"
              onChange={(checked) =>
                onFiltersChange({ ...filters, openAccessOnly: checked })
              }
            />
          )}
        </DropdownMenu>
      )}
    </div>
  );
}

function ToggleItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] text-ink hover:bg-[var(--surface-raised)]"
      onClick={() => onChange(!checked)}
      type="button"
    >
      <div
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
          checked
            ? "border-[var(--brand)] bg-[var(--brand)]"
            : "border-[var(--border)] bg-[var(--background)]"
        )}
      >
        {checked && <Check className="text-white" size={10} weight="bold" />}
      </div>
      {label}
    </button>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function FilterPills({
  filters,
  onFiltersChange,
  activeTab,
  userScopes,
  onEditScopes,
}: FilterPillsProps) {
  const handleResetFilters = useCallback(() => {
    onFiltersChange(DEFAULT_FILTERS);
  }, [onFiltersChange]);

  const hasActiveFilters =
    filters.scopeId !== null ||
    filters.orderBy !== "quality" ||
    filters.timeFilter !== "any" ||
    filters.exactMatch ||
    !filters.usePreferences ||
    filters.openAccessOnly;

  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      <ScopeDropdown
        filters={filters}
        onEditScopes={onEditScopes}
        onFiltersChange={onFiltersChange}
        userScopes={userScopes}
      />
      <OrderByDropdown
        activeTab={activeTab}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
      <TimeDropdown filters={filters} onFiltersChange={onFiltersChange} />
      <OptionsDropdown
        activeTab={activeTab}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      {hasActiveFilters && (
        <button
          className="ml-1 rounded-full px-2 py-1 text-[12px] text-ink-muted hover:text-ink"
          onClick={handleResetFilters}
          type="button"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
