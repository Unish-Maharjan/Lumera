"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  if (submitted) {
    return (
      <div className="py-8">
        <p className="text-[#D7B875] text-lg font-light mb-2">
          Thank you for reaching out.
        </p>
        <p className="text-zinc-400 text-sm mb-6">
          Your message has been sent. Our team will contact you shortly.
        </p>
        <Button
          variant="gold"
          size="sm"
          rounded="full"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">
      {/* Name and Email Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full bg-transparent border-b border-white/20 py-3 text-white
             placeholder:text-zinc-500 text-sm focus:outline-none focus:border-[#D7B875] 
             transition-colors"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full bg-transparent border-b border-white/20 py-3 text-white
            placeholder:text-zinc-500 text-sm focus:outline-none focus:border-[#D7B875]
             transition-colors"
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div>
        <textarea
          name="message"
          rows={3}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full bg-transparent border-b border-white/20 py-3 text-white 
          placeholder:text-zinc-500 text-sm focus:outline-none focus:border-[#D7B875] 
          transition-colors resize-none"
        />
      </div>

      {/* Action Button using Lumera Button Component */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="gold"
          size="sm"
          rounded="full"
          isLoading={isSubmitting}
          className="group inline-flex items-center gap-2"
        >
          <span>Send Message</span>
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
