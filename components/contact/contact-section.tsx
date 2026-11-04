import React from "react";
import Container from "@/components/ui/Container";
import ContactHeader from "./contact-header";
import ContactForm from "./contact-form";
import ContactVisual from "./contact-visual";

export function ContactSection({ className = "" }: { className?: string } = {}) {
  return (
    <section
      id="contact-form-section"
      className={`relative w-full min-h-screen 
        lg:h-[100dvh] lg:max-h-[100dvh] bg-black text-foreground overflow-hidden 
        flex items-center ${className}`}
    >
      {/* Background Architectural Visual (Building + Galaxy LED Display) */}
      <ContactVisual />

      {/* Foreground Content */}
      <Container size="xl" className="relative z-10 w-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Top Left: Header */}
          <div className="lg:col-span-7">
            <ContactHeader />
          </div>

          {/* Top Right: Contact Info */}
          {/* <div className="lg:col-span-5 lg:pl-4 xl:pl-8">
            <ContactInfo />
          </div> */}

          {/* Bottom Left: Form */}
          <div className="lg:col-span-7 pt-2 sm:pt-4">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
