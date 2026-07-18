/**
 * Shared animation layer (Framer Motion).
 *
 * The whole site animates "rich but restrained" from ONE set of variants so
 * sections don't reinvent transitions. This module is pure data (no hooks, no
 * `"use client"`) so it's importable from anywhere; the reduced-motion-aware
 * wiring lives in `@/components/motion/SectionTransition`.
 *
 * ── Usage pattern ──────────────────────────────────────────────────────────
 *   • Wrap a section's content in <SectionTransition> for the fade/slide-in.
 *   • For a staggered list, make the list a `motion` element with
 *     `variants={staggerContainer}` and each item `variants={staggerItem}`,
 *     driven by the same `initial="hidden"` / `animate="visible"` labels.
 *   • Resolve the right variant set with `useSectionMotion()` so it collapses
 *     to instant under `prefers-reduced-motion`.
 *
 * ── Reduced motion & hydration ─────────────────────────────────────────────
 *   Framer's `useReducedMotion` can return `false` on the server but `true` on
 *   the client's first render. To avoid hydration warnings we NEVER branch the
 *   rendered markup on it — the reduced variants keep the SAME `hidden` values
 *   (so the SSR inline style is identical) and only collapse the *transition*
 *   to `duration: 0`, which never reaches the SSR HTML.
 */
import type { Variants, TargetAndTransition } from "framer-motion";

/** easeOutExpo-ish — decisive but soft. Shared by every reveal. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const DURATION = 0.4;
const STAGGER = 0.06;
const DELAY_CHILDREN = 0.05;

/* ── Base variants (motion on) ──────────────────────────────────────────── */

/** Fade + rise for a whole block / section on mount. */
export const fadeSlideIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE_OUT },
  },
};

/** Orchestrates a list: children reveal one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: DELAY_CHILDREN },
  },
};

/** A single item inside a `staggerContainer`. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE_OUT },
  },
};

/* ── Hover / tap presets (interaction, not mount) ───────────────────────── */

/** `whileHover` — Spotify-style card lift. */
export const hoverLift: TargetAndTransition = {
  y: -4,
  transition: { duration: 0.2, ease: EASE_OUT },
};

/** `whileTap` — subtle press. */
export const tapPress: TargetAndTransition = { scale: 0.97 };

/* ── Reduced-motion counterparts ────────────────────────────────────────── */

/**
 * Same `hidden`/`visible` target values, but every transition is instant.
 * Deriving them (instead of hand-writing) guarantees the `hidden` values stay
 * identical to the base variants, which is what keeps hydration stable.
 */
function toInstant(variants: Variants): Variants {
  const result: Variants = {};
  for (const [state, value] of Object.entries(variants)) {
    result[state] =
      value && typeof value === "object"
        ? { ...(value as TargetAndTransition), transition: { duration: 0 } }
        : value;
  }
  return result;
}

export const fadeSlideInReduced = toInstant(fadeSlideIn);
export const staggerContainerReduced = toInstant(staggerContainer);
export const staggerItemReduced = toInstant(staggerItem);
