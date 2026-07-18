"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { EqualizerBars } from "@/components/ui/EqualizerBars";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Fake track length driving the (silent, decorative) progress + timestamps. */
const TRACK_SECONDS = 214; // 3:34
/** How often the progress ticks, and how much "track time" each tick adds. */
const TICK_MS = 250;
const TICK_SECONDS = TICK_MS / 1000;

function formatTime(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

/** Tracks the OS "reduce motion" setting, SSR-safely (starts `false`). */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** White circular play/pause toggle. The one control that actually does something. */
function PlayToggle({
  isPlaying,
  onToggle,
  label,
}: {
  isPlaying: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-sm text-black transition-transform hover:scale-105"
    >
      <span aria-hidden>{isPlaying ? "⏸" : "▶"}</span>
    </button>
  );
}

/** Decorative progress track with a fill and a moving scrubber knob. */
function ProgressBar({ pct }: { pct: number }) {
  return (
    <div aria-hidden className="group relative h-1 w-full rounded-full bg-white/20">
      <div
        className="h-full rounded-full bg-white group-hover:bg-spotify"
        style={{ width: `${pct}%` }}
      />
      <span
        className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow transition-transform group-hover:scale-110"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

/**
 * The bottom "now playing" bar (DESIGN.md §8): animated but **silent** — no
 * audio is ever loaded. Play/pause toggles a decorative progress bar and the
 * equalizer; prev/next/shuffle/repeat and the volume slider are decorative.
 * Reduced-motion users get a static, still-legible bar.
 */
export function PlayerBar() {
  const { pick, t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  // Auto-advance the fake progress while "playing". Skipped for reduced-motion
  // users, who keep a static bar. Loops back to the start at the end.
  useEffect(() => {
    if (!isPlaying || reducedMotion) return;
    const id = window.setInterval(() => {
      setElapsed((e) => (e + TICK_SECONDS >= TRACK_SECONDS ? 0 : e + TICK_SECONDS));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [isPlaying, reducedMotion]);

  const pct = (elapsed / TRACK_SECONDS) * 100;
  const toggle = () => setIsPlaying((p) => !p);
  const toggleLabel = isPlaying ? t.pause : t.play;

  return (
    <footer className="border-t border-white/5 bg-base">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-2.5 md:grid-cols-3 md:gap-4 md:py-3">
        {/* Left — the "track" that is now playing. */}
        <div className="flex min-w-0 items-center gap-3">
          <div
            aria-hidden
            className="grid h-12 w-12 shrink-0 place-items-center rounded bg-spotify text-xl"
          >
            🎧
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-faint">
                {t.nowPlayingLabel}
              </p>
              <EqualizerBars
                playing={isPlaying && !reducedMotion}
                className="h-2.5"
              />
            </div>
            <p className="truncate text-sm font-semibold text-white">
              {pick(site.nowPlaying)}
            </p>
            <p className="truncate text-xs text-muted">{site.name}</p>
          </div>
          <span aria-hidden className="ml-1 hidden text-faint sm:inline">
            ♡
          </span>
        </div>

        {/* Center — control cluster + progress (desktop). */}
        <div className="hidden flex-col items-center gap-1.5 md:flex">
          <div className="flex items-center gap-5 text-faint">
            <span aria-hidden>🔀</span>
            <span aria-hidden>⏮</span>
            <PlayToggle isPlaying={isPlaying} onToggle={toggle} label={toggleLabel} />
            <span aria-hidden>⏭</span>
            <span aria-hidden>🔁</span>
          </div>
          <div className="flex w-full items-center gap-2 text-[11px] tabular-nums text-faint">
            <span>{formatTime(elapsed)}</span>
            <ProgressBar pct={pct} />
            <span>{formatTime(TRACK_SECONDS)}</span>
          </div>
        </div>

        {/* Right — mobile play button + decorative desktop volume. */}
        <div className="flex items-center justify-end gap-3">
          <div className="md:hidden">
            <PlayToggle isPlaying={isPlaying} onToggle={toggle} label={toggleLabel} />
          </div>
          <div className="hidden items-center gap-2 text-faint lg:flex">
            <span aria-hidden>🔊</span>
            <span aria-hidden className="block h-1 w-20 rounded-full bg-white/20">
              <span className="block h-full w-1/2 rounded-full bg-white/60" />
            </span>
          </div>
        </div>
      </div>

      {/* Mobile progress bar — spans the full width below the compact row. */}
      <div className="px-4 pb-2 md:hidden">
        <ProgressBar pct={pct} />
      </div>
    </footer>
  );
}
