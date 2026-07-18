# 16 — Buscar (Search) feature

**Status:** open
**Type:** feature
**Depends on:** 04, 06, 09, 13

## Description
Add a Spotify-style **Search** ("Buscar"): an input that filters/jumps across
projects, skills, and sections. Reachable from the desktop sidebar and the
mobile tab bar (🔍).

## Tasks
- [ ] Add a `buscar` entry to `src/content/navigation.ts` and a `/buscar` route
      (`app/buscar/page.tsx`) rendering a `SearchSection`.
- [ ] Build `SearchSection`: search input + live-filtered results across
      projects (title/role), skills, and section names; group results by type.
- [ ] Results link to the right destination (project detail, section route).
- [ ] Add search UI labels (placeholder, "no results", group headings) to
      `src/i18n/dictionary.ts`, bilingual.
- [ ] Empty state ("browse everything" categories, Spotify-style) when the query
      is blank; "no results" state otherwise.
- [ ] Apply shared motion; ensure keyboard usability (type → results, Enter/click
      to navigate).

## Acceptance criteria
- Search is reachable from sidebar (desktop) and tab bar (mobile).
- Typing filters across projects, skills, and sections; results navigate
  correctly.
- Blank and no-results states are handled and on-brand.
- Labels are bilingual and swap on toggle.
