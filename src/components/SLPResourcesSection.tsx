import { Container } from "./Container";
import { useTranslations } from "next-intl";

export function SLPResourcesSection() {
  const t = useTranslations("SLPResourcesSection");

  return (
    <section id="slp-resources" className="py-16 md:py-24 bg-white dark:bg-zinc-900/50 border-b border-zinc-200/30 dark:border-zinc-800/30">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl font-display dark:text-zinc-100 mb-4 md:mb-6 text-center">
            {t("title")}
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-8 md:mb-12 max-w-2xl mx-auto">
            {t("description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Clinical Implementation Guide */}
            <article className="card-soft p-6">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-white mb-3">
                {t("resources.implementationGuide.title")}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                {t("resources.implementationGuide.description")}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors min-h-[44px] min-w-[44px] py-2"
              >
                <span>{t("resources.implementationGuide.cta")}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </article>

            {/* Vocabulary Customization Guide */}
            <article className="card-soft p-6">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-white mb-3">
                {t("resources.vocabularyGuide.title")}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                {t("resources.vocabularyGuide.description")}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors min-h-[44px] min-w-[44px] py-2"
              >
                <span>{t("resources.vocabularyGuide.cta")}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </article>

            {/* Progress Tracking Template */}
            <article className="card-soft p-6">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-white mb-3">
                {t("resources.progressTemplate.title")}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                {t("resources.progressTemplate.description")}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors min-h-[44px] min-w-[44px] py-2"
              >
                <span>{t("resources.progressTemplate.cta")}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </article>

            {/* School Deployment Guide */}
            <article className="card-soft p-6">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-white mb-3">
                {t("resources.schoolDeployment.title")}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                {t("resources.schoolDeployment.description")}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors min-h-[44px] min-w-[44px] py-2"
              >
                <span>{t("resources.schoolDeployment.cta")}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </article>
          </div>

          {/* Evidence-Based Research References */}
          <div className="mt-12 md:mt-16">
            <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-white mb-6">
              {t("research.title")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-teal-600 dark:text-teal-400 mt-1">📄</span>
                <a
                  href="https://link.springer.com/journal/10803"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors underline min-h-[44px] min-w-[44px] py-2 block"
                >
                  {t("research.journal1")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 dark:text-teal-400 mt-1">📄</span>
                <a
                  href="https://aac-journals.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors underline min-h-[44px] min-w-[44px] py-2 block"
                >
                  {t("research.journal2")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 dark:text-teal-400 mt-1">📄</span>
                <a
                  href="https://asha.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors underline min-h-[44px] min-w-[44px] py-2 block"
                >
                  {t("research.journal3")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
