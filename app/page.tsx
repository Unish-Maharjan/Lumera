import AboutSection from "@/components/home/about-section";
import ImageSequencing from "@/components/home/image-sequencing";
import OurProductSection from "@/components/home/ourproduct-section";
import TestimonialSection from "@/components/home/testimonial";
import CtaSection from "@/components/home/cta-section";
import AdsSection from "@/components/home/billboard";
import WatchInstallation from "@/components/home/installation-section";
// import TrustCounter from "@/components/home/trust-counter";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground w-full max-w-full overflow-x-clip">
      <AdsSection/>
      <AboutSection />
      <ImageSequencing />
      {/* <TrustCounter/> */}
      <OurProductSection />
      <WatchInstallation/>
      <TestimonialSection />
      <CtaSection />
    </main>
  );
}
