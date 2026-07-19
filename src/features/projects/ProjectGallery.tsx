"use client";

import Image from "next/image";
import type { MediaItem } from "@/lib/types";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * One gallery frame — a native `<video>` player or an optimized `<Image>`.
 * `portrait` renders a phone-shaped frame (mobile captures); otherwise the
 * media keeps its natural landscape ratio (web captures).
 */
function MediaFigure({
  item,
  title,
  portrait,
}: {
  item: MediaItem;
  title: string;
  portrait: boolean;
}) {
  const { pick } = useLanguage();
  const label = `${title} — ${pick(item.caption)}`;

  return (
    <figure>
      {item.type === "video" ? (
        <video
          src={item.src}
          poster={item.poster}
          controls
          loop
          muted
          playsInline
          aria-label={label}
          className={
            portrait
              ? "aspect-[384/848] w-full rounded-2xl bg-black object-cover shadow-lg ring-1 ring-white/10"
              : "aspect-[2/1] w-full rounded-xl bg-black object-cover shadow-lg ring-1 ring-white/10"
          }
        />
      ) : (
        <div
          className={`relative overflow-hidden shadow-lg ring-1 ring-white/10 ${
            portrait ? "aspect-[384/848] rounded-2xl" : "aspect-[2/1] rounded-xl"
          }`}
        >
          <Image
            src={item.src}
            alt={label}
            fill
            sizes={
              portrait
                ? "(max-width: 640px) 50vw, 12rem"
                : "(max-width: 640px) 100vw, 50vw"
            }
            className="object-cover"
          />
        </div>
      )}
      <figcaption className="mt-2 text-center text-xs text-faint">
        {pick(item.caption)}
      </figcaption>
    </figure>
  );
}

/**
 * Screenshot + video gallery for a project's detail view.
 *
 * When media is tagged by `platform`, the gallery splits into "Web" and
 * "Mobile app" groups (with a lead badge) so a project built for both surfaces
 * shows it off clearly — web captures land in a landscape grid, mobile ones as
 * phone frames. Untagged media falls back to the classic phone-first layout
 * (a featured portrait clip + a portrait screenshot grid).
 */
export function ProjectGallery({
  media,
  title,
}: {
  media: MediaItem[];
  title: string;
}) {
  const { pick, t } = useLanguage();
  const hasPlatforms = media.some((item) => item.platform);

  if (hasPlatforms) {
    const web = media.filter((item) => item.platform === "web");
    const mobile = media.filter((item) => item.platform === "mobile");

    return (
      <div>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
          {t.gallery}
        </h2>

        {/* Lead — highlight that BOTH platforms were built. */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {web.length > 0 && (
            <span className="rounded-full bg-spotify/15 px-3 py-1 text-xs font-bold text-spotify ring-1 ring-spotify/30">
              {t.platformWeb}
            </span>
          )}
          {mobile.length > 0 && (
            <span className="rounded-full bg-spotify/15 px-3 py-1 text-xs font-bold text-spotify ring-1 ring-spotify/30">
              {t.platformMobile}
            </span>
          )}
          <span className="text-xs text-faint">{t.galleryBothPlatforms}</span>
        </div>

        {web.length > 0 && (
          <section className="mb-10">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              {t.platformWeb}
            </h3>
            <ul className="grid gap-5 sm:grid-cols-2">
              {web.map((item) => (
                <li key={item.src}>
                  <MediaFigure item={item} title={title} portrait={false} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {mobile.length > 0 && (
          <section>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              {t.platformMobile}
            </h3>
            <ul className="flex flex-wrap gap-4">
              {mobile.map((item) => (
                <li key={item.src} className="w-40 sm:w-44">
                  <MediaFigure item={item} title={title} portrait />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  // ── Legacy layout (no platform tags): featured clips + portrait grid ─────
  const videos = media.filter((item) => item.type === "video");
  const images = media.filter((item) => item.type === "image");

  return (
    <div>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted">
        {t.gallery}
      </h2>

      {videos.length > 0 && (
        <ul className="mb-8 flex flex-wrap gap-4">
          {videos.map((video) => (
            <li key={video.src} className="w-[17rem] max-w-full">
              <figure>
                <video
                  src={video.src}
                  poster={video.poster}
                  controls
                  loop
                  muted
                  playsInline
                  aria-label={`${title} — ${pick(video.caption)}`}
                  className="aspect-[1280/2856] w-full rounded-2xl bg-black object-cover shadow-lg ring-1 ring-white/10"
                />
                <figcaption className="mt-2 text-center text-xs text-faint">
                  {pick(video.caption)}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}

      {images.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((item) => (
            <li key={item.src}>
              <figure>
                <div className="relative aspect-[540/1024] overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
                  <Image
                    src={item.src}
                    alt={`${title} — ${pick(item.caption)}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs text-faint">
                  {pick(item.caption)}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
