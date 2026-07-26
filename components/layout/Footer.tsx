"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, MapPin, Phone } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const columns = [
  {
    title: "Collections",
    links: [
      { href: "/shoes", label: "Shoes" },
      { href: "/watches", label: "Watches" },
      { href: "/clothes", label: "Clothes" },
      { href: "/wallets", label: "Wallets" },
      { href: "/perfumes", label: "Perfumes" },
      { href: "/belts", label: "Belts" },
    ],
  },
  {
    title: "House",
    links: [
      { href: "/about", label: "Brand Story" },
      { href: "/journal", label: "Fashion Journal" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-ink border-t border-line-inverse pt-20 pb-8">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr,1fr,1fr,1.2fr] gap-12 pb-16 border-b border-line-inverse">
          <div>
            <p className="font-display text-2xl tracking-[0.2em] text-paper mb-4">WHITE &amp; BLACK</p>
            <p className="text-paper/55 text-sm leading-relaxed max-w-xs">
              The Fashion Hub — luxury shoes, watches, and leather goods crafted with restraint,
              out of Ahmedabad.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-paper/70 hover:text-gold-bright transition-colors text-sm"
              data-cursor="hover"
            >
              <Instagram size={16} strokeWidth={1.5} /> @whiteandblack
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs tracking-widest2 uppercase text-stone mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-paper/70 hover:text-gold-bright transition-colors text-sm"
                      data-cursor="hover"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs tracking-widest2 uppercase text-stone mb-5">Visit the Store</p>
            <div className="flex items-start gap-3 text-paper/70 text-sm mb-3">
              <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
              <span>Ranip, Ahmedabad, Gujarat, India</span>
            </div>
            <div className="flex items-center gap-3 text-paper/70 text-sm mb-5">
              <Phone size={16} strokeWidth={1.5} className="shrink-0 text-gold" />
              <a href="tel:+917600847294" data-cursor="hover" className="hover:text-gold-bright transition-colors">
                +91 76008 47294
              </a>
            </div>
            <p className="text-paper/45 text-xs leading-relaxed font-mono">
              Mon–Sat 11:00–21:30
              <br />
              Sun 11:00–21:00
            </p>

            <form
              className="mt-6 flex items-center border-b border-line-inverse focus-within:border-gold transition-colors"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Join the house list"
                className="bg-transparent py-3 text-sm text-paper placeholder:text-paper/35 outline-none flex-1"
              />
              <button type="submit" className="text-xs tracking-widest2 uppercase text-gold-bright py-3" data-cursor="hover">
                {sent ? "Sent" : "Join"}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-paper/35 text-xs font-mono">
          <span>© {new Date().getFullYear()} White &amp; Black — The Fashion Hub</span>
          <span>Ranip, Ahmedabad · Crafted with restraint</span>
        </div>
      </div>
    </footer>
  );
}
