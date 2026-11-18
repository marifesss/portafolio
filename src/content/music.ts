/**
 * "Favs de mari" — the songs behind the "now playing" bar.
 *
 * Each track plays Apple's official 30-second preview, streamed from Apple's
 * servers (nothing is hosted here), and links back to the song on Apple Music
 * as the preview terms require. Data comes from the iTunes Search API
 * (https://itunes.apple.com/search?entity=song&term=...).
 */
export interface Track {
  title: string;
  artist: string;
  /** Apple's 30-second preview (AAC). */
  preview: string;
  /** Album artwork on Apple's CDN. */
  artwork: string;
  /** The song on Apple Music. */
  appleMusicUrl: string;
}

const art = (path: string) =>
  `https://is1-ssl.mzstatic.com/image/thumb/${path}/160x160bb.jpg`;
const preview = (path: string) =>
  `https://audio-ssl.itunes.apple.com/itunes-assets/${path}.plus.aac.p.m4a`;

export const tracks: Track[] = [
  {
    title: "Dive",
    artist: "Olivia Dean",
    preview: preview(
      "AudioPreview221/v4/0e/59/93/0e599312-e752-f780-63ac-951680bf6df1/mzaf_9484989385581807309",
    ),
    artwork: art(
      "Music116/v4/26/8d/bb/268dbb59-4df1-36c3-525e-8d24c921ee25/23UMGIM04594.rgb.jpg",
    ),
    appleMusicUrl: "https://music.apple.com/us/album/dive/1676252821?i=1676252825",
  },
  {
    title: "Run Your Mouth",
    artist: "The Marías",
    preview: preview(
      "AudioPreview221/v4/4a/87/75/4a87756a-532f-41e6-e4b1-195d4221f487/mzaf_8294013882689882796",
    ),
    artwork: art(
      "Music211/v4/0b/4d/b6/0b4db6bd-2d40-55a5-1714-67f5c816294d/075679659644.jpg",
    ),
    appleMusicUrl:
      "https://music.apple.com/us/album/run-your-mouth/1733730985?i=1733730992",
  },
  {
    title: "Nice To Each Other",
    artist: "Olivia Dean",
    preview: preview(
      "AudioPreview221/v4/49/99/e6/4999e60f-e2c7-b9f9-f1b7-aad74b787f21/mzaf_12717219127350994233",
    ),
    artwork: art(
      "Music221/v4/80/03/27/800327cf-1563-c72e-d20e-0281ae33defa/25UMGIM60342.rgb.jpg",
    ),
    appleMusicUrl:
      "https://music.apple.com/us/album/nice-to-each-other/1814620245?i=1814620247",
  },
  {
    title: "You Rock My World",
    artist: "Michael Jackson",
    preview: preview(
      "AudioPreview211/v4/cb/ce/a1/cbcea179-947c-8098-3295-82c1bcaa461a/mzaf_6015153739247777119",
    ),
    artwork: art(
      "Music125/v4/3d/9d/38/3d9d3811-71f0-3a0e-1ada-3004e56ff852/827969428726.jpg",
    ),
    appleMusicUrl:
      "https://music.apple.com/us/album/you-rock-my-world/159292399?i=159295942",
  },
  {
    title: "It Ain't Over 'Til It's Over",
    artist: "Lenny Kravitz",
    preview: preview(
      "AudioPreview211/v4/38/c3/4f/38c34fa9-a8cd-3c2f-2f15-0a17341e475c/mzaf_14636199992229180959",
    ),
    artwork: art(
      "Music114/v4/af/7b/6e/af7b6ebc-dd7b-93aa-7764-5054ae90d63c/13UMGIM87323.rgb.jpg",
    ),
    appleMusicUrl:
      "https://music.apple.com/us/album/it-aint-over-til-its-over/712308582?i=712308688",
  },
  {
    title: "Cosmic Girl",
    artist: "Jamiroquai",
    preview: preview(
      "AudioPreview211/v4/c7/4e/3b/c74e3b10-57d9-07af-c492-8682861a186b/mzaf_6575881690174330950",
    ),
    artwork: art(
      "Music124/v4/a1/35/fe/a135fe18-654d-9f23-4235-c06614add855/886447942017.jpg",
    ),
    appleMusicUrl:
      "https://music.apple.com/us/album/cosmic-girl/1479062290?i=1479062293",
  },
  {
    title: "Bennie and the Jets",
    artist: "Elton John",
    preview: preview(
      "AudioPreview221/v4/85/53/57/85535725-8298-9c52-1bd6-d8bb3faab981/mzaf_854458321206818533",
    ),
    artwork: art(
      "Music122/v4/b3/60/b6/b360b655-4d28-179d-d0d4-4e128ebdf4c9/13UAEIM19273.rgb.jpg",
    ),
    appleMusicUrl:
      "https://music.apple.com/us/album/bennie-and-the-jets-2014-remaster/1440863013?i=1440863120",
  },
];
