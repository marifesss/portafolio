interface DiagramPlaceholderProps {
  /** Already-resolved caption, e.g. "Architecture diagram coming soon". */
  label: string;
  className?: string;
}

/**
 * Framed stand-in for an architecture diagram (the project "Cómo se hizo" tab).
 * A faint connected-nodes motif hints at "diagram" so the empty state still
 * reads as deliberate.
 */
export function DiagramPlaceholder({
  label,
  className = "",
}: DiagramPlaceholderProps) {
  return (
    <div
      style={{ aspectRatio: "16/9" }}
      className={`relative grid place-items-center overflow-hidden rounded-lg border border-dashed border-white/15 bg-elevated ${className}`}
    >
      {/* Decorative schematic: three linked nodes. */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 320 180"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <line x1="80" y1="90" x2="160" y2="50" stroke="currentColor" strokeWidth="2" />
        <line x1="80" y1="90" x2="160" y2="130" stroke="currentColor" strokeWidth="2" />
        <line x1="160" y1="50" x2="240" y2="90" stroke="currentColor" strokeWidth="2" />
        <line x1="160" y1="130" x2="240" y2="90" stroke="currentColor" strokeWidth="2" />
        <rect x="52" y="72" width="56" height="36" rx="6" fill="currentColor" />
        <rect x="132" y="32" width="56" height="36" rx="6" fill="currentColor" />
        <rect x="132" y="112" width="56" height="36" rx="6" fill="currentColor" />
        <rect x="212" y="72" width="56" height="36" rx="6" fill="currentColor" />
      </svg>

      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <span aria-hidden className="text-3xl opacity-70">
          🗺️
        </span>
        <span className="text-sm font-medium text-muted">{label}</span>
      </div>
    </div>
  );
}
