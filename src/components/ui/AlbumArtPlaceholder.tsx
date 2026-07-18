interface AlbumArtPlaceholderProps {
  /** Side length in px. Default 48 (sidebar thumbnail size). */
  size?: number;
  /** Glyph centered on the cover. Default a music note. */
  glyph?: string;
  /** `square` = rounded album cover; `circle` = artist/profile avatar. */
  shape?: "square" | "circle";
  /** Base hue (0–360) for the gradient, so each item gets its own accent. */
  hue?: number;
  /**
   * Stretch to fill the parent as a responsive square (`w-full aspect-square`)
   * instead of the fixed `size` — for card covers. `size` is then ignored.
   */
  fill?: boolean;
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
  fill = false,
  className = "",
  label,
}: AlbumArtPlaceholderProps) {
  const from = `hsl(${hue} 42% 34%)`;
  const to = `hsl(${(hue + 45) % 360} 55% 15%)`;
  const radius =
    shape === "circle" ? "9999px" : fill ? "0.5rem" : Math.max(4, size * 0.06);

  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`grid shrink-0 place-items-center shadow-lg ring-1 ring-black/20 ${
        fill ? "aspect-square w-full text-5xl" : ""
      } ${className}`}
      style={{
        ...(fill ? {} : { width: size, height: size }),
        borderRadius: radius,
        backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      <span
        aria-hidden
        style={fill ? { lineHeight: 1 } : { fontSize: size * 0.4, lineHeight: 1 }}
      >
        {glyph}
      </span>
    </div>
  );
}
