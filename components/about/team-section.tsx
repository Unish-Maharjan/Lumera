import Image from "next/image";
import Container from "@/components/ui/Container";
import { Heading } from "../ui";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "john-doe",
    name: "John Doe",
    role: "Managing Director",
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80",
  },
  {
    id: "unish-maharjan",
    name: "Unish Maharjan",
    role: "Managing Director",
    imageSrc:
      "https://images.unsplash.com/photo-1590086782792-42dd2350140d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: "john-doyle",
    name: "John Doyle",
    role: "Consultant",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800&q=80",
  },
  {
    id: "sarah-obrien",
    name: "Sarah O'Brien",
    role: "Consultant",
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=800&q=80",
  },
];

export function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="w-full bg-[#F7F7F5] py-10 text-zinc-950 sm:py-18 lg:py-30"
    >
      <Container size="xl">
        {/* Header: title left, short note right */}
        <div className="mb-14 flex flex-col gap-4 pb-8 sm:mb-20 md:flex-row
         md:items-end md:justify-center">
          <Heading size="2xl" variant="dark">
            Meet our team
          </Heading>
        </div>

        {/* Alternate cards sit lower on large screens, so the row isn't a flat strip */}
        <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:pb-12">
          {TEAM_MEMBERS.map((member) => (
            <li key={member.id} className="group lg:even:translate-y-12">
              <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-zinc-200">
                <Image
                  src={member.imageSrc}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center rounded-[10px] transition-transform duration-700 
                  ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-heading text-lg font-semibold text-zinc-950 sm:text-xl">
                  {member.name}
                </h3>
                <span className="h-px flex-1 translate-y-[-4px] bg-zinc-300 transition-colors group-hover:bg-[#B89240]" />
              </div>
              <p className="mt-1 font-sans text-sm text-zinc-500">
                {member.role}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default TeamSection;