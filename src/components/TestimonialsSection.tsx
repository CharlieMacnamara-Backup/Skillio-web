import { Container } from "./Container";
import { useTranslations } from "next-intl";

export function TestimonialsSection() {
  const t = useTranslations("TestimonialsSection");

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900/30 border-b border-zinc-200/30 dark:border-zinc-800/30">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl font-display dark:text-zinc-100 mb-8 md:mb-12 text-center">
            {t("title")}
          </h2>

          <div className="space-y-8 md:space-y-12">
            {/* Parent Testimonial */}
            <figure className="card-soft p-6 sm:p-8">
              <blockquote className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 md:mb-8">
                <p className="mb-4 md:mb-6">{t("parent.quote")}</p>
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-lg">
                  {t("parent.initials")}
                </div>
                <div>
                  <cite className="not-italic font-bold text-zinc-900 dark:text-white block">
                    {t("parent.name")}
                  </cite>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    {t("parent.role")}
                  </p>
                </div>
              </figcaption>
            </figure>

            {/* SLP Testimonial */}
            <figure className="card-soft p-6 sm:p-8">
              <blockquote className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 md:mb-8">
                <p className="mb-4 md:mb-6">{t("slp.quote")}</p>
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                  {t("slp.initials")}
                </div>
                <div>
                  <cite className="not-italic font-bold text-zinc-900 dark:text-white block">
                    {t("slp.name")}
                  </cite>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    {t("slp.role")}
                  </p>
                </div>
              </figcaption>
            </figure>

            {/* School Testimonial */}
            <figure className="card-soft p-6 sm:p-8">
              <blockquote className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 md:mb-8">
                <p className="mb-4 md:mb-6">{t("school.quote")}</p>
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-lg">
                  {t("school.initials")}
                </div>
                <div>
                  <cite className="not-italic font-bold text-zinc-900 dark:text-white block">
                    {t("school.name")}
                  </cite>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    {t("school.role")}
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
