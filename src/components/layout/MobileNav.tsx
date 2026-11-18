"use client";

import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Mobile navigation (below `md`, where the sidebar is hidden), modeled on the
 * Spotify phone app: a round menu (hamburger) button at the top-left opens the
 * same "Your Library" sidebar as a drawer that slides in from the left. Closes
 * on navigation, on Escape, and on tapping the dimmed backdrop. Focus moves
 * into the drawer when it opens and back to the button when it closes.
 */
export function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const drawerId = useId();
  const [open, setOpen] = useState(false);
  // The drawer portals into <body>, which only exists on the client.
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on navigation (React's "adjust state on prop change" pattern).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape closes; focus goes into the drawer while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const button = buttonRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  const slide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
      };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.openMenu}
        aria-expanded={open}
        aria-controls={drawerId}
        className="pointer-events-auto mr-auto grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/50 text-white outline-none backdrop-blur transition hover:border-white/40 active:scale-95 focus-visible:ring-2 focus-visible:ring-spotify md:hidden"
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-50 md:hidden">
                {/* Dimmed backdrop: tap to close. */}
                <motion.button
                  type="button"
                  aria-label={t.close}
                  tabIndex={-1}
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 cursor-default bg-black/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  ref={drawerRef}
                  id={drawerId}
                  role="dialog"
                  aria-modal="true"
                  aria-label={t.library}
                  className="absolute inset-y-0 left-0 w-[min(20rem,85vw)] bg-base pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] shadow-2xl"
                  {...slide}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Sidebar />
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
