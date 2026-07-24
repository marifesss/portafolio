"use client";

import Image from "next/image";
import { type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import type { MediaItem } from "@/lib/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useScrollAreaRef } from "@/components/layout/ScrollArea";
import { PhoneFrame } from "./PhoneFrame";
import { LaptopFrame } from "./LaptopFrame";
import { DeviceFlipChapter, type DeviceKind } from "./DeviceFlipChapter";

/**
 * One static gallery frame — used by the reduced-motion fallback. A native
 * `<video>` (with controls, played on demand) or an optimized `<Image>`;
 * `portrait` media renders inside a phone mockup.
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

  const screen: ReactNode =
    item.type === "video" ? (
      <video
        src={item.src}
        poster={item.poster}
        // Captures are heavy; asking for reduced motion should not mean
        // auto-downloading every clip on the page.
        preload="metadata"
        controls
        loop
        muted
        playsInline
        aria-label={label}
        className="block h-full w-full bg-black object-cover"
      />
    ) : (
      <div className="relative h-full w-full">
        <Image
          src={item.src}
          alt={label}
          fill
          sizes={
            portrait
              ? "(max-width: 640px) 60vw, 18rem"
              : "(max-width: 640px) 100vw, 42rem"
          }
          className="object-cover"
        />
      </div>
    );

  return (
    <figure>
      {portrait ? (
        <PhoneFrame>{screen}</PhoneFrame>
      ) : (
        <LaptopFrame>{screen}</LaptopFrame>
      )}
      <figcaption className="mt-3 text-center text-xs text-faint">
        {pick(item.caption)}
      </figcaption>
    </figure>
  );
}

/**
 * Screenshot + video gallery for a project's detail view.
 *
 * Media grouped by platform (or untagged portrait clips) presents as
 * Apple-style scroll chapters ({@link DeviceFlipChapter}): the platform title
 * appears, the device rises with its clip playing, and scrolling spins it 360°
 * between clips. Under `prefers-reduced-motion` the chapters collapse to
 * static device frames.
 */
export function ProjectGallery({
  media,
  title,
}: {
  media: MediaItem[];
  title: string;
}) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const scrollRoot = useScrollAreaRef();

  const hasPlatforms = media.some((item) => item.platform);
  const chapters = hasPlatforms
    ? [
        {
          key: "web",
          items: media.filter((item) => item.platform === "web"),
          title: t.platformWeb,
          device: "laptop" as DeviceKind,
        },
        {
          key: "mobile",
          items: media.filter((item) => item.platform === "mobile"),
          title: t.platformMobile,
          device: "phone" as DeviceKind,
        },
      ].filter((chapter) => chapter.items.length > 0)
    : [
        {
          key: "clips",
          items: media.filter((item) => item.type === "video"),
          title: t.platformMobile,
          device: "phone" as DeviceKind,
        },
      ].filter((chapter) => chapter.items.length > 0);

  const stills = hasPlatforms
    ? []
    : media.filter((item) => item.type === "image");

  return (
    <div>
      <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
        {t.gallery}
      </h2>

      {/* Lead — the platforms this project shipped on; each badge goes to its
          chapter. Nearby targets glide smoothly; far ones teleport instantly
          so the scroll-linked chapters in between don't fast-forward. */}
      {chapters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {chapters.map((chapter) => (
            <a
              key={chapter.key}
              href={`#galeria-${chapter.key}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(`galeria-${chapter.key}`);
                if (!target) return;
                const containerTop =
                  scrollRoot?.current?.getBoundingClientRect().top ?? 0;
                const distance = Math.abs(
                  target.getBoundingClientRect().top - containerTop,
                );
                target.scrollIntoView({
                  behavior:
                    distance < window.innerHeight * 1.2 ? "smooth" : "instant",
                  block: "start",
                });
              }}
              className="rounded-full bg-spotify/15 px-3 py-1 text-xs font-bold text-spotify ring-1 ring-spotify/30 transition-colors hover:bg-spotify hover:text-black"
            >
              {chapter.title}
            </a>
          ))}
          {chapters.length > 1 && (
            <span className="text-xs text-faint">{t.galleryBothPlatforms}</span>
          )}
        </div>
      )}

      {chapters.map((chapter) =>
        reduce ? (
          /* Reduced motion: a plain grid of device frames per chapter. */
          <section
            key={chapter.key}
            id={`galeria-${chapter.key}`}
            className="mt-10 scroll-mt-4"
          >
            <h3 className="mb-6 text-xl font-bold tracking-tight text-white">
              {chapter.title}
            </h3>
            <ul
              className={
                chapter.device === "phone"
                  ? "flex flex-wrap justify-center gap-10 sm:justify-start"
                  : "grid gap-6 sm:grid-cols-2"
              }
            >
              {chapter.items.map((item) => (
                <li
                  key={item.src}
                  className={
                    chapter.device === "phone" ? "w-72 max-w-full" : undefined
                  }
                >
                  <MediaFigure
                    item={item}
                    title={title}
                    portrait={chapter.device === "phone"}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <DeviceFlipChapter
            key={chapter.key}
            id={`galeria-${chapter.key}`}
            title={chapter.title}
            items={chapter.items}
            device={chapter.device}
            projectTitle={title}
          />
        ),
      )}

      {stills.length > 0 && (
        <ul className="mt-10 flex flex-wrap justify-center gap-10 sm:justify-start">
          {stills.map((item) => (
            <li key={item.src} className="w-72 max-w-full">
              <MediaFigure item={item} title={title} portrait />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
