import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faMagnifyingGlass,
  faSliders,
  faFileLines,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const STEPS = [
  {
    stepNumber: "01",
    name: "Discover",
    title: "First, we listen.",
    description:
      "We start by understanding your goals, your audience, and the problem you're trying to solve. Before jumping into solutions, we make sure we're asking the right questions.",
    icon: faCommentDots,
  },
  {
    stepNumber: "02",
    name: "Strategize",
    title: "A clear direction makes all the difference.",
    description:
      "With a better understanding of your vision, we define the direction, map out the approach, and establish a plan that keeps everyone aligned.",
    icon: faMagnifyingGlass,
  },
  {
    stepNumber: "03",
    name: "Create",
    title: "This is where ideas take shape.",
    description:
      "Our team brings strategy and creativity together to design and build thoughtful solutions.",
    icon: faSliders,
  },
  {
    stepNumber: "04",
    name: "Refine",
    title: "Good work deserves another look.",
    description:
      "We test, review, and refine every detail. Your feedback matters, and we use it to make sure the final result meets the standard we set out to achieve.",
    icon: faFileLines,
  },
  {
    stepNumber: "05",
    name: "Deliver",
    title: "Ready for what's next.",
    description:
      "Once everything is polished, we deliver the final work and make sure you're ready to move forward with confidence.",
    icon: faHandshake,
  },
];

export function OurPhilosophy() {
  return (
    <section className="w-full bg-[#F7F7F5] pt-12 pb-16 sm:pt-18 sm:pb-24 lg:pt-24 lg:pb-32 text-zinc-950">
      <Container size="xl">
        {/* Centered Heading with Subtitle & Philosophy Statement */}
        <div className="mx-auto mb-14 sm:mb-20 flex max-w-3xl flex-col items-center text-center">
          <Heading size="xl" variant="dark" align="center" className="w-full">
            How We Work
          </Heading>
          <p className="mt-4 sm:mt-5 font-heading text-md sm:text-xl font-semibold text-zinc-900/70">
            A thoughtful process. From first conversation to final launch.
          </p>
        </div>

        {/* 2-Column Architectural Layout: Image with Overlaid Consultation Badge + 5 Steps */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16 items-stretch">
          {/* Left Column: Architectural Skyscraper Image with Floating Badge */}
          <div className="relative lg:col-span-5 min-h-[420px] sm:min-h-[500px] lg:min-h-0">
            {/* Main Rounded Image Container */}
            <div className="relative w-full h-full min-h-[420px] sm:min-h-[500px] overflow-hidden rounded-3xl border border-black/5 bg-zinc-200 shadow-md">
              <Image
                src="/images/cta.png"
                alt="Modern skyscraper architectural glass facade"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: 5 Process Steps with FontAwesome Badges and Dividers */}
          <ol className="flex flex-col justify-between lg:col-span-7">
            {STEPS.map((step) => (
              <li
                key={step.name}
                className="flex items-start gap-5 sm:gap-7 border-b border-zinc-200 py-7 sm:py-8 lg:py-9 first:pt-0 last:border-b-0 last:pb-0"
              >
                {/* Solid Circular FontAwesome Icon Badge */}
                <span className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white shadow-xs group-hover:bg-[#D7B875] transition-colors">
                  <FontAwesomeIcon
                    icon={step.icon}
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />
                </span>

                <div className="flex-1 pt-0.5 sm:pt-1">
                  <h3 className="font-heading text-lg sm:text-xl font-bold leading-snug text-zinc-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 sm:mt-3.5 max-w-2xl font-sans text-sm sm:text-base leading-relaxed text-zinc-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export default OurPhilosophy;
export { OurPhilosophy as OurApproach };
