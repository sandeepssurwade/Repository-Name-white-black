"use client";

import { Phone } from "lucide-react";

export default function FloatingContact() {
  return (
    <div className="fixed left-5 bottom-5 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/917600847294"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        data-cursor="hover"
        className="w-12 h-12 rounded-full bg-[#25D366] text-ink flex items-center justify-center shadow-lg shadow-black/40 hover:scale-105 transition-transform"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.3.38-.43.51-.14.14-.29.29-.13.57.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
        </svg>
      </a>
      <a
        href="tel:+917600847294"
        aria-label="Call the store"
        data-cursor="hover"
        className="w-12 h-12 rounded-full bg-gold-bright text-ink flex items-center justify-center shadow-lg shadow-black/40 hover:scale-105 transition-transform"
      >
        <Phone size={18} strokeWidth={1.75} />
      </a>
    </div>
  );
}
