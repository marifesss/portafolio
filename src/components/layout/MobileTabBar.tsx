"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/content";
import { useLanguage } from "@/i18n/LanguageProvider";

/** How many sections show as direct tabs; the rest fold into "Más". */
const PRIMARY_TABS = 4;

/**
 * Spotify-app-style bottom tab bar for mobile (below `md`, where the sidebar is
 * hidden). Driven by `navigation.ts`: the first few sections are direct tabs,
 * the remainder live behind a "Más" overflow menu. Active tab is derived from
 * the current route via `usePathname`.
 */
export function MobileTabBar() {
  const pathname = usePathname();
  const { pick, t } = useLanguage();
  const [moreOpen, setMoreOpen] = useState(false);

  // Close the overflow menu on navigation. Done during render (React's
  // "adjust state on prop change" pattern) rather than in an effect.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMoreOpen(false);
  }

  // Home matches only the exact root; every other section matches its subtree.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const primary = navigation.slice(0, PRIMARY_TABS);
  const overflow = navigation.slice(PRIMARY_TABS);
  const overflowActive = overflow.some((item) => isActive(item.href));

  // Close the overflow menu on Escape.
  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoreOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moreOpen]);

  const tabClass = (active: boolean) =>
    `flex flex-1 flex-col items-center gap-1 rounded-md px-1 py-2 text-[10px] font-medium leading-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-spotify ${
      active ? "text-white" : "text-faint"
    }`;

  return (
    <nav
      aria-label="Primary"
      className="relative border-t border-white/5 bg-black pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {/* Overflow menu + click-away backdrop. */}
      {moreOpen && overflow.length > 0 && (
        <>
          <button
            type="button"
            aria-label={t.close}
            onClick={() => setMoreOpen(false)}
            className="fixed inset-0 z-30 cursor-default"
          />
          <div className="absolute bottom-full right-2 z-40 mb-2 w-52 overflow-hidden rounded-lg border border-white/10 bg-elevated shadow-2xl">
            <ul>
              {overflow.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-spotify ${
                        active ? "bg-white/10 text-white" : "text-muted"
                      }`}
                    >
                      <span aria-hidden className="text-lg">
                        {item.icon}
                      </span>
                      {pick(item.label)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}

      <ul className="flex items-stretch">
        {primary.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.id} className="flex flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={tabClass(active)}
              >
                <span aria-hidden className="text-xl">
                  {item.icon}
                </span>
                <span className="max-w-full truncate">{pick(item.label)}</span>
              </Link>
            </li>
          );
        })}

        {overflow.length > 0 && (
          <li className="flex flex-1">
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              className={tabClass(overflowActive || moreOpen)}
            >
              <span aria-hidden className="text-xl">
                ☰
              </span>
              <span className="max-w-full truncate">{t.more}</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
