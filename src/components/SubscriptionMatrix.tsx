"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "./Container";

// Native lightweight SVG icons to eliminate external dependencies
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
  const [activeTab, setActiveTab] = useState<"corporate" | "skillio" | "matrix">("skillio");

  const handleTabChange = (tab: "corporate" | "skillio" | "matrix", e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const renderStatusIcon = (status: TierStatus, column: "competitors" | "free" | "lifetime") => {
    if (status === "check") {
      const className =
        column === "lifetime"
          ? "w-5 h-5 mr-2 text-[#14b8a6] flex-shrink-0"
          : "w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400 flex-shrink-0";
      return <CheckIcon className={className} />;
    } else if (status === "cross") {
      return <CrossIcon className="w-5 h-5 mr-2 text-red-500/80 flex-shrink-0" />;
    } else {
      // partial
      return <CheckIcon className="w-5 h-5 mr-2 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />;
    }
  };

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

        {/* Clinical Fitzgerald Key Visual Legend */}
        <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-2.5 mb-8 md:mb-12 text-xs font-semibold font-sans bg-zinc-100/60 dark:bg-zinc-900/60 py-2.5 md:py-3.5 px-4 md:px-6 rounded-2xl max-w-3xl mx-auto border border-zinc-200/30 dark:border-zinc-800/30 shadow-xs transition-colors duration-300">
          <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px] flex items-center">
            {t("legend.title")}
          </span>
          <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <span className="w-3 h-3 rounded-full bg-[#facc15] shadow-sm flex-shrink-0" />
            {t("legend.social")}
          </span>
          <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <span className="w-3 h-3 rounded-full bg-[#ec4899] shadow-sm flex-shrink-0" />
            {t("legend.verbs")}
          </span>
          <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <span className="w-3 h-3 rounded-full bg-[#3b82f6] shadow-sm flex-shrink-0" />
            {t("legend.descriptors")}
          </span>
          <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <span className="w-3 h-3 rounded-full bg-[#f97316] shadow-sm flex-shrink-0" />
            {t("legend.nouns")}
          </span>
        </div>

        {/* View Switcher (Segmented Control Toggle with Symmetrical Sliding Pill) */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="relative w-full max-w-md grid grid-cols-3 rounded-full bg-zinc-200/60 p-1 dark:bg-zinc-800/60 backdrop-blur-xs border border-zinc-200/20 shadow-inner overflow-hidden transition-all duration-300 ease-in-out">
            {/* Sliding Background Pill */}
            <div
              className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-in-out ${
                activeTab === "corporate"
                  ? "left-1 w-[calc(33.33%-6px)] bg-white dark:bg-zinc-900 shadow-sm"
                  : activeTab === "skillio"
                  ? "left-[calc(33.33%+2px)] w-[calc(33.33%-6px)] bg-[#14b8a6] shadow-md shadow-teal-500/20"
                  : "left-[calc(66.66%+2px)] w-[calc(33.33%-6px)] bg-white dark:bg-zinc-900 shadow-sm"
              }`}
            />

            <button
              onClick={(e) => handleTabChange("corporate", e)}
              aria-label={t("toggle.corporateAria")}
              className={`relative z-10 w-full text-center px-1.5 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-300 ease-in-out cursor-pointer ${
                activeTab === "corporate"
                  ? "text-zinc-950 dark:text-zinc-50"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {t("toggle.corporate")}
            </button>
            <button
              onClick={(e) => handleTabChange("skillio", e)}
              aria-label={t("toggle.alternativesAria")}
              className={`relative z-10 w-full text-center px-1.5 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-300 ease-in-out cursor-pointer ${
                activeTab === "skillio"
                  ? "text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {t("toggle.alternatives")}
            </button>
            <button
              onClick={(e) => handleTabChange("matrix", e)}
              aria-label={t("toggle.matrixAria")}
              className={`relative z-10 w-full text-center px-1.5 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-300 ease-in-out cursor-pointer ${
                activeTab === "matrix"
                  ? "text-zinc-950 dark:text-zinc-50"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {t("toggle.matrix")}
            </button>
          </div>
        </div>

        {/* Unified Adaptive View Area */}
        <div className="w-full">
          {activeTab === "corporate" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full animate-fadeIn max-w-5xl mx-auto">
              {competitorApps.map((comp) => (
                <div
                  key={comp.key}
                  className={`card-soft p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs relative hover:shadow-md transition-shadow duration-300 border-l-4 ${comp.borderClass}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 dark:text-zinc-50 text-base leading-tight">
                        {t(`competitors.${comp.key}.name`)}
                      </h4>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold tracking-wide block mt-0.5">
                        {t(`competitors.${comp.key}.developer`)}
                      </span>
                    </div>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${comp.bulletClass} flex-shrink-0`}
                      title={t(`legend.${comp.fitzgeraldKey}`)}
                    />
                  </div>
                  <div className="text-2xl md:text-3xl font-black font-display text-red-500 mb-0.5">
                    {t(`competitors.${comp.key}.pricing`)}
                  </div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mb-4">
                    {t(`competitors.${comp.key}.yearlyPricing`)}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-sans mb-6">
                    {t(`competitors.${comp.key}.trap`)}
                  </p>
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                    <a
                      href={comp.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#14b8a6] hover:text-[#0d9488] dark:text-teal-400 dark:hover:text-teal-300 hover:underline hover:opacity-80 transition-all duration-300 ease-in-out inline-flex items-center gap-1"
                    >
                      {t("competitors.verifyLink")}
                    </a>
                    <span className="text-[10px] font-bold text-zinc-400 bg-zinc-200/40 dark:bg-zinc-800/60 dark:text-zinc-500 px-2 py-0.5 rounded-full flex-shrink-0">
                      {t(`competitors.${comp.key}.reviews`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "skillio" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full animate-fadeIn max-w-4xl mx-auto">
              {/* Skillio Free Tier Card */}
              <div className="card-soft p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs relative hover:shadow-md transition-shadow duration-300 border-l-4 border-l-[#f97316]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-wider">
                    <SparklesIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
                    {t("hero.free.name")}
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] flex-shrink-0" title={t("legend.nouns")} />
                </div>
                <div className="text-2xl md:text-3xl font-black font-display text-zinc-950 dark:text-zinc-50 mb-4">
                  {t("hero.free.price")}
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-sans mb-6">
                  {t("hero.free.desc")}
                </p>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col gap-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {matrixRows.map((row) => (
                    <div
                      key={row.key}
                      className={`flex items-center justify-between ${
                        row.statuses.free === "check" ? "text-emerald-600 dark:text-emerald-400" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${row.bulletClass} flex-shrink-0`} />
                        {t(`features.${row.key}`)}
                      </span>
                      <span className={row.statuses.free === "check" ? "font-bold" : "font-medium"}>
                        {t(`features.free.${row.key}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skillio Lifetime Unlock Card */}
              <div className="relative p-6 sm:p-8 rounded-3xl border-4 border-[#14b8a6] bg-teal-500/5 dark:bg-teal-500/[0.03] shadow-lg shadow-teal-500/5 transition-all duration-300">
                <div className="absolute -top-3 right-4 bg-[#14b8a6] text-white text-[9px] font-bold tracking-widest px-3 py-1 rounded-full shadow-xs">
                  {t("hero.lifetime.badge")}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[#14b8a6] font-bold text-xs uppercase tracking-wider">
                    <SparklesIcon className="w-4 h-4 text-[#14b8a6] flex-shrink-0" />
                    {t("hero.lifetime.name")}
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#facc15] flex-shrink-0" title={t("legend.social")} />
                </div>
                <div className="text-3xl md:text-4xl font-black font-display text-[#14b8a6] mb-4">
                  {t("hero.lifetime.price")}
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-sans mb-6">
                  {t("hero.lifetime.desc")}
                </p>

                <div className="pt-4 border-t border-teal-500/20 flex flex-col gap-3 text-xs font-bold text-[#14b8a6] mb-6">
                  {matrixRows.map((row) => (
                    <div key={row.key} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${row.bulletClass} flex-shrink-0`} />
                        {t(`features.${row.key}`)}
                      </span>
                      <span>{t(`features.lifetime.${row.key}`)}</span>
                    </div>
                  ))}
                </div>

                {/* Mobile/Desktop CTA */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = "#features";
                  }}
                  className="w-full py-3.5 px-6 font-display font-bold text-center rounded-2xl text-white bg-[#14b8a6] hover:bg-[#0d9488] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 cursor-pointer block text-sm tracking-wider uppercase"
                >
                  {t("hero.lifetime.cta")}
                </button>
              </div>
            </div>
          )}

          {activeTab === "matrix" && (
            <div className="glass rounded-3xl p-4 sm:p-6 md:p-8 bg-white/70 backdrop-blur-md border border-zinc-200/50 dark:bg-zinc-900/50 dark:border-white/10 shadow-lg overflow-x-auto transition-all duration-300 animate-fadeIn">
              <div className="min-w-[768px] grid grid-cols-6 gap-3 md:gap-5 items-stretch">
                {/* Header Row */}
                <div className="flex flex-col justify-end pb-3 md:pb-4 border-b border-zinc-200/40 dark:border-zinc-800/40">
                  <span className="font-display text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {t("headers.features")}
                  </span>
                </div>
                <div className="flex flex-col justify-end pb-3 md:pb-4 border-b border-zinc-200/40 dark:border-zinc-800/40 opacity-90">
                  <span className="font-display text-sm font-extrabold text-zinc-850 dark:text-zinc-150 leading-tight">
                    {t("headers.proloquo")}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-bold tracking-wide">
                    {t("competitors.proloquo.reviews")}
                  </span>
                  <span className="text-[10px] text-red-500 font-black">
                    {t("competitors.proloquo.pricing")}
                  </span>
                </div>
                <div className="flex flex-col justify-end pb-3 md:pb-4 border-b border-zinc-200/40 dark:border-zinc-800/40 opacity-90">
                  <span className="font-display text-sm font-extrabold text-zinc-850 dark:text-zinc-150 leading-tight">
                    {t("headers.tdsnap")}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-bold tracking-wide">
                    {t("competitors.tdsnap.reviews")}
                  </span>
                  <span className="text-[10px] text-red-500 font-black">
                    {t("competitors.tdsnap.pricing")}
                  </span>
                </div>
                <div className="flex flex-col justify-end pb-3 md:pb-4 border-b border-zinc-200/40 dark:border-zinc-800/40 opacity-90">
                  <span className="font-display text-sm font-extrabold text-zinc-850 dark:text-zinc-150 leading-tight">
                    {t("headers.touchchat")}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-bold tracking-wide">
                    {t("competitors.touchchat.reviews")}
                  </span>
                  <span className="text-[10px] text-red-500 font-black">
                    {t("competitors.touchchat.pricing")}
                  </span>
                </div>
                <div className="flex flex-col justify-end pb-3 md:pb-4 border-b border-zinc-200/40 dark:border-zinc-800/40">
                  <span className="font-display text-sm font-extrabold text-zinc-700 dark:text-zinc-300">
                    {t("headers.free")}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black">
                    {t("hero.free.price")}
                  </span>
                </div>
                <div className="flex flex-col justify-end pb-3 md:pb-4 border-b border-teal-500/20">
                  <span className="font-display text-sm font-black text-[#14b8a6] flex items-center gap-1">
                    <SparklesIcon className="w-3.5 h-3.5 text-[#14b8a6]" />
                    {t("headers.lifetime")}
                  </span>
                  <span className="text-[10px] text-teal-600 dark:text-teal-400 font-black">
                    {t("hero.lifetime.price")}
                  </span>
                </div>

                {/* Dynamic row mapping looping over matrixRows config */}
                {matrixRows.map((row) => (
                  <React.Fragment key={row.key}>
                    {/* Column 1: Feature Row Header with left border-tag */}
                    <div
                      className={`py-3 md:py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 flex items-center gap-2 border-l-4 ${row.borderClass} pl-2 transition-all duration-300`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${row.bulletClass} shadow-sm flex-shrink-0`}
                        title={t(`legend.${row.fitzgeraldKey}`)}
                      />
                      <span className="font-sans font-extrabold text-xs text-zinc-800 dark:text-zinc-200">
                        {t(`features.${row.key}`)}
                      </span>
                    </div>

                    {/* Column 2: Proloquo outcome status */}
                    <div className="py-3 md:py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 flex items-center text-zinc-400 dark:text-zinc-600 opacity-80 hover:opacity-100 transition-opacity duration-300">
                      {renderStatusIcon(row.statuses.proloquo, "competitors")}
                      <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 leading-snug">
                        {t(`features.proloquo.${row.key}`)}
                      </span>
                    </div>

                    {/* Column 3: TD Snap outcome status */}
                    <div className="py-3 md:py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 flex items-center text-zinc-400 dark:text-zinc-600 opacity-80 hover:opacity-100 transition-opacity duration-300">
                      {renderStatusIcon(row.statuses.tdsnap, "competitors")}
                      <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 leading-snug">
                        {t(`features.tdsnap.${row.key}`)}
                      </span>
                    </div>

                    {/* Column 4: TouchChat outcome status */}
                    <div className="py-3 md:py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 flex items-center text-zinc-400 dark:text-zinc-600 opacity-80 hover:opacity-100 transition-opacity duration-300">
                      {renderStatusIcon(row.statuses.touchchat, "competitors")}
                      <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 leading-snug">
                        {t(`features.touchchat.${row.key}`)}
                      </span>
                    </div>

                    {/* Column 5: Free Tier outcome status */}
                    <div className="py-3 md:py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 flex items-center text-emerald-600 dark:text-emerald-400">
                      {renderStatusIcon(row.statuses.free, "free")}
                      <span className="text-[11px] font-bold">{t(`features.free.${row.key}`)}</span>
                    </div>

                    {/* Column 6: Lifetime outcome status */}
                    <div className="py-3 md:py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 flex items-center text-[#14b8a6]">
                      {renderStatusIcon(row.statuses.lifetime, "lifetime")}
                      <span className="text-[11px] font-black text-[#14b8a6]">
                        {t(`features.lifetime.${row.key}`)}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
