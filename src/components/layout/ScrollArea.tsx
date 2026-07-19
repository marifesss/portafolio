"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

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

/**
 * The scrollable content panel. A thin client wrapper around `<main>` whose
 * only job is to publish its DOM ref through context so descendant sections can
 * drive scroll-linked motion against the real scroll container.
 */
export function ScrollArea({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  return (
    <ScrollAreaContext.Provider value={ref}>
      <main ref={ref} className={className}>
        {children}
      </main>
    </ScrollAreaContext.Provider>
  );
}
