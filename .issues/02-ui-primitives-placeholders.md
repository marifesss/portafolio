# 02 — UI primitives & placeholder components

**Status:** open
**Type:** feature
**Depends on:** 01

## Description
Build the reusable design-system primitives and — critically — the **designed
placeholder components** that let us build every section without blocking on
missing assets (screenshots, diagrams, cover art). Missing assets must always
render as intentional, on-brand placeholders, never broken images or empty
boxes.

## Tasks
- [ ] Extend `src/components/ui` primitives already present (`Chip`,
      `SectionHeader`) and add what sections will need: e.g. `Card`,
      `IconLink`/`LinkRow`, `Badge`.
- [ ] `AlbumArtPlaceholder` — a Spotify-style blank "cover" (gradient + music
      glyph), configurable size, used for Partela and any missing cover.
- [ ] `ImagePlaceholder` / "screenshots coming soon" frame — for project
      screenshot galleries with no assets yet.
- [ ] `DiagramPlaceholder` — a framed "architecture diagram coming soon" block
      for the "Cómo se hizo" tab.
- [ ] `EqualizerBars` — small animated equalizer (CSS/Framer) reused by the
      PlayerBar and playing-track affordances (respects reduced-motion).
- [ ] Ensure all primitives are theme-token-based and bilingual-friendly (accept
      already-resolved strings, not `Localized` — resolution happens in
      sections).

## Acceptance criteria
- A gallery of these primitives renders correctly on the dark theme.
- Placeholders look deliberate and on-brand (a recruiter reads "coming soon",
  not "broken").
- `EqualizerBars` animates and freezes under `prefers-reduced-motion`.
- Components are reusable across sections and typed strictly.
