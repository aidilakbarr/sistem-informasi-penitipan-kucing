import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/Sections/HeroSection";
import { FeaturesSection } from "@/components/Sections/FeaturesSection";
import { ServicesSection } from "@/components/Sections/ServicesSection";
import { TestimonialsSection } from "@/components/Sections/TestimonialsSection";
import { FaqSection } from "@/components/Sections/FaqSection";
import { CageAvailabilitySection } from "@/components/Sections/CageAvailabilitySection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <CageAvailabilitySection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
