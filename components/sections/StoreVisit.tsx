import { MapPin, Clock, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function StoreVisit() {
  return (
    <section className="bg-ink border-t border-line-inverse">
      <div className="mx-auto max-w-content px-5 md:px-10 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">Visit Us</p>
          <h2 className="font-display text-4xl md:text-5xl text-paper mb-8 text-balance">
            The house, in person, in Ranip.
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <MapPin size={18} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
              <div>
                <p className="text-paper text-sm">WHITE &amp; BLACK — The Fashion Hub</p>
                <p className="text-paper/50 text-sm">Ranip, Ahmedabad, Gujarat, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={18} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
              <div className="text-paper/70 text-sm font-mono">
                <p>Mon – Sat &nbsp; 11:00 AM – 9:30 PM</p>
                <p>Sunday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 11:00 AM – 9:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={18} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
              <a href="tel:+917600847294" className="text-paper/70 text-sm hover:text-gold-bright transition-colors" data-cursor="hover">
                +91 76008 47294
              </a>
            </div>
          </div>
          <MagneticButton
            as="a"
            href="https://www.google.com/maps/search/?api=1&query=White+%26+Black+The+Fashion+Hub+Ranip+Ahmedabad"
            className="mt-9 inline-flex bg-paper text-ink px-7 py-3.5 text-xs tracking-widest2 uppercase hover:bg-gold-bright transition-colors"
          >
            Get Directions
          </MagneticButton>
        </Reveal>

        <Reveal delay={120}>
          <div className="aspect-[4/3] rounded-md overflow-hidden border border-line-inverse">
            <iframe
              title="White & Black store location"
              src="https://www.google.com/maps?q=Ranip,Ahmedabad,Gujarat,India&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
