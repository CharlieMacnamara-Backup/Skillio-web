import { Container } from "./Container";
import Image from "next/image";
import { useTranslations } from "next-intl";

const featureKeys = ['breath', 'frame', 'studio', 'play'] as const;

export function ProductShowcase() {
  const t = useTranslations("ProductShowcase");

  const featureBlocks = featureKeys.map((key) => ({
    key,
    title: t(`features.${key}.title`),
    description: t(`features.${key}.description`),
    imageSrc: key === 'breath' ? '/assets/images/samples/breathing-control.png' :
              key === 'frame' ? '/assets/images/samples/emotion card.png' :
              key === 'studio' ? '/assets/images/samples/studio.png' :
              '/assets/images/samples/tik-tak-toe.png',
    imageAlt: t(`features.${key}.imageAlt`),
    secondaryImages: key === 'breath' ? ['/assets/images/samples/fidget-nav.png'] : [],
    align: (key === 'frame' || key === 'play') ? 'right' : 'left'
  }));
  return (
    <section id="how-it-works" className="py-16 md:py-24 lg:py-32 bg-white dark:bg-zinc-900/50 overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16 lg:mb-24">
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl font-display dark:text-zinc-100">
            {t("title")}
          </h2>
          <p className="mt-3 md:mt-4 text-lg text-zinc-500 dark:text-zinc-400">
            {t("description")}
          </p>
        </div>

        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {featureBlocks.map((feature, index) => (
            <div key={feature.key} className={`lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 lg:items-center ${feature.align === 'left' ? '' : 'lg:grid-flow-col-dense'}`}>
              
              <div className={`mt-8 md:mt-10 lg:mt-0 ${feature.align === 'left' ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                <h3 className="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mb-3 md:mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>

              <div className={`relative ${feature.align === 'left' ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
                {/* Decorative background blob */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-3xl rounded-full -z-10 opacity-50 ${index % 3 === 0 ? 'bg-orange-500/20 left-0' : index % 3 === 1 ? 'bg-pink-500/20 right-0' : 'bg-indigo-500/20 left-0'}`} />
                
                <div className="relative">
                  {/* Primary Image */}
                  <div className="card-soft overflow-hidden p-1.5 md:p-2 mx-auto w-4/5 sm:w-2/3 md:w-1/2 lg:w-4/5 xl:w-2/3">
                     <div className="rounded-3xl overflow-hidden relative aspect-[9/20] w-full border border-zinc-100 dark:border-zinc-800">
                     <Image 
                        src={feature.imageSrc} 
                        alt={feature.imageAlt}
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain bg-zinc-50 dark:bg-zinc-900"
                     />
                     </div>
                  </div>
                  
                  {/* Secondary Floating Images (if any) */}
                  {feature.secondaryImages && feature.secondaryImages.length > 0 && (
                    <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 md:-bottom-12 md:-right-12 w-2/5 lg:w-1/2 xl:w-2/5 card-soft overflow-hidden p-1 md:p-1.5 z-10 hidden sm:block">
                      <div className="rounded-3xl overflow-hidden relative aspect-[9/20] w-full border border-zinc-100 dark:border-zinc-800">
                      <Image 
                        src={feature.secondaryImages[0]} 
                        alt={t("secondaryImageAlt")} 
                        fill
                        quality={100}
                        sizes="(max-width: 1024px) 20vw, 15vw"
                        className="object-contain bg-zinc-50 dark:bg-zinc-900"
                      />
                      </div>
                    </div>
                  )}
                  {feature.secondaryImages && feature.secondaryImages.length > 1 && (
                    <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 md:-top-12 md:-left-12 w-2/5 lg:w-1/2 xl:w-2/5 card-soft overflow-hidden p-1 md:p-1.5 z-10 hidden sm:block">
                      <div className="rounded-3xl overflow-hidden relative aspect-[9/20] w-full border border-zinc-100 dark:border-zinc-800">
                      <Image 
                        src={feature.secondaryImages[1]} 
                        alt={t("additionalImageAlt")} 
                        fill
                        quality={100}
                        sizes="(max-width: 1024px) 20vw, 15vw"
                        className="object-contain bg-zinc-50 dark:bg-zinc-900"
                      />
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
