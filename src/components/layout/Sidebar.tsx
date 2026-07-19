"use client";

import Link from "next/link";
import Image from "next/image";
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
      className="flex h-full flex-col overflow-y-auto px-1 py-2 text-base"
    >
      {/* Brand / identity — name + photo link to the profile section. */}
      <Link
        href="/perfil"
        className="flex items-center gap-3 rounded-md px-2 py-4 text-lg font-black tracking-tight text-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-spotify"
      >
        <Image
          src="/images/mariana/perfil.jpeg"
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-full object-cover shadow ring-1 ring-black/20"
        />
        {site.name}
      </Link>

      <p className="px-2 pb-2 text-xs font-bold uppercase tracking-widest text-muted">
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
                className={`group flex items-center gap-3 rounded-md px-2 py-1.5 font-semibold outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-spotify ${
                  active
                    ? "bg-highlight text-white"
                    : "text-muted hover:translate-x-0.5 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.cover ? (
                  <Image
                    src={item.cover}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-md object-cover shadow ring-1 ring-black/20"
                  />
                ) : (
                  <span
                    aria-hidden
                    className={`grid h-16 w-16 shrink-0 place-items-center rounded-md text-xl transition-colors ${
                      active
                        ? "bg-white/15"
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}
                  >
                    {item.icon}
                  </span>
                )}
                <span className="truncate">{pick(item.label)}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-auto px-2 py-3 text-xs text-faint">
        {t.playlist} · {site.domain}
      </p>
    </nav>
  );
}
