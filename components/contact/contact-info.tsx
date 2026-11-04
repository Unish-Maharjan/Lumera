import React from "react";

export function ContactInfo() {
  return (
    <div className="border-l border-white/20 pl-6 sm:pl-8 space-y-6">
      {/* Email Item */}
      <div className="flex items-start gap-4">
        <svg
          className="w-5 h-5 text-white/80 shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
        <div>
          <p className="text-xs text-zinc-400">Email Us</p>
          <a
            href="mailto:hello@lumera.com"
            className="text-sm sm:text-base text-white hover:text-[#D7B875] transition-colors"
          >
            hello@lumera.com
          </a>
        </div>
      </div>

      {/* Phone Item */}
      <div className="flex items-start gap-4">
        <svg
          className="w-5 h-5 text-white/80 shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>
        <div>
          <p className="text-xs text-zinc-400">Call Us</p>
          <a
            href="tel:+97714567890"
            className="text-sm sm:text-base text-white hover:text-[#D7B875] transition-colors"
          >
            +977 1 4567 890
          </a>
        </div>
      </div>

      {/* Location Item */}
      <div className="flex items-start gap-4">
        <svg
          className="w-5 h-5 text-white/80 shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <div>
          <p className="text-xs text-zinc-400">Visit Us</p>
          <p className="text-sm sm:text-base text-white">Kathmandu, Nepal</p>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;

