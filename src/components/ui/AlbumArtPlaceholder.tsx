interface AlbumArtPlaceholderProps {
  /** Side length in px. Default 48 (sidebar thumbnail size). */
  size?: number;
  /** Glyph centered on the cover. Default a music note. */
  glyph?: string;
  /** `square` = rounded album cover; `circle` = artist/profile avatar. */
  shape?: "square" | "circle";
  /** Base hue (0–360) for the gradient, so each item gets its own accent. */
  hue?: number;
  className?: string;
  /** Accessible name; when omitted the cover is decorative. */
  label?: string;
}

/**
 * On-brand stand-in for a missing cover / avatar: a diagonal gradient with a
 * centered glyph, matching Spotify's blank-cover feel. Used for Partela's
 * "coming soon" cover and anywhere real art hasn't arrived yet.
 */
export function AlbumArtPlaceholder({
  size = 48,
  glyph = "🎵",
  shape = "square",
  hue = 210,
  className = "",
  label,
}: AlbumArtPlaceholderProps) {
  const from = `hsl(${hue} 42% 34%)`;
  const to = `hsl(${(hue + 45) % 360} 55% 15%)`;

  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`grid shrink-0 place-items-center shadow-lg ring-1 ring-black/20 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: shape === "circle" ? "9999px" : Math.max(4, size * 0.06),
        backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      <span aria-hidden style={{ fontSize: size * 0.4, lineHeight: 1 }}>
        {glyph}
      </span>
    </div>
  );
}
