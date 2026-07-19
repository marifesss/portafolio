"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
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

/* ── Crisp line icons (Spotify's control set), sized in `em` so they scale with
      the button's font-size. `currentColor` lets hover/active tint them. ──── */

function ShuffleIcon() {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.151.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z" />
      <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.106A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5A2.25 2.25 0 0 0 12.25 2.5h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M8 14.25 1.75 8A3.5 3.5 0 0 1 6.7 3.05L8 4.35l1.3-1.3A3.5 3.5 0 0 1 14.25 8L8 14.25zM6.7 4.11 2.81 8A2 2 0 0 0 8 12.19l5.19-4.08A2 2 0 0 0 9.3 4.11L8 5.41 6.7 4.11z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z" />
      <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z" />
    </svg>
  );
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
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[18px] text-black outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-spotify focus-visible:ring-offset-2 focus-visible:ring-offset-base"
    >
      {isPlaying ? <PauseGlyph /> : <PlayGlyph />}
    </button>
  );
}

/** Small round secondary control (prev / next / shuffle / repeat). */
function ControlButton({
  onClick,
  label,
  active = false,
  children,
}: {
  onClick?: () => void;
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid place-items-center rounded-full p-1 text-[18px] outline-none transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-spotify ${
        active ? "text-spotify hover:text-spotify-bright" : "text-muted hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/** Decorative progress track with a fill and a hover-revealed scrubber knob. */
function ProgressBar({ pct }: { pct: number }) {
  return (
    <div
      aria-hidden
      className="group/track relative h-1 w-full rounded-full bg-white/25"
    >
      <div
        className="h-full rounded-full bg-white transition-colors group-hover/track:bg-spotify"
        style={{ width: `${pct}%` }}
      />
      <span
        className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/track:opacity-100"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

/**
 * The bottom "now playing" bar (DESIGN.md §8): animated but **silent** — no
 * audio is ever loaded. Play/pause toggles a decorative progress bar; prev/
 * next/shuffle/repeat and the volume slider are decorative. The "album art" is
 * Mariana's profile photo. Reduced-motion users get a static, legible bar.
 */
export function PlayerBar() {
  const { pick, t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [liked, setLiked] = useState(true);

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
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-4 md:grid-cols-3 md:gap-6 md:px-6">
        {/* Left — the "track" that is now playing. */}
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/mariana/perfil.jpeg"
            alt={site.name}
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-md object-cover shadow-lg ring-1 ring-black/30"
          />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold leading-tight text-white">
              {pick(site.nowPlaying)}
            </p>
            <p className="truncate text-[13px] text-muted">{site.name}</p>
          </div>
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            aria-label={t.like}
            className={`ml-1 hidden shrink-0 rounded-full p-1 text-base outline-none transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-spotify sm:block ${
              liked ? "text-spotify" : "text-muted hover:text-white"
            }`}
          >
            <HeartIcon />
          </button>
        </div>

        {/* Center — control cluster + progress (desktop). Widened + centered. */}
        <div className="hidden flex-col items-center gap-2.5 md:flex">
          <div className="flex items-center gap-7">
            <ControlButton label="Shuffle">
              <ShuffleIcon />
            </ControlButton>
            <ControlButton label="Previous">
              <PrevIcon />
            </ControlButton>
            <PlayToggle isPlaying={isPlaying} onToggle={toggle} label={toggleLabel} />
            <ControlButton label="Next">
              <NextIcon />
            </ControlButton>
            <ControlButton label="Repeat">
              <RepeatIcon />
            </ControlButton>
          </div>
          <div className="flex w-full max-w-[42rem] items-center gap-3 text-xs tabular-nums text-faint">
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
          <div className="hidden items-center justify-end gap-2.5 text-muted md:flex">
            <button
              type="button"
              aria-label="Volume"
              className="shrink-0 p-1 text-lg outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-spotify"
            >
              <VolumeIcon />
            </button>
            <div
              aria-hidden
              className="group/vol relative h-1 w-28 rounded-full bg-white/25"
            >
              <div className="h-full w-2/3 rounded-full bg-white transition-colors group-hover/vol:bg-spotify" />
              <span
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/vol:opacity-100"
                style={{ left: "66.6667%" }}
              />
            </div>
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
