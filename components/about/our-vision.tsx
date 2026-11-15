import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faEye, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

config.autoAddCss = false; // CSS is imported above (avoids oversized icons in Next.js)

const PILLARS = [
  {
    icon: faLayerGroup,
    title: "Architectural Harmony",
    description:
      "Displays designed to sit flush with facade and interior materials, preserving clean sightlines, structural rhythm, and material authenticity.",
  },
  {
    icon: faEye,
    title: "Optical Precision",
    description:
      "Fine pixel pitch, true blacks, and adaptive brightness that stay clear in direct sunlight and in soft ambient light.",
  },
  {
    icon: faShieldHalved,
    title: "Engineered Longevity",
    description:
      "Robust thermal management and modular, serviceable construction built for continuous operation over decades.",
  },
];

export function OurVision() {
  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      className="w-full bg-[#F7F7F5] pt-20 text-zinc-950 lg:pt-32"
    >
      <Container size="xl">
        {/* Centered title */}
        <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-20">
          <Heading id="vision-heading" as="h2" size="xl" variant="dark" align="center">
            Our Vision
          </Heading>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg">
            Digital displays should never look like an afterthought. We build them into the
            structure itself, so a building can change with the light and the hour.
          </p>
        </div>

        {/* Three columns divided by hairlines */}
        <div className="grid divide-y divide-zinc-300 border-y border-zinc-300 md:grid-cols-3 md:divide-x md:divide-y-0">
          {PILLARS.map(({ icon, title, description }) => (
            <div key={title} className="group px-6 py-10 text-center lg:px-10 lg:py-14">
              <FontAwesomeIcon
                icon={icon}
                className="text-4xl text-[#D7B875] transition-colors group-hover:text-[#B89240]"
              />
              <h3 className="mt-6 font-heading text-xl font-bold uppercase tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default OurVision;