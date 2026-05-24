import React from "react";
import Image from "next/image";

export type DeviceType = "ipad" | "iphone";

export interface DeviceScreenshotProps {
  src: string;
  alt: string;
  device?: DeviceType;
  overlaySrc?: string;
  overlayAlt?: string;
  className?: string;
  aspectRatio?: string;
  quality?: number;
  sizes?: string;
  priority?: boolean;
}

const deviceConfigs = {
  ipad: {
    framePadding: "p-3 sm:p-4",
    frameBorderRadius: "rounded-[2rem] sm:rounded-[2.5rem]",
    screenBorderRadius: "rounded-[1.4rem] sm:rounded-[1.8rem]",
    aspectRatio: "aspect-[16/10] sm:aspect-[16/11]",
    overlayWidth: "w-[35%] xl:w-[30%]",
    overlayPosition: "bottom-4 right-4"
  },
  iphone: {
    framePadding: "p-2 sm:p-2.5",
    frameBorderRadius: "rounded-[2rem] sm:rounded-[2.5rem]",
    screenBorderRadius: "rounded-[1.4rem] sm:rounded-[1.8rem]",
    aspectRatio: "aspect-[9/19.5]",
    overlayWidth: "w-[40%] xl:w-[35%]",
    overlayPosition: "bottom-3 right-3"
  }
};

export function DeviceScreenshot({
  src,
  alt,
  device = "ipad",
  overlaySrc,
  overlayAlt = "Detail view",
  className = "",
  aspectRatio,
  quality = 95,
  sizes = "(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 45vw",
  priority = false
}: DeviceScreenshotProps) {
  const config = deviceConfigs[device];
  const finalAspectRatio = aspectRatio || config.aspectRatio;

  return (
    <div className={`w-full relative bg-zinc-950 ${config.framePadding} ${config.frameBorderRadius} shadow-2xl border-4 border-zinc-800 dark:border-zinc-900 transition-all duration-500 hover:scale-[1.01] group ${className}`}>
      {/* Premium reflection shine */}
      <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none ${config.frameBorderRadius} z-20`} />
      {/* Inner ambient glow background */}
      <div className={`absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-purple-500/5 pointer-events-none ${config.frameBorderRadius}`} />
      
      {/* Device Screen Area */}
      <div className={`relative bg-zinc-900 dark:bg-black ${config.screenBorderRadius} overflow-hidden border border-zinc-800 flex items-center justify-center ${finalAspectRatio}`}>
        {/* Primary Image */}
        <Image
          src={src}
          alt={alt}
          fill
          quality={quality}
          priority={priority}
          className="object-cover select-none bg-zinc-100 dark:bg-zinc-900"
          sizes={sizes}
        />

        {/* Optional Overlay Image */}
        {overlaySrc && (
          <div className={`absolute ${config.overlayPosition} ${config.overlayWidth} card-soft overflow-hidden p-1 bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/50 dark:border-zinc-800 shadow-xl hidden md:block transition-all duration-700 delay-100`}>
            <div className={`rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800/50 relative ${finalAspectRatio}`}>
              <Image
                src={overlaySrc}
                alt={overlayAlt}
                fill
                quality={quality - 5}
                className="object-cover select-none"
                sizes="15vw"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
