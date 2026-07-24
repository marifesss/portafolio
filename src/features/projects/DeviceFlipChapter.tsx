"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MediaItem } from "@/lib/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useScrollAreaRef } from "@/components/layout/ScrollArea";
import { PhoneFrame } from "./PhoneFrame";
import { LaptopFrame } from "./LaptopFrame";

export type DeviceKind = "laptop" | "phone";

/** Scroll span (in track progress) where the device spins between clips. */
const FLIP_START = 0.24;
const FLIP_END = 0.94;
/** Share of each flip segment spent resting on the clip before spinning. */
const DWELL = 0.55;

/** Width ÷ height of each mockup photo. */
const ASPECT: Record<DeviceKind, number> = {
  laptop: 1400 / 807,
  phone: 800 / 1647,
};
/** Widest the mockup may render, as a share of the panel height — the rest is
 *  the chapter title above it and the caption below. */
const STAGE_SHARE = 0.62;
/** Ceiling once there's height to spare (Spotify-desktop proportions). */
const MAX_WIDTH: Record<DeviceKind, string> = {
  laptop: "56rem",
  phone: "17rem",
};

/**
 * True on phone-sized viewports, where the clip inside the mockup is too small
 * to read and a tap should hand it over to the device's native player.
 */
function useCompactViewport() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return compact;
}

type FullscreenVideo = HTMLVideoElement & {
  /** iOS Safari has no element Fullscreen API — only this on `<video>`. */
  webkitEnterFullscreen?: () => void;
  webkitRequestFullscreen?: () => void;
};

/** Blows the clip up to the whole screen, with native controls while expanded. */
function openFullscreen(el: HTMLVideoElement | null) {
  const video = el as FullscreenVideo | null;
  if (!video) return;
  // Only while expanded — the inline clip stays chrome-free.
  video.controls = true;
  if (video.requestFullscreen) {
    void video.requestFullscreen().catch(() => {});
  } else if (video.webkitEnterFullscreen) {
    video.webkitEnterFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

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
 * a clip playing on its screen, and each further scroll stretch spins the
 * device a full 360° — the next clip is swapped in while it faces away, so it
 * "returns" showing the following capture. Scrolling back up reverses
 * everything.
 *
 * Clips are pulled down lazily (see the playback effect): screen captures are
 * heavy, and a project page holds one chapter per platform, so eager autoplay
 * would spend tens of megabytes of a visitor's data before they scroll.
 */
export function DeviceFlipChapter({
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
  const { pick, t } = useLanguage();
  const scrollRoot = useScrollAreaRef();
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [idx, setIdx] = useState(0);
  const canExpand = useCompactViewport();

  // The stage is centered within the *visible* height of the scroll panel, not
  // a fixed 48rem — otherwise on a tall monitor the sticky content stays capped
  // near the top and reads as "stuck up top" with dead space below. Measure the
  // panel live so it stays centered on any screen and through orientation
  // changes. (`100dvh` would overshoot: the panel sits below the player bar.)
  const [portHeight, setPortHeight] = useState<number>();
  useEffect(() => {
    const el = scrollRoot?.current;
    if (!el) return;
    const update = () => setPortHeight(el.clientHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollRoot]);

  // The mockup is sized off the panel's real height rather than `dvh`: the
  // panel is shorter than the window (the player bar sits below it), so a
  // viewport-unit cap overshoots and the device crowds out the title and
  // caption. Before the first measurement, fall back to the width ceiling.
  const stageSize = {
    maxWidth: portHeight
      ? `min(${MAX_WIDTH[device]}, ${Math.round(portHeight * STAGE_SHARE * ASPECT[device])}px)`
      : MAX_WIDTH[device],
  };

  // Is this chapter's stage on screen? Drives playback (and therefore the
  // download) of its clips.
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // The panel is the scroller, not the window. A margin gives the clip a
      // head start so it isn't still buffering when the device rises.
      { root: scrollRoot?.current ?? null, rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollRoot]);

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

  // Playback is bound to visibility rather than `autoPlay`, and the element
  // carries `preload="none"` — so a clip's bytes are only fetched once its
  // chapter is actually being looked at. Swapping `src` resets the element,
  // hence `idx` in the deps.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) void el.play().catch(() => {});
    else el.pause();
  }, [inView, idx]);

  // Leaving fullscreen puts the clip back to its bare, inline state.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const restore = () => {
      if (!document.fullscreenElement) el.controls = false;
    };
    document.addEventListener("fullscreenchange", restore);
    el.addEventListener("webkitendfullscreen", restore);
    return () => {
      document.removeEventListener("fullscreenchange", restore);
      el.removeEventListener("webkitendfullscreen", restore);
    };
  }, []);

  const item = items[idx];
  const screen = (
    <>
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        preload="none"
        muted
        loop
        playsInline
        aria-label={`${projectTitle} — ${pick(item.caption)}`}
        className="block h-full w-full bg-black object-cover"
      />

      {/* On phones the mockup screen is thumbnail-sized: tapping it hands the
          clip to the native fullscreen player. */}
      {canExpand && (
        <button
          type="button"
          onClick={() => openFullscreen(videoRef.current)}
          aria-label={t.expandVideo}
          className="absolute inset-0 flex items-end justify-end p-1.5"
        >
          <span className="flex items-center gap-1 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-sm">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" />
            </svg>
          </span>
        </button>
      )}
    </>
  );

  return (
    <div
      ref={trackRef}
      id={id}
      className="relative scroll-mt-4"
      style={{ height: `${55 + items.length * 100}vh` }}
    >
      <div
        className="sticky top-0 flex flex-col items-center justify-center gap-6 py-8 sm:gap-8"
        style={{ height: portHeight ? `${portHeight}px` : "100dvh" }}
      >
        <motion.h3
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative text-3xl font-black tracking-tight text-white sm:text-5xl"
        >
          {title}
        </motion.h3>

        <motion.div
          style={{ opacity: deviceOpacity, y: deviceY, scale: deviceScale }}
          className="relative w-full"
        >
          <div style={{ perspective: 1600 }} className="relative mx-auto w-full">
            <motion.div
              style={{ rotateY, transformStyle: "preserve-3d", ...stageSize }}
              className="relative mx-auto w-full"
            >
              {/* Front — the device with its screen. */}
              <div style={{ backfaceVisibility: "hidden" }}>
                {device === "phone" ? (
                  <PhoneFrame>{screen}</PhoneFrame>
                ) : (
                  <LaptopFrame>{screen}</LaptopFrame>
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
                style={{ opacity: sideOpacity, ...stageSize }}
                className="pointer-events-none absolute inset-0 mx-auto w-full"
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
