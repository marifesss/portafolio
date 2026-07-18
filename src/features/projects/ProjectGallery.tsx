"use client";

import Image from "next/image";
import type { MediaItem } from "@/lib/types";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Screenshot + video gallery for a project's detail view. Mobile-app captures
 * render as portrait "phone" frames; a video (if any) leads as a featured clip.
 */
export function ProjectGallery({
  media,
  title,
}: {
  media: MediaItem[];
  title: string;
}) {
  const { pick, t } = useLanguage();
  const video = media.find((item) => item.type === "video");
  const images = media.filter((item) => item.type === "image");

  return (
    <div>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted">
        {t.gallery}
      </h2>

      {video && (
        <figure className="mb-8 max-w-[16rem]">
          <video
            src={video.src}
            poster={video.poster}
            controls
            loop
            muted
            playsInline
            aria-label={`${title} — ${pick(video.caption)}`}
            className="aspect-[540/1024] w-full rounded-2xl bg-black object-cover shadow-lg ring-1 ring-white/10"
          />
          <figcaption className="mt-2 text-center text-xs text-faint">
            {pick(video.caption)}
          </figcaption>
        </figure>
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
