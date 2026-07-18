# Design reference — Spotify desktop look

Visual spec for the portfolio, extracted from real Spotify desktop screenshots.
**Reference images live in [`imagenesInspo/`](./imagenesInspo/).** When building
any UI, match this language. This is the single source of truth for visual
style; the `.issues/` tasks defer to it.

> Screenshot legend (in `imagenesInspo/`):
> - `...225753.png` — Home / "announcement" hero + All/Music/Podcasts + card rows
> - `...225828.png` — **Playlist detail** ("my olivia"): gradient header + track table
> - `...225910.png` — Home: "Recommended Stations" / "Your top mixes" card rows
> - `...225958.png` — **Profile page** ("Mariana"): avatar + huge name + artist/playlist grids
> - `...230027.png` — Profile page (scrolled): artist circles + "Public Playlists" grid

## 1. Overall frame

- **Pure black (`#000`) background** shows as thin gutters *between* panels.
- The UI is **3 rounded panels floating on black**, with ~8px gaps and ~8px
  corner radius:
  - **Left:** "Your Library" sidebar (fixed width, ~340px on wide screens).
  - **Center:** scrollable content panel (near-black `#121212`).
  - **Right (optional, desktop-only):** "now playing" / details panel.
- **Bottom:** full-width **player bar** spanning under all panels.
- Our baseline is **sidebar + center + player**; the right panel is a
  *nice-to-have* for very wide screens (can hold "now playing" details / a
  featured project). Do not block core work on it.

## 2. Color

| Token | Value | Use |
| --- | --- | --- |
| `base` | `#121212` | panel background |
| `elevated` | `#181818` | cards |
| `highlight` | `#282828` | card/row hover |
| black frame | `#000000` | gutters between panels |
| `spotify` | `#1db954` | primary accent |
| `spotify-bright` | `#1ed760` | play button, hover accent |
| text primary | `#ffffff` | titles |
| text muted | `~#a7a7a7` | subtitles, meta |
| text faint | `~#6a6a6a` | row index, timestamps |

- **Header gradient tint:** section/detail headers use a colored gradient at the
  top (~300–340px tall) that fades into `base`. In Spotify the tint comes from
  the cover art (the "my olivia" and profile headers are wine/maroon). For us:
  derive each **project/section its own accent hue** and fade it into `base`.
- Green is reserved for the **play affordance** and active/pinned states — don't
  over-use it as a fill.

## 3. Top bar (desktop)

- Centered cluster: a circular **Home** button + a large **search pill**
  (rounded-full, dark `~#242424`, magnifier icon, placeholder text — Spotify's
  is "What do you want to play?"; ours → our Buscar placeholder).
- Right side: small icon buttons + a **circular avatar** with a colored ring.
- We can fold Home + Search into this top bar OR keep them in the sidebar/tab
  bar — but the **big rounded search pill** is a signature element worth keeping.

## 4. Sidebar — "Your Library"

- Header row: **"Your Library"** (→ our library/nav label) + `＋` and an
  expand/collapse icon.
- Filter chips row (`Playlists` / `Albums` …) — pill chips, active = white fill
  / black text, inactive = `#232323` / white text.
- A small search icon + "Recents" sort row.
- **List items:** small **rounded album thumbnail (~48px)** + two lines: bold
  white title, muted subtitle (`Playlist • Mariana`), optional green **pin**.
  Whole row highlights on hover.

## 5. Content headers (playlist / profile detail)

From the "my olivia" and "Mariana" screenshots:

- Large square/round **cover** on the left (playlist = rounded square, profile =
  **circle**), ~230px, with shadow.
- Right of it: a small **eyebrow** ("Public Playlist" / "Profile"), then a
  **huge bold title** (name/playlist) — very large (≈4–6rem), tight letter
  spacing, may truncate.
- Meta line: owner avatar + name • counts ("25 songs, 1 hr 23 min" /
  "18 Public Playlists").
- **Action row below header:** big **green circular play button** (~56px, black
  ▶, scales on hover), then secondary icon actions (shuffle, download, add, …).

## 6. Track table (playlist)

Grid columns like Spotify: `#` · `Title` (with tiny cover + artist) · `Album` ·
`Date added` · a clock/duration. On hover: row highlights and the **`#` swaps to
a ▶**. Header row is small, muted, uppercase-ish, with a bottom divider.

## 7. Cards & rows (home)

- Horizontal sections with a **bold heading** + a muted "**Show all**" on the
  right.
- **Cards:** `elevated` background, rounded (~8px), image/cover on top (square,
  or **circle for artists**), bold white title, muted subtitle, hover lifts to
  `highlight`. Sometimes a green play button appears on hover.

## 8. Bottom player bar

- **Left:** track thumbnail + title + artist (+ like icon).
- **Center:** control row (shuffle · prev · **white circular play** · next ·
  repeat) over a **progress bar** with `elapsed` / `total` timestamps.
- **Right:** volume + misc icons.
- Ours is **animated but silent** (see issue 05): play toggles the animated
  progress + equalizer; timestamps are decorative.

## 9. Typography & motion

- Headings: heavy weight, **tight tracking**, large scale for hero/detail
  titles. Body/meta: normal weight, muted greys. (We use Geist; lean bold.)
- Motion is **rich but restrained**: hover highlights, card lift, staggered
  entrances, section fade/slide, animated equalizer. Respect
  `prefers-reduced-motion`.

## 10. Section → Spotify-screen mapping

| Portfolio section | Model it after | Screenshot |
| --- | --- | --- |
| **Perfil** | Spotify **Profile** page (circle avatar, huge name, "top artists" circles → "Géneros"/top skills, "Public Playlists" grid → featured projects) | `...225958.png`, `...230027.png` |
| **Inicio** | Home card rows ("Recommended" / "Your top mixes") | `...225753.png`, `...225910.png` |
| **Proyectos** (list) | **Playlist detail** header + track table | `...225828.png` |
| **Proyecto (detalle)** | Playlist/album detail (cover, big title, action row, tracklist → sections/screenshots) | `...225828.png` |
| **Experiencia** | Album/label detail (Mondelēz as "album", SORT/DOI as tracks) | `...225828.png` |
| **Skills** | Playlist / grouped card rows | `...225910.png` |
| **Récords (B-sides)** | Playlist track table | `...225828.png` |
| **Buscar** | Top search pill + results grouped as card rows / rows | `...225910.png` |
