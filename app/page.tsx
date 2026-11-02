import AboutSection from "@/components/home/about-section";
import ImageSequencing from "@/components/home/image-sequencing";
import OurProductSection from "@/components/home/ourproduct-section";
import TestimonialSection from "@/components/home/testimonial";
import CtaSection from "@/components/home/cta-section";
import AdsSection from "@/components/home/billboard";
import WatchInstallation from "@/components/home/installation-section";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground">
      <AdsSection/>
      <AboutSection />
      <ImageSequencing />
      <OurProductSection />
     <WatchInstallation/>
      <TestimonialSection />
      <CtaSection />
    </main>
  );
}
