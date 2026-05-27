import { LandingBackground } from "./background-section";
import { CtaSection } from "./cta-section";
import { FeaturesSection } from "./features-section";
import { LandingFooter } from "./footer";
import { LandingHeader } from "./header";
import { HeroSection } from "./hero-section";
import { MvpSection } from "./mvp-section";
import { RoadmapSection } from "./roadmap-section";

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LandingBackground />
      <LandingHeader />

      <main>
        <HeroSection />
        <FeaturesSection />
        <RoadmapSection />
        <MvpSection />
        <CtaSection />
      </main>

      <LandingFooter />
    </div>
  );
}
