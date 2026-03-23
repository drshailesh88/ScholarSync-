"use client";

interface AppHeaderProps {
  onMenuClick?: () => void;
  pageTitle?: string;
}

export function AppHeader({ onMenuClick, pageTitle = "Projects" }: AppHeaderProps) {
  return (
    <header className="h-12 flex items-center justify-between px-4 bg-white border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-2">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="w-8 h-8 flex items-center justify-center rounded-md text-[#A8A29E] hover:text-[#1C1917] hover:bg-black/[0.03] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <p className="text-[13px] text-[#78716C]">
          <strong className="font-medium text-[#1C1917]">{pageTitle}</strong>
        </p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => {
            document.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
            );
          }}
          className="bg-[#F7F5F3] border border-black/[0.06] rounded-md px-3 py-1.5 flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="4.5" stroke="#A8A29E" strokeWidth="1.5" />
            <path d="M9.5 9.5L12.5 12.5" stroke="#A8A29E" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-xs text-[#A8A29E]">Search or jump to...</span>
          <kbd className="text-[10px] text-[#A8A29E] bg-white border border-black/[0.06] rounded-sm px-1.5">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
}
