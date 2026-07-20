import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A real MacBook Pro mockup photo wrapping web media. The mockup PNG has a
 * transparent screen cutout, so `children` (a `<video>`/`<Image>` filling the
 * hole) render *behind* it and show through the screen — the aluminum body and
 * bezel of the photo overlay them naturally. The hole insets are measured from
 * the artwork's alpha channel (see the percentages below).
 */
export function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full" style={{ aspectRatio: "1400/807" }}>
      {/* Screen media, sized to the mockup's transparent cutout. */}
      <div
        className="absolute overflow-hidden rounded-[0.4rem]"
        style={{ left: "10.35%", top: "3.9%", width: "79.3%", height: "86.2%" }}
      >
        {children}
      </div>
      {/* The device photo on top (its screen area is transparent). */}
      <Image
        src="/images/dispositivos/macbook-front.webp"
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 56rem"
        className="pointer-events-none select-none object-contain drop-shadow-[0_45px_80px_rgba(0,0,0,0.7)]"
      />
    </div>
  );
}
