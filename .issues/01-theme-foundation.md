# 01 — Theme foundation & design tokens

**Status:** open
**Type:** style
**Depends on:**

## Description
Establish the Spotify-inspired visual foundation everything else builds on:
color tokens, typography, background gradients, scrollbar, and a base
`prefers-reduced-motion` rule. **Match `DESIGN.md` §2 (color) and the reference
screenshots in `imagenesInspo/` — use the exact palette (`#121212` base,
`#181818` cards, `#282828` hover, black frame, greens).** `globals.css` already has a starter `@theme`
block; expand it into a deliberate, documented design system so later sections
are just composing tokens, not inventing colors.

## Tasks
- [ ] Audit and expand `@theme` tokens in `src/app/globals.css`: greens
      (`spotify`, `spotify-bright`), background scale (`base`, `elevated`,
      `highlight`), text/muted greys, and any accent needed.
- [ ] Define reusable surface/gradient helpers (e.g. the top-fade gradient used
      on the main panel and section headers).
- [ ] Confirm fonts (Geist sans/mono) are wired via `layout.tsx` and mapped to
      `--font-sans` / `--font-mono`.
- [ ] Add a global `@media (prefers-reduced-motion: reduce)` baseline that
      neutralizes transitions/animations.
- [ ] Keep the thin Spotify-style scrollbar; verify contrast on dark surfaces.

## Acceptance criteria
- All theme colors are available as Tailwind utilities (`bg-base`,
  `text-spotify`, etc.) and used by name, not raw hex, elsewhere.
- The app renders on a cohesive dark Spotify palette with no jarring default
  Tailwind colors.
- `prefers-reduced-motion` baseline is in place.
- `npm run build` passes.
