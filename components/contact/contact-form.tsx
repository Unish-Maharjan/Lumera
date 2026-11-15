"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { User, Phone, Mail, MessageSquare, CheckCircle2 } from "lucide-react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

const topFields = [
  { name: "name", type: "text", placeholder: "Your Name", icon: User },
  { name: "phone", type: "tel", placeholder: "Phone Number", icon: Phone },
];

const box =
  "flex gap-2.5 rounded-xl border border-white/15 bg-white/5 px-4 transition-colors focus-within:border-white focus-within:ring-1 focus-within:ring-white/30";
const input =
  "w-full bg-transparent py-3.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none";

export function ContactForm() {
  const [data, setData] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // TODO: replace with real API call
    setLoading(false);
    setSent(true);
    setData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto w-full max-w-lg rounded-[28px] border border-white/20 
    bg-white/5 p-7 shadow-2xl backdrop-blur-2xl sm:p-9 lg:mr-0 lg:max-w-xl lg:p-11">
      <Heading
        as="h2"
        size="sm"
        variant="white"
        className="!normal-case !tracking-tight mb-2 text-2xl font-bold text-white sm:text-3xl"
      >
        Send Us a Message
      </Heading>
      <p className="mb-6 text-xs font-light text-zinc-400 sm:text-sm">
        Fill out the form below and we&apos;ll get back to you shortly.
      </p>

      {sent ? (
        <div className="flex flex-col items-center py-10 text-center">
          <CheckCircle2 className="mb-4 h-12 w-12 text-[#B5A5FB]" />
          <p className="mb-1 text-lg font-medium">Message Delivered</p>
          <p className="mb-6 max-w-xs text-sm text-zinc-400">
            Thank you for reaching out! Our team will get back to you within 24 hours.
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            rounded="full"
            onClick={() => setSent(false)}
            className="!border-white/20 !text-white text-xs"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-3.5 sm:grid-cols-2">
            {topFields.map(({ name, type, placeholder, icon: Icon }) => (
              <label key={name} className={`${box} items-center`}>
                <Icon className="h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  name={name}
                  type={type}
                  required
                  value={data[name as keyof typeof data]}
                  onChange={onChange}
                  placeholder={placeholder}
                  className={input}
                />
              </label>
            ))}
          </div>

          <label className={`${box} items-center`}>
            <Mail className="h-4 w-4 shrink-0 text-zinc-400" />
            <input
              name="email"
              type="email"
              required
              value={data.email}
              onChange={onChange}
              placeholder="Your Email"
              className={input}
            />
          </label>

          <label className={`${box} items-start`}>
            <MessageSquare className="mt-4 h-4 w-4 shrink-0 text-zinc-400" />
            <textarea
              name="message"
              required
              value={data.message}
              onChange={onChange}
              placeholder="Your Message"
              className={`${input} h-32 resize-none sm:h-36`}
            />
          </label>

          <Button
            type="submit"
            size="md"
            rounded="full"
            isLoading={loading}
            variant="gold"
            className="w-[50%] ml-[25%]"
          >
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;