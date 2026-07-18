"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { navigation } from "@/content";
import { useLanguage } from "@/i18n/LanguageProvider";

export function HomeSection() {
  const { pick } = useLanguage();

  // Shortcut cards = the "recently played" grid on Spotify's home.
  const shortcuts = navigation.filter((item) => item.href !== "/");

  return (
    <div className="px-6 pb-12 pt-20 sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-spotify">
        {site.name}
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
        {pick(site.tagline)}
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shortcuts.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center gap-4 overflow-hidden rounded-md bg-white/5 pr-4 transition-colors hover:bg-white/10"
          >
            <span
              aria-hidden
              className="grid h-16 w-16 shrink-0 place-items-center bg-white/10 text-2xl"
            >
              {item.icon}
            </span>
            <span className="truncate font-bold">{pick(item.label)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
