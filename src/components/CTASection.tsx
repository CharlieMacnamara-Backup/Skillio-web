"use client";

import { Link } from "@/i18n/routing";
import * as React from "react";
import { Container } from "./Container";
import { useTranslations } from "next-intl";

export function CTASection() {
  const t = useTranslations("CTASection");

  return (
    <section id="get-started" className="relative py-16 md:py-24 overflow-hidden">
       {/* Background gradient */}
      <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-950" />
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/50 to-purple-600/50" />
      
      <Container className="relative">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-display">
            {t("title")}
          </h2>
          <p className="mt-3 md:mt-4 text-lg leading-6 text-indigo-100">
            {t("description")}
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link
              href="#"
              className="w-full sm:w-auto min-h-[44px] min-w-[44px] px-6 py-3.5 md:px-8 md:py-4 bg-white text-indigo-600 font-bold rounded-full shadow-xl hover:bg-zinc-50 transition-all hover:scale-105 active:scale-95 text-center flex items-center justify-center"
            >
              {t("cta.appStore")}
            </Link>
            <Link
              href="#"
              className="w-full sm:w-auto min-h-[44px] min-w-[44px] px-6 py-3.5 md:px-8 md:py-4 bg-transparent text-white border-2 border-white/30 font-bold rounded-full hover:bg-white/10 transition-all text-center flex items-center justify-center"
            >
              {t("cta.demo")}
            </Link>
          </div>
          <p className="mt-4 md:mt-6 text-sm text-indigo-200">
            {t("footer")}
          </p>
        </div>
      </Container>
    </section>
  );
}
