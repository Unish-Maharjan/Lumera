import { Metadata } from "next";
import ContactSection from "@/components/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact | Lumera High-Performance Architectural Displays",
  description:
    "Get in touch with Lumera's architectural engineering team. Inquire about bespoke LED displays, virtual production stages, and facade systems.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-foreground">
      <ContactSection />
    </main>
  );
}
