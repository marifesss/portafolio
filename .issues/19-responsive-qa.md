# 19 — Responsive & motion QA pass

**Status:** open
**Type:** chore
**Depends on:** 06, 16, 18

## Description
Full cross-section quality pass: verify every section, the shell, the player,
and search behave correctly across mobile / tablet / desktop, honor
`prefers-reduced-motion`, and pass build/lint cleanly.

## Tasks
- [ ] Walk every route at mobile, tablet, and desktop widths; fix overflow,
      overlap, tap-target, and truncation issues.
- [ ] Verify the mobile tab bar + compact player never overlap content and
      respect safe-area insets.
- [ ] Test `prefers-reduced-motion: reduce`: no auto-advancing player, static
      equalizer, instant section reveals.
- [ ] Basic keyboard pass: sidebar/tab-bar/links/search are focusable and
      operable; visible focus states.
- [ ] Run `npm run build` and `npm run lint`; resolve all type/lint errors and
      console warnings.

## Acceptance criteria
- No layout bugs across the three breakpoints on any route.
- Reduced-motion mode is fully respected.
- Core keyboard navigation works with visible focus.
- `npm run build` and `npm run lint` pass clean.
