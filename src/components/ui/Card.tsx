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
      className={`group rounded-lg bg-elevated p-4 shadow-sm transition-[background-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:bg-highlight hover:shadow-xl active:translate-y-0 active:duration-100 ${className}`}
    >
      {children}
    </div>
  );
}
