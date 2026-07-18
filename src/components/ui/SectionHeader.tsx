import type { ReactNode } from "react";

interface SectionHeaderProps {
  /** Small uppercase eyebrow, e.g. "Playlist". */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

/**
 * The gradient header at the top of a Spotify playlist/album view.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: SectionHeaderProps) {
  return (
    <header className="bg-gradient-to-b from-spotify/25 to-transparent px-6 pb-8 pt-16 sm:px-10">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-6xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-muted">{subtitle}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </header>
  );
}
