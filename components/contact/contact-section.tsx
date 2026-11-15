import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import ContactForm from "./contact-form";

const contacts = [
  { icon: Mail, label: "Email Us", value: "hello@lumera.com", href: "mailto:hello@lumera.com" },
  { icon: Phone, label: "Call Us", value: "+977 980 123 4567", href: "tel:+9779801234567" },
  { icon: MapPin, label: "Visit Us", value: "Kathmandu, Nepal" },
];

export function ContactSection({ className = "" }: { className?: string }) {
  return (
    <section
      id="contact-section"
      className={`relative flex min-h-screen w-full items-center overflow-hidden bg-black py-28 text-white ${className}`}
    >
      {/* Background image with dark overlay */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/contact.png"
          alt="Lumera Architecture at Night"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/80" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left: contact info */}
          <div className="space-y-7">
            <Heading as="h1" size="xl" variant="white">
              Get in Touch <br /> With Us
            </Heading>

            <p className="max-w-md text-sm font-light leading-relaxed text-zinc-400 sm:text-base">
              Have a project in mind or just want to say hello? We&apos;d love to hear from you.
            </p>

            <div className="space-y-5">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="group w-[40%] flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full
                   border border-white/15 bg-white/5 backdrop-blur-md 
                   transition-colors group-hover:text-black">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-light text-zinc-400">{label}</span>
                    <span className="text-sm transition-colors group-hover:text-black sm:text-base">
                      {value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="flex justify-center lg:justify-end">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;