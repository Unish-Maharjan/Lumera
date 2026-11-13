"use client";

import React from "react";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { EventCaseStudy } from "@/data/event-case-study";

interface EventProjectInfoProps {
  info: EventCaseStudy["projectInfo"];
}

export function EventProjectInfo({ info }: EventProjectInfoProps) {
  return (
    <section
      id="project-info"
      aria-labelledby="project-info-heading"
      className="relative w-full bg-black text-white py-24 sm:py-32 select-none overflow-hidden border-t border-zinc-900"
    >
      <Container size="xl">
        {/* Chapter Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D7B875]">
              07 / PROJECT SUMMARY
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-[#D7B875]/40" />
          </div>

          <Heading
            as="h2"
            id="project-info-heading"
            size="xl"
            variant="white"
            align="left"
            className="tracking-tight mb-4"
          >
            EXECUTIVE PROJECT FILE. <br />
            <span className="text-[#D7B875]">DELIVERY AUDIT.</span>
          </Heading>

          <p className="font-sans text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl">
            Complete technical delivery breakdown for the Nepal Music Festival stadium installation.
          </p>
        </div>

        {/* Minimal Swiss Typographic Spec Sheet */}
        <div className="border-t border-zinc-800">
          <dl className="divide-y divide-zinc-800/80">
            {info.map((item) => (
              <div
                key={item.label}
                className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-6 items-baseline hover:bg-zinc-900/30 transition-colors px-2 sm:px-4 rounded-lg"
              >
                <dt className="md:col-span-4 font-mono text-xs sm:text-sm text-zinc-400 uppercase tracking-wider">
                  {item.label}
                </dt>
                <dd className="md:col-span-8 font-sans text-base sm:text-lg text-white font-normal leading-relaxed">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

export default EventProjectInfo;

