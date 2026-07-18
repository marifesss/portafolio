# 04 — App shell & sidebar polish (desktop)

**Status:** done
**Type:** style
**Depends on:** 01, 02

## Description
Refine the persistent desktop chrome — the layered `AppShell` (sidebar + main +
player) — into a convincing Spotify layout. The structure exists; this issue is
about visual fidelity, active-route states, and the sidebar "library" feel.
**Follow `DESIGN.md` §1 (floating rounded panels on a black frame), §3 (top-bar
search pill), and §4 ("Your Library" sidebar) — see `imagenesInspo/`.**

## Tasks
- [x] Polish `AppShell` grid: rounded panels, spacing, gradients, and the fixed
      player row, matching Spotify's three-zone layout on desktop.
- [x] Style `Sidebar`: brand/name at top, nav items from
      `src/content/navigation.ts` with icons, active-route highlight, hover
      states.
- [x] Add the language toggle placement cleanly into the shell (already
      top-right of main) without overlapping content.
- [x] Ensure the main panel scrolls independently while sidebar + player stay
      fixed.
- [x] Verify active state uses the current route (Next `usePathname`).

## Acceptance criteria
- On desktop the layout reads clearly as Spotify: library sidebar, scrollable
  content, fixed player.
- The current section is visibly highlighted in the sidebar.
- No overflow/scroll bugs; only the main panel scrolls.
- Uses theme tokens and existing navigation content (no hardcoded labels).
