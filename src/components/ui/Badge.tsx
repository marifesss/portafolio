import type { ReactNode } from "react";

type BadgeTone = "neutral" | "accent";

interface BadgeProps {
  children: ReactNode;
  /** `accent` uses the reserved Spotify green — for active / "new" states. */
  tone?: BadgeTone;
}

const toneStyles: Record<BadgeTone, string> = {
  neutral: "bg-white/10 text-muted",
  accent: "bg-spotify/15 text-spotify",
};

/**
 * Tiny uppercase status label (e.g. "Coming soon", "New"). Distinct from
 * `Chip`, which is a bordered pill for tech-stack / genre lists.
 */
export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest ${toneStyles[tone]}`}
    >
      {children}
    </span>
  );
}
