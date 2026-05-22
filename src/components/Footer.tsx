import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Container } from "./Container";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-20 md:mt-32 flex-none bg-zinc-50 dark:bg-black">
      <div className="border-t border-zinc-100 py-10 md:py-16 dark:border-zinc-800/50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="md:col-span-5 lg:col-span-4">
              <Link href="/" className="flex items-center gap-3 group mb-4 md:mb-6">
                <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/30 overflow-hidden shadow-sm">
                  <Image 
                    src="/assets/images/intro-icon-square.png" 
                    alt={t("logoAlt")} 
                    width={40}
                    height={40}
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold font-display text-zinc-900 dark:text-white">
                  Skillio
                </span>
              </Link>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Links Column */}
            <div className="md:col-span-3 lg:col-span-4">
               <h4 className="font-display font-bold text-zinc-900 dark:text-white mb-4 md:mb-6">{t("columns.product")}</h4>
               <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                 <li><Link href="/#how-it-works" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{t("links.howItWorks")}</Link></li>
                 <li><Link href="/#features" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{t("links.features")}</Link></li>
                 <li><Link href="/#get-started" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{t("links.pricing")}</Link></li>
               </ul>
            </div>

            {/* Legal Column */}
             <div className="md:col-span-4 lg:col-span-4 text-left">
               <h4 className="font-display font-bold text-zinc-900 dark:text-white mb-4 md:mb-6">{t("columns.legal")}</h4>
               <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                 <li><Link href="/privacy" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{t("links.privacy")}</Link></li>
                 <li><Link href="/terms" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{t("links.terms")}</Link></li>
                 <li><a href="mailto:support@skillio.com" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{t("links.contact")}</a></li>
               </ul>
            </div>
          </div>

          <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium">
              {t("copyright")}
            </p>
            <div className="flex gap-6">
              <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-800 rounded-full hover:bg-teal-500 transition-colors cursor-not-allowed" />
              <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-800 rounded-full hover:bg-teal-500 transition-colors cursor-not-allowed" />
              <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-800 rounded-full hover:bg-teal-500 transition-colors cursor-not-allowed" />
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
