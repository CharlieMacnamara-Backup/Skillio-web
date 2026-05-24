"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { CheckIcon, CrossIcon, SparklesIcon, matrixRows } from "./SubscriptionMatrix";

export type TierStatus = "check" | "cross" | "partial";

export function SchoolAuditMatrix() {
  const t = useTranslations("SubscriptionMatrix");

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
      return <CheckIcon className="w-5 h-5 mr-2 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />;
    }
  };

  return (
    <section id="school-audit" className="py-12 md:py-20 bg-zinc-50/50 dark:bg-black/50 border-b border-zinc-200/30 dark:border-zinc-800/30 transition-colors duration-300">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-zinc-100 mb-3 md:mb-4 leading-tight">
            {t("toggle.matrix")}
          </h2>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            {t("subheading")}
          </p>
        </div>

        {/* Matrix */}
        <div className="glass rounded-3xl p-4 sm:p-6 md:p-8 bg-white/70 backdrop-blur-md border border-zinc-200/50 dark:bg-zinc-900/50 dark:border-white/10 shadow-lg overflow-x-auto transition-all duration-300">
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

            {/* Dynamic row mapping */}
            {matrixRows.map((row) => (
              <React.Fragment key={row.key}>
                {/* Column 1: Feature Row Header */}
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

                {/* Column 2: Proloquo */}
                <div className="py-3 md:py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 flex items-center text-zinc-400 dark:text-zinc-600 opacity-80 hover:opacity-100 transition-opacity duration-300">
                  {renderStatusIcon(row.statuses.proloquo, "competitors")}
                  <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 leading-snug">
                    {t(`features.proloquo.${row.key}`)}
                  </span>
                </div>

                {/* Column 3: TD Snap */}
                <div className="py-3 md:py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 flex items-center text-zinc-400 dark:text-zinc-600 opacity-80 hover:opacity-100 transition-opacity duration-300">
                  {renderStatusIcon(row.statuses.tdsnap, "competitors")}
                  <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 leading-snug">
                    {t(`features.tdsnap.${row.key}`)}
                  </span>
                </div>

                {/* Column 4: TouchChat */}
                <div className="py-3 md:py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 flex items-center text-zinc-400 dark:text-zinc-600 opacity-80 hover:opacity-100 transition-opacity duration-300">
                  {renderStatusIcon(row.statuses.touchchat, "competitors")}
                  <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 leading-snug">
                    {t(`features.touchchat.${row.key}`)}
                  </span>
                </div>

                {/* Column 5: Free Tier */}
                <div className="py-3 md:py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 flex items-center text-emerald-600 dark:text-emerald-400">
                  {renderStatusIcon(row.statuses.free, "free")}
                  <span className="text-[11px] font-bold">{t(`features.free.${row.key}`)}</span>
                </div>

                {/* Column 6: Lifetime */}
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
      </Container>
    </section>
  );
}
