"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content";
import { site } from "@/content/site";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Persistent "Your Library" sidebar (DESIGN.md §4): brand identity at the top,
 * then the site sections rendered as library rows with thumbnail-style icon
 * tiles, active-route highlighting (via `usePathname`) and hover states.
 */
export function Sidebar() {
  const pathname = usePathname();
  const { pick, t } = useLanguage();

  // Home matches only the exact root; every other section matches its subtree.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Primary"
      className="flex h-full flex-col overflow-y-auto p-2 text-sm"
    >
      {/* Brand / identity — doubles as the library header and links home. */}
      <Link
        href="/"
        className="flex items-center gap-3 px-3 py-4 text-lg font-black tracking-tight text-white"
      >
        <span aria-hidden className="text-2xl">
          🎧
        </span>
        {site.name}
      </Link>

      <p className="px-3 pb-2 text-xs font-bold uppercase tracking-widest text-muted">
        {t.library}
      </p>

      <ul className="flex flex-col gap-1">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-md p-2 font-semibold transition-colors ${
                  active
                    ? "bg-highlight text-white"
                    : "text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  aria-hidden
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-md text-lg transition-colors ${
                    active
                      ? "bg-white/15"
                      : "bg-white/5 group-hover:bg-white/10"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="truncate">{pick(item.label)}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-auto px-3 py-3 text-xs text-faint">
        {t.playlist} · {site.domain}
      </p>
    </nav>
  );
}
