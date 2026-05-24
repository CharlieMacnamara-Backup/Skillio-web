import { Hero } from "@/components/Hero";
import { AACDemo } from "@/components/AACDemo";
import { ProductShowcase } from "@/components/ProductShowcase";
import { SchoolAuditMatrix } from "@/components/SchoolAuditMatrix";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <Hero />
      
      <AACDemo />

      <SchoolAuditMatrix />

      <ProductShowcase />
      
      <CTASection />
    </main>
  );
}



