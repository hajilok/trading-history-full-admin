import { CtaSection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { PersonaSection } from "@/components/home/persona-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PersonaSection />
      <FeaturesSection />
      <CtaSection />
    </main>
  );
}
