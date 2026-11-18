interface ImagePlaceholderProps {
  /** Already-resolved caption, e.g. "Screenshots coming soon". */
  label: string;
  /** Optional glyph shown above the label. */
  glyph?: string;
  /** CSS aspect-ratio string, e.g. "16/9" (default) or "9/19" for phones. */
  aspect?: string;
  className?: string;
}

/**
 * Deliberate "asset coming soon" frame for screenshot galleries with no images
 * yet. Reads as an intentional placeholder — never a broken image. Sections
 * render this instead of an `<img>` when a project has no screenshots.
 */
export function ImagePlaceholder({
  glyph,
  label,
  aspect = "16/9",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      style={{ aspectRatio: aspect }}
      className={`grid place-items-center rounded-lg border border-dashed border-white/15 bg-elevated text-center ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4">
        {glyph && (
          <span aria-hidden className="text-3xl opacity-70">
            {glyph}
          </span>
        )}
        <span className="text-sm font-medium text-muted">{label}</span>
      </div>
    </div>
  );
}
