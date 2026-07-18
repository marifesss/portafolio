interface IconLinkProps {
  href: string;
  /** Glyph/emoji shown on the left. */
  icon: string;
  /** Already-resolved label — sections resolve `Localized` before passing it. */
  label: string;
  /** Optional muted hint on the right (e.g. the URL host or "GitHub"). */
  hint?: string;
  /** Opens in a new tab with safe rel; defaults to true for external links. */
  external?: boolean;
}

/**
 * A Spotify-style link row: glyph + label, whole row highlights on hover.
 * Reused for contact channels and a project's external links.
 */
export function IconLink({
  href,
  icon,
  label,
  hint,
  external = true,
}: IconLinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...externalProps}
      className="group flex items-center gap-3 rounded-md px-3 py-2 text-muted transition-colors hover:bg-white/5 hover:text-white"
    >
      <span aria-hidden className="text-lg">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
      {hint && (
        <span className="ml-auto text-sm text-faint group-hover:text-muted">
          {hint}
        </span>
      )}
    </a>
  );
}
