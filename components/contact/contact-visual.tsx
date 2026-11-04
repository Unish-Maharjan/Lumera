import React from "react";
import Image from "next/image";

export function ContactVisual() {
  return (
    <div className="absolute right-0 bottom-0 w-full lg:w-3/4 xl:w-2/3 h-[55vh] sm:h-[70vh] lg:h-[88vh] pointer-events-none select-none z-0">
      {/* Building Image */}
      <Image
        src="/images/ourservices/service-1.jpg"
        alt="Architectural building facade with monumental LED screen"
        fill
        sizes="(min-width: 1024px) 66vw, 100vw"
        className="object-cover object-bottom sm:object-right-bottom brightness-105 contrast-[1.05]"
        priority
      />

      {/* Subtle edge fades only on top and left to blend into black background */}
      <div className="absolute inset-y-0 left-0 w-32 sm:w-48 lg:w-64 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 sm:h-36 bg-gradient-to-b from-black via-black/40 to-transparent" />
    </div>
  );
}

export default ContactVisual;

