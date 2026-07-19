# 24 — Experience "label" artwork (real Mondelēz cover)

**Status:** done
**Type:** enhancement
**Depends on:** 12

## Description
Use the real Mondelēz label image on the Discográfica (Experience) header
instead of the chocolate-emoji gradient placeholder.

## Tasks
- [x] Add an optional `cover?: string` to the `Experience` type.
- [x] Set the Mondelēz `cover` to
      `/images/mondelez/mondelez-introduced.avif` in `src/content/experience.ts`.
- [x] Render the cover via `next/image` (object-contain on a white card) when
      present, falling back to `AlbumArtPlaceholder` otherwise.

## Acceptance criteria
- The Experience header shows the Mondelēz artwork; other/future entries without
  a `cover` still fall back to the gradient placeholder.
