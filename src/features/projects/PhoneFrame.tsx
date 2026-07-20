import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A real iPhone mockup photo wrapping mobile-app media. The mockup PNG has a
 * transparent screen cutout, so `children` (a `<video>`/`<Image>` filling the
 * hole) render *behind* it and show through the screen — the titanium frame
 * and dynamic island of the photo overlay them naturally. The hole insets are
 * measured from the artwork's alpha channel (see the percentages below).
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full" style={{ aspectRatio: "800/1647" }}>
      {/* Screen media, sized to the mockup's transparent cutout. */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: "4.5%",
          top: "1.7%",
          width: "91%",
          height: "96.6%",
          borderRadius: "14% / 6.8%",
        }}
      >
        {children}
      </div>
      {/* The device photo on top (its screen area is transparent). */}
      <Image
        src="/images/dispositivos/iphone-front.webp"
        alt=""
        fill
        sizes="(max-width: 640px) 80vw, 20rem"
        className="pointer-events-none select-none object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.7)]"
      />
    </div>
  );
}
