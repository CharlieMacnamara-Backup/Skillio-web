import { Container } from "./Container";
import { useTranslations } from "next-intl";

export function AuthoritySection() {
  const t = useTranslations("AuthoritySection");

  return (
    <section id="authority" className="py-16 md:py-24 bg-white dark:bg-zinc-900/50 border-b border-zinc-200/30 dark:border-zinc-800/30">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl font-display dark:text-zinc-100 mb-8 md:mb-12 text-center">
            {t("title")}
          </h2>

          {/* Evidence-Based Statement */}
          <div className="card-soft p-6 sm:p-8 mb-8 md:mb-12">
            <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-white mb-4">
              {t("evidence.title")}
            </h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {t("evidence.description")}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 italic">
              {t("evidence.reference")}
            </p>
          </div>

          {/* Medical/Educational Disclaimer */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 sm:p-8 mb-8 md:mb-12">
            <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-teal-600 dark:text-teal-400">⚠</span>
              {t("disclaimer.title")}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t("disclaimer.description")}
            </p>
          </div>

          {/* Segmented Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* For Parents */}
            <div className="card-soft p-6">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-white mb-3">
                {t("parents.title")}
              </h3>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                {(["benefit1", "benefit2", "benefit3", "benefit4", "benefit5"] as const).map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="text-teal-600 dark:text-teal-400 mt-0.5">✓</span>
                    <span>{t(`parents.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For SLPs */}
            <div className="card-soft p-6">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-white mb-3">
                {t("slps.title")}
              </h3>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                {(["benefit1", "benefit2", "benefit3", "benefit4", "benefit5"] as const).map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="text-teal-600 dark:text-teal-400 mt-0.5">✓</span>
                    <span>{t(`slps.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Schools */}
            <div className="card-soft p-6">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-white mb-3">
                {t("schools.title")}
              </h3>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                {(["benefit1", "benefit2", "benefit3", "benefit4", "benefit5"] as const).map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="text-teal-600 dark:text-teal-400 mt-0.5">✓</span>
                    <span>{t(`schools.${key}`)}</span>
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
