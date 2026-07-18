# 18 — Metadata & favicon

**Status:** open
**Type:** chore
**Depends on:** 17

## Description
Add the professional-polish basics recruiters and link previews rely on:
Next.js metadata (title/description, per-route titles) and a Spotify-style
favicon. (OG share image and deep a11y are out of scope for launch.)

## Tasks
- [ ] Set root `metadata` in `app/layout.tsx`: site title (e.g. "Mariana Fes —
      Portafolio"), description (from the tagline), `lang`, theme color.
- [ ] Add per-route `metadata` (or a title template) so each section has a
      sensible tab title.
- [ ] Add a Spotify-style favicon / app icon (green-on-dark music glyph) via the
      App Router icon convention (`app/icon.*`), replacing the default.
- [ ] Set `<html lang>` appropriately (default locale) and `themeColor`.

## Acceptance criteria
- Browser tab shows a proper title per route and a custom favicon.
- Root and per-route metadata are set with a coherent title template.
- No default Next.js favicon/placeholder remains.
- `npm run build` passes.
