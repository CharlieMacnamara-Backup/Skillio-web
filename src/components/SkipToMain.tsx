"use client";

import { useTranslations } from "next-intl";

export function SkipToMain() {
  const t = useTranslations("Common");

  return (
    <a href="#main-content" className="skip-to-main">
      {t("skipToMain")}
    </a>
  );
}
