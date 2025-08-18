import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero-section";
import { VisionMission } from "@/components/vision-mission";
import { CurriculumOverview } from "@/components/curriculum-overview";
import { KitComponents } from "@/components/kit-components";
import { ImpactMetrics } from "@/components/impact-metrics";
import { Testimonials } from "@/components/testimonials";
import { ContactForm } from "@/components/contact-form";

export default function Landing() {
  useEffect(() => {
    // Add smooth scrolling behavior for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-ocean-900 text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <VisionMission />
        <CurriculumOverview />
        <KitComponents />
        <ImpactMetrics />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
