# 06 — Mobile navigation (bottom tab bar) & responsive shell

**Status:** open
**Type:** feature
**Depends on:** 04, 05

## Description
On mobile there's no room for the fixed sidebar. Replace it (below the `md`
breakpoint) with a Spotify-app-style **bottom tab bar** of icons, with the
"now playing" bar sitting just above it. Make the whole shell responsive.

## Tasks
- [ ] Build a `MobileTabBar` (icons + labels) driven by `navigation.ts`,
      visible only below `md`; hide the desktop sidebar there.
- [ ] Include tabs for Inicio, Buscar (🔍), Proyectos, Experiencia, and a "más"/
      overflow for the remaining sections (or fit all if clean).
- [ ] Stack the layout on mobile: scrollable main → PlayerBar (compact) → tab
      bar, all without overlap; account for safe-area insets.
- [ ] Active-tab highlight via `usePathname`.
- [ ] Verify tablet breakpoint looks intentional (sidebar returns at `md`).

## Acceptance criteria
- On a phone viewport, navigation is a bottom tab bar; the sidebar is hidden.
- The compact player sits above the tab bar; nothing overlaps or is cut off.
- All primary sections (incl. Buscar) are reachable on mobile.
- Layout transitions cleanly across mobile → tablet → desktop.
