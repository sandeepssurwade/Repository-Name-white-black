"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Where is WHITE & BLACK located?",
    a: "Our flagship store is in Ranip, Ahmedabad, Gujarat, India. We're open Monday to Saturday from 11:00 AM to 9:30 PM, and Sunday from 11:00 AM to 9:00 PM.",
  },
  {
    q: "Do you offer complimentary shipping?",
    a: "Yes — every order ships free across India. Orders placed before 3 PM from stock typically dispatch the same day.",
  },
  {
    q: "What is your returns policy?",
    a: "We accept returns within 14 days of delivery, provided the item is unworn and in its original packaging. Bring it into our Ranip store or arrange a courier pickup.",
  },
  {
    q: "How do I find my correct size?",
    a: "Each product page lists true-to-size guidance. If you're between sizes, we generally recommend sizing up for our shoe collection — our concierge team can also advise over WhatsApp or phone.",
  },
  {
    q: "Are the materials genuine leather?",
    a: "Yes. Our shoes, wallets and belts are made from full-grain or nappa leather sourced from tanneries we've worked with for years. Material details are listed on every product page.",
  },
  {
    q: "Can I visit the store to try items in person?",
    a: "Absolutely — we'd love to have you. Our Ranip storefront carries the full current collection, and our team is happy to help you find the right fit and finish.",
  },
  {
    q: "Do you offer gift wrapping or custom orders?",
    a: "Gift wrapping is complimentary on request at checkout or in-store. For custom orders — monogramming, made-to-measure sizing — reach out via our contact page or WhatsApp.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="bg-ink min-h-screen pt-36 pb-28">
      <div className="mx-auto max-w-content px-5 md:px-10 max-w-3xl">
        <Reveal>
          <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">Support</p>
          <h1 className="font-display text-4xl md:text-6xl text-paper mb-16">Frequently Asked</h1>
        </Reveal>

        <div className="divide-y divide-line-inverse border-t border-b border-line-inverse">
          {faqs.map((item, i) => (
            <div key={item.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left py-6 gap-6"
                data-cursor="hover"
              >
                <span className="font-display text-lg md:text-xl text-paper">{item.q}</span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.5}
                  className={cn("text-gold-bright shrink-0 transition-transform duration-400", open === i && "rotate-180")}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-400 ease-luxury",
                  open === i ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="text-paper/55 text-sm leading-relaxed max-w-xl">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center border border-line-inverse rounded-md py-10 px-6">
          <p className="text-paper/70 text-sm mb-4">Still have a question?</p>
          <a
            href="https://wa.me/917600847294"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-gold-bright text-ink px-7 py-3.5 text-xs tracking-widest2 uppercase hover:bg-paper transition-colors"
            data-cursor="hover"
          >
            Message Us on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
