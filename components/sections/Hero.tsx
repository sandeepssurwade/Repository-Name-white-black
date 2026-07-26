"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";

const HeroScene = dynamic(() => import("@/components/three/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
});

export default function Hero() {
  const scrollProgress = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.8)));
      scrollProgress.current = progress;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[130vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <HeroScene scrollProgress={scrollProgress} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink pointer-events-none" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-5 pointer-events-none">
          <p className="text-xs md:text-sm tracking-widest2 uppercase text-gold-bright mb-6">
            The Fashion Hub — Ahmedabad
          </p>
          <h1 className="font-display text-[15vw] sm:text-8xl md:text-[9rem] leading-[0.88] text-paper text-balance">
            <RevealText text="WHITE" delay={0.1} />
            <br />
            <span className="text-gold-bright">
              <RevealText text="&amp; BLACK" delay={0.3} />
            </span>
          </h1>
          <p className="mt-8 text-paper/65 text-base md:text-lg max-w-md text-balance">
            Luxury Crafted For Every Step
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
            <MagneticButton
              as="a"
              href="/shoes"
              className="bg-paper text-ink px-8 py-4 text-xs tracking-widest2 uppercase hover:bg-gold-bright transition-colors"
            >
              Shop Now
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/about"
              className="border border-paper/30 text-paper px-8 py-4 text-xs tracking-widest2 uppercase hover:border-gold-bright hover:text-gold-bright transition-colors"
            >
              Explore Collection
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/contact"
              className="text-paper/70 px-4 py-4 text-xs tracking-widest2 uppercase hover:text-gold-bright transition-colors"
            >
              Visit Store
            </MagneticButton>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-paper/50 animate-bounce">
          <span className="text-[10px] tracking-widest2 uppercase">Scroll</span>
          <ArrowDown size={14} strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
