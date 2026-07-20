"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MediaItem } from "@/lib/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useScrollAreaRef } from "@/components/layout/ScrollArea";
import { PhoneFrame } from "./PhoneFrame";
import { LaptopFrame } from "./LaptopFrame";

type DeviceKind = "laptop" | "phone";

/** Scroll span (in track progress) where the device spins between clips. */
const FLIP_START = 0.24;
const FLIP_END = 0.94;
/** Share of each flip segment spent resting on the clip before spinning. */
const DWELL = 0.55;

/** The device's back, seen mid-spin: the real back-view mockup photo. */
function DeviceBack({ device }: { device: DeviceKind }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={
          device === "phone"
            ? "/images/dispositivos/iphone-back.webp"
            : "/images/dispositivos/macbook-back.webp"
        }
        alt=""
        fill
        sizes={device === "phone" ? "20rem" : "56rem"}
        className="pointer-events-none select-none object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.7)]"
      />
    </div>
  );
}

/**
 * Apple-style scroll presentation for one platform: a sticky stage where the
 * chapter title fades in first, then the device (laptop or phone) rises with
 * a clip auto-playing on its screen, and each further scroll stretch spins
 * the device a full 360° — the next clip is swapped in while it faces away,
 * so it "returns" showing the following capture. Ambient glows and dust
 * specks drift upward past the stage at different speeds, selling the sense
 * of descending as you scroll. Scrolling back up reverses everything.
 */
function DeviceFlipChapter({
  id,
  title,
  items,
  device,
  projectTitle,
}: {
  id: string;
  title: string;
  items: MediaItem[];
  device: DeviceKind;
  projectTitle: string;
}) {
  const { pick } = useLanguage();
  const scrollRoot = useScrollAreaRef();
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [idx, setIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    container: scrollRoot ?? undefined,
    target: trackRef,
    offset: ["start 0.85", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  // Title first, then the device rises — and keeps drifting up through the
  // chapter so the whole stage feels like it's being descended past.
  const titleOpacity = useTransform(progress, [0.02, 0.1], [0, 1]);
  const titleY = useTransform(progress, [0.02, 0.1, 1], [48, 0, -28]);
  const deviceOpacity = useTransform(progress, [0.1, 0.2], [0, 1]);
  const deviceY = useTransform(progress, [0.1, 0.24, 1], [150, 0, -36]);
  const deviceScale = useTransform(progress, [0.1, 0.24], [0.6, 1]);


  // One full 360° turn per clip transition, with a dwell before each spin.
  const flips = Math.max(items.length - 1, 0);
  const [rotationIn, rotationOut] = useMemo(() => {
    const input = [0, FLIP_START];
    const output = [0, 0];
    const seg = flips > 0 ? (FLIP_END - FLIP_START) / flips : 0;
    for (let i = 1; i <= flips; i++) {
      input.push(FLIP_START + (i - 1) * seg + DWELL * seg, FLIP_START + i * seg);
      output.push((i - 1) * 360, i * 360);
    }
    input.push(1);
    output.push(flips * 360);
    return [input, output];
  }, [flips]);
  const rotateY = useTransform(progress, rotationIn, rotationOut);

  // Edge-on moments (~90°/270°): crossfade in the real side-profile photo so
  // the phone reads with true thickness while it spins.
  const sideOpacity = useTransform(rotateY, (r) => {
    const angle = ((r % 360) + 360) % 360;
    const distance = Math.min(Math.abs(angle - 90), Math.abs(angle - 270));
    return Math.max(0, 1 - distance / 26);
  });

  // Swap the on-screen clip exactly while the device faces away (±180°).
  useMotionValueEvent(rotateY, "change", (r) => {
    const next = Math.min(
      items.length - 1,
      Math.max(0, Math.floor((r + 180) / 360)),
    );
    setIdx((current) => (current === next ? current : next));
  });

  // Clips auto-play; swapping `src` resets the element, so re-assert play.
  useEffect(() => {
    void videoRef.current?.play().catch(() => {});
  }, [idx]);

  const item = items[idx];
  const video = (
    <video
      ref={videoRef}
      src={item.src}
      poster={item.poster}
      autoPlay
      muted
      loop
      playsInline
      aria-label={`${projectTitle} — ${pick(item.caption)}`}
      className="block h-full w-full bg-black object-cover"
    />
  );

  return (
    <div
      ref={trackRef}
      id={id}
      className="relative scroll-mt-4"
      style={{ height: `${55 + items.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[min(48rem,calc(100dvh-8rem))] flex-col items-center justify-center gap-8">
        <motion.h3
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative text-4xl font-black tracking-tight text-white sm:text-5xl"
        >
          {title}
        </motion.h3>

        <motion.div
          style={{ opacity: deviceOpacity, y: deviceY, scale: deviceScale }}
          className="relative w-full"
        >
          <div style={{ perspective: 1600 }} className="relative mx-auto w-full">
            <motion.div
              style={{ rotateY, transformStyle: "preserve-3d" }}
              className={
                device === "phone"
                  ? "relative mx-auto w-72 max-w-full"
                  : "relative mx-auto w-full max-w-4xl"
              }
            >
              {/* Front — the device with its screen. */}
              <div style={{ backfaceVisibility: "hidden" }}>
                {device === "phone" ? (
                  <PhoneFrame>{video}</PhoneFrame>
                ) : (
                  <LaptopFrame>{video}</LaptopFrame>
                )}
              </div>
              {/* Back — the shell seen mid-spin. */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <DeviceBack device={device} />
              </div>
            </motion.div>

            {/* Side profile — fades in while the phone passes edge-on, giving
                the spin real thickness (stays unrotated so it never flattens). */}
            {device === "phone" && (
              <motion.div
                aria-hidden
                style={{ opacity: sideOpacity }}
                className="pointer-events-none absolute inset-0 mx-auto w-72 max-w-full"
              >
                <Image
                  src="/images/dispositivos/iphone-side.webp"
                  alt=""
                  fill
                  sizes="6rem"
                  className="select-none object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.7)]"
                />
              </motion.div>
            )}
          </div>

          {/* Caption of the clip currently on screen. */}
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center text-sm text-muted"
          >
            {pick(item.caption)}
            <span className="mt-1 block text-xs text-faint">
              {idx + 1} / {items.length}
            </span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * One static gallery frame — used by the reduced-motion fallback. A native
 * `<video>` (auto-playing, with controls to stop it) or an optimized
 * `<Image>`; `portrait` media renders inside a phone mockup.
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
        controls
        autoPlay
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
 * Apple-style scroll chapters: the platform title appears, the device rises
 * with its clip auto-playing, and scrolling spins it 360° between clips while
 * ambient layers drift past. Under `prefers-reduced-motion` the chapters
 * collapse to static device frames.
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
