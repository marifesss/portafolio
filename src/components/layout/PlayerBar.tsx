"use client";

import { site } from "@/content/site";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * The bottom "now playing" bar. Static/decorative for now, but a real
 * anchor for the Spotify metaphor and a nice spot for the short tagline.
 */
export function PlayerBar() {
  const { pick, t } = useLanguage();

  return (
    <footer className="flex items-center gap-4 border-t border-white/5 bg-neutral-900 px-4 py-3">
      <div
        aria-hidden
        className="grid h-12 w-12 shrink-0 place-items-center rounded bg-spotify text-xl"
      >
        🎧
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          {t.nowPlayingLabel}
        </p>
        <p className="truncate text-sm text-white">{pick(site.nowPlaying)}</p>
      </div>

      <div className="ml-auto hidden items-center gap-2 text-zinc-500 sm:flex">
        <span aria-hidden>⏮</span>
        <span
          aria-hidden
          className="grid h-8 w-8 place-items-center rounded-full bg-white text-black"
        >
          ▶
        </span>
        <span aria-hidden>⏭</span>
      </div>
    </footer>
  );
}
