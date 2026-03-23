"use client";

interface AppHeaderProps {
  onMenuClick?: () => void;
  pageTitle?: string;
}

export function AppHeader({ onMenuClick, pageTitle = "Projects" }: AppHeaderProps) {
  const handleCommandPalette = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  return (
    <header
      className="h-12 flex items-center justify-between px-6 shrink-0"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#fff" }}
    >
      {/* Left: menu + breadcrumb */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
            style={{ color: "#A8A29E" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1C1917";
              e.currentTarget.style.background = "rgba(0,0,0,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#A8A29E";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 18 18">
              <path d="M2 4h14M2 9h14M2 14h14" />
            </svg>
          </button>
        )}
        <div className="text-[13px]" style={{ color: "#78716C" }}>
          <strong style={{ color: "#1C1917", fontWeight: 500 }}>{pageTitle}</strong>
        </div>
      </div>

      {/* Right: command palette trigger */}
      <button
        onClick={handleCommandPalette}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors"
        style={{
          background: "#F7F5F3",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <svg width="14" height="14" fill="none" stroke="#A8A29E" strokeWidth="1.5" viewBox="0 0 16 16">
          <circle cx="7" cy="7" r="5" />
          <path d="M11 11l3 3" />
        </svg>
        <span className="text-xs" style={{ color: "#A8A29E" }}>
          Search or jump to...
        </span>
        <kbd
          className="text-[10px] px-1.5 rounded-sm"
          style={{
            color: "#A8A29E",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.06)",
            fontFamily: "var(--font-sans, system-ui)",
          }}
        >
          ⌘K
        </kbd>
      </button>
    </header>
  );
}
