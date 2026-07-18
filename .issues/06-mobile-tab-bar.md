# 06 — Mobile navigation (bottom tab bar) & responsive shell

**Status:** done
**Type:** feature
**Depends on:** 04, 05

## Description
On mobile there's no room for the fixed sidebar. Replace it (below the `md`
breakpoint) with a Spotify-app-style **bottom tab bar** of icons, with the
"now playing" bar sitting just above it. Make the whole shell responsive.

## Tasks
- [x] Build a `MobileTabBar` (icons + labels) driven by `navigation.ts`,
      visible only below `md`; hide the desktop sidebar there.
- [x] Include tabs for Inicio, Proyectos, Experiencia, Perfil, and a "Más"
      overflow for the remaining sections. (Buscar deferred — no search route
      exists yet; wire it in when that feature lands.)
- [x] Stack the layout on mobile: scrollable main → PlayerBar (compact) → tab
      bar, all without overlap; account for safe-area insets.
- [x] Active-tab highlight via `usePathname`.
- [x] Verify tablet breakpoint looks intentional (sidebar returns at `md`).

## Acceptance criteria
- On a phone viewport, navigation is a bottom tab bar; the sidebar is hidden.
- The compact player sits above the tab bar; nothing overlaps or is cut off.
- All primary sections (incl. Buscar) are reachable on mobile.
- Layout transitions cleanly across mobile → tablet → desktop.
