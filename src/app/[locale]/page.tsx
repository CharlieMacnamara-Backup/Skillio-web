import { Hero } from "@/components/Hero";
import { AACDemo } from "@/components/AACDemo";
import { ProductShowcase } from "@/components/ProductShowcase";
import { SchoolAuditMatrix } from "@/components/SchoolAuditMatrix";
import { AuthoritySection } from "@/components/AuthoritySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SLPResourcesSection } from "@/components/SLPResourcesSection";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <Hero />
      <AACDemo />
      <SchoolAuditMatrix />
      <ProductShowcase />
      <AuthoritySection />
      <TestimonialsSection />
      <SLPResourcesSection />
      <CTASection />
    </main>
  );
}
