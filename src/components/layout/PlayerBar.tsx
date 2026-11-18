"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { tracks } from "@/content/music";
import { useLanguage } from "@/i18n/LanguageProvider";

function formatTime(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds || 0));
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
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

function VolumeIcon() {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z" />
      <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35z" />
      <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z" />
    </svg>
  );
}

/** White circular play/pause toggle. */
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
  active,
  children,
}: {
  onClick: () => void;
  label: string;
  /** Toggle controls (shuffle / repeat) report their on/off state. */
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`grid place-items-center rounded-full p-1 text-[18px] outline-none transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-spotify ${
        active
          ? "text-spotify hover:text-spotify-bright"
          : "text-muted hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Spotify-style horizontal slider (progress / volume): a thin track that turns
 * green on hover, with a knob that appears on hover or focus. Pointer drag and
 * keyboard arrows both work; `value` and `onChange` are fractions in [0, 1].
 */
function Slider({
  value,
  onChange,
  label,
  valueText,
  step = 0.05,
  className = "",
}: {
  value: number;
  onChange: (fraction: number) => void;
  label: string;
  valueText: string;
  step?: number;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, value * 100));

  const fromPointer = (el: HTMLElement, clientX: number) => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    onChange(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)));
  };

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-valuetext={valueText}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        fromPointer(e.currentTarget, e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          fromPointer(e.currentTarget, e.clientX);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          onChange(Math.min(1, value + step));
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          onChange(Math.max(0, value - step));
        }
      }}
      className={`group/track relative flex h-3 cursor-pointer touch-none items-center outline-none focus-visible:ring-2 focus-visible:ring-spotify ${className}`}
    >
      <div className="relative h-1 w-full rounded-full bg-white/25">
        <div
          className="h-full rounded-full bg-white transition-colors group-hover/track:bg-spotify"
          style={{ width: `${pct}%` }}
        />
        <span
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/track:opacity-100 group-focus-visible/track:opacity-100"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/**
 * The bottom "now playing" bar (DESIGN.md §8), playing "Favs de mari": Apple's
 * official 30-second previews, streamed from Apple and credited with a link to
 * each song on Apple Music. Silent until the visitor presses play. Every
 * control works: play/pause, previous/next, shuffle, repeat, seek, volume.
 */
export function PlayerBar() {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  /** Whether the next track change should start playing right away. */
  const autoplayNext = useRef(false);

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);

  const track = tracks[index];

  // Keep the element's volume in sync with the slider / mute toggle.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // A new track: start it if playback was running or the visitor skipped.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !autoplayNext.current) return;
    autoplayNext.current = false;
    audio.play().catch(() => {});
  }, [index]);

  const goTo = (target: number, play: boolean) => {
    autoplayNext.current = play;
    setPosition(0);
    setDuration(0);
    setIndex(target);
  };

  const nextIndex = () => {
    if (shuffle && tracks.length > 1) {
      let i = index;
      while (i === index) i = Math.floor(Math.random() * tracks.length);
      return i;
    }
    return (index + 1) % tracks.length;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  const next = () => goTo(nextIndex(), true);

  const previous = () => {
    const audio = audioRef.current;
    // Like Spotify: a few seconds in, "previous" restarts the current song.
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    goTo((index - 1 + tracks.length) % tracks.length, true);
  };

  const onEnded = () => {
    const last = !shuffle && index === tracks.length - 1;
    if (last && !repeat) goTo(0, false);
    else goTo(nextIndex(), true);
  };

  const seek = (fraction: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = fraction * duration;
    setPosition(audio.currentTime);
  };

  const progress = duration > 0 ? position / duration : 0;
  const toggleLabel = isPlaying ? t.pause : t.play;
  const timeText = `${formatTime(position)} / ${formatTime(duration)}`;
  const level = muted ? 0 : volume;

  return (
    <footer className="border-t border-white/5 bg-base pb-[env(safe-area-inset-bottom)] md:pb-0">
      <audio
        ref={audioRef}
        src={track.preview}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setPosition(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={onEnded}
      />

      <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-2.5 md:grid-cols-3 md:gap-6 md:px-6 md:py-3">
        {/* Left: the song that's playing, credited to Apple Music. */}
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src={track.artwork}
            alt=""
            width={56}
            height={56}
            className="h-11 w-11 shrink-0 rounded-md object-cover shadow-lg ring-1 ring-black/30 md:h-14 md:w-14"
          />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold leading-tight text-white">
              {track.title}
            </p>
            <p className="truncate text-[13px] text-muted">
              {track.artist}
              {" · "}
              <a
                href={track.appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                {t.listenOnAppleMusic}
              </a>
            </p>
          </div>
        </div>

        {/* Center: transport controls + progress (desktop). */}
        <div className="hidden flex-col items-center gap-2 md:flex">
          <div className="flex items-center gap-7">
            <ControlButton
              label={t.shuffle}
              active={shuffle}
              onClick={() => setShuffle((v) => !v)}
            >
              <ShuffleIcon />
            </ControlButton>
            <ControlButton label={t.previous} onClick={previous}>
              <PrevIcon />
            </ControlButton>
            <PlayToggle
              isPlaying={isPlaying}
              onToggle={togglePlay}
              label={toggleLabel}
            />
            <ControlButton label={t.next} onClick={next}>
              <NextIcon />
            </ControlButton>
            <ControlButton
              label={t.repeat}
              active={repeat}
              onClick={() => setRepeat((v) => !v)}
            >
              <RepeatIcon />
            </ControlButton>
          </div>
          <div className="flex w-full max-w-[42rem] items-center gap-3 text-xs tabular-nums text-faint">
            <span>{formatTime(position)}</span>
            <Slider
              value={progress}
              onChange={seek}
              label={t.seek}
              valueText={timeText}
              className="flex-1"
            />
            <span title={t.previewNote}>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: mobile controls / desktop volume. */}
        <div className="flex items-center justify-end gap-3">
          <div className="flex items-center gap-4 md:hidden">
            <PlayToggle
              isPlaying={isPlaying}
              onToggle={togglePlay}
              label={toggleLabel}
            />
            <ControlButton label={t.next} onClick={next}>
              <NextIcon />
            </ControlButton>
          </div>
          <div className="hidden items-center justify-end gap-2.5 text-muted md:flex">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? t.unmute : t.mute}
              className="shrink-0 p-1 text-lg outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-spotify"
            >
              {level === 0 ? <MutedIcon /> : <VolumeIcon />}
            </button>
            <Slider
              value={level}
              onChange={(v) => {
                setVolume(v);
                setMuted(false);
              }}
              label={t.volume}
              valueText={`${Math.round(level * 100)}%`}
              className="w-28"
            />
          </div>
        </div>
      </div>

      {/* Mobile progress bar, full width below the compact row. */}
      <div className="px-4 pb-2 md:hidden">
        <Slider
          value={progress}
          onChange={seek}
          label={t.seek}
          valueText={timeText}
        />
      </div>
    </footer>
  );
}
