"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="bg-ink min-h-screen pt-32 pb-28">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">Get in Touch</p>
        <h1 className="font-display text-4xl md:text-6xl text-paper mb-16 max-w-2xl text-balance">
          Questions, custom orders, or just visiting.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,420px] gap-16">
          <Reveal>
            {sent ? (
              <div className="border border-line-inverse rounded-md p-10 text-center">
                <p className="font-display text-2xl text-paper mb-3">Message sent</p>
                <p className="text-paper/55 text-sm">
                  Thank you — our team will respond within one business day. For anything
                  immediate, WhatsApp or call us directly.
                </p>
              </div>
            ) : (
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs tracking-widest2 uppercase text-stone block mb-2">Name</label>
                    <input required className="w-full bg-transparent border-b border-line-inverse py-3 text-paper outline-none focus:border-gold-bright transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest2 uppercase text-stone block mb-2">Phone</label>
                    <input className="w-full bg-transparent border-b border-line-inverse py-3 text-paper outline-none focus:border-gold-bright transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs tracking-widest2 uppercase text-stone block mb-2">Email</label>
                  <input type="email" required className="w-full bg-transparent border-b border-line-inverse py-3 text-paper outline-none focus:border-gold-bright transition-colors" />
                </div>
                <div>
                  <label className="text-xs tracking-widest2 uppercase text-stone block mb-2">Message</label>
                  <textarea rows={5} required className="w-full bg-transparent border-b border-line-inverse py-3 text-paper outline-none focus:border-gold-bright transition-colors resize-none" />
                </div>
                <MagneticButton className="bg-paper text-ink px-8 py-4 text-xs tracking-widest2 uppercase hover:bg-gold-bright transition-colors">
                  Send Message
                </MagneticButton>
              </form>
            )}
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-line-inverse rounded-md p-8 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={18} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-paper text-sm font-medium">WHITE &amp; BLACK — The Fashion Hub</p>
                  <p className="text-paper/50 text-sm">Ranip, Ahmedabad, Gujarat, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={18} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                <a href="tel:+917600847294" className="text-paper/70 text-sm hover:text-gold-bright transition-colors" data-cursor="hover">
                  +91 76008 47294
                </a>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle size={18} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                <a href="https://wa.me/917600847294" target="_blank" rel="noreferrer" className="text-paper/70 text-sm hover:text-gold-bright transition-colors" data-cursor="hover">
                  Chat on WhatsApp
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={18} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                <div className="text-paper/70 text-sm font-mono">
                  <p>Mon – Sat &nbsp; 11:00 AM – 9:30 PM</p>
                  <p>Sunday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 11:00 AM – 9:00 PM</p>
                </div>
              </div>
              <div className="aspect-video rounded-md overflow-hidden border border-line-inverse mt-2">
                <iframe
                  title="Store location"
                  src="https://www.google.com/maps?q=Ranip,Ahmedabad,Gujarat,India&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
