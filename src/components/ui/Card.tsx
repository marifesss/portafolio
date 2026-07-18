import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  /** Extra classes for layout tweaks at the call site. */
  className?: string;
}

/**
 * Spotify "home" card surface: an `elevated` panel that lifts to `highlight`
 * on hover. Exposes the `group` class so callers can reveal a play button or
 * other affordance on hover (`group-hover:*`).
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`group rounded-lg bg-elevated p-4 transition-colors duration-300 hover:bg-highlight ${className}`}
    >
      {children}
    </div>
  );
}
