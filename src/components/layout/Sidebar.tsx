"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content";
import { site } from "@/content/site";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Persistent Spotify-style sidebar with active-route highlighting. */
export function Sidebar() {
  const pathname = usePathname();
  const { pick, t } = useLanguage();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Primary"
      className="flex h-full flex-col gap-2 bg-black p-3 text-sm"
    >
      <Link href="/" className="px-3 py-4 text-lg font-black text-white">
        {site.name}
      </Link>

      <ul className="flex flex-col gap-1">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-4 rounded-md px-3 py-2 font-semibold transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span aria-hidden className="text-base">
                  {item.icon}
                </span>
                {pick(item.label)}
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-auto px-3 py-2 text-xs text-zinc-600">
        {t.playlist} · {site.domain}
      </p>
    </nav>
  );
}
