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
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80",
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
      className="relative w-full bg-black text-foreground pb-20 sm:pb-28 lg:pb-36 
      overflow-hidden select-none"
    >
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <h2
            id="team-heading"
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-white mb-4"
          >
            Meet Our <span className="text-accent">Team</span>
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
                  className="group relative flex flex-col justify-between p-6 sm:p-8 bg-zinc-950/70 border border-white/10 transition-colors duration-300 hover:border-accent/40 aspect-[4/5] overflow-hidden"
                >
                  {/* Top Badge Icon */}
                  <div className="flex flex-col items-center text-center pt-2">
                    <div className="w-11 h-11 rounded-lg border border-accent/30 bg-accent/10 flex items-center justify-center mb-5 text-accent shadow-[0_0_15px_rgba(215,184,117,0.15)]">
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
                    <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-3">
                      {member.name}
                    </h3>

                    {/* Bio Description */}
                    <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light leading-relaxed line-clamp-5">
                      {member.bio}
                    </p>
                  </div>

                  {/* Bottom Accent Bar Matching Reference */}
                  <div className="w-full pt-4 flex justify-center">
                    <span className="w-16 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-24" />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={member.id}
                className="group relative aspect-[4/5] overflow-hidden border border-white/10 bg-zinc-950 transition-colors duration-300 hover:border-white/20"
              >
                {/* Fallback Initials in background */}
                <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg text-accent bg-zinc-900 -z-10">
                  {member.initials}
                </div>

                {member.imageSrc && (
                  <Image
                    src={member.imageSrc}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center brightness-90 contrast-[1.05] transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
                  />
                )}

                {/* Bottom-to-Top Dark Scrim for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                {/* Overlaid Name & Role at Bottom Matching Reference */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-left z-10">
                  <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {member.name}
                  </h3>
                  <span className="font-mono text-[10px] sm:text-xs text-accent font-medium uppercase tracking-wider mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
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

