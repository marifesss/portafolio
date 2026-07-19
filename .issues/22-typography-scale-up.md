# 22 — Typography scale-up (readable, Spotify-desktop sizing)

**Status:** done
**Type:** enhancement
**Depends on:** 01

## Description
Copy read too small across the app. Bump the whole type scale toward the
Spotify-desktop reference so text feels comfortable, without hand-editing every
class.

## Tasks
- [x] Raise the root `font-size` (16px → 18px, `112.5%`) in `globals.css` so
      every rem-based size and spacing grows proportionally.
- [x] Keep the PlayerBar's tuned fixed sizes (`text-[15px]`, `text-[11px]`) so
      the bar stays compact while content scales.

## Acceptance criteria
- Body copy, sidebar rows, meta labels and headings all read noticeably larger.
- No overflow/clipping in the sidebar, player bar, or section headers.
