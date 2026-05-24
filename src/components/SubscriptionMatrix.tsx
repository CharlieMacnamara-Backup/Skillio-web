"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "./Container";

// Native lightweight SVG icons to eliminate external dependencies
export const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const CrossIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const SparklesIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
export type TierStatus = "check" | "cross" | "partial";

export interface PricingCardConfig {
  key: "free" | "lifetime";
  isFeatured: boolean;
  borderClass: string;
  badgeKey?: string;
  ctaActionHash: string;
  ctaClass: string;
}

export interface CompetitorAppConfig {
  key: "proloquo" | "tdsnap" | "touchchat";
  appStoreUrl: string;
  fitzgeraldKey: "social" | "verbs" | "descriptors";
  borderClass: string;
  bulletClass: string;
}

export interface MatrixRowConfig {
  key: "offline" | "speed" | "profiles" | "vocabulary";
  fitzgeraldKey: "verbs" | "descriptors" | "social" | "nouns";
  bulletClass: string;
  borderClass: string;
  statuses: {
    proloquo: TierStatus;
    tdsnap: TierStatus;
    touchchat: TierStatus;
    free: TierStatus;
    lifetime: TierStatus;
  };
}

// Configuration Array Instances (isolated TS configuration schemas)
export const pricingCards: PricingCardConfig[] = [
  {
    key: "free",
    isFeatured: false,
    borderClass: "border-zinc-100 dark:border-zinc-800/80 shadow-sm rounded-3xl",
    ctaActionHash: "#features",
    ctaClass: "border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 active:scale-[0.98] transition-all duration-300"
  },
  {
    key: "lifetime",
    isFeatured: true,
    borderClass: "border-2 border-[#14b8a6] dark:border-[#14b8a6] shadow-lg rounded-3xl",
    badgeKey: "hero.lifetime.badge",
    ctaActionHash: "#features",
    ctaClass: "text-white bg-[#14b8a6] hover:bg-[#0d9488] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30"
  }
];

export const competitorApps: CompetitorAppConfig[] = [
  {
    key: "proloquo",
    appStoreUrl: "https://apps.apple.com/gb/app/proloquo2go-aac/id308368164",
    fitzgeraldKey: "social",
    borderClass: "border-l-[#facc15] dark:border-l-[#facc15]",
    bulletClass: "bg-[#facc15]"
  },
  {
    key: "tdsnap",
    appStoreUrl: "https://apps.apple.com/gb/app/td-snap/id1072799231",
    fitzgeraldKey: "verbs",
    borderClass: "border-l-[#ec4899] dark:border-l-[#ec4899]",
    bulletClass: "bg-[#ec4899]"
  },
  {
    key: "touchchat",
    appStoreUrl: "https://apps.apple.com/gb/app/touchchat-hd-aac-w-wordpower/id412351574",
    fitzgeraldKey: "descriptors",
    borderClass: "border-l-[#3b82f6] dark:border-l-[#3b82f6]",
    bulletClass: "bg-[#3b82f6]"
  }
];

export const matrixRows: MatrixRowConfig[] = [
  {
    key: "offline",
    fitzgeraldKey: "verbs",
    bulletClass: "bg-[#ec4899]",
    borderClass: "border-l-[#ec4899]",
    statuses: { proloquo: "cross", tdsnap: "cross", touchchat: "cross", free: "check", lifetime: "check" }
  },
  {
    key: "speed",
    fitzgeraldKey: "descriptors",
    bulletClass: "bg-[#3b82f6]",
    borderClass: "border-l-[#3b82f6]",
    statuses: { proloquo: "cross", tdsnap: "cross", touchchat: "cross", free: "check", lifetime: "check" }
  },
  {
    key: "profiles",
    fitzgeraldKey: "social",
    bulletClass: "bg-[#facc15]",
    borderClass: "border-l-[#facc15]",
    statuses: { proloquo: "cross", tdsnap: "cross", touchchat: "cross", free: "partial", lifetime: "check" }
  },
  {
    key: "vocabulary",
    fitzgeraldKey: "nouns",
    bulletClass: "bg-[#f97316]",
    borderClass: "border-l-[#f97316]",
    statuses: { proloquo: "cross", tdsnap: "cross", touchchat: "cross", free: "partial", lifetime: "check" }
  }
];

export function SubscriptionMatrix() {
  const t = useTranslations("SubscriptionMatrix");

  return (
    <section id="pricing" className="py-12 md:py-20 bg-zinc-50/50 dark:bg-black/50 border-b border-zinc-200/30 dark:border-zinc-800/30 transition-colors duration-300">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 md:mb-6 leading-tight">
            {t("heading")}
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            {t("subheading")}
          </p>
        </div>

        {/* Pricing Cards - Direct Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl mx-auto">
          {/* Skillio Free Tier Card */}
          <div className="card-soft p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs relative hover:shadow-md transition-shadow duration-300">
            <div className="mb-4">
              <h3 className="text-xl font-bold font-display text-zinc-950 dark:text-zinc-50 mb-2">
                {t("hero.free.name")}
              </h3>
              <div className="text-3xl md:text-4xl font-black font-display text-zinc-950 dark:text-zinc-50 mb-3">
                {t("hero.free.price")}
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed font-sans mb-6">
              {t("hero.free.desc")}
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <CheckIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{t("features.offline")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <CheckIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{t("features.profiles")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <CheckIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{t("features.vocabulary")}</span>
              </li>
            </ul>
          </div>

          {/* Skillio Lifetime Unlock Card */}
          <div className="relative p-6 sm:p-8 rounded-3xl border-4 border-[#14b8a6] bg-teal-500/5 dark:bg-teal-500/[0.03] shadow-lg shadow-teal-500/5 transition-all duration-300">
            <div className="absolute -top-3 right-4 bg-[#14b8a6] text-white text-[10px] font-bold tracking-widest px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-xs">
              {t("hero.lifetime.badge")}
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold font-display text-[#14b8a6] mb-2">
                {t("hero.lifetime.name")}
              </h3>
              <div className="text-3xl md:text-4xl font-black font-display text-[#14b8a6] mb-3">
                {t("hero.lifetime.price")}
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed font-sans mb-6">
              {t("hero.lifetime.desc")}
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <CheckIcon className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />
                <span>{t("features.offline")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <CheckIcon className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />
                <span>{t("features.profiles")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <CheckIcon className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />
                <span>{t("features.vocabulary")}</span>
              </li>
            </ul>

            {/* Mobile/Desktop CTA */}
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "#features";
              }}
              className="w-full py-3 sm:py-3.5 px-4 sm:px-6 font-display font-bold text-center rounded-2xl text-white bg-[#14b8a6] hover:bg-[#0d9488] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 cursor-pointer block text-sm tracking-wider uppercase"
            >
              {t("hero.lifetime.cta")}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
