"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "./Container";

type TabKey = "grid" | "studio" | "sensory" | "accessibility";

interface TabConfig {
  key: TabKey;
  imageSrc: string;
  secondaryImageSrc?: string;
  badgeColor: string;
  bulletColor: string;
  activeBorderColor: string;
  activePillBg: string;
}

// Complete static configurations matching existing app screenshot files
const tabConfigs: TabConfig[] = [
  {
    key: "grid",
    imageSrc: "/assets/images/samples/aac.png",
    badgeColor: "bg-[#facc15]/10 text-[#a16207] dark:text-[#fef08a] border-[#facc15]/30",
    bulletColor: "bg-[#facc15] shadow-[#facc15]/30",
    activeBorderColor: "border-[#facc15]",
    activePillBg: "bg-[#facc15]/10 dark:bg-[#facc15]/20 text-[#a16207] dark:text-[#fef08a]"
  },
  {
    key: "studio",
    imageSrc: "/assets/images/samples/aac-custom-form.png",
    secondaryImageSrc: "/assets/images/samples/synonym.png",
    badgeColor: "bg-[#ec4899]/10 text-[#be185d] dark:text-[#fbcfe8] border-[#ec4899]/30",
    bulletColor: "bg-[#ec4899] shadow-[#ec4899]/30",
    activeBorderColor: "border-[#ec4899]",
    activePillBg: "bg-[#ec4899]/10 dark:bg-[#ec4899]/20 text-[#be185d] dark:text-[#fbcfe8]"
  },
  {
    key: "sensory",
    imageSrc: "/assets/images/samples/breathing-control.png",
    secondaryImageSrc: "/assets/images/samples/fidget-nav.png",
    badgeColor: "bg-[#3b82f6]/10 text-[#1d4ed8] dark:text-[#bfdbfe] border-[#3b82f6]/30",
    bulletColor: "bg-[#3b82f6] shadow-[#3b82f6]/30",
    activeBorderColor: "border-[#3b82f6]",
    activePillBg: "bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20 text-[#1d4ed8] dark:text-[#bfdbfe]"
  },
  {
    key: "accessibility",
    imageSrc: "/assets/images/samples/settings.png",
    badgeColor: "bg-[#f97316]/10 text-[#c2410c] dark:text-[#fed7aa] border-[#f97316]/30",
    bulletColor: "bg-[#f97316] shadow-[#f97316]/30",
    activeBorderColor: "border-[#f97316]",
    activePillBg: "bg-[#f97316]/10 dark:bg-[#f97316]/20 text-[#c2410c] dark:text-[#fed7aa]"
  }
];

export function AACDemo() {
  const t = useTranslations("AACDemo");
  const [activeTab, setActiveTab] = useState<TabKey>("grid");

  const currentTabConfig = tabConfigs.find((tab) => tab.key === activeTab)!;

  const handleTabChange = (key: TabKey, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(key);
  };

  return (
    <section id="features" className="py-12 md:py-20 lg:py-28 bg-white dark:bg-black/10 overflow-hidden border-b border-zinc-200/30 dark:border-zinc-800/30 transition-colors duration-300">
      <Container>
        {/* Header Layout */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16 lg:mb-20">
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl font-display dark:text-zinc-100 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Dynamic Showcase Walkthrough: iPad and features grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left / Top Side: Tablet Showcase Device Mockup */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* iPad Device Frame */}
            <div className="w-full relative bg-zinc-950 p-3 sm:p-4 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border-4 border-zinc-800 dark:border-zinc-900 transition-all duration-500 hover:scale-[1.01] group">
              {/* Premium reflection shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none rounded-[2rem] sm:rounded-[2.5rem] z-20" />
              {/* Inner ambient glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-purple-500/5 pointer-events-none rounded-[2rem] sm:rounded-[2.5rem]" />
              
              {/* iPad Screen Area */}
              <div className="relative bg-zinc-900 dark:bg-black rounded-[1.4rem] sm:rounded-[1.8rem] overflow-hidden border border-zinc-800 flex items-center justify-center aspect-[16/10] sm:aspect-[16/11]">
                {/* Images Layer Matrix with crossfades */}
                {tabConfigs.map((tab) => {
                  const isActive = tab.key === activeTab;
                  return (
                    <div
                      key={tab.key}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        isActive 
                          ? "opacity-100 scale-100 z-10 pointer-events-auto" 
                          : "opacity-0 scale-95 z-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={tab.imageSrc}
                        alt={t(`features.${tab.key}.title`)}
                        fill
                        quality={95}
                        priority={tab.key === "grid"}
                        className="object-cover select-none bg-zinc-100 dark:bg-zinc-900"
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 45vw"
                      />
                    </div>
                  );
                })}

                {/* Secondary Floating Image overlay (if configured and desktop size) */}
                {tabConfigs.map((tab) => {
                  const isActive = tab.key === activeTab;
                  if (!tab.secondaryImageSrc) return null;
                  return (
                    <div
                      key={`sec-${tab.key}`}
                      className={`absolute bottom-4 right-4 w-[35%] xl:w-[30%] card-soft overflow-hidden p-1 bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/50 dark:border-zinc-800 shadow-xl hidden md:block transition-all duration-700 delay-100 ${
                        isActive 
                          ? "opacity-100 translate-y-0 scale-100 z-20 pointer-events-auto" 
                          : "opacity-0 translate-y-4 scale-90 z-0 pointer-events-none"
                      }`}
                    >
                      <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800/50 relative aspect-[16/11]">
                        <Image
                          src={tab.secondaryImageSrc}
                          alt="Detail view of custom parameters"
                          fill
                          quality={90}
                          className="object-cover select-none"
                          sizes="15vw"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right / Bottom Side: Interactive Selector & Detailed Features Card */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Horizontal / Scrollable Segmented Tab Switcher */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-zinc-200/50 dark:border-zinc-800/50 scrollbar-none select-none">
              {tabConfigs.map((tab) => {
                const isActive = tab.key === activeTab;
                return (
                  <button
                    key={tab.key}
                    onClick={(e) => handleTabChange(tab.key, e)}
                    className={`px-4 py-2.5 text-xs sm:text-sm font-extrabold rounded-full transition-all duration-300 cursor-pointer flex-shrink-0 border uppercase tracking-wider select-none ${
                      isActive
                        ? `${tab.activePillBg} ${tab.activeBorderColor} shadow-xs font-black`
                        : "bg-zinc-100/80 dark:bg-zinc-800/40 border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/80"
                    }`}
                  >
                    {t(`tabs.${tab.key}`)}
                  </button>
                );
              })}
            </div>

            {/* Feature Description Card */}
            <div className="card-soft p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 shadow-md transition-all duration-500 flex flex-col gap-5 min-h-[340px]">
              {/* Badge & Title */}
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wide mb-3 ${currentTabConfig.badgeColor}`}>
                  {t(`features.${activeTab}.badge`)}
                </span>
                <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white leading-tight">
                  {t(`features.${activeTab}.title`)}
                </h3>
              </div>

              {/* Description */}
              <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                {t(`features.${activeTab}.description`)}
              </p>

              {/* Glowing Bullet Features */}
              <ul className="flex flex-col gap-3.5 mt-2">
                {(["bullet1", "bullet2", "bullet3"] as const).map((bulletKey) => (
                  <li key={bulletKey} className="flex items-start gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 shadow-md transition-colors duration-500 ${currentTabConfig.bulletColor}`} />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 font-sans leading-snug">
                      {t(`features.${activeTab}.${bulletKey}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
