# 09 — Proyectos playlist (list view) polish

**Status:** open
**Type:** style
**Depends on:** 02, 03

## Description
Refine the Proyectos list into a convincing Spotify **playlist / track list**:
row index that becomes a play affordance on hover, title, role, meta, and the
"coming soon" badge for Partela. The base list already exists; this makes it
feel like a playlist.

## Tasks
- [ ] Playlist header: playlist-style title ("Proyectos"), track count, maybe a
      cover/collage using `AlbumArtPlaceholder`.
- [ ] Track rows: index number that swaps to a ▶ play glyph on hover; animated
      hover background; "coming soon" badge for Partela.
- [ ] Staggered entrance for rows (shared motion).
- [ ] Ensure each row links to `/proyectos/[slug]` and is keyboard-focusable.
- [ ] Responsive: hide the meta column gracefully on small screens.

## Acceptance criteria
- The list reads unmistakably as a Spotify playlist/track list.
- Hover shows a play affordance and highlight; Partela is badged "coming soon".
- Rows are accessible (focusable, labeled) and link correctly.
- Renders cleanly on mobile and desktop.
