import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  type?: "photo" | "spotlight";
  imageSrc?: string;
  bio?: string;
  initials?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "john-doe",
    name: "John Doe",
    role: "MANAGING DIRECTOR",
    type: "photo",
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80",
    initials: "JD",
  },
  {
    id: "unish-maharjan",
    name: "Unish MAHARJAN",
    role: "MANAGING DIRECTOR",
    type: "photo",
    imageSrc:
      "https://images.unsplash.com/photo-1590086782792-42dd2350140d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    initials: "JD",
  },
  {
    id: "john-doyle",
    name: "John Doyle",
    role: "CONSULTANT",
    type: "photo",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800&q=80",
    initials: "JD",
  },
  {
    id: "sarah-obrien",
    name: "Sarah O'Brien",
    role: "CONSULTANT",
    type: "photo",
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=800&q=80",
    initials: "SO",
  },
];

export function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative w-full bg-[#F7F7F5] text-zinc-950 py-10 sm:py-18 lg:py-26 overflow-hidden select-none"
    >
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <h2
            id="team-heading"
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-zinc-950 mb-4"
          >
            Meet Our <span className="text-[#D7B875]">Team</span>
          </h2>
        </div>

        {/* 4-Card Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {TEAM_MEMBERS.map((member) => {
            const isSpotlight = member.type === "spotlight";

            if (isSpotlight) {
              return (
                <div
                  key={member.id}
                  className="group relative flex flex-col justify-between p-6 sm:p-8 bg-white border border-black/10 rounded-2xl transition-all duration-300 hover:border-black/25 hover:shadow-md aspect-[4/5] overflow-hidden"
                >
                  {/* Top Badge Icon */}
                  <div className="flex flex-col items-center text-center pt-2">
                    <div className="w-11 h-11 rounded-lg border border-[#D7B875]/40 bg-[#D7B875]/10 flex items-center justify-center mb-5 text-[#D7B875] shadow-xs">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.6"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                        />
                      </svg>
                    </div>

                    {/* Member Name */}
                    <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-zinc-950 mb-3">
                      {member.name}
                    </h3>

                    {/* Bio Description */}
                    <p className="font-sans text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed line-clamp-5">
                      {member.bio}
                    </p>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className="w-full pt-4 flex justify-center">
                    <span className="w-16 h-0.5 bg-[#D7B875] rounded-full transition-all duration-300 group-hover:w-24" />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={member.id}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/10 bg-white transition-all duration-300 hover:border-black/25 hover:shadow-md"
              >
                {/* Fallback Initials in background */}
                <div className="absolute inset-0 flex items-center justify-center font-inter font-bold text-lg text-[#D7B875] bg-zinc-100 -z-10">
                  {member.initials}
                </div>

                {member.imageSrc && (
                  <Image
                    src={member.imageSrc}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 
                    ease-out pointer-events-none"
                  />
                )}

                {/* Bottom-to-Top Dark Scrim for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

                {/* Overlaid Name & Role at Bottom */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-left z-10">
                  <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {member.name}
                  </h3>
                  <span className="font-inter text-[11px] sm:text-xs text-[#D7B875] font-semibold uppercase tracking-wider mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {member.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default TeamSection;
