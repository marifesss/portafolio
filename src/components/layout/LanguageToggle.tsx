"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/** ES / EN switch, styled like a Spotify pill control. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.switchLanguage}
      className={`inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-xs font-bold text-white backdrop-blur transition-colors hover:border-white/40 ${className}`}
    >
      <span className={locale === "es" ? "text-spotify" : "text-faint"}>
        ES
      </span>
      <span className="text-faint">/</span>
      <span className={locale === "en" ? "text-spotify" : "text-faint"}>
        EN
      </span>
    </button>
  );
}
