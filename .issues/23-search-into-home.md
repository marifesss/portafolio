# 23 — Fold Search into Home (drop the sidebar Search item)

**Status:** done
**Type:** enhancement
**Depends on:** 07, 16

## Description
Remove the standalone "Buscar" sidebar entry and move the search field to the
top of Home, Spotify-style. Home should keep its current content **and** absorb
what used to live on the Search page (live results + "browse everything" tiles).

## Tasks
- [x] Remove the `search` item from `src/content/navigation.ts` (drops it from
      the sidebar and the mobile tab bar).
- [x] Delete the `/buscar` route (`src/app/buscar`) and the standalone
      `SearchSection` (`src/features/search`).
- [x] Add a search pill at the top of `HomeSection`; typing shows live grouped
      results (projects / skills / sections), Enter jumps to the first hit.
- [x] Blank query renders the landing hero (greeting + availability), featured
      projects, and the "Explorar todo" browse tiles (Home excluded).
- [x] Reuse project album covers in results instead of the gradient placeholder.

## Acceptance criteria
- No "Buscar" item in the sidebar or mobile tabs; `/buscar` no longer resolves.
- Home searches projects, skills and sections inline and still shows the hero.
