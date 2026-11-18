"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";

/**
 * Shares a ref to the app's scrollable content panel (the center `<main>`).
 *
 * The site scrolls inside this panel, not the window, so scroll-linked effects
 * (`useScroll`) can't rely on the default document target — they need this
 * element as their `container`. Sections read it via {@link useScrollAreaRef}.
 */
const ScrollAreaContext = createContext<RefObject<HTMLElement | null> | null>(
  null,
);

/** The scroll container ref, or `null` when rendered outside the shell. */
export function useScrollAreaRef() {
  return useContext(ScrollAreaContext);
}

/** How long to keep retrying a restore while late content (images) grows the page. */
const RESTORE_FRAMES = 60;

/**
 * The scrollable content panel: `<main>`, publishing its DOM ref through
 * context so descendant sections can drive scroll-linked motion against the
 * real scroll container.
 *
 * It also restores scroll position on back/forward navigation. Browsers only
 * do that for the window, and this panel is what scrolls, so without it every
 * "back" landed at the top. Positions are remembered per path; a back/forward
 * (popstate) navigation returns to the saved one, while a regular link click
 * starts the new page at the top.
 */
export function ScrollArea({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const positions = useRef(new Map<string, number>());
  const currentPath = useRef(pathname);
  const isHistoryNav = useRef(false);

  // Remember where each page was left, and flag back/forward navigations.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () =>
      positions.current.set(currentPath.current, el.scrollTop);
    const onPopState = () => {
      isHistoryNav.current = true;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // On a route change, before paint: restore (history) or start at the top.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || currentPath.current === pathname) return;
    currentPath.current = pathname;

    const target = isHistoryNav.current
      ? (positions.current.get(pathname) ?? 0)
      : 0;
    isHistoryNav.current = false;

    // `instant` overrides the panel's `scroll-smooth`, so it doesn't glide.
    el.scrollTo({ top: target, behavior: "instant" });
    if (target === 0) return;

    // Images and lazy sections can still be growing the page; keep nudging
    // until the saved offset is reachable (or give up after ~1s).
    // Stops as soon as the visitor scrolls themselves, so it never fights them.
    let frame = 0;
    let raf = 0;
    const stop = () => cancelAnimationFrame(raf);
    const userEvents = ["wheel", "touchstart", "keydown", "pointerdown"];
    const settle = () => {
      if (Math.abs(el.scrollTop - target) < 2 || ++frame > RESTORE_FRAMES) {
        return;
      }
      el.scrollTo({ top: target, behavior: "instant" });
      raf = requestAnimationFrame(settle);
    };
    raf = requestAnimationFrame(settle);
    userEvents.forEach((type) =>
      el.addEventListener(type, stop, { passive: true, once: true }),
    );
    return () => {
      stop();
      userEvents.forEach((type) => el.removeEventListener(type, stop));
    };
  }, [pathname]);

  return (
    <ScrollAreaContext.Provider value={ref}>
      {/* `relative` is part of the contract, not styling the caller chose:
          Framer Motion measures a `container` target against its offset parent
          and warns when that container is statically positioned, which threw
          the scroll-linked effects in Home and the device-flip gallery off. */}
      <main ref={ref} className={`relative ${className ?? ""}`}>
        {children}
      </main>
    </ScrollAreaContext.Provider>
  );
}
