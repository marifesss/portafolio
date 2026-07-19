# 21 — PlayerBar visual polish (closer to real Spotify)

**Status:** done
**Type:** enhancement
**Depends on:** 05

## Description
Bring the now-playing bar visually closer to the real Spotify desktop client
(reference: `imagenesInspo/`). Keep it silent/decorative — this is styling only.

## Tasks
- [x] Replace the emoji controls with crisp inline SVG icons (shuffle, prev,
      play/pause, next, repeat, volume, heart) sized in `em`.
- [x] Use Mariana's real photo (`public/images/mariana/perfil.jpeg`) as the
      "album art" thumbnail instead of the green emoji tile.
- [x] Rework the track/artist typography to Spotify sizing (title ~15px
      semibold white, artist ~13px muted).
- [x] Add a "like"/save heart toggle on the left cluster.
- [x] Progress bar: white fill that turns green on hover, knob revealed on hover.
- [x] Decorative volume icon + slider on the right (desktop).

## Acceptance criteria
- The bar reads as a real Spotify "now playing" widget: photo art, line-icon
  controls, hover-green progress.
- No audio is loaded; play/pause still drives the decorative progress.
- Reduced-motion users keep a static, legible bar.
