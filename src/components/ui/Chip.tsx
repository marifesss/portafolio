import type { ReactNode } from "react";

/** Small pill used for genres, tech stack, and skills. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-muted transition-colors hover:border-spotify/60 hover:text-white">
      {children}
    </span>
  );
}
