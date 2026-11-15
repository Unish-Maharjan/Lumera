import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONCERT_EVENT_DATA } from "@/data/event-case-study";
import {
  EventHero,
  EventOverview,
  EventVisualExperience,
  EventGallery,
} from "@/components/events/detail";
import AboutCta from "@/components/about/about-cta";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "nepal-music-festival" },
    { slug: "kathmandu-tech-expo-2025" },
    { slug: "global-innovation-summit" },
    { slug: "smart-city-expo-2024" },
    { slug: "heritage-illumination-gala" },
    { slug: "lumera-architecture-forum" },
    { slug: "concert-showcase" },
    { slug: "kathmandu-arena-live" },
  ];
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = CONCERT_EVENT_DATA;

  if (!event || (slug !== event.slug && slug !== "concert-showcase" && slug !== "kathmandu-arena-live")) {
    // Still fallback gracefully to the concert showcase for any valid event detail request
  }

  return {
    title: `${event.title} | ${event.subtitle} | Lumera Nepal`,
    description: event.headline,
    openGraph: {
      title: `${event.title} — ${event.subtitle}`,
      description: event.headline,
      images: [event.heroImage],
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  await params;

  // We serve the concert event showcase for nepal-music-festival or any concert slug
  const event = CONCERT_EVENT_DATA;

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D7B875] selection:text-black">
      {/* 1. Cinematic Full-Viewport Hero Section */}
      <EventHero event={event} />

      {/* 2. Editorial Event Overview (Split Layout) */}
      <EventOverview event={event} />

      {/* 7. About Venue Section */}
      <EventGallery event={event} gallery={event.gallery} />
      {/* 3. The Visual Experience (Stage Architecture) */}
      <Suspense fallback={null}>
        <EventVisualExperience components={event.stageComponents} />
      </Suspense>

      {/* 5. Technical Project Highlights (Apple Numerical Typography) */}
      {/* <EventTechnicalHighlights specs={event.specs} /> */}

      {/* 6. The Concert In Action (Atmosphere, Lasers, Crowd & Live Relay) */}
      {/* <EventConcertAction inAction={event.inAction} /> */}


      {/* 8. Clean Executive Project Information Sheet */}
      {/* <EventProjectInfo info={event.projectInfo} /> */}

      {/* 9. Monumental Closing Section & Event CTAs */}
      {/* <EventClosing closingImage={event.closingImage} /> */}

      <AboutCta/>
    </main>
  );
}

