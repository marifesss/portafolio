# 03 — Motion foundation (Framer Motion)

**Status:** open
**Type:** feature
**Depends on:** 01

## Description
Set up the shared animation layer so every section animates consistently
("rich but restrained") instead of each component reinventing transitions.
Provide reusable variants and a page/section transition wrapper, all honoring
`prefers-reduced-motion`.

## Tasks
- [ ] Create a shared motion module (e.g. `src/lib/motion.ts`) with named
      variants: `fadeSlideIn`, `staggerContainer`, `staggerItem`, hover presets.
- [ ] Create a `PageTransition` / `SectionTransition` client wrapper that
      fade/slides section content on mount (used by feature `*Section`s).
- [ ] Add a `useReducedMotion`-aware helper so all variants collapse to no-op
      when the user prefers reduced motion.
- [ ] Document the intended usage pattern (a short comment or note) so each
      section applies motion the same way.

## Acceptance criteria
- Importing the shared variants into a section produces a consistent
  fade/slide-in + staggered list entrance.
- With `prefers-reduced-motion: reduce`, content appears instantly with no
  motion.
- No layout shift / hydration warnings from the motion wrappers.
