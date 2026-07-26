"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ProductGlyph } from "@/components/product/ProductGlyph";

export default function ScrollStory({ products }: { products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const distance = track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${distance + window.innerHeight}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <section ref={containerRef} className="relative h-screen bg-ink overflow-hidden">
      <div className="absolute top-16 left-5 md:left-10 z-10">
        <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-3">The Shoes Collection</p>
        <h2 className="font-display text-4xl md:text-6xl text-paper max-w-lg text-balance">
          Every pair, a study in restraint.
        </h2>
      </div>
      <div ref={trackRef} className="absolute top-0 left-0 h-full flex items-center gap-6 pl-[10vw] pr-[10vw] will-change-transform">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/shoes/${p.slug}`}
            data-cursor="hover"
            className="relative w-[70vw] sm:w-[42vw] md:w-[26vw] h-[62vh] shrink-0 rounded-md overflow-hidden group"
          >
            <ProductGlyph
              category="shoes"
              gradient={p.gradient}
              className="w-full h-full transition-transform duration-700 ease-luxury group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-[11px] tracking-widest2 uppercase text-gold-bright mb-1">{p.line}</p>
              <h3 className="font-display text-2xl text-paper">{p.name}</h3>
              <p className="text-paper/60 text-sm font-mono mt-1">{formatPrice(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
