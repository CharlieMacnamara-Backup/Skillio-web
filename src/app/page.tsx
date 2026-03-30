import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { CTASection } from "@/components/CTASection";
import { Container } from "@/components/Container";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      
      <Container id="features">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-3xl glass border-indigo-100 dark:border-indigo-900/30">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold font-display mb-2">Accessible & Sensory-Friendly</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Designed with soft colors, reduced visual load, and deeply customizable interfaces to prevent overwhelm.</p>
          </div>
          <div className="p-8 rounded-3xl glass border-purple-100 dark:border-purple-900/30">
            <div className="text-4xl mb-4">🧘</div>
            <h3 className="text-xl font-bold font-display mb-2">Emotional Regulation</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Integrated breathing exercises, emotion cards, and digital fidget tools help maintain focus and calm.</p>
          </div>
          <div className="p-8 rounded-3xl glass border-teal-100 dark:border-teal-900/30">
            <div className="text-4xl mb-4">🕹️</div>
            <h3 className="text-xl font-bold font-display mb-2">Interactive Learning</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Structured games and scenario practices bridge the gap between structured communication and genuine connection.</p>
          </div>
        </div>
      </Container>

      <ProductShowcase />
      
      <CTASection />
    </div>
  );
}


