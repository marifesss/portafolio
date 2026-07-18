interface EqualizerBarsProps {
  /** Number of bars. Default 4. */
  bars?: number;
  /** When false, bars rest low and still (paused track). */
  playing?: boolean;
  className?: string;
}

/**
 * Small animated equalizer, reused by the PlayerBar and any "playing track"
 * affordance. Pure CSS animation (`equalize` keyframes in globals.css); per-bar
 * timing is derived deterministically so it's SSR-safe. The global
 * `prefers-reduced-motion` baseline freezes the animation at its first frame.
 */
export function EqualizerBars({
  bars = 4,
  playing = true,
  className = "",
}: EqualizerBarsProps) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-4 items-end gap-[2px] ${className}`}
    >
      {Array.from({ length: bars }).map((_, i) => {
        // Deterministic drift: no Math.random so server and client agree.
        const duration = 700 + ((i * 37) % 400);
        const delay = (i * 90) % 300;
        return (
          <span
            key={i}
            className="w-[3px] origin-bottom rounded-full bg-spotify"
            style={{
              height: "100%",
              transform: playing ? undefined : "scaleY(0.3)",
              animation: playing
                ? `equalize ${duration}ms ease-in-out ${delay}ms infinite`
                : undefined,
            }}
          />
        );
      })}
    </span>
  );
}
