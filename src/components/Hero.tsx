"use client";

import * as React from "react";
import { Container } from "./Container";
import { useTranslations } from "next-intl";
import { pricingCards, SparklesIcon } from "./SubscriptionMatrix";

export function Hero() {
  const t = useTranslations("Hero");
  const tMatrix = useTranslations("SubscriptionMatrix");

  return (
    <div className="relative pt-12 pb-6 md:pt-20 md:pb-8 lg:pt-32 lg:pb-12">
      <Container>
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-teal-500/5 blur-3xl rounded-full -z-10 dark:bg-teal-500/10" />
          
          <div className="max-w-3xl mx-auto text-center">
            <h1>
              <span className="block text-sm font-bold tracking-widest text-teal-600 uppercase dark:text-teal-400 font-display">
                {t("badge")}
              </span>
              <span className="mt-4 block text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.15]">
                <span className="block text-zinc-900 dark:text-zinc-100">{t("titlePrefix")}</span>
                <span className="block gradient-text">{t("titleSuffix")}</span>
              </span>
            </h1>
            <p className="mt-4 md:mt-6 text-base text-zinc-600 dark:text-zinc-400 sm:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Side-by-side Pricing cards directly in the Hero */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mt-10 md:mt-16 text-left items-stretch">
            {pricingCards.map((card) => {
              const isFeatured = card.isFeatured;
              return (
                <div
                  key={card.key}
                  className={`card-soft p-8 bg-white dark:bg-zinc-900 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${card.borderClass}`}
                >
                  {isFeatured && card.badgeKey && (
                    <div className="absolute top-4 right-4 bg-[#14b8a6] text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full shadow-xs animate-pulse">
                      {tMatrix(card.badgeKey)}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <span
                        className={`text-sm font-bold tracking-widest uppercase flex items-center gap-1.5 ${
                          isFeatured ? "text-[#14b8a6]" : "text-zinc-400 dark:text-zinc-50"
                        }`}
                      >
                        {isFeatured && <SparklesIcon className="w-4 h-4 text-[#14b8a6]" />}
                        {tMatrix(`hero.${card.key}.badge`)}
                      </span>
                    </div>
                    <h3
                      className={`text-2xl font-bold font-display tracking-tight mb-1.5 md:mb-2 ${
                        isFeatured ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-800 dark:text-zinc-200"
                      }`}
                    >
                      {tMatrix(`hero.${card.key}.name`)}
                    </h3>
                    <div className="flex items-baseline gap-1.5 mb-3 md:mb-4">
                      <span
                        className={`font-display ${
                          isFeatured
                            ? "text-4xl md:text-5xl font-black text-[#14b8a6]"
                            : "text-4xl font-extrabold text-zinc-900 dark:text-zinc-100"
                        }`}
                      >
                        {tMatrix(`hero.${card.key}.price`)}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                        {tMatrix(`hero.${card.key}.period`)}
                      </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-5 md:mb-6 font-sans">
                      {tMatrix(`hero.${card.key}.desc`)}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.hash = card.ctaActionHash;
                    }}
                    className={`w-full py-3 px-6 text-center font-display font-bold text-xs uppercase tracking-wider rounded-2xl cursor-pointer ${card.ctaClass}`}
                  >
                    {tMatrix(`hero.${card.key}.cta`)}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
