# 25 — Motion & interaction polish (smoother, more modern)

**Status:** done
**Type:** enhancement
**Depends on:** 03

## Description
Make navigating and selecting feel smoother and more modern, staying within the
Spotify metaphor: gentler scrolling and tactile hover/press states.

## Tasks
- [x] Smooth scrolling: `scroll-behavior: smooth` on `html` + `scroll-smooth`
      on the main content panel (neutralized under `prefers-reduced-motion`).
- [x] Cards: lift + soft shadow on hover, quick settle on press
      (`hover:-translate-y-1`, `active:translate-y-0`).
- [x] Sidebar rows: eased color/transform transitions with a subtle hover nudge.
- [x] Use Mariana's real photo for the profile avatar (`next/image`).

## Acceptance criteria
- Hover/press on cards and rows feels responsive and smooth, not abrupt.
- Reduced-motion users get instant, non-animated equivalents.

---

> Deploy (issue 20) stays last, per plan.
