/**
 * Small inline line icons for UI affordances (external links, back links,
 * locked states). Drawn as SVG instead of Unicode arrows/emoji, which iOS
 * renders as colored emoji. Sized in `em` and tinted with `currentColor`, so
 * they follow the surrounding text.
 */

type IconProps = { className?: string };

function Svg({
  className = "",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
    >
      {children}
    </svg>
  );
}

/** Opens elsewhere (external link). */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 11 11 5M6 5h5v5" />
    </Svg>
  );
}

/** Back navigation. */
export function ArrowLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13 8H3M7 4 3 8l4 4" />
    </Svg>
  );
}

/** Forward / go-to affordance. */
export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </Svg>
  );
}

/** Locked / private. */
export function LockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </Svg>
  );
}
