"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/** ES / EN switch, styled like a Spotify pill control. */
export function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.switchLanguage}
      className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:border-white/40"
    >
      <span className={locale === "es" ? "text-spotify" : "text-zinc-500"}>
        ES
      </span>
      <span className="text-zinc-600">/</span>
      <span className={locale === "en" ? "text-spotify" : "text-zinc-500"}>
        EN
      </span>
    </button>
  );
}
