"use client";

import { cn } from "@/lib/utils";

interface CircularGaugeProps {
  value: number;
  label: string;
  size?: number;
  className?: string;
}

function getColor(value: number): string {
  if (value >= 80) return "#22c55e";
  if (value >= 60) return "#eab308";
  if (value >= 40) return "#f97316";
  return "#ef4444";
}

export function CircularGauge({
  value,
  label,
  size = 140,
  className,
}: CircularGaugeProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = getColor(value);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--surface-raised)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-ink">{value}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-ink-muted">{label}</span>
    </div>
  );
}
