import React from "react";

export function ContactHeader() {
  return (
    <div className="max-w-xl">
      {/* Main Headline */}
      <h1 className="text-4xl font-heading uppercase sm:text-5xl lg:text-6xl font-light
       text-white  tracking-tight mb-6">
        Let&apos;s bring <br />
        your visiton to <span className="text-[#D7B875]">light.</span>
      </h1>

      {/* Narrative Subtitle */}
      <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-md">
        Have a project in mind? Reach out to our team. <br className="hidden sm:inline" />
        We&apos;re here to help you bring your vision to life.
      </p>
    </div>
  );
}

export default ContactHeader;

