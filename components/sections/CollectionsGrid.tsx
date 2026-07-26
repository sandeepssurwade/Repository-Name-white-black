"use client";

import Link from "next/link";
import { categoryMeta, getByCategory } from "@/lib/data/products";
import { Category } from "@/lib/types";
import { ProductGlyph } from "@/components/product/ProductGlyph";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

const order: Category[] = ["shoes", "watches", "clothes", "wallets", "perfumes", "belts"];

export default function CollectionsGrid() {
  return (
    <section className="mx-auto max-w-content px-5 md:px-10 py-24 md:py-32">
      <Reveal>
        <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">Explore</p>
        <h2 className="font-display text-4xl md:text-6xl text-paper mb-14 max-w-xl text-balance">
          Six houses. One language of restraint.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {order.map((cat, i) => {
          const item = getByCategory(cat)[0];
          const meta = categoryMeta[cat];
          const isHero = cat === "shoes";
          return (
            <Reveal
              key={cat}
              delay={i * 60}
              className={isHero ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <Link
                href={`/${cat}`}
                data-cursor="hover"
                className="group relative block h-full min-h-[280px] rounded-md overflow-hidden"
              >
                {item && (
                  <ProductGlyph
                    category={cat}
                    gradient={item.gradient}
                    className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] ease-luxury group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-7">
                  <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-2">
                    {isHero ? "Signature" : "Collection"}
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-3xl md:text-4xl text-paper capitalize">{meta.label}</h3>
                      <p className="text-paper/50 text-sm mt-2">{meta.tagline}</p>
                    </div>
                    <ArrowUpRight
                      size={22}
                      strokeWidth={1.5}
                      className="text-paper/60 group-hover:text-gold-bright group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
