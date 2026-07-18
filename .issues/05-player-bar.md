# 05 — Now-playing PlayerBar (animated, silent)

**Status:** done
**Type:** feature
**Depends on:** 02, 03

## Description
Turn the currently-decorative `PlayerBar` into the animated-but-**silent**
centerpiece of the Spotify metaphor: a working play/pause toggle that animates a
progress bar and the equalizer. No real audio is played or hosted.

## Tasks
- [x] Add client state for `isPlaying`; wire the ▶/⏸ button to toggle it.
- [x] Animate a progress bar that advances while "playing" and pauses when
      paused (loops back at the end); include a moving scrubber knob.
- [x] Show the `EqualizerBars` (from #02) animating only while playing.
- [x] Keep the short tagline (`site.nowPlaying`) as the "now playing" title and
      a "track"/subtitle line; keep prev/next as decorative controls.
- [x] Respect `prefers-reduced-motion` (no auto-advancing progress / static
      equalizer); keep controls usable.
- [x] Basic a11y: button has an accessible label reflecting play/pause state.

## Acceptance criteria
- Clicking play/pause visibly starts/stops the progress animation and
  equalizer.
- No audio is loaded or played anywhere.
- The bar looks and behaves like a real "now playing" widget on desktop and
  above the mobile tab bar.
- Reduced-motion users get a static, still-legible bar.
